const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = 'c:/www/terrafusion/src/assets';

const filesToUpscale = [
  'frame00_entrance.jpg',
  'scene1_entrance_4k.jpg',
  'scene2_path_4k.jpg',
  'scene3_tree_4k.jpg',
  'scene4_waterfall_4k.jpg',
  'scene5_canopy_4k.jpg',
  'bright_sunlit_rainforest_bg.jpg',
  'mossy_rainforest_full_bg.jpg',
  'tropical_rainforest_bg.jpg'
];

async function runUpscale() {
  for (const filename of filesToUpscale) {
    const filepath = path.join(assetsDir, filename);
    if (!fs.existsSync(filepath)) continue;

    console.log(`Processing 4K UHD upscale for ${filename}...`);
    const tempPath = path.join(assetsDir, 'temp_' + filename);

    await sharp(filepath)
      .resize(3840, 2160, {
        kernel: sharp.kernel.lanczos3,
        fit: 'cover',
        position: 'center'
      })
      .sharpen({
        sigma: 1.2,
        m1: 0.4,
        m2: 1.8
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.08
      })
      .jpeg({
        quality: 95,
        chromaSubsampling: '4:4:4'
      })
      .toFile(tempPath);

    fs.unlinkSync(filepath);
    fs.renameSync(tempPath, filepath);
    console.log(`Successfully upscaled ${filename} to 3840x2160 HD clarity!`);
  }
}

runUpscale().catch(console.error);
