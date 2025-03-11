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
        interaction-prompt="auto"
        disable-pan="false"
        shadow-intensity="1"
        scale="3 3 3"
        camera-orbit="0deg 90deg 2m"  
        field-of-view="45deg"
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
