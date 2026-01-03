'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
    const scrollToNext = () => {
        window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
            <button
                onClick={scrollToNext}
                className="group flex flex-col items-center gap-2 cursor-pointer"
                aria-label="Scroll to explore"
            >
                <span className="text-white/60 text-sm font-medium group-hover:text-white transition-colors">
                    Explore More
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/30 group-hover:border-white group-hover:bg-white/10 transition-all"
                >
                    <ChevronDown className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </motion.div>
            </button>
        </motion.div>
    );
}
