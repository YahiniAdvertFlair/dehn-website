"use client";
import { useState, useEffect } from "react";

export default function ModelViewer({ modelPath, size = "small" }) {
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
        interaction-prompt="none"
        disable-pan="false"
        shadow-intensity="1"
        touch-pan="false"
        // scale="1 1 2"
        camera-orbit="0deg 75deg 5m"
        field-of-view="30deg"
        
        style={{
          width: size === "large" ? "20rem" : "10rem", 
          height: size === "large" ? "14rem" : "9rem",
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
