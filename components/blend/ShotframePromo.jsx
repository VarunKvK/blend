'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { analytics } from '@/lib/analytics';

const SLIDES = [
    '/shotframe-slides/shotframe-1766432406508.png',
    '/shotframe-slides/shotframe-1766470909509.png',
    '/shotframe-slides/shotframe-4k-1766265571161.png',
    '/shotframe-slides/shotframe-4k-1766501866805.png',
    '/shotframe-slides/shotframe-hd-1766093379945.png',
    '/shotframe-slides/shotframe-hd-1766093491414.png',
    '/shotframe-slides/shotframe-hd-1766094100343.png',
];

export default function ShotframePromo() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [hasAutoExpanded, setHasAutoExpanded] = useState(false);

    // Auto-expand after 8 seconds to grab attention (only once)
    useEffect(() => {
        if (hasAutoExpanded) return;

        const autoExpandTimer = setTimeout(() => {
            setIsExpanded(true);
            setHasAutoExpanded(true);

            // Auto-collapse after 5 seconds
            setTimeout(() => {
                setIsExpanded(false);
            }, 5000);
        }, 5000);

        return () => clearTimeout(autoExpandTimer);
    }, [hasAutoExpanded]);

    // Slideshow effect
    useEffect(() => {
        if (!isExpanded) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isExpanded]);

    return (
        <a
            href="https://shotframe.space"
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={() => analytics.promoClicked()}
        >
            {/* Header - Always visible */}
            <div className="flex items-center justify-between px-4 py-3 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                            src="/shotframe-slides/favicon-16x16.png"
                            alt="Shotframe"
                            width={14}
                            height={14}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">Try Shotframe</span>
                        <span className="text-[9px] text-white/40 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">NEW</span>
                    </div>
                </div>
                <ArrowUpRight className={`w-3.5 h-3.5 text-white/40 transition-all duration-300 ${isExpanded ? 'text-white rotate-0' : 'rotate-0'}`} />
            </div>

            {/* Expandable Content */}
            <div
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                    maxHeight: isExpanded ? '220px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                }}
            >
                {/* Image Slideshow */}
                <div className="relative w-full h-42 overflow-hidden bg-black/50 mx-4 rounded-md" style={{ width: 'calc(100% - 32px)' }}>
                    {SLIDES.map((slide, index) => (
                        <div
                            key={slide}
                            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                            style={{ opacity: index === currentSlide ? 1 : 0 }}
                        >
                            <Image
                                src={slide}
                                alt={`Shotframe example ${index + 1}`}
                                fill
                                className="object-cover rounded-md"
                                sizes="340px"
                            />
                        </div>
                    ))}

                    {/* Slide indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {SLIDES.map((_, index) => (
                            <div
                                key={index}
                                className="h-1 rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: index === currentSlide ? '12px' : '4px',
                                    backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.3)'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="px-4 py-3">
                    <p className="text-[11px] text-white/50 leading-relaxed mb-2">
                        Create stunning browser mockups and device frames instantly.
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-medium text-white/70 px-2 py-1 rounded bg-white/10 border border-white/10">
                            Free to Use
                        </span>
                        <span className="text-[9px] text-white/30 group-hover:text-white/50 transition-colors">→ Try Now</span>
                    </div>
                </div>
            </div>
        </a>
    );
}
