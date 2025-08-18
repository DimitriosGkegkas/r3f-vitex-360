# Image360Viewer Component

## Overview

The `Image360Viewer` component has been updated to work with the experience state system. Instead of accepting an `imageUrl` prop, it now accepts a `stateId` prop and automatically selects the appropriate environment based on the experience state's `environmentImage` property.

## New Structure

### Props Interface
```typescript
interface Image360ViewerProps {
  stateId: string;        // The ID of the experience state
  className?: string;     // Optional CSS class
}
```

### Experience State Configuration
Each experience state now includes an `environmentImage` property that points to a folder containing cubemap images:

```typescript
export interface ExperienceState {
  id: string;
  title: string;
  stepName: string;
  floor: string;
  description: string;
  keypoints: string[];
  environmentImage: string; // URL to base folder containing px, nx, py, ny, pz, nz images
}
```

## Environment Image Setup

### Folder Structure
Each experience state should have a folder containing 6 cubemap images:

```
public/
  cubemap/
    raw-materials/
      px.jpg  # positive X (right)
      nx.jpg  # negative X (left)
      py.jpg  # positive Y (top)
      ny.jpg  # negative Y (bottom)
      pz.jpg  # positive Z (front)
      nz.jpg  # negative Z (back)
    sorting/
      px.jpg
      nx.jpg
      py.jpg
      ny.jpg
      pz.jpg
      nz.jpg
    # ... other states
```

### Image Requirements
- **Format**: JPG or PNG recommended
- **Resolution**: 1024x1024 or higher for good quality
- **Aspect Ratio**: 1:1 (square)
- **Naming**: Must follow the exact naming convention (px, nx, py, ny, pz, nz)

## Usage Examples

### Basic Usage
```tsx
import { Image360Viewer } from './components';

function MyComponent() {
  return (
    <Image360Viewer 
      stateId="raw-materials" 
      className="w-full h-full" 
    />
  );
}
```


### Custom Integration
```tsx
import { useExperienceState } from './hooks';
import { Image360Viewer } from './components';

function CustomViewer() {
  const { currentStateId, goToNext, goToPrevious } = useExperienceState();
  
  return (
    <div>
      <Image360Viewer stateId={currentStateId} />
      <button onClick={goToNext}>Next</button>
      <button onClick={goToPrevious}>Previous</button>
    </div>
  );
}
```

## Available Components

1. **Image360Viewer**: The main component that renders the 360° environment

## Migration from Old Version

If you were using the old `Image360Viewer` with `imageUrl`:

**Before:**
```tsx
<Image360Viewer imageUrl="/path/to/image.jpg" />
```

**After:**
```tsx
// Add environmentImage to your experience state
environmentImage: '/path/to/cubemap/folder'

// Use stateId instead of imageUrl
<Image360Viewer stateId="your-state-id" />
```

## Benefits of New Structure

1. **Centralized Configuration**: Environment images are managed in the experience state configuration
2. **Automatic Selection**: No need to manually pass image URLs
3. **Consistent Experience**: Each state automatically gets its appropriate environment
4. **Easy Navigation**: Seamless integration with the experience state system
5. **Maintainable**: Easy to update environments by changing the configuration

## Troubleshooting

### Environment Not Loading
- Check that the `environmentImage` path in your experience state is correct
- Verify that all 6 cubemap images exist in the specified folder
- Ensure image names follow the exact convention (px, nx, py, ny, pz, nz)

### Fallback Behavior
If no `environmentImage` is specified or the path is invalid, the component will fall back to a default sunset environment preset.
