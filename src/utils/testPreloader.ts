// Test script to verify image preloader functionality
import { ImagePreloader } from './imagePreloader';
import { environments } from '../config';

export const testImagePreloader = () => {
  console.log('🧪 Testing ImagePreloader...');
  
  // Test getting all image paths
  const preloader = new ImagePreloader();
  
  // Access private method for testing (we'll need to make it public or create a test method)
  const imagePaths = (preloader as any).getAllImagePaths();
  
  console.log('📁 Found image paths:', imagePaths);
  console.log('📊 Total images to load:', imagePaths.length);
  
  // Group by environment for verification
  const byEnvironment = new Map<string, string[]>();
  imagePaths.forEach((path: string) => {
    const envPath = path.split('/').slice(0, -1).join('/');
    if (!byEnvironment.has(envPath)) {
      byEnvironment.set(envPath, []);
    }
    byEnvironment.get(envPath)!.push(path);
  });
  
  console.log('🏗️ Images by environment:');
  byEnvironment.forEach((paths, envPath) => {
    console.log(`  ${envPath}: ${paths.length} images`);
    console.log(`    - ${paths.join(', ')}`);
  });
  
  // Verify against environments config
  const expectedEnvironments = Object.values(environments)
    .filter(env => env.environmentImage && !env.environmentImage.endsWith('.mp4'))
    .map(env => env.environmentImage);
  
  console.log('✅ Expected environments:', expectedEnvironments);
  
  // Check if all expected environments are covered
  const coveredEnvironments = Array.from(byEnvironment.keys());
  const missingEnvironments = expectedEnvironments.filter(env => !coveredEnvironments.includes(env));
  
  if (missingEnvironments.length > 0) {
    console.warn('⚠️ Missing environments:', missingEnvironments);
  } else {
    console.log('✅ All environments covered!');
  }
  
  return {
    totalImages: imagePaths.length,
    environments: coveredEnvironments,
    missingEnvironments
  };
};

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  console.log('🌐 Running in browser environment');
  (window as any).testImagePreloader = testImagePreloader;
} else {
  // Node environment
  testImagePreloader();
}
