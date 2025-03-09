"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";

export default function EPMSModelViewer({ modelPath, setActiveFeature, activeFeature }) {
  const { activeFeatureModels, setActiveFeatureModel } = useProductStore();
  const activeModel = activeFeatureModels[1] ?? modelPath;
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [featurePosition, setFeaturePosition] = useState("right"); 

  useEffect(() => {
    console.log("Active Model Updated:", activeModel);
  }, [activeModel]);

  const hotspots = [
    { id: 1, name: "Earth Resistance Measurement", url: "/EPMS/EPMS_Earth_Resistance.glb", position: "-0.173m 0.299m 0.010m" },
    { id: 2, name: "Earth Integrity", url: "/EPMS/EPMS_Wire_connect.glb", position: "0.173m 0.295m 0.013m" },
    { id: 3, name: "Neutral-Earth Voltage", url: "/EPMS/EPMS_Earth_Neutral.glb", position: "-0.179m 0.220m 0.109m" },
    { id: 4, name: "Earth Leakage Current", url: "/EPMS/EPMS_Earth_Leak.glb", position: "-0.185m 0.036m 0.013m" },
    { id: 5, name: "Noise Filtering", url: "/EPMS/noise_filter.mp4", position: "0.186m 0.045m 0.014m" }
  ];

  return (
    <div className="flex items-center justify-center w-full relative">
      {isVideoActive ? (
        <video 
          width="500" 
          height="200" 
          controls 
          autoPlay
          className="rounded-lg shadow-lg"
          onEnded={() => setIsVideoActive(false)}
        >
          <source src="/EPMS/noise_filter.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <model-viewer
          src={activeModel}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          tone-mapping="neutral"
          shadow-intensity="1"
          style={{ width: "800px", height: "420px" }}
        >
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className={`Hotspot ${activeFeature?.id === hotspot.id ? "pulse" : ""}`}
              slot={`hotspot-${hotspot.id}`}
              data-position={hotspot.position}
              data-normal="0m 0.7m 0.7m"
              onClick={() => {
                setActiveFeature(hotspot);
                
                setFeaturePosition("right");
                setTimeout(() => setFeaturePosition("center"), 100); 

                if (hotspot.id === 5) {
                  setIsVideoActive(true);
                } else {
                  setIsVideoActive(false);
                  setActiveFeatureModel(1, hotspot.url);
                }

                console.log(`Changed Model to: ${hotspot.url}, Feature: ${hotspot.name}`);
              }}
            >
              <div className="HotspotAnnotation">{hotspot.id}</div>
            </button>
          ))}
        </model-viewer>
      )}

      {activeFeature && (
        <div
          className={`absolute flex items-center bg-gray-800 text-white p-2 px-3 rounded-full shadow-lg w-64 max-w-md border-l-4 border-red-500 transition-all duration-500 ease-in-out ${
            featurePosition === "right" ? "right-[-200px] opacity-0" : "right-[15%] opacity-100"
          }`}
          style={{
            top: "50%",
            transform: "translateY(-50%)"
          }}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center mr-3">
            <span className="text-red-500 font-bold text-sm">{activeFeature.id}</span>
          </div>
          <div className="flex flex-col flex-grow">
            <h2 className="text-sm font-bold">{activeFeature.name}</h2>
            <button className="mt-2 flex items-center space-x-2 py-1 rounded-full text-white font-bold">
              <span className="text-xs">Delve Deeper</span>
              <img src="/assets/delve-deeper.png" alt="Delve Deeper" className="w-5 h-5 brightness-10 contrast-0" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .pulse::before {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 69, 0, 0.6);
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
