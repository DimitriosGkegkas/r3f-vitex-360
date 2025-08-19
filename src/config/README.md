# Configuration Management

This directory contains the configuration system for the interactive 360° experience, organized into three main files for better maintainability and clarity.

## Files

### `environments.ts`
Contains all environment configurations including:
- **Environment interface**: Defines the structure of each 360° environment
- **Keypoint interface**: Defines interactive points within each environment
- **environments**: Dictionary of all available environments with their keypoints
- **Helper functions**: `getEnvironmentById`, `getKeypointByStep`

### `floorSteps.ts`
Contains all floor and step configurations including:
- **Floor interface**: Defines the structure of each floor
- **Step interface**: Defines the structure of each step within a floor
- **floors**: Dictionary of all available floors with their steps
- **Helper functions**: `getFloorById`, `getNextFloor`, `getPreviousFloor`, `getStepById`, `getNextStep`, `getPreviousStep`

### `experienceStates.ts`
Contains cross-referencing helper functions that work with both environments and floors:
- **getEnvironmentByFloorId**: Get environment for a specific floor
- **getKeypointByStep**: Get keypoint for a specific step
- **getCameraPositionByStep**: Get camera position for a step
- **getEnvironmentImageByFloor**: Get environment image path for a floor
- **getInitialCameraPositionByFloor**: Get initial camera position for a floor

### `index.ts`
Exports all configuration items for easy importing.

## Structure

### Environment Structure
Each environment contains:
- `id`: Unique identifier for the environment
- `environmentImage`: Cubemap folder path containing px, nx, py, ny, pz, nz images
- `keypoints`: Array of interactive points within the environment
- `cameraAngle`: Initial camera angle in degrees (0 = straight ahead, positive = look up, negative = look down)
- `cameraYaw`: Initial camera yaw in degrees (0 = north, 90 = east, 180 = south, 270 = west)

### Keypoint Structure
Each keypoint contains:
- `id`: Unique identifier for the keypoint
- `yaw`: Yaw angle in degrees (0 = north, 90 = east, 180 = south, 270 = west)
- `pitch`: Pitch angle in degrees (0 = horizon, positive = look up, negative = look down)
- `zoom`: Distance from camera (1 = unit distance, larger = further away)
- `targetFloor`: Reference to the floor this keypoint belongs to
- `targetStep`: Reference to the step this keypoint belongs to
- `title`: Display title for the keypoint

### Floor Structure
Each floor contains:
- `id`: Unique identifier for the floor
- `title`: Display title (in Greek)
- `floorNumber`: Floor number (in Greek)
- `description`: Detailed description of the floor
- `steps`: Array of steps for the floor
- `environmentId`: Reference to the environment this floor uses

### Step Structure
Each step contains:
- `id`: Unique identifier for the step
- `title`: Display title
- `description`: Detailed description of the step
- `stepName`: Step name (πρώτο, δεύτερο, τρίτο, τέταρτο)
- `environmentId`: Reference to the environment this step belongs to

## Available Floors

1. **raw-materials** (5ος Όροφος) - Πρώτη ύλη
2. **sorting** (4ος Όροφος) - Διαλογή
3. **quantities** (3ος Όροφος) - Ποσότητες
4. **secrets** (2ος Όροφος) - Μυστικά
5. **mixing** (1ος Όροφος) - Ανάμειξη
6. **packaging** (Ισόγειο) - Συσκευασία

## How to Create New Environments

### 1. Prepare Cubemap Images
Create a new folder in `public/cubemap/` with your environment name (e.g., `new-environment`). Include these 6 images:
- `px.jpg` - Positive X (right)
- `nx.jpg` - Negative X (left)
- `py.jpg` - Positive Y (up)
- `ny.jpg` - Negative Y (down)
- `pz.jpg` - Positive Z (forward)
- `nz.jpg` - Negative Z (backward)

### 2. Add Environment Configuration
In `src/config/environments.ts`, add a new environment:

```typescript
'new-environment-env': {
  id: 'new-environment-env',
  environmentImage: '/cubemap/new-environment',
  cameraAngle: 0,
  cameraYaw: 0,
  keypoints: [
    {
      id: 'step-1-kp',
      yaw: 0,
      pitch: 0,
      zoom: 1.0,
      targetFloor: 'new-floor',
      targetStep: 'step-1',
      title: 'Step 1 Title'
    },
    // Add more keypoints as needed
  ]
}
```

### 3. Configure Keypoints
For each step in your floor, create a keypoint:
- **yaw**: Horizontal angle (0° = north, 90° = east, 180° = south, 270° = west)
- **pitch**: Vertical angle (0° = horizon, positive = look up, negative = look down)
- **zoom**: Distance (1.0 = normal, <1.0 = closer, >1.0 = further)
- **targetFloor**: Must match the floor ID you'll create
- **targetStep**: Must match the step ID you'll create

## How to Create New Floor Steps

### 1. Add Floor Configuration
In `src/config/floorSteps.ts`, add a new floor:

```typescript
'new-floor': {
  id: 'new-floor',
  title: 'New Floor Title',
  floorNumber: 'New Floor Number',
  description: 'Detailed description of the floor',
  steps: [
    {
      id: 'step-1',
      title: 'Step 1 Title',
      description: 'Detailed description of step 1',
      stepName: 'Πρώτο',
      environmentId: 'new-environment-env'
    },
    // Add more steps as needed
  ],
  environmentId: 'new-environment-env'
}
```

### 2. Update Floor Order
Add your new floor to the `floorOrder` array in the navigation functions:

```typescript
const floorOrder = [
  'raw-materials',
  'sorting', 
  'quantities',
  'secrets',
  'mixing',
  'packaging',
  'new-floor' // Add your new floor
];
```

### 3. Ensure Consistency
Make sure:
- Floor `id` matches `targetFloor` in keypoints
- Step `id` matches `targetStep` in keypoints
- `environmentId` references an existing environment
- Each floor has exactly 4 steps (Πρώτο, Δεύτερο, Τρίτο, Τέταρτο)

## Usage

```typescript
import { 
  floors, 
  environments,
  getFloorById, 
  getNextFloor, 
  getEnvironmentById,
  getKeypointByStep 
} from '../config';

// Get a specific floor
const currentFloor = floors['raw-materials'];

// Get a specific environment
const currentEnvironment = environments['raw-materials-env'];

// Navigate to next/previous floor
const nextFloor = getNextFloor('raw-materials');
const prevFloor = getPreviousFloor('sorting');

// Get steps within a floor
const steps = currentFloor.steps;

// Get keypoints within an environment
const keypoints = currentEnvironment.keypoints;

// Get keypoint for a specific step
const keypoint = getKeypointByStep('raw-materials', 'sustainable-sourcing');
```

## Navigation

The system supports two levels of navigation:
1. **Floor Navigation**: Move between different floors (raw-materials → sorting → quantities → etc.)
2. **Step Navigation**: Move between steps within a floor (Πρώτο → Δεύτερο → Τρίτο → Τέταρτο)

Each floor has 4 steps that users can navigate through, providing a granular experience within each 360° environment.

## Best Practices

1. **Naming Convention**: Use descriptive IDs with hyphens (e.g., `raw-materials-env`, `sustainable-sourcing-kp`)
2. **Keypoint Positioning**: Test keypoint positions in the 360° viewer to ensure good user experience
3. **Content Consistency**: Ensure step descriptions align with the visual content in the environment
4. **Environment Reuse**: Multiple floors can share the same environment if appropriate
5. **Testing**: Always test new configurations in the application before deployment
