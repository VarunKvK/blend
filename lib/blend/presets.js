/**
 * Curated gradient presets organized by theme
 * Each preset includes colors, layout, and metadata
 */

export const GRADIENT_PRESETS = {
    // Sunset & Warm Tones
    sunset: [
        {
            id: 'sunset-vibes',
            name: 'Sunset Vibes',
            colors: ['#FF6B6B', '#FFD93D', '#FF8C42', '#FF6B9D', '#C9184A'],
            layout: 'aurora',
            type: 'mesh'
        },
        {
            id: 'golden-hour',
            name: 'Golden Hour',
            colors: ['#F4A261', '#E76F51', '#E9C46A', '#F77F00', '#D62828'],
            layout: 'diagonal',
            type: 'mesh'
        },
        {
            id: 'fire-glow',
            name: 'Fire Glow',
            colors: ['#1a0a0a', '#8B0000', '#FF4500', '#FF8C00', '#FFD700'],
            layout: 'corner',
            type: 'mesh'
        },
    ],

    // Ocean & Cool Tones
    ocean: [
        {
            id: 'ocean-deep',
            name: 'Ocean Deep',
            colors: ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'],
            layout: 'aurora',
            type: 'mesh'
        },
        {
            id: 'tropical-waters',
            name: 'Tropical Waters',
            colors: ['#06FFA5', '#00D9FF', '#0095FF', '#7B2CBF', '#C77DFF'],
            layout: 'diagonal',
            type: 'mesh'
        },
        {
            id: 'arctic-night',
            name: 'Arctic Night',
            colors: ['#0a0e27', '#164B60', '#1B6B93', '#4D869C', '#7AB2B2'],
            layout: 'orbital',
            type: 'mesh'
        },
    ],

    // Neon & Vibrant
    neon: [
        {
            id: 'neon-dreams',
            name: 'Neon Dreams',
            colors: ['#FF006E', '#8338EC', '#3A86FF', '#FB5607', '#FFBE0B'],
            layout: 'random',
            type: 'mesh'
        },
        {
            id: 'cyber-punk',
            name: 'Cyber Punk',
            colors: ['#0a0a0a', '#FF006E', '#00F5FF', '#FFBE0B', '#FB5607'],
            layout: 'corner',
            type: 'mesh'
        },
        {
            id: 'electric-purple',
            name: 'Electric Purple',
            colors: ['#5B0A91', '#8B2FC9', '#BB5AE2', '#E88BFF', '#FFC4FF'],
            layout: 'aurora',
            type: 'mesh'
        },
    ],

    // Minimal & Pastels
    minimal: [
        {
            id: 'soft-pastels',
            name: 'Soft Pastels',
            colors: ['#FFF8E7', '#FFE5E5', '#E5E5FF', '#E5FFF4', '#FFF0F5'],
            layout: 'diagonal',
            type: 'mesh'
        },
        {
            id: 'monochrome-elegance',
            name: 'Monochrome',
            colors: ['#1a1a1a', '#404040', '#666666', '#999999', '#CCCCCC'],
            layout: 'aurora',
            type: 'mesh'
        },
        {
            id: 'mint-cream',
            name: 'Mint Cream',
            colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A'],
            layout: 'orbital',
            type: 'mesh'
        },
    ],

    // Nature & Earth
    nature: [
        {
            id: 'forest-mist',
            name: 'Forest Mist',
            colors: ['#081C15', '#1B4332', '#2D6A4F', '#52B788', '#95D5B2'],
            layout: 'aurora',
            type: 'mesh'
        },
        {
            id: 'autumn-leaves',
            name: 'Autumn Leaves',
            colors: ['#5F0F40', '#9A031E', '#FB8500', '#FFB703', '#8ECAE6'],
            layout: 'diagonal',
            type: 'mesh'
        },
        {
            id: 'desert-sunset',
            name: 'Desert Sunset',
            colors: ['#2B1B17', '#8B4513', '#D2691E', '#F4A460', '#FFDAB9'],
            layout: 'corner',
            type: 'mesh'
        },
    ],

    // Premium & Sophisticated
    premium: [
        {
            id: 'royal-purple',
            name: 'Royal Purple',
            colors: ['#10002B', '#240046', '#5A189A', '#9D4EDD', '#E0AAFF'],
            layout: 'aurora',
            type: 'mesh'
        },
        {
            id: 'midnight-gold',
            name: 'Midnight Gold',
            colors: ['#0a0a0a', '#1a1a2e', '#16213e', '#C9A227', '#F4E04D'],
            layout: 'corner',
            type: 'mesh'
        },
        {
            id: 'emerald-luxury',
            name: 'Emerald Luxury',
            colors: ['#022B3A', '#1F7A8C', '#2C8C99', '#40E0D0', '#7FFFD4'],
            layout: 'orbital',
            type: 'mesh'
        },
    ],
};

/**
 * Get all presets as a flat array
 */
export const getAllPresets = () => {
    return Object.values(GRADIENT_PRESETS).flat();
};

/**
 * Get presets by category
 */
export const getPresetsByCategory = (category) => {
    return GRADIENT_PRESETS[category] || [];
};

/**
 * Get preset categories with labels
 */
export const PRESET_CATEGORIES = [
    { id: 'sunset', label: 'Sunset & Warm', icon: '🌅' },
    { id: 'ocean', label: 'Ocean & Cool', icon: '🌊' },
    { id: 'neon', label: 'Neon & Vibrant', icon: '⚡' },
    { id: 'minimal', label: 'Minimal & Pastel', icon: '✨' },
    { id: 'nature', label: 'Nature & Earth', icon: '🍃' },
    { id: 'premium', label: 'Premium', icon: '👑' },
];
