
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 text-center mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Penasihat Riasan AI. Didukung oleh Gemini.</p>
        <p className="text-sm text-gray-500 mt-1">Hanya untuk tujuan demonstrasi.</p>
      </div>
    </footer>
  );
};
