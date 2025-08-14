# Experience State Management

This directory contains the configuration and state management system for the interactive experience.

## Files

### `experienceStates.ts`
Contains the main configuration for all experience states including:
- **ExperienceState interface**: Defines the structure of each state
- **experienceStates**: Dictionary of all available states
- **Helper functions**: `getStateById`, `getNextState`, `getPreviousState`

### `index.ts`
Exports all configuration items for easy importing.

## State Structure

Each experience state contains:
- `id`: Unique identifier for the state
- `title`: Display title (in Greek)
- `stepName`: Step name (in Greek)
- `floor`: Floor information (in Greek)
- `description`: Detailed description of the step
- `keypoints`: Array of key points for the step

## Available States

1. **raw-materials** (5ος Όροφος) - Πρώτη ύλη
2. **sorting** (4ος Όροφος) - Διαλογή
3. **quantities** (3ος Όροφος) - Ποσότητες
4. **secrets** (2ος Όροφος) - Μυστικά
5. **mixing** (1ος Όροφος) - Ανάμειξη
6. **packaging** (Ισόγειο) - Συσκευασία

## Usage

```typescript
import { experienceStates, getNextState, getPreviousState } from '../config';

// Get a specific state
const currentState = experienceStates['raw-materials'];

// Navigate to next/previous state
const nextState = getNextState('raw-materials');
const prevState = getPreviousState('sorting');
```

## Custom Hook

Use the `useExperienceState` hook for easy state management:

```typescript
import { useExperienceState } from '../hooks';

const {
  currentStateId,
  goToNext,
  goToPrevious,
  canGoNext,
  canGoPrevious
} = useExperienceState('raw-materials');
```
