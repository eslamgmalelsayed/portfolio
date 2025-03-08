import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon sizes needed for the PWA manifest
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Generate a simple placeholder icon with initials
function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background color - dark blue to match theme
  ctx.fillStyle = '#011627';
  ctx.fillRect(0, 0, size, size);
  
  // Add a subtle border
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = Math.max(1, size / 100);
  ctx.strokeRect(size * 0.05, size * 0.05, size * 0.9, size * 0.9);
  
  // Add initials
  const fontSize = size * 0.4;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = '#93c5fd';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('EG', size / 2, size / 2);
  
  // Save the icon
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), buffer);
  console.log(`Generated icon-${size}x${size}.png`);
}

// Generate all icon sizes
sizes.forEach(size => generateIcon(size));

console.log('All icons generated successfully!');
