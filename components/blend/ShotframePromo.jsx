'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

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
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <a
            href="https://shotframe.space"
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-2">
                {/* Image Slideshow */}
                <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden bg-black/50">
                    {SLIDES.map((slide, index) => (
                        <div
                            key={slide}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <Image
                                src={slide}
                                alt={`Shotframe example ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 380px) 100vw, 380px"
                            />
                        </div>
                    ))}

                    {/* Slide indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {SLIDES.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'w-4 bg-white'
                                    : 'w-1 bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-2">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md flex items-center justify-center border border-white/20 overflow-hidden bg-black/10">
                                <Image
                                    src="/shotframe-slides/favicon-16x16.png"
                                    alt="Shotframe"
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-white">Shotframe</div>
                                <div className="text-[9px] text-white/40 uppercase tracking-wider">New Product</div>
                            </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed mb-3">
                        Create stunning browser mockups and device frames for your designs instantly.
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-white/80 px-2 py-1 rounded bg-white/10 border border-white/20">
                            Free to Use
                        </span>
                        <span className="text-[10px] text-white/40">→ Try Now</span>
                    </div>
                </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
        </a>
    );
}
