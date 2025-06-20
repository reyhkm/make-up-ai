
import React from 'react';
import { GeminiApiResponse } from '../types';
import { ProductCard } from './ProductCard';
import { SectionTitle } from './SectionTitle';

interface ResultsDisplayProps {
  result: GeminiApiResponse;
}

const FeatureDisplay: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
  <div className="py-2">
    <dt className="text-sm font-medium text-purple-600">{label}</dt>
    <dd className="mt-1 text-md text-gray-800">{value || 'Tidak Terdeteksi'}</dd>
  </div>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const { facial_analysis, makeup_recommendations, general_tips } = result;

  return (
    <div className="mt-8 space-y-8" aria-live="polite">
      {/* Facial Analysis Section */}
      <section aria-labelledby="facial-analysis-title" className="p-6 bg-purple-50 rounded-xl shadow-lg">
        <SectionTitle 
            id="facial-analysis-title"
            title="Analisis Wajah Anda" 
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            }
        />
        <dl className="divide-y divide-purple-200">
          <FeatureDisplay label="Warna Kulit" value={facial_analysis.skin_tone} />
          <FeatureDisplay label="Bentuk Wajah" value={facial_analysis.face_shape} />
          <FeatureDisplay label="Bentuk Mata" value={facial_analysis.eye_shape} />
          <FeatureDisplay label="Bentuk Bibir" value={facial_analysis.lip_shape} />
          <FeatureDisplay label="Ringkasan Fitur Utama" value={facial_analysis.identified_features_summary} />
        </dl>
      </section>

      {/* Makeup Recommendations Section */}
      <section aria-labelledby="makeup-recommendations-title" className="p-6 bg-pink-50 rounded-xl shadow-lg">
        <SectionTitle 
            id="makeup-recommendations-title"
            title="Rekomendasi Riasan Produk Lokal" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            }
        />
        {makeup_recommendations && makeup_recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {makeup_recommendations.map((rec, index) => (
                <ProductCard key={index} recommendation={rec} />
            ))}
            </div>
        ) : (
            <p className="text-gray-600 mt-4">Tidak ada rekomendasi spesifik yang dapat diberikan saat ini berdasarkan gambar yang diunggah dan kriteria produk.</p>
        )}
      </section>

      {/* General Tips Section */}
      {general_tips && general_tips.length > 0 && (
         <section aria-labelledby="general-tips-title" className="p-6 bg-indigo-50 rounded-xl shadow-lg">
            <SectionTitle 
                id="general-tips-title"
                title="Tips Umum" 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
            />
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                {general_tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                ))}
            </ul>
        </section>
      )}
    </div>
  );
};
