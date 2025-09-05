# XR Controller Button Labeling System

This system provides a robust way to label and handle XR controller buttons across different controller types (Oculus, Vive, Index, etc.) in your React Three Fiber VR application.

## Features

- **Cross-Controller Compatibility**: Automatically detects controller type and maps buttons accordingly
- **Dynamic Button Detection**: Only shows labels for buttons that actually exist on the connected controller
- **Customizable Labels**: Easy to modify button positions, colors, and labels
- **Button Event Handling**: Built-in support for button press/release events
- **TypeScript Support**: Fully typed for better development experience

## Components

### 1. ControllerLabels

The main component for displaying button labels on XR controllers.

```tsx
import ControllerLabels from './ControllerLabels'

// Basic usage
<ControllerLabels />

// With options
<ControllerLabels 
  handedness="left" 
  showLabels={true} 
/>
```

**Props:**
- `handedness?: 'left' | 'right'` - Which controller to label (default: 'right')
- `showLabels?: boolean` - Whether to show labels (default: true)

### 2. ControllerButtonHandler

Utility functions for handling button events and controller detection.

```tsx
import { useControllerButtonEvents, detectControllerType, getButtonMapping } from './ControllerButtonHandler'

// Handle button events
const { inputSource, gamepad, isConnected } = useControllerButtonEvents(
  'right',
  (buttonIndex, buttonName) => console.log('Pressed:', buttonName),
  (buttonIndex, buttonName) => console.log('Released:', buttonName)
)

// Detect controller type
const controllerType = detectControllerType(gamepad)

// Get button mapping for specific controller
const buttonMapping = getButtonMapping('oculus', 'right')
```

### 3. ControllerButtonExample

Example component showing how to use button events.

```tsx
import ControllerButtonExample from './ControllerButtonExample'

<ControllerButtonExample handedness="right" />
```

## Button Mappings

The system includes predefined mappings for different controller types:

### Oculus Controllers
- **Trigger** (index 0): White label on front
- **Grip** (index 1): Yellow label on side
- **Thumbstick** (index 2): Lime label on top
- **Menu** (index 3): Orange label on top
- **A/B** (index 4/5): Cyan labels on top (right controller)
- **X/Y** (index 4/5): Cyan labels on top (left controller)

### Vive Controllers
- **Trigger** (index 0): White label on front
- **Grip** (index 1): Yellow label on side
- **Menu** (index 2): Orange label on top
- **Trackpad** (index 3): Lime label on top

### Valve Index Controllers
- Similar to Oculus but with different button layouts

## Customization

### Adding New Controller Types

1. Add a new mapping to `getButtonMapping` in `ControllerButtonHandler.tsx`:

```tsx
const mappings = {
  // ... existing mappings
  'new-controller': {
    left: {
      trigger: { index: 0, position: [0, 0.02, 0.05], color: 'white', label: 'Trigger' },
      // ... other buttons
    },
    right: {
      // ... right controller mapping
    }
  }
}
```

2. Update the `detectControllerType` function to recognize your controller:

```tsx
if (id.toLowerCase().includes('new-controller')) {
  return 'new-controller'
}
```

### Modifying Button Positions

Button positions are defined as `[x, y, z]` coordinates relative to the controller's grip space:

```tsx
buttonA: { 
  index: 4, 
  position: [-0.03, 0.08, 0.02], // x, y, z coordinates
  color: 'cyan', 
  label: 'A' 
}
```

- **X**: Left (-) to Right (+)
- **Y**: Down (-) to Up (+)
- **Z**: Back (-) to Front (+)

### Custom Button Colors

You can use any valid CSS color:

```tsx
color: 'white'     // Basic colors
color: '#FF0000'   // Hex colors
color: 'rgb(255, 0, 0)' // RGB colors
color: 'rgba(255, 0, 0, 0.8)' // RGBA with transparency
```

## Usage in Your VR Experience

### Basic Integration

```tsx
import { XR } from '@react-three/xr'
import ControllerLabels from './components/ControllerLabels/ControllerLabels'

function VRScene() {
  return (
    <XR>
      {/* Your VR content */}
      
      {/* Add controller labels */}
      <ControllerLabels handedness="left" />
      <ControllerLabels handedness="right" />
    </XR>
  )
}
```

### With Button Event Handling

```tsx
import { useControllerButtonEvents } from './components/ControllerLabels/ControllerButtonHandler'

function VRScene() {
  const handleButtonPress = (buttonIndex: number, buttonName: string) => {
    switch (buttonName) {
      case 'A':
        // Handle A button press
        break
      case 'Trigger':
        // Handle trigger press
        break
      // ... other buttons
    }
  }

  useControllerButtonEvents('right', handleButtonPress)

  return (
    <XR>
      {/* Your VR content */}
      <ControllerLabels handedness="right" />
    </XR>
  )
}
```

## Troubleshooting

### Labels Not Showing

1. Check that the controller is connected and tracked
2. Verify the controller has a `gripSpace`
3. Check the console for controller detection logs
4. Ensure `showLabels` prop is `true`

### Wrong Button Mappings

1. Check the console logs to see detected controller type
2. Verify the button indices match your controller
3. Add custom mapping for your specific controller

### Performance Issues

1. The system only renders labels for available buttons
2. Button event polling runs at 60fps - reduce if needed
3. Consider disabling labels when not needed

## Browser Compatibility

This system requires WebXR support and works with:
- Chrome/Edge with WebXR support
- Firefox with WebXR support
- Oculus Browser
- Other WebXR-compatible browsers

## Future Enhancements

- Haptic feedback integration
- Custom label styling options
- Button state visualization (pressed/released)
- Gesture recognition
- Controller model rendering
