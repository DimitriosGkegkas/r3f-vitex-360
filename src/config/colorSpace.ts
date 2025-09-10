/**
 * Color Space Configuration for Enhanced Realism
 * 
 * This file contains all color space and rendering settings that can be adjusted
 * to improve the visual realism of the 360° environment viewer.
 */

export interface ColorSpaceConfig {
  // WebGL Renderer Settings
  renderer: {
    outputColorSpace: 'srgb' | 'srgb-linear' | 'display-p3' | 'rec2020';
    toneMapping: 'LinearToneMapping' | 'ReinhardToneMapping' | 'CineonToneMapping' | 'ACESFilmicToneMapping';
    toneMappingExposure: number;
    physicallyCorrectLights: boolean;
  };
  
  // Post-processing Effects
  postProcessing: {
    bloom: {
      intensity: number;
      luminanceThreshold: number;
      luminanceSmoothing: number;
      mipmapBlur: boolean;
    };
    chromaticAberration: {
      offset: [number, number];
      radialModulation: boolean;
      modulationOffset: number;
    };
  };
  
  // Environment Settings
  environment: {
    resolution: number;
    environmentIntensity: number;
    environmentRotation: [number, number, number];
  };
  
  // Video Environment Settings
  videoEnvironment: {
    colorSpace: 'srgb' | 'srgb-linear' | 'display-p3' | 'rec2020';
    toneMapped: boolean;
    encoding: 'sRGBEncoding' | 'LinearEncoding' | 'RGBEncoding' | 'RGBEEncoding';
  };
}

// Default configuration optimized for realism
export const defaultColorSpaceConfig: ColorSpaceConfig = {
  renderer: {
    outputColorSpace: 'srgb',
    toneMapping: 'ACESFilmicToneMapping',
    toneMappingExposure: 1.0,
    physicallyCorrectLights: true,
  },
  
  postProcessing: {
    bloom: {
      intensity: 0.3,
      luminanceThreshold: 0.9,
      luminanceSmoothing: 0.025,
      mipmapBlur: true,
    },
    chromaticAberration: {
      offset: [0.0005, 0.0012],
      radialModulation: true,
      modulationOffset: 0.15,
    },
  },
  
  environment: {
    resolution: 2048,
    environmentIntensity: 1.0,
    environmentRotation: [0, 0, 0],
  },
  
  videoEnvironment: {
    colorSpace: 'srgb',
    toneMapped: true,
    encoding: 'sRGBEncoding',
  },
};

// High-quality configuration for better displays
export const highQualityColorSpaceConfig: ColorSpaceConfig = {
  ...defaultColorSpaceConfig,
  renderer: {
    ...defaultColorSpaceConfig.renderer,
    outputColorSpace: 'display-p3',
    toneMappingExposure: 1.2,
  },
  environment: {
    ...defaultColorSpaceConfig.environment,
    resolution: 4096,
    environmentIntensity: 1.2,
  },
  postProcessing: {
    ...defaultColorSpaceConfig.postProcessing,
    bloom: {
      ...defaultColorSpaceConfig.postProcessing.bloom,
      intensity: 0.4,
    },
  },
};

// Performance-optimized configuration
export const performanceColorSpaceConfig: ColorSpaceConfig = {
  ...defaultColorSpaceConfig,
  environment: {
    ...defaultColorSpaceConfig.environment,
    resolution: 1024,
  },
  postProcessing: {
    ...defaultColorSpaceConfig.postProcessing,
    bloom: {
      ...defaultColorSpaceConfig.postProcessing.bloom,
      intensity: 0.2,
    },
  },
};

// Cinematic configuration for dramatic effect
export const cinematicColorSpaceConfig: ColorSpaceConfig = {
  ...defaultColorSpaceConfig,
  renderer: {
    ...defaultColorSpaceConfig.renderer,
    toneMappingExposure: 0.8,
  },
  postProcessing: {
    ...defaultColorSpaceConfig.postProcessing,
    bloom: {
      ...defaultColorSpaceConfig.postProcessing.bloom,
      intensity: 0.5,
      luminanceThreshold: 0.8,
    },
    chromaticAberration: {
      offset: [0.001, 0.002],
      radialModulation: true,
      modulationOffset: 0.2,
    },
  },
};

// Export the active configuration (can be changed at runtime)
export let activeColorSpaceConfig: ColorSpaceConfig = defaultColorSpaceConfig;

export const setColorSpaceConfig = (config: ColorSpaceConfig) => {
  activeColorSpaceConfig = config;
};

export const getColorSpaceConfig = (): ColorSpaceConfig => {
  return activeColorSpaceConfig;
};
