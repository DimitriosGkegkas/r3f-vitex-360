# Floor and Step Management

This directory contains the configuration and navigation system for the interactive floor-based experience.

## Files

### `experienceStates.ts`
Contains the main configuration for all floors and steps including:
- **Floor interface**: Defines the structure of each floor
- **Step interface**: Defines the structure of each step within a floor
- **floors**: Dictionary of all available floors
- **Helper functions**: `getFloorById`, `getNextFloor`, `getPreviousFloor`, `getStepById`, `getNextStep`, `getPreviousStep`

### `index.ts`
Exports all configuration items for easy importing.

## Structure

### Floor Structure
Each floor contains:
- `id`: Unique identifier for the floor
- `title`: Display title (in Greek)
- `floorNumber`: Floor number (in Greek)
- `description`: Detailed description of the floor
- `steps`: Array of steps for the floor
- `environmentImage`: Cubemap folder path
- `cameraAngle` & `cameraYaw`: Initial camera positioning

### Step Structure
Each step contains:
- `id`: Unique identifier for the step
- `title`: Display title
- `description`: Detailed description of the step
- `stepName`: Step name (πρώτο, δεύτερο, τρίτο, τέταρτο)
- `yaw`, `pitch`, `zoom`: Camera positioning for the step

## Available Floors

1. **raw-materials** (5ος Όροφος) - Πρώτη ύλη
2. **sorting** (4ος Όροφος) - Διαλογή
3. **quantities** (3ος Όροφος) - Ποσότητες
4. **secrets** (2ος Όροφος) - Μυστικά
5. **mixing** (1ος Όροφος) - Ανάμειξη
6. **packaging** (Ισόγειο) - Συσκευασία

## Usage

```typescript
import { floors, getFloorById, getNextFloor, getPreviousFloor } from '../config';

// Get a specific floor
const currentFloor = floors['raw-materials'];

// Navigate to next/previous floor
const nextFloor = getNextFloor('raw-materials');
const prevFloor = getPreviousFloor('sorting');

// Get steps within a floor
const steps = currentFloor.steps;

// Navigate between steps
import { getNextStep, getPreviousStep } from '../config';
const nextStep = getNextStep('raw-materials', 'sustainable-sourcing');
const prevStep = getPreviousStep('raw-materials', 'quality-control');
```

## Navigation

The system supports two levels of navigation:
1. **Floor Navigation**: Move between different floors (raw-materials → sorting → quantities → etc.)
2. **Step Navigation**: Move between steps within a floor (Πρώτο → Δεύτερο → Τρίτο → Τέταρτο)

Each floor has 4 steps that users can navigate through, providing a more granular experience.
