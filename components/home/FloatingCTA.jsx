'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setIsVisible(scrollPercentage > 30);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 right-8 z-40"
                >
                    <Link href="/blend">
                        <button className="px-6 py-3 bg-white text-black rounded-full font-light hover:bg-white/90 transition-all shadow-2xl shadow-black/50 text-sm">
                            <span className="hidden sm:inline">Try Blend Free</span>
                            <span className="sm:hidden">Try Now</span>
                        </button>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
