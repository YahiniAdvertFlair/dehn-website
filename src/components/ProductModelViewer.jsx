"use client";
import { useState, useEffect } from "react";

export default function ProductModelViewer({ modelPath, size = "small" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log("Model Path:", modelPath);
  }, [modelPath]);

  return (
    <div className="flex items-center justify-center w-full">
      <model-viewer
        src={modelPath}
        ar
        auto-rotate
        camera-controls
        shadow-intensity="1"
        scale="4 4 4"
        camera-orbit="0deg 90deg 3m"  
        field-of-view="80deg"         
        min-camera-orbit="auto auto 3m" 
        max-camera-orbit="auto auto 5m" 
        min-field-of-view="30deg"       
        style={{
          width: size === "large" ? "600px" : "1000px", 
          height: size === "large" ? "600px" : "420px",
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
