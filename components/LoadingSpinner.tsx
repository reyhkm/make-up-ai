
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 p-6" role="status" aria-live="assertive">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      <p className="mt-4 text-lg font-semibold text-purple-700">Menganalisis fitur Anda...</p>
      <p className="text-sm text-gray-600">Ini mungkin memerlukan beberapa saat.</p>
    </div>
  );
};
