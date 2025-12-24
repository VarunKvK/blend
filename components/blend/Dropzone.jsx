import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
const Dropzone = ({ onImageLoaded, currentImage }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleFile = (file) => {
    if (!file.type.match('image.*')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) onImageLoaded(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="relative group w-full mb-8">
      <div 
        className={`relative rounded-sm border transition-all duration-300 overflow-hidden ${isDragging ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30 bg-black'} ${currentImage ? 'h-32 flex flex-row items-center p-4 gap-4' : 'h-40 flex flex-col items-center justify-center'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        {currentImage ? (
          <>
            <img src={currentImage} alt="Uploaded" className="h-20 w-20 object-cover rounded-sm border border-white/10 shadow-lg" />
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
            <p className="text-sm font-medium text-zinc-300">Upload Image</p>
            <p className="text-xs text-zinc-600 mt-1">Drag & Drop or Click</p>
          </>
        )}
      </div>
    </div>
  );
};
export default Dropzone;