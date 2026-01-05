/**
 * Utilities for encoding/decoding gradient configurations to/from URL parameters
 * Enables shareable gradient links
 */

import { LAYOUTS } from './constants';

/**
 * Encode gradient configuration to a compressed URL parameter string
 */
export const encodeGradientToUrl = (gradientConfig) => {
    try {
        // Create a minimal object with only essential data
        const data = {
            t: gradientConfig.type,                    // type: 'mesh', 'linear', 'radial'
            a: gradientConfig.angle,                   // angle (for linear gradients)
            c: gradientConfig.colors,                  // colors array
            l: gradientConfig.layout,                  // layout name
            n: gradientConfig.noise                    // noise intensity
        };

        // Convert to JSON and then to base64
        const json = JSON.stringify(data);
        const base64 = btoa(json);

        // Make it URL-safe by replacing characters
        const urlSafe = base64
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');

        return urlSafe;
    } catch (error) {
        console.error('Error encoding gradient:', error);
        return null;
    }
};

/**
 * Decode URL parameter string back to gradient configuration
 */
export const decodeGradientFromUrl = (urlParam) => {
    try {
        // Reverse URL-safe encoding
        let base64 = urlParam
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        // Add padding if needed
        while (base64.length % 4) {
            base64 += '=';
        }

        // Decode from base64 to JSON
        const json = atob(base64);
        const data = JSON.parse(json);

        // Reconstruct full gradient config
        const gradientConfig = {
            type: data.t || 'mesh',
            angle: data.a || 135,
            colors: data.c || [],
            layout: data.l || 'aurora',
            noise: data.n || 0.05,
            // Regenerate mesh points based on layout
            meshPoints: LAYOUTS[data.l]?.getPoints(data.c.length) || []
        };

        return gradientConfig;
    } catch (error) {
        console.error('Error decoding gradient:', error);
        return null;
    }
};

/**
 * Generate a shareable URL for the current gradient
 */
export const generateShareUrl = (gradientConfig, baseUrl) => {
    const encoded = encodeGradientToUrl(gradientConfig);
    if (!encoded) return null;

    const url = new URL('/blend', baseUrl);
    url.searchParams.set('g', encoded);
    return url.toString();
};

/**
 * Parse URL parameters and extract gradient config if present
 */
export const getGradientFromUrl = () => {
    if (typeof window === 'undefined') return null;

    const params = new URLSearchParams(window.location.search);
    const gradientParam = params.get('g');

    if (!gradientParam) return null;

    return decodeGradientFromUrl(gradientParam);
};

/**
 * Generate social sharing URLs
 */
export const generateSocialShareUrls = (shareUrl, gradientName = 'gradient') => {
    const text = `Check out this beautiful gradient I created with Blend! 🎨`;
    const hashtags = 'Blend,Gradient,Design';

    return {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}`,
        email: `mailto:?subject=${encodeURIComponent('Check out this gradient!')}&body=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`
    };
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            return successful;
        }
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
};
