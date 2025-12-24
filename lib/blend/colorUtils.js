// Convert RGB object to Hex string
export const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const boostSaturation = (r, g, b, boost = 1.3) => {
    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60); if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = Math.min(1, s * boost);
    let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2, newR = 0, newG = 0, newB = 0;
    if (0 <= h && h < 60) { newR = c; newG = x; newB = 0; }
    else if (60 <= h && h < 120) { newR = x; newG = c; newB = 0; }
    else if (120 <= h && h < 180) { newR = 0; newG = c; newB = x; }
    else if (180 <= h && h < 240) { newR = 0; newG = x; newB = c; }
    else if (240 <= h && h < 300) { newR = x; newG = 0; newB = c; }
    else if (300 <= h && h < 360) { newR = c; newG = 0; newB = x; }
    return { r: Math.round((newR + m) * 255), g: Math.round((newG + m) * 255), b: Math.round((newB + m) * 255) };
};

const colorDistance = (c1, c2) => Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2));

export const extractColorsFromImage = (imageSrc, colorCount = 6) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) { reject('Could not get canvas context'); return; }
            const MAX_SIZE = 200;
            let width = img.width, height = img.height;
            if (width > height) { if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; } }
            else { if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; } }
            canvas.width = width; canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data, pixelCount = width * height, colors = [];
            for (let i = 0; i < pixelCount; i += 10) {
                const offset = i * 4, r = data[offset], g = data[offset + 1], b = data[offset + 2], a = data[offset + 3];
                if (a < 128 || (r > 250 && g > 250 && b > 250) || (r < 10 && g < 10 && b < 10)) continue;
                colors.push({ r, g, b });
            }
            const buckets = [], threshold = 40;
            colors.forEach(c => {
                let found = false;
                for (const bucket of buckets) {
                    if (colorDistance(c, bucket.color) < threshold) {
                        bucket.color.r = (bucket.color.r + c.r) / 2;
                        bucket.color.g = (bucket.color.g + c.g) / 2;
                        bucket.color.b = (bucket.color.b + c.b) / 2;
                        bucket.count++; found = true; break;
                    }
                }
                if (!found) buckets.push({ color: c, count: 1 });
            });
            buckets.sort((a, b) => b.count - a.count);
            const palette = buckets.slice(0, colorCount).map(b => {
                const boosted = boostSaturation(Math.round(b.color.r), Math.round(b.color.g), Math.round(b.color.b), 1.4);
                return rgbToHex(boosted.r, boosted.g, boosted.b);
            });
            while (palette.length < colorCount) palette.push(palette[0] || '#000000');
            resolve(palette);
        };
        img.onerror = (e) => reject(e);
    });
};

export const generateCssGradient = (config) => {
    const { type, angle, colors, meshPoints } = config;
    if (type === 'mesh' && meshPoints && meshPoints.length > 0) {
        const bg = colors[0];
        const layers = colors.map((color, i) => {
            const pt = meshPoints[i] || { x: 50, y: 50 };
            return `radial-gradient(at ${pt.x}% ${pt.y}%, ${color} 0px, transparent 65%)`;
        }).join(', ');
        return `${layers}, ${bg}`;
    }
    const stops = colors.map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * 100)}%`).join(', ');
    if (type === 'linear') return `linear-gradient(${angle}deg, ${stops})`;
    else return `radial-gradient(circle at center, ${stops})`;
};

export const generateSvgContent = (config, width, height) => {
    const { type, angle, colors, meshPoints, noise } = config;
    let defs = '', content = '';
    if (noise > 0) defs += `<filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter>`;
    const noiseRect = noise > 0 ? `<rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="${noise}" style="mix-blend-mode: overlay"/>` : '';
    if (type === 'mesh' && meshPoints) {
        content += `<rect width="100%" height="100%" fill="${colors[0]}"/>`;
        defs += `<filter id="liquidBlur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="100" result="blur" /><feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /><feBlend in="SourceGraphic" in2="goo" /></filter>`;
        let circles = '';
        colors.forEach((color, i) => {
            const pt = meshPoints[i] || { x: 50, y: 50 };
            const cx = (pt.x / 100) * width, cy = (pt.y / 100) * height, r = Math.min(width, height) * 0.5;
            circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.8" />`;
        });
        content += `<g filter="url(#liquidBlur)" style="mix-blend-mode: screen">${circles}</g>${noiseRect}`;
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs>${defs}</defs>${content}</svg>`.trim();
    }
    const stops = colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" stop-color="${color}"/>`).join('');
    if (type === 'linear') {
        const radians = (angle * Math.PI) / 180;
        const x2 = Math.round(50 + 50 * Math.cos(radians)) + '%', y2 = Math.round(50 + 50 * Math.sin(radians)) + '%';
        defs = `<linearGradient id="grad" x1="0%" y1="0%" x2="${x2}" y2="${y2}">${stops}</linearGradient>`;
    } else defs = `<radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">${stops}</radialGradient>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs>${defs}</defs><rect width="100%" height="100%" fill="url(#grad)"/>${noiseRect}</svg>`.trim();
};
