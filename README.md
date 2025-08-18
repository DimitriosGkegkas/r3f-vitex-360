# R3F Vite 360 Experience

A React Three Fiber application with a 360-degree image viewer and interactive experience components.

## Features

- **360-Degree Image Viewer**: Interactive panorama viewer with mouse/touch controls
- **Experience Components**: Interactive state-based experience flow
- **Responsive Design**: Works on desktop and mobile devices
- **React Three Fiber**: Built with modern 3D web technologies

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

## Adding 360-Degree Images

To use your own 360-degree images:

1. **Image Requirements**:
   - Format: JPEG, PNG, or HDR
   - Aspect Ratio: 2:1 (equirectangular projection)
   - Resolution: Minimum 2048x1024 pixels recommended
   - File Size: Keep under 10MB for optimal performance

2. **Setup**:
   - Place your image in the `public/` folder
   - Update the `imageUrl` prop in `src/App.tsx`
   - Example: `imageUrl="/your-image-name.jpg"`

3. **Current Placeholder**: The app uses `/360-panorama.jpg` as a placeholder

## Controls

- **Pan**: Click and drag to rotate the view
- **Zoom**: Use mouse wheel to zoom in/out
- **Touch**: Swipe on mobile devices to navigate

## Project Structure

```
src/
├── components/
│   ├── Image360Viewer/     # 360-degree image viewer
│   ├── Experience/         # Main experience component
│   └── ...                 # Other UI components
├── config/                 # Experience state configuration
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
