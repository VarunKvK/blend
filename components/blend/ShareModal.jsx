'use client';

import React, { useState, useEffect } from 'react';
import { X, Link2, Check, Twitter, Linkedin, Facebook, Mail, MessageCircle } from 'lucide-react';
import { generateShareUrl, generateSocialShareUrls, copyToClipboard } from '@/lib/blend/shareUtils';

export default function ShareModal({ isOpen, onClose, gradientConfig }) {
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [socialUrls, setSocialUrls] = useState(null);

    useEffect(() => {
        if (isOpen && gradientConfig) {
            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const url = generateShareUrl(gradientConfig, baseUrl);

            if (url) {
                setShareUrl(url);
                setSocialUrls(generateSocialShareUrls(url));
            }
        }
    }, [isOpen, gradientConfig]);

    const handleCopyLink = async () => {
        const success = await copyToClipboard(shareUrl);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSocialShare = (platform, url) => {
        window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
    };

    if (!isOpen) return null;

    const socialPlatforms = [
        { name: 'Twitter', icon: Twitter, key: 'twitter', color: 'hover:bg-[#1DA1F2]' },
        { name: 'LinkedIn', icon: Linkedin, key: 'linkedin', color: 'hover:bg-[#0A66C2]' },
        { name: 'Facebook', icon: Facebook, key: 'facebook', color: 'hover:bg-[#1877F2]' },
        { name: 'Reddit', icon: MessageCircle, key: 'reddit', color: 'hover:bg-[#FF4500]' },
        { name: 'Email', icon: Mail, key: 'email', color: 'hover:bg-zinc-600' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-lg w-full p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Link2 className="w-5 h-5 text-white" />
                        <h2 className="text-xl font-bold text-white">Share Gradient</h2>
                    </div>
                    <p className="text-zinc-500 text-sm">
                        Share your beautiful creation with the world
                    </p>
                </div>

                {/* Shareable Link */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        Shareable Link
                    </label>
                    <div className="flex gap-2">
                        <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-400 font-mono overflow-x-auto scrollbar-hide">
                            {shareUrl || 'Generating link...'}
                        </div>
                        <button
                            onClick={handleCopyLink}
                            disabled={!shareUrl}
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${copied
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-black hover:bg-zinc-200'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Link2 className="w-4 h-4" />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Social Sharing */}
                <div className="mb-4">
                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                        Share On
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                        {socialPlatforms.map((platform) => {
                            const Icon = platform.icon;
                            return (
                                <button
                                    key={platform.key}
                                    onClick={() => handleSocialShare(platform.name, socialUrls?.[platform.key])}
                                    disabled={!socialUrls}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800 transition-all ${platform.color} hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed group`}
                                    title={`Share on ${platform.name}`}
                                >
                                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                                    <span className="text-[10px] text-zinc-500 group-hover:text-white transition-colors">
                                        {platform.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Info */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        💡 <span className="text-zinc-400">Anyone with this link can view and use your gradient configuration.</span> The link encodes all colors, layout, and settings.
                    </p>
                </div>
            </div>
        </div>
    );
}
