
import React from 'react';
import { MakeupProductRecommendation } from '../types';

interface ProductCardProps {
  recommendation: MakeupProductRecommendation;
}

const ProductIcon: React.FC<{ productType: string }> = ({ productType }) => {
  let iconChar = '💄'; // Default lipstick
  const lowerProductType = productType.toLowerCase();

  if (lowerProductType.includes('foundation') || lowerProductType.includes('alas bedak')) iconChar = '🧴';
  else if (lowerProductType.includes('eye') || lowerProductType.includes('mata')) iconChar = '👁️';
  else if (lowerProductType.includes('blush') || lowerProductType.includes('pipi')) iconChar = '🎨';
  else if (lowerProductType.includes('brow') || lowerProductType.includes('alis')) iconChar = '✏️';
  else if (lowerProductType.includes('concealer') || lowerProductType.includes('penyamar noda')) iconChar = '✨'; // Example for concealer
  else if (lowerProductType.includes('highlighter') || lowerProductType.includes('penyorot')) iconChar = '🌟';
  else if (lowerProductType.includes('contour') || lowerProductType.includes('kontur')) iconChar = '🖌️';


  return <span className="text-3xl mr-3" aria-hidden="true">{iconChar}</span>;
};


export const ProductCard: React.FC<ProductCardProps> = ({ recommendation }) => {
  const { product_type, recommendation: textRecommendation, details } = recommendation;
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex items-center mb-3">
          <ProductIcon productType={product_type} />
          <h3 className="text-xl font-semibold text-pink-700">{product_type}</h3>
        </div>
        <p className="text-gray-700 text-sm mb-2">{textRecommendation}</p>
        {details && <p className="text-xs text-gray-500 italic mt-1">{details}</p>}
      </div>
      <div className="p-3 bg-pink-50 text-right">
        <a 
            href={`https://www.google.com/search?q=${encodeURIComponent(product_type + " " + textRecommendation.split('.')[0])}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-pink-600 hover:text-pink-800 font-medium transition-colors"
            aria-label={`Cari ${product_type} secara online`}
        >
            Cari online &rarr;
        </a>
      </div>
    </div>
  );
};
