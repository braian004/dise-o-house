import React, { useRef } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (base64: string, mimeType: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Extract base64 data and mime type
        // result is format: "data:image/jpeg;base64,/9j/4AAQSk..."
        const match = result.match(/^data:(.+);base64,(.+)$/);
        if (match) {
          const mimeType = match[1];
          const base64Data = match[2];
          onImageSelected(base64Data, mimeType);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer group" onClick={triggerFileInput}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div className="bg-white p-4 rounded-full shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all mb-4">
        <Camera className="w-8 h-8 text-blue-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-slate-700 mb-1">Take or Upload Photo</h3>
      <p className="text-sm text-slate-500 text-center max-w-xs">
        Capture your room or building exterior to start the redesign process.
      </p>
      
      <div className="flex gap-4 mt-6">
        <div className="flex items-center text-xs text-slate-400">
          <Upload className="w-3 h-3 mr-1" /> JPEG/PNG
        </div>
        <div className="flex items-center text-xs text-slate-400">
          <ImageIcon className="w-3 h-3 mr-1" /> Max 5MB
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;