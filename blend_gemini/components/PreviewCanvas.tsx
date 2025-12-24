import React, { useRef, useState, useEffect } from 'react';
import { GradientConfig } from '../types';
import { generateCssGradient } from '../utils/colorUtils';
import { Maximize2 } from 'lucide-react';

interface PreviewCanvasProps {
  gradient: GradientConfig;
  aspectRatio: number; // width / height
  onUpdateMeshPoints?: (index: number, x: number, y: number) => void;
}

const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ gradient, aspectRatio, onUpdateMeshPoints }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Fallback CSS for Linear/Radial
  const standardCssBackground = gradient.type !== 'mesh' ? generateCssGradient(gradient) : undefined;

  // Noise Pattern
  const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`;

  // Handle Dragging Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingIndex === null || !containerRef.current || !onUpdateMeshPoints) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));

      onUpdateMeshPoints(draggingIndex, Math.round(x), Math.round(y));
    };

    const handleMouseUp = () => {
      setDraggingIndex(null);
    };

    if (draggingIndex !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingIndex, onUpdateMeshPoints]);

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-black relative overflow-hidden select-none">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* The Actual Gradient Canvas */}
      <div 
        ref={containerRef}
        className="relative shadow-2xl shadow-black/50 overflow-hidden"
        style={{
          aspectRatio: aspectRatio,
          width: aspectRatio >= 1 ? '100%' : 'auto',
          height: aspectRatio < 1 ? '100%' : 'auto',
          maxHeight: '100%',
          maxWidth: '100%',
          // For mesh, we use a dark base color to allow 'screen' blend mode to pop
          background: gradient.type === 'mesh' ? gradient.colors[0] : standardCssBackground,
        }}
      >
        
        {/* Render Mesh Points with Premium Glow Effect */}
        {gradient.type === 'mesh' && (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              // The Secret Sauce: High Blur + Saturation + Contrast on additive blended shapes
              filter: 'blur(100px) saturate(200%) contrast(120%)', 
              opacity: 1 
            }}
          >
             {gradient.meshPoints && gradient.meshPoints.map((pt, i) => (
                <div 
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        backgroundColor: gradient.colors[i],
                        left: `${pt.x}%`,
                        top: `${pt.y}%`,
                        width: '60%', 
                        height: '60%',
                        transform: 'translate(-50%, -50%)',
                        // Mix blend mode 'screen' or 'hard-light' creates the neon glow interaction
                        mixBlendMode: 'screen',
                        opacity: 0.8
                    }}
                />
             ))}
          </div>
        )}

        {/* Noise Overlay */}
        <div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
                backgroundImage: noiseBg,
                opacity: gradient.noise,
                mixBlendMode: 'overlay'
            }}
        />

        {/* Mesh Interactivity Layer (Invisible but functional) */}
        {gradient.type === 'mesh' && (
            <div className="absolute inset-0 z-20">
                {gradient.meshPoints && gradient.meshPoints.map((pt, i) => (
                  <div
                    key={i}
                    className={`
                      absolute w-6 h-6 -ml-3 -mt-3 rounded-full cursor-move 
                      flex items-center justify-center transition-all
                      ${draggingIndex === i ? 'bg-white shadow-xl scale-110 ring-2 ring-black/50' : 'bg-transparent hover:bg-white/30 border border-white/50'}
                    `}
                    style={{
                      left: `${pt.x}%`,
                      top: `${pt.y}%`,
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault(); 
                      setDraggingIndex(i);
                    }}
                  />
                ))}
            </div>
        )}

        {/* Fullscreen icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-30">
            <button className="p-2 bg-black/20 backdrop-blur rounded-full text-white/70 hover:text-white">
                <Maximize2 className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewCanvas;