'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Upload, Wand2, Download } from 'lucide-react';

export default function QuickDemoModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const demoSteps = [
        {
            title: 'Upload Your Image',
            description: 'Start with any image from your computer or choose from our curated collection',
            icon: Upload,
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            title: 'AI Extracts Colors',
            description: 'Our intelligent system analyzes your image and creates a perfect gradient palette',
            icon: Wand2,
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Customize & Export',
            description: 'Fine-tune your gradient and export as PNG, CSS, or SVG in one click',
            icon: Download,
            gradient: 'from-green-500 to-emerald-500',
        }
    ];

    const currentStepData = demoSteps[currentStep];
    const Icon = currentStepData.icon;

    return (
        <>
            {/* Trigger Button - Made simpler and more clickable */}
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 rounded-full text-white/70 hover:text-white transition-all font-light text-sm"
            >
                <span>See How It Works</span>
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-3xl w-full bg-black rounded-lg border border-white/10 overflow-hidden"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-white/10">
                                <div
                                    className="h-full bg-white transition-all duration-300"
                                    style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                                />
                            </div>

                            <div className="p-12 pt-16">
                                {/* Step Counter */}
                                <div className="flex justify-center mb-12">
                                    <div className="px-4 py-1.5 border border-white/10 rounded-full">
                                        <span className="text-white/60 text-sm font-light">
                                            Step {currentStep + 1} of {demoSteps.length}
                                        </span>
                                    </div>
                                </div>

                                {/* Step Content */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center"
                                    >
                                        {/* Icon */}
                                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${currentStepData.gradient} mb-8`}>
                                            <Icon className="w-10 h-10 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                                            {currentStepData.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto font-light leading-relaxed">
                                            {currentStepData.description}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation */}
                                <div className="flex items-center justify-between mt-12">
                                    <button
                                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                        disabled={currentStep === 0}
                                        className="px-6 py-2 border border-white/20 rounded-full text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white hover:border-white/40 transition-all font-light text-sm"
                                    >
                                        ← Previous
                                    </button>

                                    {currentStep < demoSteps.length - 1 ? (
                                        <button
                                            onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
                                            className="px-6 py-2 bg-white text-black rounded-full font-light hover:bg-white/90 transition-all text-sm"
                                        >
                                            Next →
                                        </button>
                                    ) : (
                                        <Link href="/blend" onClick={() => setIsOpen(false)}>
                                            <button className="px-8 py-2 bg-white text-black rounded-full font-light hover:bg-white/90 transition-all text-sm">
                                                Start Creating →
                                            </button>
                                        </Link>
                                    )}
                                </div>

                                {/* Dots Indicator */}
                                <div className="flex items-center justify-center gap-2 mt-8">
                                    {demoSteps.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentStep(index)}
                                            className={`h-1 rounded-full transition-all ${index === currentStep
                                                    ? 'w-8 bg-white'
                                                    : 'w-1 bg-white/30 hover:bg-white/60'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
