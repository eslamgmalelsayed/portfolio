const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Icon sizes needed for the PWA manifest
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Path to the SVG placeholder
const svgPath = path.join(__dirname, '../public/icons/placeholder.svg');
const svgBuffer = fs.readFileSync(svgPath);

// Generate all icon sizes
async function generateIcons() {
  for (const size of sizes) {
    const outputPath = path.join(__dirname, `../public/icons/icon-${size}x${size}.png`);
    
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
      
    console.log(`Generated icon-${size}x${size}.png`);
  }
  
  console.log('All icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
