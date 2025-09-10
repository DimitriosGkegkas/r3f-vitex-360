/**
 * Color Space Utilities
 * 
 * Utility functions for managing color space configurations
 * and providing easy preset switching.
 */

import { 
  setColorSpaceConfig, 
  getColorSpaceConfig,
  defaultColorSpaceConfig,
  highQualityColorSpaceConfig,
  performanceColorSpaceConfig,
  cinematicColorSpaceConfig,
  ColorSpaceConfig
} from '../config/colorSpace';

export type ColorSpacePreset = 'default' | 'high-quality' | 'performance' | 'cinematic' | 'custom';

export const colorSpacePresets: Record<ColorSpacePreset, ColorSpaceConfig> = {
  'default': defaultColorSpaceConfig,
  'high-quality': highQualityColorSpaceConfig,
  'performance': performanceColorSpaceConfig,
  'cinematic': cinematicColorSpaceConfig,
  'custom': getColorSpaceConfig(), // Current custom config
};

/**
 * Switch to a predefined color space preset
 */
export const setColorSpacePreset = (preset: ColorSpacePreset): void => {
  if (preset === 'custom') {
    // Don't change anything for custom preset
    return;
  }
  
  const config = colorSpacePresets[preset];
  setColorSpaceConfig(config);
  
  console.log(`🎨 Color space preset changed to: ${preset}`);
};

/**
 * Get the current color space preset name
 */
export const getCurrentColorSpacePreset = (): ColorSpacePreset => {
  const currentConfig = getColorSpaceConfig();
  
  // Check which preset matches the current config
  for (const [presetName, presetConfig] of Object.entries(colorSpacePresets)) {
    if (presetName === 'custom') continue;
    
    if (JSON.stringify(presetConfig) === JSON.stringify(currentConfig)) {
      return presetName as ColorSpacePreset;
    }
  }
  
  return 'custom';
};

/**
 * Apply custom color space configuration
 */
export const applyCustomColorSpaceConfig = (config: Partial<ColorSpaceConfig>): void => {
  const currentConfig = getColorSpaceConfig();
  const newConfig = { ...currentConfig, ...config };
  setColorSpaceConfig(newConfig);
  
  console.log('🎨 Custom color space configuration applied');
};

/**
 * Reset to default color space configuration
 */
export const resetColorSpaceConfig = (): void => {
  setColorSpaceConfig(defaultColorSpaceConfig);
  console.log('🎨 Color space configuration reset to default');
};

/**
 * Get available color space presets
 */
export const getAvailableColorSpacePresets = (): ColorSpacePreset[] => {
  return Object.keys(colorSpacePresets) as ColorSpacePreset[];
};

/**
 * Get color space preset description
 */
export const getColorSpacePresetDescription = (preset: ColorSpacePreset): string => {
  const descriptions: Record<ColorSpacePreset, string> = {
    'default': 'Balanced settings optimized for most displays and performance',
    'high-quality': 'Enhanced settings for high-end displays with better color accuracy',
    'performance': 'Optimized settings for better performance on lower-end devices',
    'cinematic': 'Dramatic settings with enhanced contrast and bloom effects',
    'custom': 'User-defined custom configuration'
  };
  
  return descriptions[preset];
};

/**
 * Log current color space configuration
 */
export const logColorSpaceConfig = (): void => {
  const config = getColorSpaceConfig();
  const preset = getCurrentColorSpacePreset();
  
  console.group('🎨 Current Color Space Configuration');
  console.log(`Preset: ${preset}`);
  console.log('Renderer:', config.renderer);
  console.log('Environment:', config.environment);
  console.log('Video Environment:', config.videoEnvironment);
  console.log('Post-processing:', config.postProcessing);
  console.groupEnd();
};

