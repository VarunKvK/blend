import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface DropzoneProps {
  onImageLoaded: (imageData: string) => void;
  currentImage: string | null;
}

const Dropzone: React.FC<DropzoneProps> = ({ onImageLoaded, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageLoaded(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="relative group w-full mb-8">
      <div 
        className={`
          relative rounded-sm border transition-all duration-300 overflow-hidden
          ${isDragging ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30 bg-black'}
          ${currentImage ? 'h-32 flex flex-row items-center p-4 gap-4' : 'h-40 flex flex-col items-center justify-center'}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {currentImage ? (
          <>
            <img 
              src={currentImage} 
              alt="Uploaded source" 
              className="h-20 w-20 object-cover rounded-sm border border-white/10 shadow-lg"
            />
            <div className="flex-1 text-left">
              <h3 className="text-sm font-medium text-white">Source Image</h3>
              <p className="text-xs text-zinc-500 mt-1">Click to replace</p>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 rounded-full bg-zinc-900 mb-3 border border-white/5">
              <Upload className="w-5 h-5 text-zinc-400" />
            </div>
            <p className="text-sm font-medium text-zinc-300">
              Upload Image
            </p>
            <p className="text-xs text-zinc-600 mt-1">
              Drag & Drop or Click
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropzone;