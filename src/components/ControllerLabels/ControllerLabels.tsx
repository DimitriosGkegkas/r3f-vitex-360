import { useXRInputSourceState, XRSpace } from '@react-three/xr'
import { Text } from '@react-three/drei'
import { useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'

// Button mapping configuration for left and right controllers
const BUTTON_MAPPINGS = {
  left: {
    buttonX: { index: 4, position: [0.095, 0.01, -0.019], color: 'lime', label: 'Προηγ.Όροφος', rotation: [Math.PI / 3, Math.PI, Math.PI], key: 'buttonX' },
    buttonY: { index: 5, position: [0.1, 0.001, -0.03], color: 'orange', label: 'Επόμ.Όροφος', rotation: [Math.PI / 3, Math.PI, Math.PI], key: 'buttonY' },
    grip: { index: 1, position: [0.015, -0.04, 0.015], color: 'red', label: 'Όροφοι', rotation: [Math.PI / 1.6, Math.PI/2, Math.PI], key: 'grip' },
  },
  right: {
    trigger: { index: 0, position: [0.01, -0.035, -0.03], color: 'lime', label: 'Επιλογή', rotation: [0, Math.PI, Math.PI], key: 'trigger' },
    buttonB: { index: 4, position: [-0.007, 0.01, -0.019], color: 'lime', label: 'Προηγ.Βήμα', rotation: [Math.PI / 3, Math.PI, Math.PI], key: 'buttonB' },
    buttonA: { index: 5, position: [-0.02, 0.001, -0.03], color: 'orange', label: 'Επόμ.Βήμα', rotation: [Math.PI / 3, Math.PI, Math.PI], key: 'buttonA' },
    grip: { index: 1, position: [-0.02, 0.04, 0.035], color: 'red', label: 'Πληροφορίες', rotation: [Math.PI / 1.6, -Math.PI/2, Math.PI], key: 'grip' },
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
  onNextFloor?: () => void
  onPreviousFloor?: () => void
}

function ControllerLabels({
  handedness = 'right',
  showLabels = true,
  onNextStep,
  onPreviousStep,
  onShowInfo,
  onSelect,
  isInfoVisible = false,
  onNextFloor,
  onPreviousFloor
}: ControllerLabelsProps) {
  const state = useXRInputSourceState('controller', handedness)

  // Get button mapping for the specified handedness
  const buttonMapping = useMemo(() => {
    return BUTTON_MAPPINGS[handedness]
  }, [handedness])

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
            case 'buttonB':
              onPreviousStep?.()
              break
            case 'buttonA':
              onNextStep?.()
              break
            case 'buttonX':
              // Left controller X button - Previous floor
              if (handedness === 'left') {
                onPreviousFloor?.()
              } else {
                onPreviousStep?.()
              }
              break
            case 'buttonY':
              // Left controller Y button - Next floor
              if (handedness === 'left') {
                onNextFloor?.()
              } else {
                onNextStep?.()
              }
              break
            case 'grip':
              if (isInfoVisible) {
                onShowInfo?.() // Close info
              } else {
                onShowInfo?.() // Show info
              }
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


        if (button.key === 'grip') {
          // Different text for left vs right grip
          const gripText = handedness === 'right' 
            ? (!isInfoVisible ? "Άνοιγμα" : 'Κλείσιμο') + " Πληροφοριών"
            : "Όροφοι"
          
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
              maxWidth={isTrigger ? 0.08 : 0.2}
              textAlign="center"
              strokeWidth={0.002}
              strokeColor="black"
              lineHeight={0.9}
            >
              {gripText}
            </Text>
          )
        }


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