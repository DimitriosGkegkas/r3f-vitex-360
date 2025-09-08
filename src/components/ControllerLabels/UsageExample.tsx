import React from 'react'
import { XR } from '@react-three/xr'
import ControllerLabels, { useControllerButtonEvents } from './index'

// Example showing how to integrate controller labels with button handling
export const VRExperienceWithControllerLabels: React.FC = () => {
  // Handle button events for the right controller
  const handleRightButtonPress = (buttonIndex: number, buttonName: string) => {
    console.log(`Right controller button pressed: ${buttonName}`)
    
    // Add your button handling logic here
    switch (buttonName) {
      case 'A':
        console.log('A button pressed - maybe open menu')
        break
      case 'B':
        console.log('B button pressed - maybe close menu')
        break
      case 'Trigger':
        console.log('Trigger pressed - maybe grab/select')
        break
      case 'Grip':
        console.log('Grip pressed - maybe teleport')
        break
      case 'Menu':
        console.log('Menu pressed - maybe show settings')
        break
    }
  }

  const handleLeftButtonPress = (buttonIndex: number, buttonName: string) => {
    console.log(`Left controller button pressed: ${buttonName}`)
    
    // Add your button handling logic here
    switch (buttonName) {
      case 'X':
        console.log('X button pressed - maybe toggle UI')
        break
      case 'Y':
        console.log('Y button pressed - maybe reset view')
        break
      case 'Trigger':
        console.log('Trigger pressed - maybe grab/select')
        break
      case 'Grip':
        console.log('Grip pressed - maybe teleport')
        break
    }
  }

  // Set up button event handlers
  useControllerButtonEvents('right', handleRightButtonPress)
  useControllerButtonEvents('left', handleLeftButtonPress)

  return (
    <XR>
      {/* Your existing VR content goes here */}
      
      {/* Add controller labels */}
      <ControllerLabels handedness="left" />
      <ControllerLabels handedness="right" />
    </XR>
  )
}

export default VRExperienceWithControllerLabels
