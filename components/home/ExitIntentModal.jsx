'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function ExitIntentModal() {
    const [showModal, setShowModal] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('blend-exit-intent-shown');
        if (hasSeenModal) return;

        const handleMouseLeave = (e) => {
            if (e.clientY <= 0 && !hasShown) {
                setShowModal(true);
                setHasShown(true);
                localStorage.setItem('blend-exit-intent-shown', 'true');
            }
        };

        const timer = setTimeout(() => {
            document.addEventListener('mouseleave', handleMouseLeave);
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hasShown]);

    return (
        <AnimatePresence>
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-2xl w-full bg-black rounded-lg border border-white/10 overflow-hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Content */}
                        <div className="p-12 text-center">
                            {/* Headline */}
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                                Before You <span className="italic font-light">Leave</span>
                            </h2>

                            {/* Subheadline */}
                            <p className="text-xl text-white/60 mb-10 max-w-lg mx-auto font-light leading-relaxed">
                                You're one click away from creating stunning gradients. Try it now—it's free and takes only seconds.
                            </p>

                            {/* Feature List */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-left">
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full bg-white/60 mt-2" />
                                    <span className="text-white/70 font-light">No signup required</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full bg-white/60 mt-2" />
                                    <span className="text-white/70 font-light">Export instantly</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full bg-white/60 mt-2" />
                                    <span className="text-white/70 font-light">Free forever</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/blend" className="w-full sm:w-auto">
                                    <button className="w-full sm:w-auto bg-white text-black px-10 py-3 rounded-full font-light hover:bg-white/90 transition-all">
                                        Start Creating Free →
                                    </button>
                                </Link>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full sm:w-auto text-white/60 hover:text-white transition-colors font-light"
                                >
                                    Maybe later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
