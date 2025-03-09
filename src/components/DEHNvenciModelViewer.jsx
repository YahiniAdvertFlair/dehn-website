"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";

export default function DEHNvenciModelViewer({ modelPath, setActiveFeature, activeFeature }) {
  const { activeFeatureModels } = useProductStore();
  const activeModel = activeFeatureModels[4] ?? modelPath;

  const [activeMedia, setActiveMedia] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [featurePosition, setFeaturePosition] = useState("right"); 

  useEffect(() => {
    console.log("Active Model Updated:", activeModel);
  }, [activeModel]);

  const modelHotspots = [
    { id: 1, name: "Integrated Backup Fuse", video: "/DEHNVenci/backup_fuse.mp4", position: "-0.0169m 0.1634m 0.0104m" },
    { id: 2, name: "High Lightning Current Discharge Capacity", text: "Handles up to 25 kA (10/350 µs) Lightning Current", position: "0.0165m 0.1641m 0.0096m" },
    { id: 3, name: "RADAX Flow Technology", text: "Extinguishes mains follow currents up to 100 kArms.", position: "-0.0167m 0.1100m 0.0351m" },
    { id: 4, name: "Low Voltage Protection Level (≤ 1.5 kV)", text: "✅Keeps Voltage Levels Safe", position: "-0.0160m 0.0171m 0.0124m" },
    { id: 5, name: "Green/Red Indicator for Fault Detection", text: "✅Visual Fault Indication for Quick Diagnosis", position: "0.0162m 0.0163m 0.0124m" }
  ];

  return (
    <div className="flex items-center justify-center w-full relative">
      {activeMedia ? (
        activeMedia.type === "video" ? (
          <div className="flex flex-col items-center">
            <p className="text-dehn-red">Integrated Backup Fuse</p>
            <img src="/DEHNVenci/integrated_backup_fuse.webp" className="w-[20rem]" />
          </div>
        ) : (
          <model-viewer
            src={activeModel}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            tone-mapping="neutral"
            shadow-intensity="1"
            style={{ width: "800px", height: "420px" }}
          />
        )
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
          {modelHotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className={`Hotspot ${selectedFeature?.id === hotspot.id ? "pulse" : ""}`}
              slot={`hotspot-${hotspot.id}`}
              data-position={hotspot.position}
              data-normal="0m 0.7m 0.7m"
              onClick={() => {
                setSelectedFeature(hotspot);
                setFeaturePosition("right"); 
                setTimeout(() => setFeaturePosition("center"), 100);

                if (hotspot.video) {
                  setActiveMedia({ type: "video", src: hotspot.video });
                } else {
                  setActiveMedia({ type: "text", content: hotspot.text });
                }

                console.log(`Displaying ${hotspot.video ? "Video" : "Text"}: ${hotspot.video || hotspot.text}`);
              }}
            >
              <div className="HotspotAnnotation">{hotspot.id}</div>
            </button>
          ))}
        </model-viewer>
      )}

      {selectedFeature && (
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
            <span className="text-red-500 font-bold text-sm">{selectedFeature.id}</span>
          </div>
          <div className="flex flex-col flex-grow">
            <h2 className="text-sm font-bold">{selectedFeature.name}</h2>
            <button className="mt-2 flex items-center space-x-2 py-1 rounded-full text-white font-bold">
              <span className="text-xs">Delve Deeper</span>
              <img src="/assets/delve-deeper.png" alt="Delve Deeper" className="w-5 h-5 brightness-10 contrast-0" />
            </button>
          </div>
        </div>
      )}

      {activeMedia && (
        <button
          className="absolute bottom-5 right-10 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
          onClick={() => {
            setActiveMedia(null);
            setSelectedFeature(null);
          }}
        >
          Back to Model
        </button>
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
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
