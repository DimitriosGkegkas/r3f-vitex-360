# Color Space Enhancement Guide

This guide explains how to use the new color space enhancements to make your 360° environment more realistic.

## What's Been Improved

### 1. **WebGL Renderer Configuration**
- **ACES Filmic Tone Mapping**: More realistic color reproduction
- **Physically Correct Lights**: Better light behavior simulation
- **Proper Color Space**: sRGB output for consistent colors across devices
- **Tone Mapping Exposure**: Adjustable exposure for different lighting conditions

### 2. **Post-Processing Effects**
- **Bloom**: Subtle glow effect for bright areas
- **Chromatic Aberration**: Realistic lens distortion effect
- **Tone Mapping**: Advanced color grading and exposure control

### 3. **Environment Quality**
- **Higher Resolution**: Increased from 1024 to 2048 for better detail
- **Environment Intensity**: Adjustable lighting intensity
- **Better Video Handling**: Proper color space for video environments

## Quick Start

### Using Presets

```typescript
import { setColorSpacePreset, getCurrentColorSpacePreset } from './src/utils/colorSpaceUtils';

// Switch to high-quality preset
setColorSpacePreset('high-quality');

// Check current preset
console.log('Current preset:', getCurrentColorSpacePreset());
```

### Available Presets

1. **`default`** - Balanced settings for most displays
2. **`high-quality`** - Enhanced for high-end displays (Display P3 color space)
3. **`performance`** - Optimized for lower-end devices
4. **`cinematic`** - Dramatic effects with enhanced contrast and bloom
5. **`custom`** - Your own configuration

### Custom Configuration

```typescript
import { applyCustomColorSpaceConfig } from './src/utils/colorSpaceUtils';

// Apply custom settings
applyCustomColorSpaceConfig({
  renderer: {
    toneMappingExposure: 1.2, // Brighter exposure
    outputColorSpace: 'display-p3' // Wider color gamut
  },
  postProcessing: {
    bloom: {
      intensity: 0.5 // More dramatic bloom
    },
    colorCorrection: {
      contrast: 1.2, // Higher contrast
      saturation: 1.1 // More vibrant colors
    }
  }
});
```

## Advanced Configuration

### Color Space Options

- **`srgb`** - Standard color space (default)
- **`srgb-linear`** - Linear sRGB for HDR workflows
- **`display-p3`** - Wider color gamut for modern displays
- **`rec2020`** - Ultra-wide color gamut for HDR displays

### Tone Mapping Options

- **`LinearToneMapping`** - No tone mapping (HDR)
- **`ReinhardToneMapping`** - Simple tone mapping
- **`CineonToneMapping`** - Film-like tone mapping
- **`ACESFilmicToneMapping`** - Industry-standard film tone mapping (recommended)

## Performance Considerations

### For High-End Devices
```typescript
setColorSpacePreset('high-quality');
```

### For Mobile/Lower-End Devices
```typescript
setColorSpacePreset('performance');
```

### For Cinematic Effect
```typescript
setColorSpacePreset('cinematic');
```

## Debugging

```typescript
import { logColorSpaceConfig } from './src/utils/colorSpaceUtils';

// Log current configuration
logColorSpaceConfig();
```

## Tips for Best Results

1. **Use HDR Images**: Your cubemap images should be in HDR format for best results
2. **Proper Exposure**: Adjust `toneMappingExposure` based on your environment lighting
3. **Color Space Matching**: Use `display-p3` for modern displays, `srgb` for older displays
4. **Performance**: Lower resolution and fewer post-processing effects for mobile devices
5. **Testing**: Test different presets to find what works best for your specific content

## Example: Dynamic Color Space Switching

```typescript
// In your component
import { setColorSpacePreset, getAvailableColorSpacePresets } from './src/utils/colorSpaceUtils';

const ColorSpaceSelector = () => {
  const presets = getAvailableColorSpacePresets();
  
  return (
    <select onChange={(e) => setColorSpacePreset(e.target.value as any)}>
      {presets.map(preset => (
        <option key={preset} value={preset}>
          {preset}
        </option>
      ))}
    </select>
  );
};
```

## Troubleshooting

### Colors Look Washed Out
- Try increasing `toneMappingExposure`
- Switch to `display-p3` color space
- Increase `contrast` in color correction

### Performance Issues
- Switch to `performance` preset
- Reduce environment resolution
- Disable some post-processing effects

### Colors Look Too Saturated
- Reduce `saturation` in color correction
- Switch to `srgb` color space
- Adjust `environmentIntensity`

The color space enhancements should make your 360° environments look much more realistic and professional!

