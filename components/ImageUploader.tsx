
import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  previewUrl: string | null;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, previewUrl, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  }, [onImageChange]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('image/'))) {
      onImageChange(file);
    } else {
      alert("Harap letakkan file gambar (JPEG, PNG, dll).");
    }
  }, [onImageChange, disabled]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <div className="w-full p-4 md:p-6 border-2 border-dashed border-purple-300 rounded-xl bg-purple-50 hover:border-purple-500 transition-colors duration-300">
      <label
        htmlFor="image-upload"
        className={`flex flex-col items-center justify-center p-6 text-center cursor-pointer rounded-lg ${isDragging ? 'bg-purple-100' : ''} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        aria-label={previewUrl ? "Ubah gambar" : "Unggah gambar"}
      >
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        {previewUrl ? (
          <div className="relative group">
            <img src={previewUrl} alt="Pratinjau" className="max-h-60 w-auto rounded-lg shadow-lg object-contain" />
            {!disabled && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <p className="text-white text-lg font-semibold">Ubah Gambar</p>
                </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-semibold text-purple-700">
              {isDragging ? "Letakkan gambar di sini" : "Seret & lepas foto Anda atau klik untuk mengunggah"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Mendukung: JPG, PNG, WEBP</p>
          </div>
        )}
      </label>
      {previewUrl && !disabled && (
        <button 
          onClick={() => onImageChange(null)}
          className="mt-4 block mx-auto px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition-colors"
          aria-label="Hapus gambar yang dipilih"
        >
          Hapus Gambar
        </button>
      )}
    </div>
  );
};
