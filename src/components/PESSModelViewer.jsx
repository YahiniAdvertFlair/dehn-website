"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";

export default function PESSModelViewer({ modelPath, setActiveFeature, activeFeature }) {
  const { activeFeatureModels, setActiveFeatureModel } = useProductStore();
  const activeModel = activeFeatureModels[3] ?? modelPath;

  useEffect(() => {
    console.log("Active Model Updated:", activeModel);
  }, [activeModel]);

  const hotspots = [
    { id: 1, name: "Earthquake Detection", url: "/PESS/PESS_Seimic(si).glb", position: "-0.150m 0.280m 0.010m" },
    { id: 2, name: "Overcurrent Protection", url: "/PESS/PESS_Current(A).glb", position: "0.140m 0.270m 0.015m" },
    { id: 3, name: "Earth Leakage", url: "/PESS/PESS_Leakage_Current.glb", position: "-0.130m 0.230m 0.100m" },
    { id: 4, name: "Under Voltage", url: "/PESS/PESS_Voltage.glb", position: "-0.140m 0.040m 0.010m" },
    { id: 5, name: "Over Voltage", url: "/PESS/PESS_Voltage.glb", position: "0.18804917224097398m 0.16505433008470605m 0.10937360965177445m" },
    { id: 6, name: "Phase Loss", url: "/PESS/PESS_Voltage.glb", position: "0.180m 0.055m 0.014m" }
  ];

  return (
    <div className="flex items-center justify-center w-full">
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
              setActiveFeatureModel(3, hotspot.url);
              console.log(`Changed Model to: ${hotspot.url}, Feature: ${hotspot.name}`);
            }}
          >
            <div className="HotspotAnnotation">{hotspot.id}</div>
          </button>
        ))}
      </model-viewer>

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
