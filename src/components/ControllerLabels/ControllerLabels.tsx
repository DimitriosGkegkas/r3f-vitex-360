import { useXRInputSourceState, XRSpace } from '@react-three/xr'
import { Text } from '@react-three/drei'
import { useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'

// Button mapping configuration for different controller types
const BUTTON_MAPPINGS = {
  // Standard mapping for most controllers (Oculus, Vive, etc.)
  standard: {
    trigger: { index: 0, position: [0.01, -0.04, -0.03], color: 'cyan', label: 'Επιλογή', rotation: [0, Math.PI, Math.PI], key: 'trigger' },
    buttonA: { index: 4, position: [-0.007, 0.01, -0.019], color: 'lime', label: 'Πληροφορίες', rotation: [Math.PI/3, Math.PI, Math.PI], key: 'buttonB' },
    buttonB: { index: 5, position: [-0.02, 0.001, -0.03], color: 'orange', label: 'Επόμενο', rotation: [Math.PI/3, Math.PI, Math.PI], key: 'buttonA' },
    grip: { index: 1, position: [0.01, -0.02, -0.01], color: 'red', label: 'Προηγούμενο', rotation: [0, Math.PI, Math.PI], key: 'grip' },
  },
  // Alternative mapping for different controller layouts
  alternative: {
    trigger: { index: 0, position: [0, -0.08, -0.02], color: 'orange', label: 'Επιλογή', rotation: [0, 0, 0] },
    buttonA: { index: 2, position: [-0.03, 0.02, -0.01], color: 'lime', label: 'Επόμενο', rotation: [0, 0, 0] },
    buttonB: { index: 3, position: [0.03, 0.02, -0.01], color: 'cyan', label: 'Πληροφορίες', rotation: [0, 0, 0] },
    buttonBIndicator: { index: 3, position: [0.03, 0.035, -0.005], color: 'cyan', label: 'B', rotation: [0, 0, 0] },
    grip: { index: 1, position: [0, -0.05, -0.01], color: 'red', label: 'Προηγούμενο', rotation: [0, 0, 0] },
  }
}

interface ControllerLabelsProps {
  handedness?: 'left' | 'right'
  showLabels?: boolean
  onNextStep?: () => void
  onPreviousStep?: () => void
  onShowInfo?: () => void
  onSelect?: () => void
  isInfoVisible?: boolean
}

function ControllerLabels({ 
  handedness = 'right', 
  showLabels = true,
  onNextStep,
  onPreviousStep,
  onShowInfo,
  onSelect,
  isInfoVisible = false
}: ControllerLabelsProps) {
  const state = useXRInputSourceState('controller', handedness)

  // Detect controller type and get appropriate button mapping
  const buttonMapping = useMemo(() => {
    if (!state?.inputSource?.gamepad) return BUTTON_MAPPINGS.standard

    const gamepad = state.inputSource.gamepad
    const buttons = gamepad.buttons || []
    
    // Detect controller type based on available buttons and their properties
    // This is a simplified detection - you can expand this based on your needs
    if (buttons.length >= 6) {
      // Check if this looks like a standard controller layout
      const hasStandardLayout = buttons[4] && buttons[5] && 
                               typeof buttons[4].pressed === 'boolean' && 
                               typeof buttons[5].pressed === 'boolean'
      
      return hasStandardLayout ? BUTTON_MAPPINGS.standard : BUTTON_MAPPINGS.alternative
    }
    
    return BUTTON_MAPPINGS.standard
  }, [state?.inputSource?.gamepad])

  // Get available buttons based on the controller's gamepad
  const availableButtons = useMemo(() => {
    if (!state?.inputSource?.gamepad?.buttons) return []

    const buttons = state.inputSource.gamepad.buttons
    const available: Array<{ key: string; index: number; position: [number, number, number]; color: string; label: string; rotation?: [number, number, number] }> = []

    // Check which buttons are available and not undefined
    Object.entries(buttonMapping).forEach(([key, config]) => {
      if (buttons[config.index] !== undefined) {
        available.push({ 
          key, 
          index: config.index, 
          position: config.position as [number, number, number], 
          color: config.color, 
          label: config.label,
          rotation: config.rotation as [number, number, number] | undefined
        })
      }
    })

    return available
  }, [state?.inputSource?.gamepad?.buttons, buttonMapping])

  // Helper function to get button mapping by index
  const getButtonMappingForIndex = useCallback((index: number) => {
    return Object.entries(buttonMapping).find(([_, config]) => config.index === index)?.[1]
  }, [buttonMapping])

  // Track previous button states for edge detection
  const prevButtonStates = useMemo(() => ({} as Record<number, boolean>), [])

  // Handle button events using useFrame (proper R3F way)
  useFrame(() => {
    if (!state?.inputSource?.gamepad?.buttons) return

    const buttons = state.inputSource.gamepad.buttons
    
    // Check each button for press events (edge detection)
    buttons.forEach((button: GamepadButton, index: number) => {
      const isPressed = button.pressed
      const wasPressed = prevButtonStates[index] || false
      
      
      // Button was just pressed (transition from not pressed to pressed)
      if (isPressed && !wasPressed) {
      
        
        // Map button index to action based on current mapping
        const buttonConfig = getButtonMappingForIndex(index)
        console.log(buttonConfig)

        if (buttonConfig && 'key' in buttonConfig) {
          console.log(`Button ${buttonConfig.key} pressed on ${handedness} controller`)
          switch (buttonConfig.key) {
            case 'trigger':
              onSelect?.()
              break
            case 'buttonA':
              onNextStep?.()
              break
            case 'buttonB':
              if (isInfoVisible) {
                onShowInfo?.() // Close info
              } else {
                onShowInfo?.() // Show info
              }
              break
            case 'grip':
              onPreviousStep?.()
              break
          }
        }
      }
      
      // Update previous button state
      prevButtonStates[index] = isPressed
    })
  })

  if (!state?.inputSource?.gripSpace || !showLabels) return null

  console.log('Controller info:', {
    handedness,
    inputSource: state.inputSource,
    gamepad: state.inputSource.gamepad,
    availableButtons: availableButtons.length,
    buttonMapping: Object.keys(buttonMapping)
  })

  return (
    <XRSpace space={state.inputSource.gripSpace}>
      {availableButtons.map((button) => {
        // Different styling for trigger vs buttons
        const isTrigger = button.key === 'trigger'
        const isIndicator = button.key === 'buttonBIndicator'
        
        return (
          <Text
            key={button.key}
            scale={.2}
            position={button.position as [number, number, number]}
            rotation={button.rotation || [0, 0, 0]}
            fontSize={isIndicator ? 0.04 : (isTrigger ? 0.05 : 0.06)}
            color={button.color}
            anchorX="right"
            anchorY="middle"
            maxWidth={isTrigger ? 0.08 : 0.1}
            textAlign="center"
            strokeWidth={0.002}
            strokeColor="black"
          >
            {button.label}
          </Text>
        )
      })}
    </XRSpace>
  )
}

export default ControllerLabels