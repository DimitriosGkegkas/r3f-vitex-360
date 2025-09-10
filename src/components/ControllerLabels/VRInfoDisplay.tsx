import React, { useRef, useState, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import { useXR } from '@react-three/xr'
import * as THREE from 'three'

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
}

const VRInfoDisplay: React.FC<VRInfoDisplayProps> = ({ 
  stepData, 
  isVisible, 
}) => {
  const { camera } = useThree()
  const billboardRef = useRef<THREE.Group>(null)
  const { session } = useXR()

  // Static position state
  const [staticPosition, setStaticPosition] = useState<THREE.Vector3 | null>(null)

  // Distance from camera - adjust for VR vs desktop
  const getDistance = () => {
    return 3 // Closer in VR for better readability
  }

  // Fixed pitch offset (slightly below eye level)
  const pitchOffset = -0.1

  useEffect(() => {
    
  }, [stepData?.id])

  // Position the billboard when it becomes visible or when stepData changes
  useEffect(() => {
    console.log('isVisible', isVisible)
    console.log('stepData', stepData)
    if (isVisible && stepData) {
      const position = new THREE.Vector3()
      const direction = new THREE.Vector3()

      // Get camera position
      position.copy(camera.position)

      if (session) {
        // In VR mode, extract forward direction from matrix
        const cameraMatrix = camera.matrixWorld
        direction.set(-cameraMatrix.elements[8], 0, -cameraMatrix.elements[10])
        direction.normalize()
      } else {
        // In desktop mode, use getWorldDirection
        camera.getWorldDirection(direction)
      }

      // Calculate billboard position
      const billboardPosition = new THREE.Vector3()
      billboardPosition.copy(position)

      // Clone the direction vector to avoid modifying the original
      const cameraDirection = direction.clone()
      const currentDistance = getDistance()
      billboardPosition.add(cameraDirection.multiplyScalar(currentDistance))

      // Apply pitch offset
      const up = new THREE.Vector3(0, 1, 0)
      const right = new THREE.Vector3()
      right.crossVectors(cameraDirection, up).normalize()
      const pitchVector = new THREE.Vector3()
      pitchVector.crossVectors(right, cameraDirection).normalize()
      billboardPosition.add(pitchVector.multiplyScalar(Math.sin(pitchOffset) * currentDistance))

      setStaticPosition(billboardPosition)
    } else if (!isVisible) {
      // Reset when hidden
      setStaticPosition(null)
    }
  }, [isVisible, stepData?.id])

  // Only update lookAt to face camera, but don't move position
  useFrame(() => {
    if (!billboardRef.current || !isVisible || !stepData || !staticPosition) return

    // Set the static position
    billboardRef.current.position.copy(staticPosition)
    
    // Make it look at the camera
    billboardRef.current.lookAt(camera.position)
  })

  if (!isVisible || !stepData) return null

  return (
    <group ref={billboardRef}>
      {/* Background plane */}
      <RoundedBox
        position={[0, 0, -0.1]}
        args={[2.5, 2, 0.1]} // Width, height, depth
        radius={0.05}
        steps={1}
        smoothness={4}
        bevelSegments={4}
        creaseAngle={0.4}
      >
        <meshBasicMaterial
          color="rgba(255, 255, 255, 0.95)"
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* Title */}
      <Text
        position={[0, 0.7, 0]}
        fontSize={0.15}
        fontWeight={700}
        color="#1A1A1A"
        maxWidth={2.2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {stepData.title}
      </Text>

      {/* Description */}
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.1}
        color="#1A1A1A"
        maxWidth={2.2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {stepData.description}
      </Text>

      {/* Step info */}
      {stepData.stepName && (
        <Text
          position={[-0.8, -0.6, 0]}
          fontSize={0.08}
          color="#4D4D4D"
          maxWidth={1.0}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          Βήμα: {stepData.stepName}
        </Text>
      )}

      {/* Floor info */}
      {stepData.floor && (
        <Text
          position={[0.8, -0.6, 0]}
          fontSize={0.08}
          color="#4D4D4D"
          maxWidth={1.0}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          Όροφος: {stepData.floor}
        </Text>
      )}

      {/* Step counter */}
      {stepData.currentStep && stepData.totalSteps && (
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.08}
          color="#4D4D4D"
          maxWidth={2.2}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {stepData.currentStep} από {stepData.totalSteps}
        </Text>
      )}

      {/* Navigation instructions */}
      {/* Previous button instruction - left side */}
      <Text
        position={[-0.8, -0.8, 0]}
        fontSize={0.06}
        color="#666666"
        maxWidth={0.4}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Πατήστε A για προηγούμενο
      </Text>

      {/* Next button instruction - right side */}
      <Text
        position={[0.8, -0.8, 0]}
        fontSize={0.06}
        color="#666666"
        maxWidth={0.4}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Πατήστε B για επόμενο
      </Text>

      {/* Close instruction */}
      <Text
        position={[0, -1.0, 0]}
        fontSize={0.06}
        color="#666666"
        maxWidth={2.2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Πατήστε grip για κλείσιμο
      </Text>
    </group>
  )
}

export default VRInfoDisplay
