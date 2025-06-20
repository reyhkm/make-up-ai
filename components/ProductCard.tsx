
import React from 'react';
import { MakeupProductRecommendation } from '../types';

interface ProductCardProps {
  recommendation: MakeupProductRecommendation;
}

const ProductIcon: React.FC<{ productType: string }> = ({ productType }) => {
  let iconChar = '💄'; // Default lipstick
  const lowerProductType = productType.toLowerCase();

  if (lowerProductType.includes('foundation') || lowerProductType.includes('alas bedak')) iconChar = '🧴';
  else if (lowerProductType.includes('eye') || lowerProductType.includes('mata') || lowerProductType.includes('perona mata')) iconChar = '👁️';
  else if (lowerProductType.includes('blush') || lowerProductType.includes('pipi') || lowerProductType.includes('pemerah pipi')) iconChar = '🎨';
  else if (lowerProductType.includes('brow') || lowerProductType.includes('alis')) iconChar = '✏️';
  else if (lowerProductType.includes('concealer') || lowerProductType.includes('penyamar noda')) iconChar = '✨';
  else if (lowerProductType.includes('highlighter') || lowerProductType.includes('penyorot')) iconChar = '🌟';
  else if (lowerProductType.includes('contour') || lowerProductType.includes('kontur')) iconChar = '🖌️';

  return <span className="text-3xl mr-3" aria-hidden="true">{iconChar}</span>;
};

export const ProductCard: React.FC<ProductCardProps> = ({ recommendation }) => {
  const { product_type, brand_name, product_name, shade_name, reasoning, details } = recommendation;
  
  const searchOnlineQuery = `${brand_name} ${product_name} ${shade_name || ''}`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex items-center mb-3">
          <ProductIcon productType={product_type} />
          <h3 className="text-xl font-semibold text-pink-700">{product_type}</h3>
        </div>
        
        <div className="space-y-2 mb-3">
          <p className="text-sm">
            <span className="font-semibold text-gray-600">Merek:</span> 
            <span className="text-gray-800 ml-1">{brand_name}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-600">Produk:</span> 
            <span className="text-gray-800 ml-1">{product_name}</span>
          </p>
          {shade_name && (
            <p className="text-sm">
              <span className="font-semibold text-gray-600">Shade:</span> 
              <span className="text-gray-800 ml-1">{shade_name}</span>
            </p>
          )}
        </div>

        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold text-purple-700">Alasan:</span> {reasoning}
        </p>
        
        {details && <p className="text-xs text-gray-500 italic mt-1">{details}</p>}
      </div>
      <div className="p-3 bg-pink-50 text-right">
        <a 
            href={`https://www.google.com/search?q=${encodeURIComponent(searchOnlineQuery)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-pink-600 hover:text-pink-800 font-medium transition-colors"
            aria-label={`Cari ${brand_name} ${product_name} secara online`}
        >
            Cari online &rarr;
        </a>
      </div>
    </div>
  );
};
