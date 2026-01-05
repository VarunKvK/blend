'use client';

import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { GRADIENT_PRESETS, PRESET_CATEGORIES } from '@/lib/blend/presets';
import { LAYOUTS } from '@/lib/blend/constants';

export default function PresetGallery({ onApplyPreset }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('sunset');

    const handlePresetClick = (preset) => {
        onApplyPreset({
            type: preset.type,
            colors: preset.colors,
            layout: preset.layout,
            meshPoints: LAYOUTS[preset.layout].getPoints(preset.colors.length),
            angle: 135,
            noise: 0.05
        });
    };

    // Generate inline gradient preview style for each preset
    const getPreviewStyle = (preset) => {
        const colors = preset.colors;
        // Create a simple linear gradient for preview
        const gradientStr = `linear-gradient(135deg, ${colors.join(', ')})`;
        return {
            background: gradientStr,
        };
    };

    const currentPresets = GRADIENT_PRESETS[selectedCategory] || [];

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-zinc-400" />
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Gradient Presets
                    </h3>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-zinc-400 hover:text-white transition-colors"
                >
                    {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Collapsed State: Quick Preview */}
            {!isExpanded && (
                <div className="grid grid-cols-3 gap-2">
                    {GRADIENT_PRESETS[selectedCategory].slice(0, 3).map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => handlePresetClick(preset)}
                            className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-zinc-800 hover:border-white/30 transition-all hover:scale-105"
                            title={preset.name}
                        >
                            <div
                                className="absolute inset-0"
                                style={getPreviewStyle(preset)}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                        </button>
                    ))}
                </div>
            )}

            {/* Expanded State: Full Gallery */}
            {isExpanded && (
                <div className="space-y-4 pb-4">
                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                        {PRESET_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedCategory === category.id
                                        ? 'bg-white text-black'
                                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                                    }`}
                            >
                                <span>{category.icon}</span>
                                <span>{category.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Preset Grid */}
                    <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto scrollbar-hide pr-1" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                        {currentPresets.map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => handlePresetClick(preset)}
                                className="group relative"
                            >
                                {/* Gradient Preview */}
                                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-zinc-800 hover:border-white/40 transition-all group-hover:scale-[1.02] relative">
                                    <div
                                        className="absolute inset-0"
                                        style={getPreviewStyle(preset)}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Preset Name on Hover */}
                                    <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                                        <p className="text-[10px] font-medium text-white text-center drop-shadow-lg">
                                            {preset.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Preset Name Below */}
                                <p className="text-[10px] text-zinc-500 mt-1.5 text-center group-hover:text-white transition-colors">
                                    {preset.name}
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Info Text */}
                    <p className="text-[10px] text-zinc-600 text-center">
                        Click any preset to apply instantly
                    </p>
                </div>
            )}
        </div>
    );
}
