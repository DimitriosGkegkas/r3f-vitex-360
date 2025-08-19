# R3F Vite 360 Experience

A React Three Fiber application with a 360-degree image viewer and interactive experience components.

## Features

- **360-Degree Image Viewer**: Interactive panorama viewer with mouse/touch controls
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

## Configuration

The application uses a modular configuration system located in `src/config/`:

- **`environments.ts`**: Contains all 360° environment configurations with keypoints and camera settings
- **`floorSteps.ts`**: Contains all floor and step configurations with descriptions and navigation
- **`experienceStates.ts`**: Contains cross-referencing helper functions
- **`README.md`**: Detailed documentation on how to create new environments and floor steps

### Quick Configuration Guide

1. **Add New Environment**: Create cubemap images and configure in `environments.ts`
2. **Add New Floor**: Configure floor and steps in `floorSteps.ts`
3. **Update Navigation**: Modify floor order arrays for proper navigation flow

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
