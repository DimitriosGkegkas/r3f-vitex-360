import React, { useState } from 'react';
import { useXRInputSourceState, XRSpace } from '@react-three/xr';
import { RoundedBox, Text, Image } from '@react-three/drei';
import { Floor } from '../../config/floorSteps';


interface FloorInfoPanelProps {
    currentFloorId: string;
    experienceStates: Record<string, Floor>;
    stateOrder: string[];
    isVisible: boolean;
    handedness?: 'left' | 'right';
    onFloorChange?: (floorId: string) => void;
}

const FloorInfoPanel: React.FC<FloorInfoPanelProps> = ({
    currentFloorId,
    stateOrder,
    isVisible,
    handedness = 'left',
    onFloorChange
}) => {
    const state = useXRInputSourceState('controller', handedness);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


    if (!state?.inputSource?.gripSpace || !isVisible) return null;

    return (
        <XRSpace space={state.inputSource.gripSpace}>
            <group position={[-0.0, -0., -0.17]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.5, 0.5, 0.005]}>
                {/* Main panel background */}
                <RoundedBox
                    position={[0.0, -0.0, -0.]}
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
                {/* Funnel Steps - Stacked vertically */}
                {Array.from({ length: 7 }, (_, index) => {
                    // Get the floor ID for this index
                    const floorId = stateOrder[index];
                    const isCurrentFloor = floorId === currentFloorId;

                    // Use active image for current floor, regular image for others
                    const imageUrl = isCurrentFloor
                        ? `/vr-ui/funnel/active-funnel-step-${index}.png`
                        : `/vr-ui/funnel/funnel-step-${index}.png`;

                    const stepHeight = 0.06; // Increased height for rectangular images
                    const totalHeight = 7 * stepHeight; // Total height for all steps
                    const startY = 0.38; // Starting Y position (moved up slightly)
                    const yPosition = startY - (index * stepHeight) - (totalHeight / 2);
                    const isHovered = hoveredIndex === index;
                    const baseScale: [number, number] = [0.359 / 1.1, 0.054 / 1.1];
                    const hoverScale: [number, number] = [baseScale[0] * 1.1, baseScale[1] * 1.1];
                    const currentScale = isHovered ? hoverScale : baseScale;

                    return (
                        <Image
                            key={index}
                            url={imageUrl}
                            position={[0., yPosition, 0.4]}
                            scale={currentScale}
                            transparent
                            onClick={() => {
                                if (onFloorChange && floorId && !isCurrentFloor) {
                                    onFloorChange(floorId);
                                }
                            }}
                            onPointerOver={() => setHoveredIndex(index)}
                            onPointerOut={() => setHoveredIndex(null)}
                        />
                    );
                })}
                <Text
                    position={[0, 0.22, 0.41]}
                    rotation={[0, 0, 0]}
                    fontSize={0.02}
                    color="#1A1A1A"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={0.4}
                    textAlign="center"
                >
                    Όροφοι
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
                    Πατήστε Χ για προηγούμενο
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
                    Πατήστε Υ για επόμενο
                </Text>
            </group>
        </XRSpace>
    );
};

export default FloorInfoPanel;
