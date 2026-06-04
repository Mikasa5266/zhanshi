import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, relative } from 'path';

const INPUT_DIR = 'public/rongyu';
const OUTPUT_DIR = 'public/rongyu-compressed';
const MAX_WIDTH = 800;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getFiles(fullPath));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function compress(filePath) {
  const rel = relative(INPUT_DIR, filePath);
  const outPath = join(OUTPUT_DIR, rel);
  const outDir = join(OUTPUT_DIR, relative(INPUT_DIR, join(filePath, '..')));
  await mkdir(outDir, { recursive: true });

  const ext = extname(filePath).toLowerCase();
  let pipeline = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  await pipeline.toFile(outPath);

  const [orig, compressed] = await Promise.all([stat(filePath), stat(outPath)]);
  const ratio = ((1 - compressed.size / orig.size) * 100).toFixed(1);
  console.log(`${rel}: ${(orig.size/1024).toFixed(0)}KB -> ${(compressed.size/1024).toFixed(0)}KB (-${ratio}%)`);
}

const files = await getFiles(INPUT_DIR);
console.log(`Compressing ${files.length} images...`);
for (const f of files) {
  await compress(f);
}
console.log('Done! Output in:', OUTPUT_DIR);
