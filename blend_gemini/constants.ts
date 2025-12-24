import { PresetDimension, Point, LayoutId } from './types';

export const DIMENSION_PRESETS: PresetDimension[] = [
  { name: 'desktop', label: 'Desktop (16:9)', width: 1920, height: 1080 },
  { name: 'twitter', label: 'Twitter Header', width: 1500, height: 500 },
  { name: 'linkedin', label: 'LinkedIn Post', width: 1200, height: 627 },
  { name: 'instagram_sq', label: 'Instagram Square', width: 1080, height: 1080 },
  { name: 'instagram_story', label: 'Instagram Story', width: 1080, height: 1920 },
];

export const DEFAULT_GRADIENT_COLORS = ['#1d0b30', '#4F46E5', '#9333EA', '#DB2777', '#F472B6'];

export const MAX_DAILY_EXPORTS = 3;

export const LAYOUTS: Record<LayoutId, { label: string, getPoints: (count: number) => Point[] }> = {
  random: {
    label: 'Random',
    getPoints: (count) => Array.from({ length: count }).map(() => ({
      x: Math.round(Math.random() * 80) + 10,
      y: Math.round(Math.random() * 80) + 10
    }))
  },
  aurora: {
    label: 'Aurora',
    getPoints: (count) => Array.from({ length: count }).map((_, i) => ({
      x: 10 + (i / (count - 1)) * 80,
      y: 50 + Math.sin(i * 1.5) * 20
    }))
  },
  orbital: {
    label: 'Orbital',
    getPoints: (count) => {
        // Center the first one (background/core), circle the rest
        return Array.from({ length: count }).map((_, i) => {
            if (i === 0) return { x: 50, y: 50 };
            const angle = ((i - 1) / (count - 1)) * Math.PI * 2;
            return {
                x: 50 + Math.cos(angle) * 30,
                y: 50 + Math.sin(angle) * 30
            };
        });
    }
  },
  diagonal: {
    label: 'Flow',
    getPoints: (count) => Array.from({ length: count }).map((_, i) => ({
      x: 10 + (i / (count - 1)) * 80,
      y: 10 + (i / (count - 1)) * 80
    }))
  },
  corner: {
    label: 'Corner Glow',
    getPoints: (count) => Array.from({ length: count }).map((_, i) => {
        // Ping pong between corners
        const corner = i % 2; 
        return {
            x: corner === 0 ? 10 + Math.random() * 20 : 70 + Math.random() * 20,
            y: corner === 0 ? 80 - Math.random() * 20 : 20 + Math.random() * 20
        };
    })
  }
};