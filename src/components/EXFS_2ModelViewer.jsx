"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";

export default function EXFS_2ModelViewer({ modelPath, setActiveFeature, activeFeature }) {
  const { activeFeatureModels, setActiveFeatureModel } = useProductStore();
  const activeModel = activeFeatureModels[7] ?? modelPath;
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
        { id: 1, name: "Lighting Protection", text: "⚡Isolating spark gap for hazardous areas",  hotspotPosition: { top: "5%", left: "74%" }, image: "/EXFS/EXFS_2.png" },
        { id: 2, name: "High Current Capacity", text: "⚡Withstands 100 kA (10/350 µs) lightning impulse current", hotspotPosition:  { top: "15%", left: "85%" }, image: "/EXFS/EXFS_2.png" },
        { id: 3, name: "Low Sparkover Voltage", text: "📉 Ensures reliable equipotential bonding (≤ 1.25 kV)",hotspotPosition:{ top: "33%", left: "80%" }, image: "/EXFS/EXFS_2.png" },
        { id: 4, name: "ATEX & IECEx Certified", text: "✅ Approved for Ex Zone 1 (Gas) & Zone 21 (Dust)", hotspotPosition: { top: "57%", left: "87%" }, image: "/EXFS/EXFS_2.png" },
        { id: 5, name: "Rugged and Waterproof", text: "IP67-rated for harsh environments",  hotspotPosition:{ top: "73%", left: "78%" }, image: "/EXFS/EXFS_2.png" },
        { id: 6, name: "Versatile Installation", video: "/EXFS/EXFS_2_feature.webp", hotspotPosition: { top: "92%", left: "81%" }, image: "/EXFS/EXFS_2.png" }
      ];

  return (
    <div className="flex items-center justify-center w-full relative">
    {isVideoActive && (
        <div className="absolute flex flex-col items-center bg-dehn-eerieblack bg-opacity-80 p-4 rounded-lg shadow-lg z-40">
          <p className="text-white text-sm">Versatile Installation</p>
         <img src="/EXFS/EXFS_2_feature.webp" alt="backup-fuse" className="w-100 h-60" />
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
      
      </model-viewer>

      {activeText && (
        <div className="absolute top-10 left-50 transform -translate-x-1/2  p-3  text-black animate-fadeIn fade-out">
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
            if (hotspot.id === 6) {
              setIsVideoActive(true);
            } else {
              setIsVideoActive(false);
            }
          }}
        >
          <img src={hotspot.image} className="w-8 h-8 rounded-full border-2 border-dehn-red" />
        </button>
      ))}
        {selectedFeature && showFeatureDetails && (
        <div
          className="absolute flex items-center bg-gray-800 text-white p-1 px-3 rounded-full shadow-lg w-54 border-l-4 border-dehn-red max-w-md transition-all duration-500"
          style={{
            top: "48%",
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

