
import React from 'react';

interface SectionTitleProps {
  title: string;
  icon?: React.ReactNode;
  id?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon, id }) => {
  return (
    <div className="flex items-center pb-2 border-b-2 border-gray-200 mb-4">
      {icon}
      <h2 id={id} className="text-2xl font-bold text-gray-700">{title}</h2>
    </div>
  );
};
