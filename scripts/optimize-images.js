import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/artworks');
const OUTPUT_DIR = path.join(__dirname, '../public/artworks-optimized');

// Configuration
const MAX_WIDTH = 2000; // Max width in pixels
const QUALITY = 85; // WebP quality (0-100)

async function optimizeImage(inputPath, outputPath) {
    try {
        const stats = fs.statSync(inputPath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`Processing: ${path.basename(inputPath)} (${sizeMB} MB)`);

        await sharp(inputPath)
            .resize(MAX_WIDTH, null, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: QUALITY })
            .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
        const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

        console.log(`✓ Saved: ${path.basename(outputPath)} (${newSizeMB} MB) - ${savings}% smaller\n`);
    } catch (error) {
        console.error(`✗ Error processing ${inputPath}:`, error.message);
    }
}

async function processDirectory(inputDir, outputDir) {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const items = fs.readdirSync(inputDir);

    for (const item of items) {
        const inputPath = path.join(inputDir, item);
        const stat = fs.statSync(inputPath);

        if (stat.isDirectory()) {
            // Recursively process subdirectories
            const newOutputDir = path.join(outputDir, item);
            await processDirectory(inputPath, newOutputDir);
        } else if (item.match(/\.(png|jpg|jpeg)$/i)) {
            // Process image files
            const outputFileName = item.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            const outputPath = path.join(outputDir, outputFileName);
            await optimizeImage(inputPath, outputPath);
        }
    }
}

async function main() {
    console.log('🎨 Starting image optimization...\n');
    console.log(`Input: ${INPUT_DIR}`);
    console.log(`Output: ${OUTPUT_DIR}`);
    console.log(`Max Width: ${MAX_WIDTH}px`);
    console.log(`Quality: ${QUALITY}%\n`);
    console.log('─'.repeat(60) + '\n');

    const startTime = Date.now();
    await processDirectory(INPUT_DIR, OUTPUT_DIR);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('─'.repeat(60));
    console.log(`\n✅ Optimization complete in ${duration}s!`);
    console.log(`\n📁 Optimized images saved to: ${OUTPUT_DIR}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Review the optimized images');
    console.log('   2. Replace "artworks" with "artworks-optimized" in your code');
    console.log('   3. Delete the old "artworks" folder');
    console.log('   4. Rename "artworks-optimized" to "artworks"\n');
}

main().catch(console.error);
