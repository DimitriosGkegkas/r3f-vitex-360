import { environments } from '../config';

export interface ImageLoadResult {
  url: string;
  loaded: boolean;
  error?: string;
  loadTime?: number;
}

export interface PreloadProgress {
  total: number;
  loaded: number;
  failed: number;
  percentage: number;
  currentImage?: string;
}

export class ImagePreloader {
  private loadedImages: Map<string, ImageLoadResult> = new Map();
  private onProgress?: (progress: PreloadProgress) => void;
  private onComplete?: (results: ImageLoadResult[]) => void;
  private onError?: (error: string) => void;

  constructor(
    onProgress?: (progress: PreloadProgress) => void,
    onComplete?: (results: ImageLoadResult[]) => void,
    onError?: (error: string) => void
  ) {
    this.onProgress = onProgress;
    this.onComplete = onComplete;
    this.onError = onError;
  }

  /**
   * Get all unique environment image paths that need to be preloaded
   */
  private getAllImagePaths(): string[] {
    const imagePaths: string[] = [];
    
    // Get all unique environment image base paths
    const environmentPaths = new Set<string>();
    Object.values(environments).forEach(env => {
      if (env.environmentImage && !env.environmentImage.endsWith('.mp4')) {
        environmentPaths.add(env.environmentImage);
      }
    });

    // For each environment path, add all 6 cubemap faces
    environmentPaths.forEach(basePath => {
      const faces = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];
      faces.forEach(face => {
        imagePaths.push(`${basePath}/${face}.jpg`);
      });
    });

    console.log('🔍 ImagePreloader: Found', imagePaths.length, 'images to preload');
    console.log('📁 Environment paths:', Array.from(environmentPaths));
    
    return imagePaths;
  }

  /**
   * Load a single image and return a promise
   */
  private loadImage(url: string): Promise<ImageLoadResult> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const img = new Image();
      
      img.onload = () => {
        const loadTime = Date.now() - startTime;
        const result: ImageLoadResult = {
          url,
          loaded: true,
          loadTime
        };
        
        console.log(`✅ Loaded: ${url} (${loadTime}ms)`);
        this.loadedImages.set(url, result);
        resolve(result);
      };
      
      img.onerror = () => {
        const loadTime = Date.now() - startTime;
        const result: ImageLoadResult = {
          url,
          loaded: false,
          error: `Failed to load ${url}`,
          loadTime
        };
        
        console.error(`❌ Failed to load: ${url} (${loadTime}ms)`);
        this.loadedImages.set(url, result);
        resolve(result);
      };
      
      // Set crossOrigin to handle CORS if needed
      img.crossOrigin = 'anonymous';
      img.src = url;
    });
  }

  /**
   * Preload all environment images
   */
  public async preloadAllImages(): Promise<ImageLoadResult[]> {
    console.log('🚀 ImagePreloader: Starting preload process...');
    
    const imagePaths = this.getAllImagePaths();
    const totalImages = imagePaths.length;
    let loadedCount = 0;
    let failedCount = 0;

    // Update progress with initial state
    this.updateProgress(totalImages, 0, 0, '');

    try {
      // Load images in batches to avoid overwhelming the browser
      const batchSize = 6; // Load 6 images at a time (one environment)
      const results: ImageLoadResult[] = [];

      for (let i = 0; i < imagePaths.length; i += batchSize) {
        const batch = imagePaths.slice(i, i + batchSize);
        const batchPromises = batch.map(url => this.loadImage(url));
        
        console.log(`📦 Loading batch ${Math.floor(i / batchSize) + 1}:`, batch);
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Update counts
        batchResults.forEach(result => {
          if (result.loaded) {
            loadedCount++;
          } else {
            failedCount++;
          }
        });

        // Update progress
        this.updateProgress(totalImages, loadedCount, failedCount, batch[0]);
        
        // Small delay between batches to prevent overwhelming
        if (i + batchSize < imagePaths.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      console.log('🎉 ImagePreloader: Preload completed!');
      console.log(`📊 Results: ${loadedCount} loaded, ${failedCount} failed out of ${totalImages} total`);
      
      // Log detailed results for debugging
      this.logDetailedResults(results);
      
      if (this.onComplete) {
        this.onComplete(results);
      }

      return results;
    } catch (error) {
      const errorMessage = `Preload failed: ${error}`;
      console.error('💥 ImagePreloader Error:', errorMessage);
      
      if (this.onError) {
        this.onError(errorMessage);
      }
      
      throw error;
    }
  }

  /**
   * Update progress and call progress callback
   */
  private updateProgress(total: number, loaded: number, failed: number, currentImage: string) {
    const percentage = Math.round((loaded / total) * 100);
    const progress: PreloadProgress = {
      total,
      loaded,
      failed,
      percentage,
      currentImage
    };

    console.log(`📈 Progress: ${loaded}/${total} (${percentage}%) - ${currentImage}`);
    
    if (this.onProgress) {
      this.onProgress(progress);
    }
  }

  /**
   * Log detailed results for debugging
   */
  private logDetailedResults(results: ImageLoadResult[]) {
    console.group('🔍 Detailed Preload Results');
    
    const loaded = results.filter(r => r.loaded);
    const failed = results.filter(r => !r.loaded);
    
    console.log(`✅ Successfully loaded (${loaded.length}):`);
    loaded.forEach(result => {
      console.log(`  - ${result.url} (${result.loadTime}ms)`);
    });
    
    if (failed.length > 0) {
      console.log(`❌ Failed to load (${failed.length}):`);
      failed.forEach(result => {
        console.log(`  - ${result.url}: ${result.error}`);
      });
    }
    
    // Group by environment for easier debugging
    const byEnvironment = new Map<string, ImageLoadResult[]>();
    results.forEach(result => {
      const envPath = result.url.split('/').slice(0, -1).join('/');
      if (!byEnvironment.has(envPath)) {
        byEnvironment.set(envPath, []);
      }
      byEnvironment.get(envPath)!.push(result);
    });
    
    console.log('🏗️ By Environment:');
    byEnvironment.forEach((envResults, envPath) => {
      const envLoaded = envResults.filter(r => r.loaded).length;
      const envTotal = envResults.length;
      console.log(`  ${envPath}: ${envLoaded}/${envTotal} loaded`);
    });
    
    console.groupEnd();
  }

  /**
   * Check if a specific image is already loaded
   */
  public isImageLoaded(url: string): boolean {
    const result = this.loadedImages.get(url);
    return result?.loaded || false;
  }

  /**
   * Get all loaded images
   */
  public getLoadedImages(): ImageLoadResult[] {
    return Array.from(this.loadedImages.values());
  }

  /**
   * Get loading statistics
   */
  public getStats(): { total: number; loaded: number; failed: number; percentage: number } {
    const results = Array.from(this.loadedImages.values());
    const total = results.length;
    const loaded = results.filter(r => r.loaded).length;
    const failed = results.filter(r => !r.loaded).length;
    const percentage = total > 0 ? Math.round((loaded / total) * 100) : 0;

    return { total, loaded, failed, percentage };
  }
}
