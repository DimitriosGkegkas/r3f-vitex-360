# Image Preloading System

This document describes the comprehensive image preloading system implemented to ensure smooth transitions between 360° environments without fade-in/fade-out issues.

## Overview

The loading system preloads all cubemap images from all environments during the initial loading screen, providing a seamless user experience when navigating between different floors and steps.

## Components

### 1. ImagePreloader (`src/utils/imagePreloader.ts`)

A utility class that handles the preloading of all environment images.

**Features:**
- Automatically discovers all environment image paths from the configuration
- Loads images in batches to prevent browser overload
- Provides detailed progress tracking and debugging
- Handles errors gracefully
- Supports CORS with `crossOrigin: 'anonymous'`

**Key Methods:**
- `preloadAllImages()`: Main method to preload all images
- `isImageLoaded(url)`: Check if a specific image is loaded
- `getStats()`: Get loading statistics

### 2. ProgressBar (`src/components/ProgressBar/`)

A visual progress indicator component that shows loading progress.

**Features:**
- Real-time progress percentage
- Current loading item display
- Success/failure counts
- Responsive design
- Greek language support

### 3. Enhanced LoadingPage (`src/components/LoadingPage/`)

Updated loading page that integrates the preloader and progress bar.

**Features:**
- Shows progress bar during preloading
- Displays welcome card after preloading completes
- Handles preload errors gracefully
- Maintains existing dissolve animation

## How It Works

### 1. Initialization
When the app starts, the `LoadingPage` component:
1. Creates an `ImagePreloader` instance
2. Starts preloading all environment images
3. Shows progress bar with real-time updates

### 2. Image Discovery
The preloader automatically discovers all images by:
1. Reading all environments from the configuration
2. Extracting unique environment image paths
3. Generating all 6 cubemap face URLs for each environment
4. Excluding video environments (`.mp4` files)

### 3. Batch Loading
Images are loaded in batches of 6 (one complete environment) to:
- Prevent browser overload
- Provide smooth progress updates
- Allow for better error handling

### 4. Progress Tracking
The system provides detailed progress information:
- Total number of images to load
- Number of successfully loaded images
- Number of failed images
- Current loading item
- Percentage complete

### 5. Error Handling
If some images fail to load:
- The error is logged for debugging
- The app continues with available images
- User is informed about the issue
- The experience remains functional

## Debugging Features

### Console Logging
The system provides comprehensive console logging:
- `🔍 ImagePreloader: Found X images to preload`
- `📦 Loading batch X: [image URLs]`
- `✅ Loaded: [URL] (Xms)`
- `❌ Failed to load: [URL] (Xms)`
- `📈 Progress: X/Y (Z%) - [current item]`
- `🎉 ImagePreloader: Preload completed!`

### Detailed Results
After preloading completes, detailed results are logged:
- Successfully loaded images with load times
- Failed images with error messages
- Statistics grouped by environment
- Overall success rate

### Test Utility
A test utility (`src/utils/testPreloader.ts`) is available to:
- Verify image path discovery
- Check environment coverage
- Validate configuration consistency

## Configuration

The system automatically works with the existing environment configuration in `src/config/environments.ts`. No additional configuration is required.

## Performance Considerations

### Batch Loading
- Images are loaded in batches of 6 (one environment)
- 100ms delay between batches to prevent overload
- Parallel loading within each batch

### Memory Management
- Images are cached by the browser
- No additional memory overhead
- Automatic cleanup when not needed

### Network Optimization
- Images are loaded with `crossOrigin: 'anonymous'`
- Proper error handling for network issues
- Graceful degradation on failures

## Usage

The loading system is automatically integrated into the app flow:

1. **App Start**: LoadingPage shows with progress bar
2. **Preloading**: All environment images are loaded
3. **Completion**: Welcome card appears
4. **Start**: User can begin the experience
5. **Navigation**: Smooth transitions between environments

## Troubleshooting

### Common Issues

1. **Images not loading**: Check console for CORS errors
2. **Slow loading**: Verify image file sizes and network speed
3. **Missing environments**: Check environment configuration

### Debug Commands

In the browser console:
```javascript
// Test the preloader
window.testImagePreloader();

// Check if specific image is loaded
// (This would require exposing the preloader instance)
```

### Console Monitoring

Monitor the console during loading to see:
- Progress updates
- Loading times
- Error messages
- Final statistics

## Future Enhancements

Potential improvements:
- Image compression optimization
- Progressive loading (load critical images first)
- Preload priority system
- Image format detection and optimization
- Network speed adaptation
