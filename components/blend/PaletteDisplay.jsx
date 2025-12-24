import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
const PaletteDisplay = ({ colors, onColorsChange }) => {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Palette</h3>
                <span className="text-[10px] text-zinc-600 border border-zinc-800 px-1.5 py-0.5 rounded">{colors.length} COLORS</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {colors.map((color, index) => (
                    <div key={index} draggable onDragStart={(e) => { setDraggedIndex(index); e.dataTransfer.setData("text/plain", index.toString()); }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            if (draggedIndex !== null && draggedIndex !== index) {
                                const newColors = [...colors];
                                const [moved] = newColors.splice(draggedIndex, 1);
                                newColors.splice(index, 0, moved);
                                onColorsChange(newColors);
                            }
                            setDraggedIndex(null);
                        }}
                        onDragEnd={() => setDraggedIndex(null)}
                        className={`group relative transition-all duration-200 ${draggedIndex === index ? 'opacity-30 scale-90' : 'opacity-100 hover:scale-105'}`}>
                        <div className="w-10 h-10 rounded-full border border-white/10 cursor-move relative overflow-hidden shadow-lg" style={{ backgroundColor: color }} title="Drag to reorder">
                            <input type="color" value={color} onChange={(e) => { const newColors = [...colors]; newColors[index] = e.target.value; onColorsChange(newColors); }}
                                className="opacity-0 w-full h-full cursor-pointer absolute inset-0" />
                        </div>
                        {colors.length > 2 && (
                            <button onClick={(e) => { e.stopPropagation(); if (colors.length > 2) onColorsChange(colors.filter((_, i) => i !== index)); }}
                                className="absolute -top-1 -right-1 bg-black text-zinc-500 hover:text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity border border-zinc-700 shadow-sm z-10">
                                <X className="w-2.5 h-2.5" />
                            </button>
                        )}
                        <div onClick={() => { navigator.clipboard.writeText(color); setCopiedIndex(index); setTimeout(() => setCopiedIndex(null), 1500); }}
                            className="mt-1 text-[9px] text-zinc-500 font-mono text-center cursor-pointer hover:text-white transition-colors">
                            {copiedIndex === index ? 'OK' : color.toUpperCase().slice(0, 7)}
                        </div>
                    </div>
                ))}
                {colors.length < 10 && (
                    <button onClick={() => { if (colors.length < 10) onColorsChange([...colors, colors[colors.length - 1] || '#ffffff']); }}
                        className="w-10 h-10 rounded-full border border-dashed border-zinc-700 flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-500 hover:bg-white/5 transition-all">
                        <Plus className="w-4 h-4" />
                    </button>
                )}
            </div>
            <p className="text-[10px] text-zinc-600 mt-2 text-center italic">Drag colors to reorder layers</p>
        </div>
    );
};
export default PaletteDisplay;