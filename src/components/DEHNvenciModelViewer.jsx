"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";

export default function DEHNvenciModelViewer({ modelPath, setActiveFeature, activeFeature }) {
  const { activeFeatureModels, setActiveFeatureModel } = useProductStore();
  const activeModel = activeFeatureModels[4] ?? modelPath;
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showFeatureDetails, setShowFeatureDetails] = useState(false);
  const [activeText, setActiveText] = useState(null);


  useEffect(() => {
    console.log("Active Model Updated:", activeModel);
  }, [activeModel]);
  
  useEffect(() => {
    if (selectedFeature) {
      setShowFeatureDetails(true);
    }
  }, [selectedFeature]);

  const hotspots = [
        { id: 1, name: "Integrated Backup Fuse", video: "/DEHNVenci/integrated_backup_fuse.webp", position: "-0.0169m 0.1634m 0.0104m", hotspotPosition: { top: "8%", left: "75%" }, image: "/assets/info.png" },
        { id: 2, name: "High Lightning Current Discharge Capacity", text: "Handles up to 25 kA (10/350 µs) Lightning Current", position: "0.0165m 0.1641m 0.0096m", hotspotPosition: { top: "23%", left: "86%" }, image: "/assets/info.png" },
        { id: 3, name: "RADAX Flow Technology", text: "Extinguishes mains follow currents up to 100 kArms.", position: "-0.0167m 0.1100m 0.0351m",hotspotPosition: { top: "50%", left: "80%" }, image: "/assets/info.png" },
        { id: 4, name: "Low Voltage Protection Level (≤ 1.5 kV)", text: "✅Keeps Voltage Levels Safe", position: "-0.0160m 0.0171m 0.0124m", hotspotPosition: { top: "72%", left: "85%" }, image: "/assets/info.png" },
        { id: 5, name: "Green/Red Indicator for Fault Detection", text: "✅Visual Fault Indication for Quick Diagnosis", position: "0.0162m 0.0163m 0.0124m", hotspotPosition: { top: "86%", left: "74%" }, image: "/assets/info.png" }
      ];

  return (
    <div className="flex items-center justify-center w-full relative">
    {isVideoActive && (
        <div className="absolute flex flex-col items-center bg-dehn-eerieblack bg-opacity-80 p-4 rounded-lg shadow-lg z-40">
          <p className="text-white text-sm">Integrated Backup Fuse</p>
         <img src="/DEHNVenci/integrated_backup_fuse.webp" alt="backup-fuse" className="w-80 h-80" />
          <button
            className="mt-2 bg-white text-white px-2 py-2 rounded-lg shadow-md transition duration-300 hover:bg-red-700 relative z-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoActive(false);
              setSelectedFeature(null);
              setActiveFeature(null);
              setActiveText(null);

            }}
          >
            <img src="/assets/arrow.png" alt="" className="w-5 h-5" />
          </button>
        </div>
      )}
      <model-viewer
        src={activeModel}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        disable-pan
        tone-mapping="neutral"
        shadow-intensity="1"
        style={{ width: "50rem", height: "28rem" }}
      >
        {hotspots.map((hotspot) => (
          <button
            key={`hotspot-annotation-${hotspot.id}`}
            className={`Hotspot ${activeFeature?.id === hotspot.id ? "pulse" : ""}`}
            slot={`hotspot-${hotspot.id}`}
            data-position={hotspot.position}
            data-normal="0m 0.7m 0.7m"
            onClick={() => {
              console.log("Annotation Clicked:", hotspot.id);
              setActiveFeature(hotspot);
              setSelectedFeature(hotspot);
              setShowFeatureDetails(true);
              if (hotspot.text) {
                setActiveText(hotspot.text);
              }
              if (hotspot.id === 1) {
                setIsVideoActive(true);
              } else {
                setIsVideoActive(false);
              }
            }}
          >
            <div className="HotspotAnnotation">{hotspot.id}</div>
          </button>
        ))}
      </model-viewer>

      {activeText && (
        <div className="absolute top-5 left-40 transform -translate-x-1/2  p-3  text-black animate-fadeIn fade-out">
          {/* <p className="text-sm font-bold">{selectedFeature?.name}</p> */}
          <p className="text-xs font-semibold animate-slideIn">{activeText}</p>
        </div>
      )}
     

      {hotspots.map((hotspot) => (
        <button
          key={`hotspot-btn-${hotspot.id}`}
          className={`absolute flex items-center justify-center cursor-pointer transition-all duration-500 ${
            selectedFeature?.id === hotspot.id ? "scale-125 opacity-0" : "opacity-100"
          }`}
          style={{
            top: selectedFeature?.id === hotspot.id ? "40%" : hotspot.hotspotPosition.top,
            left: selectedFeature?.id === hotspot.id ? "90%" : hotspot.hotspotPosition.left,
            transform: selectedFeature?.id === hotspot.id ? "translate(-50%, -50%) scale(1.5)" : "scale(1)",
            zIndex: selectedFeature?.id === hotspot.id ? "50" : "1"
          }}
          onClick={(e) => {
            e.stopPropagation();
            setActiveFeature(hotspot);
            setSelectedFeature(hotspot);
            setActiveFeatureModel(3, hotspot.url);
            setShowFeatureDetails(true);
            setActiveText(hotspot.text || null);
            if (hotspot.id === 1) {
              setIsVideoActive(true);
            } else {
              setIsVideoActive(false);
            }
          }}
        >
          <img src={hotspot.image} className="w-8 h-8 rounded-full border-2 p-1 border-dehn-red" />
        </button>
      ))}
        {selectedFeature && showFeatureDetails && (
        <div
          className="absolute flex items-center bg-gray-800 text-white p-1 px-3 rounded-full shadow-lg w-64 border-l-4 border-dehn-red max-w-md transition-all duration-500"
          style={{
            top: "40%",
            left: "88%",
            transform: "translate(-50%, -50%)",
            opacity: 1,
            zIndex: 100
          }}
        >
          <div className="relative flex items-center justify-center bg-white rounded-full w-10 h-10 p-1 border-2 border-dehn-red">
            <img src={selectedFeature.image} className="w-full h-full object-contain rounded-full" />
            <span className="absolute top-[-0.2rem] right-[-0.25rem] bg-white text-dehn-red text-[0.5em] border border-dehn-red font-bold rounded-full px-1 py-0">
              {selectedFeature.id}
            </span>
          </div>
          <div className="flex flex-col flex-grow ml-3">
            <h2 className="text-[0.6em] font-bold mt-2">{selectedFeature.name}</h2>
            <button className="mt-2 flex items-center space-x-2 py-1 rounded-full text-white font-bold">
              <span className="text-[0.5em]">Delve Deeper</span>
              <img src="/assets/delve-deeper.png" alt="Delve Deeper" className="w-3 h-2.5 brightness-10 contrast-0" />
              
            </button>
            <div className="border border-dehn-red w-[70]"></div>
          </div>
        </div>
      )}
        <style jsx>{`
        .pulse::before {
          content: "";
          position: absolute;
          width: 1.25rem;
          height: 1.25rem;
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
           @keyframes slideIn {
    0% {
      transform: translateY(0.625rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .animate-slideIn {
    animation: slideIn 0.5s ease-out forwards;
  }

  .fade-out {
    transition: opacity 0.5s ease-out;
  }
      `}</style>
    </div>
  );
}

