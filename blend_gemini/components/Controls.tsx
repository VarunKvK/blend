import React from 'react';
import { GradientConfig, GradientType, LayoutId } from '../types';
import { RefreshCw, Shuffle, Sliders, Layout } from 'lucide-react';
import { LAYOUTS } from '../constants';

interface ControlsProps {
  config: GradientConfig;
  onChange: (newConfig: GradientConfig) => void;
  onShuffle: () => void;
}

const Controls: React.FC<ControlsProps> = ({ config, onChange, onShuffle }) => {
  const handleChange = (key: keyof GradientConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const handleLayoutChange = (layoutId: LayoutId) => {
     const generator = LAYOUTS[layoutId];
     if (generator && config.colors.length > 0) {
         onChange({
             ...config,
             layout: layoutId,
             meshPoints: generator.getPoints(config.colors.length)
         });
     } else {
         onChange({ ...config, layout: layoutId });
     }
  };

  return (
    <div className="space-y-8">
      
      {/* Type Selection */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Style</h3>
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-white/5">
          {(['linear', 'radial', 'mesh'] as GradientType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleChange('type', type)}
              className={`
                flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize
                ${config.type === type ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Selection (Only for Mesh) */}
      <div className={`transition-all duration-300 ${config.type === 'mesh' ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Layout</h3>
        <div className="grid grid-cols-3 gap-2">
            {(Object.keys(LAYOUTS) as LayoutId[]).map(layoutId => (
                <button
                    key={layoutId}
                    onClick={() => handleLayoutChange(layoutId)}
                    className={`
                        px-2 py-2 text-[10px] font-medium rounded border transition-all
                        ${config.layout === layoutId 
                            ? 'bg-zinc-800 border-white/20 text-white' 
                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'}
                    `}
                >
                    {LAYOUTS[layoutId].label}
                </button>
            ))}
        </div>
      </div>

      {/* Angle Control (Only for Linear) */}
      <div className={`transition-all duration-300 ${config.type === 'linear' ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Angle</h3>
          <span className="text-xs font-mono text-zinc-300">{config.angle}°</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={config.angle}
          onChange={(e) => handleChange('angle', parseInt(e.target.value))}
          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
        />
      </div>

      {/* Grain / Noise Control */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Grain</h3>
          <span className="text-xs font-mono text-zinc-300">{Math.round(config.noise * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="50" // Max 50% opacity
          step="1"
          value={config.noise * 100}
          onChange={(e) => handleChange('noise', parseInt(e.target.value) / 100)}
          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
        />
      </div>

      {/* Actions */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Composition</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onShuffle}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-white transition-colors border border-white/5"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Randomize
          </button>
           <button
            onClick={() => {
                 onChange({...config, colors: [...config.colors].reverse()})
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-white transition-colors border border-white/5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Flip Colors
          </button>
        </div>
      </div>
      
      {config.type === 'mesh' && (
        <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg mt-4">
           <div className="flex gap-3 items-start">
              <Sliders className="w-4 h-4 text-zinc-400 mt-0.5" />
              <div>
                  <p className="text-xs text-zinc-300 font-medium">Interactive Mode</p>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                    Drag the points on the canvas to fine-tune your selected layout.
                  </p>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default Controls;