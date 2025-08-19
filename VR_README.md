# VR Support for R3F Vitex 360

This project now includes comprehensive VR support using WebXR technology, allowing users to experience the 3D environment in virtual reality with headset and controller support.

## Features

### 🥽 VR Headset Support
- **WebXR Integration**: Full support for VR headsets compatible with WebXR
- **Immersive Experience**: 360-degree view of the 3D environment
- **Head Tracking**: Real-time head movement tracking for natural navigation

### 🎮 VR Controller Support
- **Dual Controllers**: Support for left and right VR controllers
- **Visual Representation**: 3D models of controllers in the VR space
- **Interactive Controls**: Use controllers to navigate and interact with elements

### 🖐️ Hand Tracking
- **Natural Hand Movement**: Track hand positions and movements
- **Visual Feedback**: See your hands in the VR environment
- **Gesture Recognition**: Support for basic hand gestures

### 🧭 VR Navigation
- **Floor Selection**: Navigate between different floors using VR controls
- **Interactive Panel**: Floating navigation panel accessible via controller
- **Smooth Transitions**: Seamless switching between VR and desktop modes

## Requirements

### Hardware
- **VR Headset**: Compatible with WebXR (Oculus Quest, HTC Vive, Valve Index, etc.)
- **Controllers**: VR controllers for the best experience
- **Modern Browser**: Chrome, Firefox, or Edge with WebXR support

### Software
- **WebXR Support**: Browser must support WebXR Device API
- **HTTPS Required**: WebXR only works over secure connections

## Installation

The VR dependencies are already included in the project:

```bash
# VR support is automatically installed
yarn install
```

## Usage

### 1. Starting VR Mode
1. Launch the application
2. Click the **VR Toggle** button (🥽) in the top-right corner
3. The application will switch to VR mode
4. Put on your VR headset and click "Enter VR" when prompted

### 2. VR Controls
- **Head Movement**: Look around by moving your head
- **Controller Navigation**: Use the right controller's A button to toggle the navigation panel
- **Floor Selection**: Point and click on floor options in the navigation panel
- **Hand Tracking**: See your hands move naturally in the VR space

### 3. Switching Between Modes
- **VR to Desktop**: Click the VR toggle button (🖥️) to return to desktop mode
- **Desktop to VR**: Click the VR toggle button (🥽) to enter VR mode

## Technical Implementation

### Components

#### VRExperience
The main VR component that handles:
- WebXR session management
- VR environment rendering
- Controller and hand tracking
- VR-specific interactions

#### VRToggle
A toggle component that allows users to switch between VR and desktop modes.

### Key Features

#### WebXR Integration
```typescript
import { VRButton, XR, Controllers, Hands, Interactive, useXR } from '@react-three/xr';

// Wrap your 3D scene in XR component
<XR>
  <VREnvironment />
  <Controllers />
  <VRHand hand="left" />
  <VRHand hand="right" />
</XR>
```

#### Controller Support
```typescript
const VRController: React.FC<{ hand: 'left' | 'right' }> = ({ hand }) => {
  const { controllers } = useXR();
  const controller = controllers.find(c => c.inputSource?.handedness === hand);
  
  return (
    <mesh ref={controller.grip}>
      <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
      <meshStandardMaterial color={hand === 'left' ? '#0066ff' : '#ff6600'} />
    </mesh>
  );
};
```

#### Interactive Elements
```typescript
<Interactive onSelect={() => console.log('Object selected!')}>
  <mesh position={[0, 0, -5]}>
    <sphereGeometry args={[0.5, 32, 32]} />
    <meshStandardMaterial color="#e74c3c" />
  </mesh>
</Interactive>
```

## Browser Compatibility

### Supported Browsers
- **Chrome**: Full WebXR support
- **Firefox**: Full WebXR support
- **Edge**: Full WebXR support
- **Safari**: Limited support (iOS 13+ with AR Quick Look)

### WebXR Support Check
The application automatically detects WebXR support and shows appropriate messages:
- ✅ **VR Supported**: Full VR functionality available
- ❌ **VR Not Supported**: Fallback to desktop mode

## Development

### Adding VR-Specific Features
1. **New VR Components**: Create components in `src/components/VRExperience/`
2. **VR Interactions**: Use the `Interactive` component for VR-specific interactions
3. **Controller Input**: Listen to controller events using the `useXR` hook

### Testing VR Features
1. **Desktop Testing**: Use mouse and keyboard for basic functionality
2. **VR Testing**: Use a VR headset for full immersion testing
3. **Controller Testing**: Test with actual VR controllers

## Troubleshooting

### Common Issues

#### VR Not Starting
- Ensure you're using HTTPS
- Check browser WebXR support
- Verify VR headset is properly connected

#### Controllers Not Working
- Ensure controllers are paired with headset
- Check WebXR controller support
- Verify controller batteries are charged

#### Performance Issues
- Reduce scene complexity
- Optimize 3D models
- Check device capabilities

### Debug Mode
Enable debug logging by checking the browser console for VR-related messages.

## Future Enhancements

### Planned Features
- **Haptic Feedback**: Controller vibration support
- **Advanced Hand Tracking**: Finger-level tracking
- **VR-Specific UI**: Optimized interfaces for VR
- **Multiplayer VR**: Collaborative VR experiences

### Customization
- **Controller Models**: Custom 3D controller representations
- **Hand Animations**: Realistic hand movements
- **VR Environments**: Custom VR spaces for different floors

## Contributing

When adding VR features:
1. Follow the existing component structure
2. Test on both desktop and VR modes
3. Ensure accessibility for non-VR users
4. Document new VR-specific functionality

## License

This VR implementation follows the same license as the main project.

---

For more information about WebXR and VR development, visit:
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [React Three XR](https://github.com/pmndrs/react-xr)
- [Three.js WebXR](https://threejs.org/docs/#examples/en/webxr/VRButton)
