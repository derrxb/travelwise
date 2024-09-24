import fs from 'fs/promises';
import path from 'path';
import { env } from 'process';
import sharp from 'sharp';

// Base directory to process images
const baseDir = env.NODE_ENV === 'production' ? './public/images' : path.resolve('public/images');

// Utility function to delete all LQIP images from the directories
async function deleteLqipImages(folderPath: string) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name);

    if (entry.isDirectory()) {
      // Recursively delete LQIP images from subdirectories
      await deleteLqipImages(entryPath);
    } else if (
      entry.isFile() &&
      (entry.name.includes('lqip-low.webp') ||
        entry.name.includes('lqip-medium.webp') ||
        entry.name.includes('lqip-original.webp'))
    ) {
      // Delete LQIP images
      try {
        await fs.unlink(entryPath);
        console.log(`Deleted LQIP image: ${entryPath}`);
      } catch (error) {
        console.error(`Error deleting ${entryPath}:`, error);
      }
    }
  }
}

// Utility function to create the output folder and rename the original image
async function createOutputFolderForImage(imagePath: string) {
  const imageDir = path.dirname(imagePath);
  const imageNameWithoutExt = path.basename(imagePath, path.extname(imagePath));
  const originalFileExt = path.extname(imagePath);

  // Define the new folder path for this image
  const outputFolder = path.join(imageDir, imageNameWithoutExt);

  // Create the folder if it doesn't already exist
  try {
    await fs.mkdir(outputFolder, { recursive: true });
  } catch (error) {
    console.error(`Error creating folder for ${imageNameWithoutExt}:`, error);
  }

  // Define the new path for the original image renamed to `original.<ext>`
  const newImagePath = path.join(outputFolder, `original${originalFileExt}`);

  // Move the original image to the new folder and rename it to `original.<ext>`
  try {
    await fs.rename(imagePath, newImagePath);
    console.log(`Moved and renamed original image: ${newImagePath}`);
  } catch (error) {
    console.error(`Error moving and renaming ${imagePath}:`, error);
  }

  return outputFolder;
}

// Utility function to create LQIP versions
async function processImage(imagePath: string, outputDir: string) {
  const filename = path.basename(imagePath, path.extname(imagePath)); // image name without extension
  const originalFileExt = path.extname(imagePath); // file extension of original file

  const updatedOutputDir = env.NODE_ENV === 'production' ? outputDir.replace('/public', '') : outputDir;
  const lowLqipPath = path.join(updatedOutputDir, `lqip-low.webp`);
  const mediumLqipPath = path.join(updatedOutputDir, `lqip-medium.webp`);
  const originalWebpPath = path.join(updatedOutputDir, `lqip-original.webp`);

  console.log({ outputDir, updatedOutputDir, lowLqipPath, mediumLqipPath, originalWebpPath });

  try {
    const image = sharp(imagePath);

    // Create the original image as a webp if not exists
    await image.toFormat('webp').toFile(originalWebpPath);

    // Create low LQIP version
    await image.blur(100).toFormat('webp').toFile(lowLqipPath);

    // Create medium LQIP version
    await image.blur(50).toFormat('webp').toFile(mediumLqipPath);

    console.log(`Processed LQIPs for: ${filename}`);
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error);
  }
}

// Process each folder
async function processFolder(folderPath: string) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name);

    // If it's a directory, process the images within it
    if (entry.isDirectory()) {
      const nestedEntries = await fs.readdir(entryPath);

      for (const nestedEntry of nestedEntries) {
        if (nestedEntry.startsWith('original')) {
          const originalImagePath = path.join(entryPath, nestedEntry);
          await processImage(originalImagePath, entryPath);
        }
      }
      continue; // Skip folders since we already processed them
    }

    // If the file is not in a folder and doesn't have 'lqip' in its name, process it
    if (entry.isFile() && !entry.name.includes('lqip')) {
      // Create a folder for the image if it doesn’t have one and rename the original
      const outputDir = await createOutputFolderForImage(entryPath);

      // Process the renamed image to create LQIP versions
      const renamedOriginalImage = path.join(outputDir, `original${path.extname(entryPath)}`);
      await processImage(renamedOriginalImage, outputDir);
    }
  }
}

// Read all folders under public/images and process them
async function readFolders(baseDir: string) {
  try {
    const folders = await fs.readdir(baseDir, { withFileTypes: true });

    for (const folder of folders) {
      if (folder.isDirectory()) {
        const folderPath = path.join(baseDir, folder.name);
        await processFolder(folderPath);
      }
    }

    console.log('Image processing complete.');
  } catch (error) {
    console.error('Error reading folders:', error);
  }
}

async function process() {
  // Cleanup
  await deleteLqipImages(baseDir);
  // Start the script
  await readFolders(baseDir);
}

process();
