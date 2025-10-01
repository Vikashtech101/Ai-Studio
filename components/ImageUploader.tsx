
import React, { useRef, useState } from 'react';
import { STOCK_MODELS } from '../constants';

interface ImageUploaderProps {
  title: string;
  onImageSelect: (fileData: { data: string; mimeType: string }) => void;
  showStockModels?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onImageSelect, showStockModels = false }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelect({ data: result, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleStockModelSelect = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
          const result = reader.result as string;
          setPreview(result);
          onImageSelect({ data: result, mimeType: blob.type });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching stock model:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold text-cyan-400">{title}</h3>
      <div
        className="w-full max-w-sm h-64 bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors duration-300"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg p-2" />
        ) : (
          <div className="text-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            <p>Click to upload</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
      </div>
      {showStockModels && (
        <div className="w-full max-w-sm">
            <p className="text-center text-sm text-gray-400 mb-2">Or select a stock model:</p>
            <div className="grid grid-cols-4 gap-2">
                {STOCK_MODELS.map(model => (
                    <img 
                        key={model.id}
                        src={model.url}
                        alt={model.alt}
                        className="w-full h-16 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-cyan-400 transition-all"
                        onClick={() => handleStockModelSelect(model.url)}
                    />
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
