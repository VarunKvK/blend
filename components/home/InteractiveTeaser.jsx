'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function InteractiveTeaser() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const gradients = [
        {
            id: 1,
            from: '#667eea',
            via: '#764ba2',
            to: '#f093fb',
            name: 'Purple Dream'
        },
        {
            id: 2,
            from: '#f093fb',
            via: '#f5576c',
            to: '#ffd140',
            name: 'Sunset Bliss'
        },
        {
            id: 3,
            from: '#4facfe',
            via: '#00f2fe',
            to: '#43e97b',
            name: 'Ocean Breeze'
        },
        {
            id: 4,
            from: '#fa709a',
            via: '#fee140',
            to: '#30cfd0',
            name: 'Rainbow Wave'
        }
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % gradients.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, gradients.length]);

    const current = gradients[currentIndex];

    const handleGradientClick = () => {
        router.push('/blend');
    };

    const handleSelectorClick = (index, e) => {
        e.stopPropagation();
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    return (
        <section className="relative border-b border-white/10 bg-black">
            <div className="max-w-7xl mx-auto px-6 py-32">
                {/* Section Header */}
                <div className="mb-16">
                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Instant<span className="italic font-light"> Gradients</span>
                    </h3>
                    <p className="text-white/60 text-lg max-w-2xl font-light">
                        Choose from beautiful presets or create your own in seconds
                    </p>
                </div>

                {/* Gradient Preview Card */}
                <div
                    onClick={handleGradientClick}
                    className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-white/10 bg-black transition-all duration-300 hover:border-white/30 cursor-pointer group"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Animated Gradient Background */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(135deg, ${current.from} 0%, ${current.via} 50%, ${current.to} 100%)`
                            }}
                        />
                    </AnimatePresence>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center pointer-events-none">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                            <div className="text-xl font-light mb-2">Click to create your own →</div>
                        </div>
                    </div>

                    {/* Gradient Name Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded pointer-events-none">
                        <p className="text-white/90 text-sm font-light">{current.name}</p>
                    </div>
                </div>

                {/* Selector Buttons */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    {gradients.map((gradient, index) => (
                        <button
                            key={gradient.id}
                            onClick={(e) => handleSelectorClick(index, e)}
                            onMouseEnter={() => {
                                setCurrentIndex(index);
                                setIsAutoPlaying(false);
                            }}
                            className={`w-12 h-12 rounded transition-all duration-300 ${currentIndex === index
                                    ? 'border-2 border-white scale-110'
                                    : 'border border-white/20 hover:border-white/60 scale-100'
                                }`}
                            style={{
                                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.via}, ${gradient.to})`
                            }}
                            aria-label={gradient.name}
                        />
                    ))}
                </div>

                {/* Subtle hint */}
                <p className="text-center text-white/40 text-sm mt-6 font-light">
                    Click to start creating
                </p>
            </div>
        </section>
    );
}
