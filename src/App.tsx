import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Environment } from "@react-three/drei";

const App: React.FC = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 0], fov: 45 }}>
      <Environment preset="city"></Environment>
      <Experience />
    </Canvas>
  );
};

export default App;
