import React, { useState } from 'react'
import { useXRInputSourceState, XRSpace } from '@react-three/xr'
import { Text } from '@react-three/drei'
import { useControllerButtonEvents } from './ControllerButtonHandler'

interface ControllerButtonExampleProps {
  handedness?: 'left' | 'right'
}

// Example component showing how to handle button events
export const ControllerButtonExample: React.FC<ControllerButtonExampleProps> = ({ 
  handedness = 'right' 
}) => {
  const [lastPressedButton, setLastPressedButton] = useState<string>('None')
  const [buttonStates, setButtonStates] = useState<Record<string, boolean>>({})
  
  const state = useXRInputSourceState('controller', handedness)

  // Handle button press events
  const handleButtonPress = (buttonIndex: number, buttonName: string) => {
    console.log(`Button pressed: ${buttonName} (index: ${buttonIndex})`)
    setLastPressedButton(buttonName)
    setButtonStates(prev => ({ ...prev, [buttonName]: true }))
  }

  const handleButtonRelease = (buttonIndex: number, buttonName: string) => {
    console.log(`Button released: ${buttonName} (index: ${buttonIndex})`)
    setButtonStates(prev => ({ ...prev, [buttonName]: false }))
  }

  // Use the button event handler
  useControllerButtonEvents(handedness, handleButtonPress, handleButtonRelease)

  if (!state?.inputSource?.gripSpace) return null

  return (
    <XRSpace space={state.inputSource.gripSpace}>
      {/* Display last pressed button */}
      <Text
        position={[0, 0.15, 0]}
        fontSize={0.06}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Last: {lastPressedButton}
      </Text>

      {/* Display button states */}
      <Text
        position={[0, 0.12, 0]}
        fontSize={0.04}
        color="yellow"
        anchorX="center"
        anchorY="middle"
      >
        {Object.entries(buttonStates)
          .filter(([_, pressed]) => pressed)
          .map(([name, _]) => name)
          .join(', ') || 'No buttons pressed'}
      </Text>
    </XRSpace>
  )
}

export default ControllerButtonExample
