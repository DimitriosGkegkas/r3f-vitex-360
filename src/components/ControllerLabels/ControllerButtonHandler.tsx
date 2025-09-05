import { useXRInputSourceState } from '@react-three/xr'
import { useEffect, useCallback } from 'react'

// Button event handler for XR controllers
export const useControllerButtonEvents = (
  handedness: 'left' | 'right' = 'right',
  onButtonPress?: (buttonIndex: number, buttonName: string) => void,
  onButtonRelease?: (buttonIndex: number, buttonName: string) => void
) => {
  const state = useXRInputSourceState('controller', handedness)

  const handleButtonEvents = useCallback(() => {
    if (!state?.inputSource?.gamepad?.buttons) return

    const buttons = state.inputSource.gamepad.buttons
    
    // Check each button for press/release events
    buttons.forEach((button, index) => {
      if (button.pressed && !button.touched) {
        // Button was just pressed
        const buttonName = getButtonName(index, handedness)
        onButtonPress?.(index, buttonName)
      } else if (!button.pressed && button.touched) {
        // Button was just released
        const buttonName = getButtonName(index, handedness)
        onButtonRelease?.(index, buttonName)
      }
    })
  }, [state?.inputSource?.gamepad?.buttons, handedness, onButtonPress, onButtonRelease])

  useEffect(() => {
    const interval = setInterval(handleButtonEvents, 16) // ~60fps
    return () => clearInterval(interval)
  }, [handleButtonEvents])

  return {
    inputSource: state?.inputSource,
    gamepad: state?.inputSource?.gamepad,
    isConnected: !!state?.inputSource?.gamepad
  }
}

// Helper function to get button names based on index and handedness
const getButtonName = (index: number, handedness: 'left' | 'right'): string => {
  const buttonNames = {
    left: {
      0: 'Trigger',
      1: 'Grip', 
      2: 'Thumbstick',
      3: 'Menu',
      4: 'X',
      5: 'Y'
    },
    right: {
      0: 'Trigger',
      1: 'Grip',
      2: 'Thumbstick', 
      3: 'Menu',
      4: 'A',
      5: 'B'
    }
  }

  return buttonNames[handedness][index] || `Button ${index}`
}

// Controller type detection
export const detectControllerType = (gamepad: Gamepad | null): string => {
  if (!gamepad) return 'unknown'

  const { id, buttons, axes } = gamepad
  
  // Detect based on controller ID
  if (id.toLowerCase().includes('oculus') || id.toLowerCase().includes('quest')) {
    return 'oculus'
  }
  if (id.toLowerCase().includes('vive') || id.toLowerCase().includes('htc')) {
    return 'vive'
  }
  if (id.toLowerCase().includes('index') || id.toLowerCase().includes('knuckles')) {
    return 'index'
  }
  if (id.toLowerCase().includes('pico')) {
    return 'pico'
  }
  
  // Detect based on button/axis count
  if (buttons.length === 6 && axes.length === 2) {
    return 'standard-6button'
  }
  if (buttons.length === 4 && axes.length === 2) {
    return 'simple-4button'
  }
  
  return 'generic'
}

// Button mapping for different controller types
export const getButtonMapping = (controllerType: string, handedness: 'left' | 'right') => {
  const mappings = {
    oculus: {
      left: {
        trigger: { index: 0, position: [0, 0.02, 0.05], color: 'white', label: 'Trigger' },
        grip: { index: 1, position: [0, 0.04, -0.02], color: 'yellow', label: 'Grip' },
        thumbstick: { index: 2, position: [0, 0.06, -0.05], color: 'lime', label: 'Stick' },
        menu: { index: 3, position: [0, 0.1, 0], color: 'orange', label: 'Menu' },
        buttonX: { index: 4, position: [-0.03, 0.08, 0.02], color: 'cyan', label: 'X' },
        buttonY: { index: 5, position: [0.03, 0.08, 0.02], color: 'cyan', label: 'Y' }
      },
      right: {
        trigger: { index: 0, position: [0, 0.02, 0.05], color: 'white', label: 'Trigger' },
        grip: { index: 1, position: [0, 0.04, -0.02], color: 'yellow', label: 'Grip' },
        thumbstick: { index: 2, position: [0, 0.06, -0.05], color: 'lime', label: 'Stick' },
        menu: { index: 3, position: [0, 0.1, 0], color: 'orange', label: 'Menu' },
        buttonA: { index: 4, position: [-0.03, 0.08, 0.02], color: 'cyan', label: 'A' },
        buttonB: { index: 5, position: [0.03, 0.08, 0.02], color: 'cyan', label: 'B' }
      }
    },
    vive: {
      left: {
        trigger: { index: 0, position: [0, 0.02, 0.05], color: 'white', label: 'Trigger' },
        grip: { index: 1, position: [0, 0.04, -0.02], color: 'yellow', label: 'Grip' },
        menu: { index: 2, position: [0, 0.1, 0], color: 'orange', label: 'Menu' },
        trackpad: { index: 3, position: [0, 0.06, -0.05], color: 'lime', label: 'Pad' }
      },
      right: {
        trigger: { index: 0, position: [0, 0.02, 0.05], color: 'white', label: 'Trigger' },
        grip: { index: 1, position: [0, 0.04, -0.02], color: 'yellow', label: 'Grip' },
        menu: { index: 2, position: [0, 0.1, 0], color: 'orange', label: 'Menu' },
        trackpad: { index: 3, position: [0, 0.06, -0.05], color: 'lime', label: 'Pad' }
      }
    },
    index: {
      left: {
        trigger: { index: 0, position: [0, 0.02, 0.05], color: 'white', label: 'Trigger' },
        grip: { index: 1, position: [0, 0.04, -0.02], color: 'yellow', label: 'Grip' },
        thumbstick: { index: 2, position: [0, 0.06, -0.05], color: 'lime', label: 'Stick' },
        menu: { index: 3, position: [0, 0.1, 0], color: 'orange', label: 'Menu' },
        buttonA: { index: 4, position: [-0.03, 0.08, 0.02], color: 'cyan', label: 'A' },
        buttonB: { index: 5, position: [0.03, 0.08, 0.02], color: 'cyan', label: 'B' }
      },
      right: {
        trigger: { index: 0, position: [0, 0.02, 0.05], color: 'white', label: 'Trigger' },
        grip: { index: 1, position: [0, 0.04, -0.02], color: 'yellow', label: 'Grip' },
        thumbstick: { index: 2, position: [0, 0.06, -0.05], color: 'lime', label: 'Stick' },
        menu: { index: 3, position: [0, 0.1, 0], color: 'orange', label: 'Menu' },
        buttonA: { index: 4, position: [-0.03, 0.08, 0.02], color: 'cyan', label: 'A' },
        buttonB: { index: 5, position: [0.03, 0.08, 0.02], color: 'cyan', label: 'B' }
      }
    }
  }

  return mappings[controllerType]?.[handedness] || mappings.oculus[handedness]
}
