# Three.js Fiber React TypeScript Template

A modern, production-ready template for building 3D web applications using React Three Fiber, Three.js, and TypeScript. This template provides a solid foundation for creating immersive 3D experiences on the web.

## 🚀 Features

- **React Three Fiber** - React renderer for Three.js
- **TypeScript** - Full type safety and better development experience
- **Vite** - Lightning-fast build tool and dev server
- **Three.js** - Powerful 3D graphics library
- **Post-processing** - Advanced visual effects and filters
- **Modern React** - Built with React 18 and latest features
- **Hot Reload** - Instant updates during development

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Build Tool**: Vite
- **Package Manager**: Yarn
- **Post-processing**: @react-three/postprocessing
- **Utilities**: Leva (GUI controls), Maath (math utilities)

## 📦 Installation

1. **Clone the template**
   ```bash
   git clone <your-repo-url>
   cd r3f-vite-starter
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Available Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production with TypeScript compilation
- `yarn preview` - Preview production build locally

## 🏗️ Project Structure

```
r3f-vite-starter/
├── src/
│   ├── components/
│   │   └── Experience.tsx      # Main 3D scene component
│   ├── App.tsx                 # Root React component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── public/                     # Static assets
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Customization

### Adding New 3D Components

Create new components in the `src/components/` directory:

```tsx
import React from 'react';
import { useFrame } from '@react-three/fiber';

export const MyComponent: React.FC = () => {
  useFrame((state, delta) => {
    // Animation logic here
  });

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};
```

### Modifying the Scene

Edit `src/components/Experience.tsx` to customize your 3D scene:

```tsx
export const Experience: React.FC = () => {
  return (
    <>
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 10, 10]} fov={45} />
      
      {/* Add your 3D objects here */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};
```

## 🔧 Configuration

### TypeScript

The project includes strict TypeScript configuration in `tsconfig.json` with:
- Strict type checking
- Modern ES2020 target
- React JSX support
- Path resolution for clean imports

### Vite

Vite configuration in `vite.config.ts` provides:
- React plugin support
- Fast HMR (Hot Module Replacement)
- Optimized builds
- Development server with instant reload

## 📚 Learning Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🚀 Deployment

1. **Build for production**
   ```bash
   yarn build
   ```

2. **Deploy the `dist/` folder** to your hosting service
   - Netlify, Vercel, GitHub Pages, or any static hosting

## 🤝 Contributing

This template is designed to be a starting point. Feel free to:
- Add new features
- Improve the TypeScript types
- Enhance the 3D scene
- Optimize performance
- Add more examples

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - Amazing React renderer for Three.js
- [Three.js](https://threejs.org/) - Powerful 3D graphics library
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

---

**Happy 3D coding! 🎮✨**
