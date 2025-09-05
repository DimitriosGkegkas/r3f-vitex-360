import { useXRInputSourceState, XRSpace } from '@react-three/xr'
import { Billboard, Text } from '@react-three/drei'

function ControllerLabels({ handedness = 'right' as const }) {
  const state = useXRInputSourceState('controller', handedness)

  if (!state?.inputSource?.gripSpace) return null

  return (
    <XRSpace space={state.inputSource.gripSpace}>
      <Billboard>
        <Text
          position={[0, 0.02, 0.05]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Trigger
        </Text>
        <Text
          position={[0, 0.04, -0.02]}
          fontSize={0.1}
          color="yellow"
          anchorX="center"
          anchorY="middle"
        >
          Grip
        </Text>
      </Billboard>
    </XRSpace>
  )
}

export default ControllerLabels
