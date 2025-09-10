import React from 'react';
import { useXRInputSourceState, XRSpace } from '@react-three/xr';
import { RoundedBox, Text } from '@react-three/drei';
import { useMemo } from 'react';
import { Floor } from '../../config/floorSteps';

// Function to get floor background color based on floor index
const getFloorBackgroundColor = (index: number): string => {
    const floorColors = [
        '#FEE4E4', // Floor 1 - Light red/pink
        'rgba(251.76, 253.66, 234.72, 0.60)', // Floor 2 - Light yellow/green
        'rgba(234.74, 253.47, 231, 0.60)', // Floor 3 - Light green
        'rgba(232.80, 253.38, 247.21, 0.60)', // Floor 4 - Light cyan
        'rgba(225.83, 230.82, 253.02, 0.60)', // Floor 5 - Light blue
        'rgba(246.50, 225.10, 253.01, 0.60)', // Floor 6 - Light purple
        'rgba(246.50, 225.10, 253.01, 0.60)', // Floor 7 - Light purple
    ];

    return floorColors[index] || '#2a2a2a'; // Default fallback color
};

// Function to convert CSS color to hex for Three.js
const cssColorToHex = (cssColor: string): string => {
    // Handle rgba colors by extracting RGB values
    const rgbaMatch = cssColor.match(/rgba?\(([^,]+),\s*([^,]+),\s*([^,]+)/);
    if (rgbaMatch) {
        const r = Math.round(parseFloat(rgbaMatch[1]));
        const g = Math.round(parseFloat(rgbaMatch[2]));
        const b = Math.round(parseFloat(rgbaMatch[3]));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Handle hex colors
    if (cssColor.startsWith('#')) {
        return cssColor;
    }

    // Default fallback
    return '#2a2a2a';
};

interface FloorInfoPanelProps {
    currentFloorId: string;
    experienceStates: Record<string, Floor>;
    stateOrder: string[];
    isVisible: boolean;
    handedness?: 'left' | 'right';
}

const FloorInfoPanel: React.FC<FloorInfoPanelProps> = ({
    currentFloorId,
    experienceStates,
    stateOrder,
    isVisible,
    handedness = 'left'
}) => {
    const state = useXRInputSourceState('controller', handedness);

    // Calculate current step number for progress
    const currentStepNumber = useMemo(() => {
        return stateOrder.indexOf(currentFloorId) + 1;
    }, [currentFloorId, stateOrder]);

    const totalSteps = stateOrder.length;

    // Get current floor info
    const currentFloor = useMemo(() => {
        return experienceStates[currentFloorId];
    }, [currentFloorId, experienceStates]);

    if (!state?.inputSource?.gripSpace || !isVisible) return null;

    return (
        <XRSpace space={state.inputSource.gripSpace}>
            <group position={[-0.05, -0.08, -0.18]} rotation={[-Math.PI / 1.5, 0, 0]} scale={0.5}>
                {/* Main panel background */}
                <RoundedBox 
                    position={[0.15, 0.02, -0.01]}
                    args={[0.35, 0.65, 0.02]}
                    radius={0.01}
                    steps={1}
                    smoothness={4}
                    bevelSegments={4}
                    creaseAngle={0.5}
                >
                    <meshBasicMaterial color="#1a1a1a" transparent opacity={0.5} />
                </RoundedBox>

                {/* Title */}
                <Text
                    position={[0.15, 0.28, 0.0021]}
                    rotation={[0, 0, 0]}
                    fontSize={0.06}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={0.3}
                    textAlign="center"
                >
                    Όροφοι
                </Text>


                {/* Current floor info */}
                {currentFloor && (
                    <>
                        <Text
                            position={[0.15, 0.22, 0.0021]}
                            rotation={[0, 0, 0]}
                            fontSize={0.045}
                            color="#1088F4"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={0.3}
                            textAlign="center"
                        >
                            {currentFloor.floorNumber} Όροφος
                        </Text>

                        <Text
                            position={[0.15, 0.17, 0.0021]}
                            rotation={[0, 0, 0]}
                            fontSize={0.035}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={0.3}
                            textAlign="center"
                        >
                            {currentFloor.title}
                        </Text>
                    </>

                )}

                {/* Floor list */}
                {stateOrder.map((stateId, index) => {
                    const floor = experienceStates[stateId];
                    const isActive = stateId === currentFloorId;
                    const yPosition = 0.1 - (index * 0.06);

                    // Get the floor-specific background color
                    const floorBgColor = getFloorBackgroundColor(index);
                    const floorColor = cssColorToHex(floorBgColor);

                    return (
                        <React.Fragment key={stateId}>
                            {/* Floor item background */}
                            <mesh
                                position={[0.15, yPosition, 0.0021]}
                                rotation={[0, 0, 0]}
                            >
                                <planeGeometry args={[0.3, 0.05]} />
                                <meshBasicMaterial
                                    color={isActive ? "#1088F4" : floorColor}
                                // opacity={isActive ? 0.8 : 0.6}
                                />
                            </mesh>

                            {/* Floor number */}
                            <Text
                                position={[0.01, yPosition, 0.0022]}
                                rotation={[0, 0, 0]}
                                fontSize={0.03}
                                color={isActive ? "#ffffff" : "#000000"}
                                anchorX="left"
                                anchorY="middle"
                                maxWidth={0.08}
                                textAlign="left"
                            >
                                {floor.floorNumber}
                            </Text>

                            {/* Floor title */}
                            <Text
                                position={[0.27, yPosition, 0.0022]}
                                rotation={[0, 0, 0]}
                                fontSize={0.025}
                                color={isActive ? "#ffffff" : "#000000"}
                                anchorX="right"
                                anchorY="middle"
                                maxWidth={0.15}
                                textAlign="right"

                            >
                                {floor.title}
                            </Text>
                        </React.Fragment>
                    );
                })}

                {/* Close instruction */}
                <Text
                    position={[0.15, -0.26, 0.002]}
                    rotation={[0, 0, 0]}
                    fontSize={0.025}
                    color="#888888"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={0.3}
                    textAlign="center"
                >
                    Πατήστε Grip για κλείσιμο
                </Text>
            </group>
        </XRSpace>
    );
};

export default FloorInfoPanel;
