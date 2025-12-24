import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface PaletteDisplayProps {
  colors: string[];
  onColorsChange: (newColors: string[]) => void;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ colors, onColorsChange }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const copyToClipboard = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    onColorsChange(newColors);
  };

  const addColor = () => {
    if (colors.length >= 10) return; 
    const lastColor = colors[colors.length - 1] || '#ffffff';
    onColorsChange([...colors, lastColor]);
  };

  const removeColor = (index: number) => {
    if (colors.length <= 2) return; 
    const newColors = colors.filter((_, i) => i !== index);
    onColorsChange(newColors);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Set data for compatibility
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Essential to allow dropping
    if (draggedIndex === null || draggedIndex === index) return;
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newColors = [...colors];
    const [movedColor] = newColors.splice(draggedIndex, 1);
    newColors.splice(targetIndex, 0, movedColor);

    onColorsChange(newColors);
    setDraggedIndex(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Palette</h3>
        <span className="text-[10px] text-zinc-600 border border-zinc-800 px-1.5 py-0.5 rounded">{colors.length} COLORS</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <div 
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={() => setDraggedIndex(null)}
            className={`
                group relative transition-all duration-200
                ${draggedIndex === index ? 'opacity-30 scale-90' : 'opacity-100 hover:scale-105'}
            `}
          >
            {/* Swatch */}
            <div 
              className="w-10 h-10 rounded-full border border-white/10 cursor-move relative overflow-hidden shadow-lg"
              style={{ backgroundColor: color }}
              title="Drag to reorder"
            >
              <input 
                type="color" 
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="opacity-0 w-full h-full cursor-pointer absolute inset-0" 
              />
            </div>

            {/* Remove Action */}
            {colors.length > 2 && (
                <button 
                    onClick={(e) => { e.stopPropagation(); removeColor(index); }}
                    className="absolute -top-1 -right-1 bg-black text-zinc-500 hover:text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity border border-zinc-700 shadow-sm z-10"
                >
                    <X className="w-2.5 h-2.5" />
                </button>
            )}

            {/* Hex Label */}
            <div 
                onClick={() => copyToClipboard(color, index)}
                className="mt-1 text-[9px] text-zinc-500 font-mono text-center cursor-pointer hover:text-white transition-colors"
            >
                {copiedIndex === index ? 'OK' : color.toUpperCase().slice(0,7)}
            </div>
          </div>
        ))}

        {/* Add Button */}
        {colors.length < 10 && (
            <button 
                onClick={addColor}
                className="w-10 h-10 rounded-full border border-dashed border-zinc-700 flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-500 hover:bg-white/5 transition-all"
            >
                <Plus className="w-4 h-4" />
            </button>
        )}
      </div>
      <p className="text-[10px] text-zinc-600 mt-2 text-center italic">Drag colors to reorder layers</p>
    </div>
  );
};

export default PaletteDisplay;