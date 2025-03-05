"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const [modelScale, setModelScale] = useState(1);
  const [modelPosition, setModelPosition] = useState([0, 0, 0]);

  
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    if (scene) {
      
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scaleFactor = 2.5 / maxDimension;

      setModelScale(scaleFactor);
      setModelPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);

      
      scene.rotation.set(0, Math.PI/8, 0); 

      
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.side = THREE.DoubleSide;
          if (!child.material.map) {
            child.material.color.set("#ffffff");
          }
        }
      });
    }
  }, [scene]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={modelScale}
      position={modelPosition}
    />
  );
}

export default function ModelViewer({ modelPath }) {
  return (
    <Canvas
      style={{ height: "280px", width: "100%" }}
      camera={{ position: [0, 2, 5], fov: 50 }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <pointLight position={[-5, -5, 5]} intensity={2} />

      <OrbitControls enableZoom={true} enablePan={false} />

      <Model modelPath={modelPath} />
    </Canvas>
  );
}
