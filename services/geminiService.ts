
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { GeminiApiResponse } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Result is like "data:image/jpeg;base64,xxxxxxxxxxxx"
      // We need to extract the "xxxxxxxxxxxx" part
      const base64String = (reader.result as string).split(',')[1];
      if (!base64String) {
        reject(new Error("Failed to extract base64 string from file."));
        return;
      }
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const analyzeImageWithGemini = async (
  imageFile: File,
  prompt: string,
  modelName: string
): Promise<GeminiApiResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const base64ImageData = await fileToBase64(imageFile);

    const imagePart: Part = {
      inlineData: {
        mimeType: imageFile.type, // e.g., image/jpeg, image/png
        data: base64ImageData,
      },
    };

    const textPart: Part = {
      text: prompt,
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json", // Request JSON output
        topP: 0,
      },
    });

    let jsonString = response.text.trim();
    
    // Remove markdown fences if present (e.g., ```json ... ```)
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonString.match(fenceRegex);
    if (match && match[2]) {
      jsonString = match[2].trim();
    }

    try {
      const parsedJson = JSON.parse(jsonString) as GeminiApiResponse;
      // Basic validation of the parsed structure
      if (!parsedJson.facial_analysis || !parsedJson.makeup_recommendations) {
        console.error("Parsed JSON is missing required fields:", parsedJson);
        throw new Error("AI response is not in the expected format. Missing key fields.");
      }
      return parsedJson;
    } catch (parseError) {
      console.error("Failed to parse JSON response from Gemini:", parseError);
      console.error("Raw response text:", response.text);
      throw new Error(`AI response was not valid JSON. Raw response: ${response.text.substring(0,200)}...`);
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Check for specific API error messages if available
        if (error.message.includes("API key not valid")) {
            throw new Error("Invalid API Key. Please check your API_KEY environment variable.");
        }
         if (error.message.includes("quota")) {
            throw new Error("API quota exceeded. Please check your Gemini API plan and usage.");
        }
    }
    throw error; // Re-throw original or enhanced error
  }
};
