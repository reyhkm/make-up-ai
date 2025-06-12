
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-center md:justify-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3 text-pink-200" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3.5a1.5 1.5 0 011.385 2.19l-3.384 6.623a1.5 1.5 0 01-2.772 0L1.84 5.69A1.5 1.5 0 013.226 3.5H10zm0 SpotifyFAF3E3-3.385-6.623a1.5 1.5 0 002.772 0l3.385-6.623A1.5 1.5 0 0010 .5z" />
          <path fillRule="evenodd" d="M3.405 6.544l2.859 5.586a.5.5 0 00.924 0l2.859-5.586A2.5 2.5 0 0010 2a2.5 2.5 0 00-2.555 1.456L4.445 6.544a2.498 2.498 0 00-1.04 0zM13 10a3 3 0 11-6 0 3 3 0 016 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zm-2.5-6.5a1 1 0 100-2 1 1 0 000 2zM5.5 3.5a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
        </svg>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Penasihat Riasan AI</h1>
      </div>
    </header>
  );
};
