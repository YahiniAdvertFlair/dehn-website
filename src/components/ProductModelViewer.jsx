"use client";
import { useState, useEffect } from "react";

export default function ProductModelViewer({ modelPath, size = "small" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [modelScale, setModelScale] = useState("3 3 3");
  const [cameraOrbit, setCameraOrbit] = useState("0deg 90deg 3m");
  const [fieldOfView, setFieldOfView] = useState("45deg");

  useEffect(() => {
    console.log("Model Path:", modelPath);

    
    if (
      modelPath.includes("DEHNguard") ||
      modelPath.includes("EXFS_1") ||
      modelPath.includes("DEHNvenCI")
    ) {
      setModelScale("20 20 20"); 
      setCameraOrbit("0deg 90deg 4m"); 
      setFieldOfView("60deg"); 
    } else {
      setModelScale("3 3 3");
      setCameraOrbit("0deg 90deg 3m");
      setFieldOfView("45deg");
    }
  }, [modelPath]);
  useEffect(() => {
    console.log("Model Path:", modelPath);

    
    if (
      modelPath.includes("EXFS_2") 
    ) {
      setModelScale("12 12 12"); 
      setCameraOrbit("0deg 90deg 4m"); 
      setFieldOfView("60deg"); 
    } 
  }, [modelPath]);

  return (
    <div className="flex items-center justify-center w-full">
      <model-viewer
        src={modelPath}
        ar
        auto-rotate
        camera-controls
        interaction-prompt="auto"
        disable-pan="false"
        shadow-intensity="1"
        scale={modelScale}
        camera-orbit={cameraOrbit}
        field-of-view={fieldOfView}
        min-camera-orbit="auto auto 1.5m"
        max-camera-orbit="auto auto 5m"
        min-field-of-view="30deg"
        max-field-of-view="90deg"
        style={{
          width: size === "large" ? "37.5rem" : "62.5rem",
          height: size === "large" ? "37.5rem" : "26.25rem",
          backgroundColor: "transparent",
        }}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.error("Model failed to load:", e);
          setHasError(true);
        }}
      ></model-viewer>
    </div>
  );
}
