
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { analyzeImageWithGemini } from './services/geminiService';
import { GeminiApiResponse, AppState } from './types';
import { INITIAL_PROMPT, GEMINI_MODEL_NAME } from './constants';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<GeminiApiResponse | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = useCallback((file: File | null) => {
    setSelectedFile(file);
    setAnalysisResult(null);
    setError(null);
    setAppState(AppState.IDLE);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) {
      setError("Silakan pilih gambar terlebih dahulu.");
      setAppState(AppState.ERROR);
      return;
    }

    if (!process.env.API_KEY) {
      setError("Kunci API belum dikonfigurasi. Harap atur variabel lingkungan API_KEY.");
      setAppState(AppState.ERROR);
      console.error("Kunci API tidak ditemukan. Atur process.env.API_KEY.");
      return;
    }
    
    setAppState(AppState.ANALYZING);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeImageWithGemini(selectedFile, INITIAL_PROMPT, GEMINI_MODEL_NAME);
      setAnalysisResult(result);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error("Analisis gagal:", err);
      const errorMessage = (err instanceof Error) ? err.message : "Terjadi kesalahan yang tidak diketahui saat analisis.";
      setError(`Gagal menganalisis gambar: ${errorMessage}. Pastikan kunci API Anda valid dan model dapat diakses.`);
      setAppState(AppState.ERROR);
    }
  }, [selectedFile]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-10">
          <ImageUploader
            onImageChange={handleImageChange}
            previewUrl={previewUrl}
            disabled={appState === AppState.ANALYZING}
          />

          {selectedFile && (
            <div className="mt-6 text-center">
              <button
                onClick={handleAnalyze}
                disabled={appState === AppState.ANALYZING || !selectedFile}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label={appState === AppState.ANALYZING ? 'Sedang menganalisis gambar' : 'Dapatkan Saran Riasan dari gambar yang diunggah'}
              >
                {appState === AppState.ANALYZING ? 'Menganalisis...' : 'Dapatkan Saran Riasan'}
              </button>
            </div>
          )}

          {appState === AppState.ANALYZING && <LoadingSpinner />}
          
          {error && appState === AppState.ERROR && (
             <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
                <p className="font-semibold">Kesalahan:</p>
                <p>{error}</p>
             </div>
          )}

          {analysisResult && appState === AppState.SUCCESS && (
            <ResultsDisplay result={analysisResult} />
          )}

          {!selectedFile && appState === AppState.IDLE && (
            <div className="mt-8 text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
              <h2 className="text-xl font-semibold text-purple-700 mb-2">Selamat Datang di Penasihat Riasan AI Lokal!</h2>
              <p className="text-gray-600">
                Unggah foto wajah Anda, dan AI kami akan memberikan rekomendasi produk riasan dari merek lokal (Glad2Glow, Wardah, Madame Gie).
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Untuk hasil terbaik, gunakan foto dengan pencahayaan yang baik dan wajah terlihat jelas.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
