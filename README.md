# R3F Vite 360 Experience

A React Three Fiber application with a 360-degree image viewer and interactive experience components.

## Features

- **360-Degree Image Viewer**: Interactive panorama viewer with mouse/touch controls
- **360-Degree Video Support**: Automatic video environment rendering for immersive experiences
- **Experience Components**: Interactive state-based experience flow
- **Responsive Design**: Works on desktop and mobile devices
- **React Three Fiber**: Built with modern 3D web technologies
- **Modular Configuration**: Separated environment and floor-step configurations for easy management

## Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Testing with URL Parameters

The application supports URL parameters for testing specific floors and steps. This is useful for developers to jump to different parts of the experience without navigating through the entire flow.

### URL Format
```
http://localhost:5174/?floorId={floorId}&stepId={stepId}
```

### Example Test URL
**Start at beginning:**
```
http://localhost:5174/?floorId=raw-materials&stepId=sustainable-sourcing
```

### How It Works

- **floorId**: Specifies which floor to start on
- **stepId**: Specifies which step within that floor to start on
- **Automatic Start**: When both parameters are provided, the experience starts automatically
- **Step Tracking**: The specified step is automatically marked as visited
- **Completion**: Reaching the final step (`final-inspection`) triggers the completion screen

## Configuration

The application uses a modular configuration system located in `src/config/`:

- **`environments.ts`**: Contains all 360° environment configurations with keypoints and camera settings
- **`floorSteps.ts`**: Contains all floor and step configurations with descriptions and navigation
- **`experienceStates.ts`**: Contains cross-referencing helper functions
- **`README.md`**: Detailed documentation on how to create new environments and floor steps

### Configuration Examples

#### 1. Environment Setup (`environments.ts`)

Each environment represents a 360° space with interactive keypoints. Here's how to create a new environment:

```typescript
// Example: Creating a new "workshop" environment
'workshop-env': {
  id: 'workshop-env',
  environmentImage: '/cubemap/workshop', // Path to cubemap folder OR video file
  cameraAngle: 0,                        // Initial camera pitch (0 = horizon)
  cameraYaw: 90,                         // Initial camera yaw (90 = east)
  keypoints: [
    {
      id: 'workshop-entrance-kp',
      yaw: 180,                           // Direction to look (180 = south)
      pitch: 0,                           // Look up/down angle (0 = straight)
      zoom: 1.5,                          // Camera distance (1.5 = medium zoom)
      targetFloor: 'workshop',            // Which floor this keypoint belongs to
      targetStep: 'workshop-entrance',    // Which step this keypoint belongs to
      title: 'Workshop Entrance'          // Display title for the keypoint
    }
  ]
}
```

**Keypoint Properties:**
- **yaw**: Horizontal rotation (0° = north, 90° = east, 180° = south, 270° = west)
- **pitch**: Vertical rotation (0° = horizon, positive = look up, negative = look down)
- **zoom**: Camera distance (1.0 = normal, <1.0 = closer, >1.0 = further)
- **targetFloor/Step**: Links the keypoint to specific floor and step in the experience

#### 2. Floor and Step Setup (`floorSteps.ts`)

Each floor contains multiple steps that users progress through:

```typescript
// Example: Creating a new "workshop" floor
'workshop': {
  id: 'workshop',
  title: 'Workshop Area',
  floorNumber: '6ος',
  description: 'Experience the creative workshop where ideas come to life through skilled craftsmanship.',
  environmentId: 'workshop-env',  // Must match environment ID
  steps: [
    {
      id: 'workshop-entrance',
      title: 'Welcome to the Workshop',
      description: 'Step into our creative space where innovation meets tradition.',
      stepName: 'Πρώτο',
      environmentId: 'workshop-env'  // Must match environment ID
    },
    {
      id: 'workshop-tools',
      title: 'Essential Tools',
      description: 'Discover the specialized tools that make our craft possible.',
      stepName: 'Δεύτερο',
      environmentId: 'workshop-env'
    }
  ]
}
```

**Important Notes:**
- **environmentId**: Must match exactly between floor and environment configurations
- **stepName**: Greek ordinal numbers (Πρώτο, Δεύτερο, Τρίτο, Τέταρτο)
- **floorNumber**: Greek ordinal numbers (5ος, 4ος, 3ος, 2ος, 1ος, Ισόγειο)

#### 3. Navigation Flow

The system automatically handles navigation between floors and steps:

```typescript
// Floor order determines progression
const floorOrder = [
  'raw-materials',    // 5ος όροφος
  'sorting',          // 4ος όροφος
  'quantities',       // 3ος όροφος
  'secrets',          // 2ος όροφος
  'mixing',           // 1ος όροφος
  'packaging'         // Ισόγειο
];
```

### Quick Configuration Guide

1. **Add New Environment**: 
   - **For Images**: Create cubemap images in `public/cubemap/your-environment/`
   - **For Videos**: Place 360° video file in `public/cubemap/your-environment/`
   - Configure in `environments.ts` with keypoints
   - Set camera angles and zoom levels

2. **Add New Floor**: 
   - Configure floor and steps in `floorSteps.ts`
   - Link to environment via `environmentId`
   - Add to `floorOrder` array for proper navigation

3. **Update Navigation**: 
   - Modify floor order arrays in `floorSteps.ts`
   - Ensure all `environmentId` references match exactly

For detailed configuration instructions, see `src/config/README.md`.

## Adding 360-Degree Images

### Cubemap Images (Recommended)
For best performance and compatibility:

1. **Image Requirements**:
   - Format: JPEG or PNG
   - Structure: 6 separate images for each face of a cube
   - Naming: `px.jpg`, `nx.jpg`, `py.jpg`, `ny.jpg`, `pz.jpg`, `nz.jpg`
   - Resolution: 1024x1024 pixels per face recommended
   - File Size: Keep under 2MB per image

2. **Setup**:
   - Create a folder in `public/cubemap/` (e.g., `public/cubemap/my-environment/`)
   - Place all 6 face images in the folder
   - Update environment configuration in `src/config/environments.ts`

### Equirectangular Images (Alternative)
For single panoramic images:

1. **Image Requirements**:
   - Format: JPEG, PNG, or HDR
   - Aspect Ratio: 2:1 (equirectangular projection)
   - Resolution: Minimum 2048x1024 pixels recommended
   - File Size: Keep under 10MB for optimal performance

2. **Setup**:
   - Place your image in the `public/` folder
   - Update the `imageUrl` prop in `src/App.tsx`
   - Example: `imageUrl="/your-image-name.jpg"`

## Adding 360-Degree Videos

### Video Environment Support
The application automatically detects and renders 360° videos when the `environmentImage` path points to a video file.

### Video Requirements
1. **Supported Formats**:
   - MP4 (recommended)
   - WebM
   - MOV

2. **Video Specifications**:
   - Format: 360° equirectangular projection
   - Resolution: 1920x960 or higher recommended
   - Duration: Any length (loops automatically)
   - File Size: Keep under 50MB for optimal performance
   - Codec: H.264 for MP4, VP9 for WebM

3. **Setup**:
   - Place your video file in the `public/` folder
   - Update the `environmentImage` in your environment configuration
   - Example: `environmentImage: '/cubemap/demo/0903.mp4'`

### Video vs Image Detection
The system automatically determines whether to render a video or image environment based on the file extension:
- **Video files** (`.mp4`, `.webm`, `.mov`) → Renders `VideoEnvironment` component
- **Image paths** (folders or other extensions) → Renders standard `Environment` with cubemap

### Example Video Environment Configuration
```typescript
'demo-video-env': {
  id: 'demo-video-env',
  environmentImage: '/cubemap/demo/0903.mp4', // Direct path to video file
  cameraAngle: 0,
  cameraYaw: 0,
  keypoints: [
    // Keypoints work the same way for video environments
    {
      id: 'video-keypoint-1',
      yaw: 90,
      pitch: 0,
      zoom: 1.0,
      targetFloor: 'demo',
      targetStep: 'video-step',
      title: 'Video Interaction Point'
    }
  ]
}
```

## Controls

- **Pan**: Click and drag to rotate the view
- **Zoom**: Use mouse wheel to zoom in/out
- **Touch**: Swipe on mobile devices to navigate
- **Keypoints**: Click on interactive points to navigate between steps

## Project Structure

```
src/
├── components/
│   ├── Image360Viewer/     # 360-degree image viewer
│   ├── Experience/         # Main experience component
│   └── ...                 # Other UI components
├── config/                 # Configuration system
│   ├── environments.ts     # Environment and keypoint configurations
│   ├── floorSteps.ts       # Floor and step configurations
│   ├── experienceStates.ts # Cross-referencing helper functions
│   └── README.md          # Configuration documentation
├── hooks/                  # Custom React hooks
└── App.tsx                 # Main application component
```

## Technologies

- React 18
- TypeScript
- React Three Fiber
- Three.js
- Vite
- CSS3

## Development

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

## License

This project is private and proprietary.
