'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Download, Code, X, CheckCircle2 } from 'lucide-react';
import { extractColorsFromImage, generateCssGradient, generateSvgContent } from '@/lib/blend/colorUtils';
import { DIMENSION_PRESETS, DEFAULT_GRADIENT_COLORS, MAX_DAILY_EXPORTS, LAYOUTS, ExportFormat } from '@/lib/blend/constants';
import Dropzone from '@/components/blend/Dropzone';
import PaletteDisplay from '@/components/blend/PaletteDisplay';
import Controls from '@/components/blend/Controls';
import PreviewCanvas from '@/components/blend/PreviewCanvas';

export default function BlendPage() {
    const [image, setImage] = useState(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [gradientConfig, setGradientConfig] = useState({
        type: 'mesh',
        angle: 135,
        colors: DEFAULT_GRADIENT_COLORS,
        meshPoints: LAYOUTS.aurora.getPoints(DEFAULT_GRADIENT_COLORS.length),
        noise: 0.05,
        layout: 'aurora'
    });
    const [selectedDimension, setSelectedDimension] = useState(DIMENSION_PRESETS[0]);
    const [userTier, setUserTier] = useState({ type: 'FREE', dailyExportsLeft: MAX_DAILY_EXPORTS });
    const [showPaywall, setShowPaywall] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (image) {
            setIsExtracting(true);
            extractColorsFromImage(image)
                .then((extractedColors) => {
                    const initialGradientColors = extractedColors.slice(0, 5);
                    setGradientConfig(prev => ({
                        ...prev,
                        colors: initialGradientColors,
                        meshPoints: LAYOUTS[prev.layout].getPoints(initialGradientColors.length)
                    }));
                })
                .catch(console.error)
                .finally(() => setIsExtracting(false));
        }
    }, [image]);

    const handlePaletteChange = (newColors) => {
        setGradientConfig(prev => {
            let newPoints = prev.meshPoints || [];
            if (newColors.length !== prev.colors.length) {
                newPoints = LAYOUTS[prev.layout].getPoints(newColors.length);
            }
            return { ...prev, colors: newColors, meshPoints: newPoints };
        });
    };

    const showNotification = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleShuffle = useCallback(() => {
        const shuffledColors = [...gradientConfig.colors].sort(() => 0.5 - Math.random());
        setGradientConfig(prev => ({ ...prev, colors: shuffledColors }));
    }, [gradientConfig.colors]);

    const handleMeshPointUpdate = (index, x, y) => {
        setGradientConfig(prev => {
            const newPoints = [...(prev.meshPoints || [])];
            if (newPoints[index]) {
                newPoints[index] = { x, y };
            }
            return { ...prev, meshPoints: newPoints };
        });
    };

    const handleExport = async (format) => {
        if (userTier.type === 'FREE' && userTier.dailyExportsLeft <= 0) {
            setShowPaywall(true);
            return;
        }
        if (userTier.type === 'FREE' && format !== ExportFormat.PNG) {
            setShowPaywall(true);
            return;
        }

        const { width, height } = selectedDimension;

        if (format === ExportFormat.CSS) {
            const css = `background: ${generateCssGradient(gradientConfig)};`;
            navigator.clipboard.writeText(css);
            showNotification("CSS copied to clipboard!");
        } else if (format === ExportFormat.SVG) {
            const svgContent = generateSvgContent(gradientConfig, width, height);
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'blend-background.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (format === ExportFormat.PNG) {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.fillStyle = gradientConfig.colors[0];
            ctx.fillRect(0, 0, width, height);

            if (gradientConfig.type === 'mesh' && gradientConfig.meshPoints) {
                const blurRadius = Math.max(width, height) * 0.1;
                ctx.filter = `blur(${blurRadius}px) saturate(200%) contrast(120%)`;
                ctx.globalCompositeOperation = 'screen';

                gradientConfig.colors.forEach((color, i) => {
                    const pt = gradientConfig.meshPoints[i];
                    if (!pt) return;
                    const cx = (pt.x / 100) * width;
                    const cy = (pt.y / 100) * height;
                    const r = Math.min(width, height) * 0.5;
                    ctx.beginPath();
                    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
                    ctx.fillStyle = color;
                    ctx.globalAlpha = 0.8;
                    ctx.fill();
                });

                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 1.0;
                ctx.filter = 'none';
            } else {
                let grd;
                if (gradientConfig.type === 'linear') {
                    const rad = (gradientConfig.angle * Math.PI) / 180;
                    const x1 = width / 2 - Math.cos(rad) * width / 2;
                    const y1 = height / 2 - Math.sin(rad) * height / 2;
                    const x2 = width / 2 + Math.cos(rad) * width / 2;
                    const y2 = height / 2 + Math.sin(rad) * height / 2;
                    grd = ctx.createLinearGradient(x1, y1, x2, y2);
                } else {
                    grd = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
                }
                gradientConfig.colors.forEach((color, i) => {
                    grd.addColorStop(i / (gradientConfig.colors.length - 1), color);
                });
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, width, height);
            }

            if (gradientConfig.noise > 0) {
                const imageData = ctx.getImageData(0, 0, width, height);
                const data = imageData.data;
                const noiseIntensity = gradientConfig.noise * 255 * 0.6;
                for (let i = 0; i < data.length; i += 4) {
                    const grain = (Math.random() - 0.5) * noiseIntensity;
                    data[i] = Math.min(255, Math.max(0, data[i] + grain));
                    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
                    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
                }
                ctx.putImageData(imageData, 0, 0);
            }

            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'blend-background.png';
            link.href = url;
            link.click();
        }

        if (userTier.type === 'FREE') {
            setUserTier(prev => ({ ...prev, dailyExportsLeft: prev.dailyExportsLeft - 1 }));
            if (format !== ExportFormat.CSS) showNotification("Download started!");
        }
    };

    const handleUpgrade = () => {
        setUserTier({ type: 'PAID', dailyExportsLeft: Infinity });
        setShowPaywall(false);
        showNotification("Upgraded to Pro! Unlimited exports unlocked.");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-black text-zinc-100 overflow-hidden font-sans">
            <div className="w-full md:w-[380px] flex-shrink-0 bg-black border-r border-white/10 flex flex-col h-screen z-20 shadow-2xl">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        BLEND <span className="text-[10px] font-normal text-zinc-500 border border-zinc-800 px-1 rounded">BETA</span>
                    </h1>
                </div>
                <div className="p-6 space-y-8 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
                    <Dropzone onImageLoaded={setImage} currentImage={image} />
                    {isExtracting ? (
                        <div className="text-center py-8 text-zinc-400 text-sm animate-pulse">Analyzing Colors...</div>
                    ) : (
                        <>
                            <PaletteDisplay colors={gradientConfig.colors} onColorsChange={handlePaletteChange} />
                            <Controls config={gradientConfig} onChange={setGradientConfig} onShuffle={handleShuffle} />
                        </>
                    )}
                    <div>
                        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Canvas</h3>
                        <div className="relative">
                            <select className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-md focus:ring-1 focus:ring-white focus:border-white block p-2.5 appearance-none"
                                value={selectedDimension.name} onChange={(e) => {
                                    const preset = DIMENSION_PRESETS.find(p => p.name === e.target.value);
                                    if (preset) setSelectedDimension(preset);
                                }}>
                                {DIMENSION_PRESETS.map(p => (
                                    <option key={p.name} value={p.name}>{p.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-white/10 bg-black">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button onClick={() => handleExport(ExportFormat.PNG)}
                            className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black py-3 rounded-md font-bold text-sm transition-all">
                            <Download className="w-4 h-4" />Download
                        </button>
                        <button onClick={() => handleExport(ExportFormat.CSS)}
                            className="flex items-center justify-center gap-2 bg-black hover:bg-zinc-900 text-white py-3 rounded-md font-medium text-sm transition-all border border-zinc-800">
                            <Code className="w-4 h-4" />Copy CSS
                        </button>
                    </div>
                    {userTier.type === 'FREE' && (
                        <div className="flex items-center justify-between text-[10px] text-zinc-600 px-1 uppercase tracking-widest">
                            <span>{userTier.dailyExportsLeft} / {MAX_DAILY_EXPORTS} exports left</span>
                            <button onClick={() => setShowPaywall(true)} className="text-white hover:underline">Go Pro</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-1 relative h-[50vh] md:h-screen bg-[#050505]">
                <PreviewCanvas gradient={gradientConfig} aspectRatio={selectedDimension.width / selectedDimension.height} onUpdateMeshPoints={handleMeshPointUpdate} />
            </div>
            {showPaywall && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-sm w-full p-8 relative">
                        <button onClick={() => setShowPaywall(false)} className="absolute top-4 right-4 text-zinc-600 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-white mb-2">Blend Pro</h2>
                            <p className="text-zinc-500 text-sm">Unlock the full creative suite.</p>
                        </div>
                        <div className="space-y-3 mb-8">
                            {["Unlimited Exports", "SVG Vectors", "Commercial License", "Remove Watermark"].map(item => (
                                <div key={item} className="flex items-center gap-3 text-zinc-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleUpgrade} className="w-full py-3 bg-white text-black font-bold rounded-md hover:bg-zinc-200 transition-colors">
                            Unlock for $9
                        </button>
                    </div>
                </div>
            )}
            {notification && (
                <div className="fixed top-6 right-6 z-50 animate-slide-in">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-md shadow-2xl border border-zinc-800 bg-black text-white">
                        <span className="text-sm font-medium">{notification.msg}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
