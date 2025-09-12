import React from 'react'
import { Text, RoundedBox, Image } from '@react-three/drei'
import { useXRInputSourceState, XRSpace } from '@react-three/xr'

interface StepData {
  id: string
  title: string
  description: string
  stepName: string
  floor?: string
  currentStep?: number
  totalSteps?: number
}

interface VRInfoDisplayProps {
  stepData: StepData | null
  isVisible: boolean
  onClose?: () => void
  onBButtonPress?: () => void
  handedness?: 'left' | 'right'
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}

const VRInfoDisplay: React.FC<VRInfoDisplayProps> = ({ 
  stepData, 
  isVisible, 
  handedness = 'right',
  ...props
}) => {
  const state = useXRInputSourceState('controller', handedness);

  if (!isVisible || !stepData || !state?.inputSource?.gripSpace) return null

  return (
    <XRSpace space={state.inputSource.gripSpace}>
      <group  {...props}>
        {/* Background plane */}
        <RoundedBox
          position={[0, 0, 0]}
          args={[0.35, 0.5, 0.6]}
          radius={0.05}
          steps={1}
          smoothness={4}
          bevelSegments={4}
          creaseAngle={0.5}
        >
          <meshPhysicalMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.9}
            roughness={0.3}
            metalness={0.05}
            transmission={0.7}
            thickness={0.1}
            ior={1.5}
            clearcoat={0.}
            clearcoatRoughness={0.0}
          />
        </RoundedBox>

        {/* Header Image - stretches across the top */}
        <Image
          url="/vr-ui/infoCard/info-card-general.png"
          position={[0.01, 0.22, 0.4]}
          scale={[0.3, 0.015]}
          transparent
        />

        {/* Floor and Step info on top of header image */}
        <Text
          position={[-0.08, 0.22, 0.41]}
          rotation={[0, 0, 0]}
          fontSize={0.015}
          color="#666666"
          anchorX="left"
          anchorY="middle"
          maxWidth={0.1}
          textAlign="center"
        >
          {stepData.stepName}
        </Text>

        <Text
          position={[0.1, 0.22, 0.41]}
          rotation={[0, 0, 0]}
          fontSize={0.015}
          color="#666666"
          anchorX="left"
          anchorY="middle"
          maxWidth={0.1}
          textAlign="center"
        >
          {stepData.floor}
        </Text>

        {/* Icon on the left */}
        <Image
          url="/vr-ui/infoCard/info-card-icon.png"
          position={[-0.1, 0.15, 0.41]}
          scale={[0.08, 0.08]}
          transparent
        />

        {/* Title under the icon */}
        <Text
         position={[0.06, 0.18, 0.41]}
          rotation={[0, 0, 0]}
          fontSize={0.02}
          color="#1A1A1A"
          anchorX="center"
          anchorY="top"
          maxWidth={0.2}
          textAlign="center"
        >
          {stepData.title}
        </Text>

        {/* Description */}
        <Text
          position={[0.0, 0.06, 0.41]}
          rotation={[0, 0, 0]}
          fontSize={0.015}
          color="#1A1A1A"
          anchorX="center"
          anchorY="top"
          maxWidth={0.32}
          textAlign="justify"
        >
          {stepData.description}
        </Text>

        {/* Step counter */}
        {stepData.currentStep && stepData.totalSteps && (
          <Text
          position={[0.0, -0.2, 0.41]}
            rotation={[0, 0, 0]}
            fontSize={0.012}
            color="#4D4D4D"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.3}
            textAlign="center"
          >
            {stepData.currentStep} από {stepData.totalSteps}
          </Text>
        )}

        {/* Navigation instructions */}
        {/* Previous button instruction - left side */}
        <Text
          position={[-0.1, -0.2, 0.41]}
          rotation={[0, 0, 0]}
          fontSize={0.01}
          color="#666666"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.1}
          textAlign="center"
        >
          Πατήστε A για προηγούμενο
        </Text>

        {/* Next button instruction - right side */}
        <Text
          position={[0.1, -0.2, 0.41]}
          rotation={[0, 0, 0]}
          fontSize={0.01}
          color="#666666"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.1}
          textAlign="center"
        >
          Πατήστε B για επόμενο
        </Text>

        {/* Close instruction */}
        <Text
          position={[0, -0.237, 0.41]}
          rotation={[0, 0, 0]}
          fontSize={0.01}
          color="ρre"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.3}
          textAlign="center"
        >
          Πατήστε Grip για κλείσιμο
        </Text>
      </group>
    </XRSpace>
  )
}

export default VRInfoDisplay
