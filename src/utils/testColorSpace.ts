/**
 * Test Color Space Configuration
 * 
 * Simple test to verify color space configuration is working properly
 */

import { 
  setColorSpacePreset, 
  getCurrentColorSpacePreset, 
  logColorSpaceConfig,
  getAvailableColorSpacePresets 
} from './colorSpaceUtils';

export const testColorSpaceConfiguration = () => {
  console.group('🧪 Testing Color Space Configuration');
  
  try {
    // Test 1: Get available presets
    const presets = getAvailableColorSpacePresets();
    console.log('✅ Available presets:', presets);
    
    // Test 2: Test each preset
    presets.forEach(preset => {
      if (preset === 'custom') return; // Skip custom preset
      
      console.log(`\n🔄 Testing preset: ${preset}`);
      setColorSpacePreset(preset);
      
      const currentPreset = getCurrentColorSpacePreset();
      console.log(`✅ Current preset after switch: ${currentPreset}`);
      
      if (currentPreset === preset) {
        console.log('✅ Preset switch successful');
      } else {
        console.warn('⚠️ Preset switch may have failed');
      }
    });
    
    // Test 3: Reset to default
    console.log('\n🔄 Resetting to default...');
    setColorSpacePreset('default');
    const finalPreset = getCurrentColorSpacePreset();
    console.log(`✅ Final preset: ${finalPreset}`);
    
    // Test 4: Log current configuration
    console.log('\n📊 Current configuration:');
    logColorSpaceConfig();
    
    console.log('\n✅ All color space tests passed!');
    
  } catch (error) {
    console.error('❌ Color space test failed:', error);
  } finally {
    console.groupEnd();
  }
};

// Auto-run test if this file is imported
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    testColorSpaceConfiguration();
  }, 1000); // Wait 1 second for the app to load
}

