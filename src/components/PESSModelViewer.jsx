"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";

export default function PESSModelViewer({ modelPath, setActiveFeature, activeFeature }) {
  const { activeFeatureModels, setActiveFeatureModel } = useProductStore();
  const activeModel = activeFeatureModels[3] ?? modelPath;
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showFeatureDetails, setShowFeatureDetails] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    console.log("Active Feature Updated:", activeFeature);
  }, [activeFeature]);

  const hotspots = [
    { id: 1, name: "Earthquake Detection", url: "/PESS/PESS_Seimic(si).glb", position: "-0.150m 0.280m 0.010m", hotspotPosition: { top: "1%", left: "72%" }, image: "/EPMS/EPMS_1.png" },
    { id: 2, name: "Overcurrent Protection", url: "/PESS/PESS_Current(A).glb", position: "0.140m 0.270m 0.015m", hotspotPosition: { top: "10%", left: "83%" }, image: "/EPMS/EPMS_1.png" },
    { id: 3, name: "Earth Leakage", url: "/PESS/PESS_Leakage_Current.glb", position: "-0.130m 0.230m 0.100m", hotspotPosition: { top: "30%", left: "79%" }, image: "/EPMS/EPMS_3.png" },
    { id: 4, name: "Under Voltage", url: "/PESS/PESS_Voltage.glb", position: "-0.140m 0.040m 0.010m", hotspotPosition: { top: "53%", left: "88%" }, image: "/EPMS/EPMS_4.png" },
    { id: 5, name: "Over Voltage", url: "/PESS/PESS_Voltage.glb", position: "0.188m 0.165m 0.109m", hotspotPosition: { top: "68%", left: "78%" }, image: "/EPMS/EPMS_4.png" },
    { id: 6, name: "Phase Loss", url: "/PESS/PESS_Voltage.glb", position: "0.180m 0.055m 0.014m", hotspotPosition: { top: "89%", left: "82%" }, image: "/EPMS/EPMS_4.png" }
  ];

  return (
    <div className="flex items-center justify-center w-full relative">
      <model-viewer
        src={activeModel}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
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
              setActiveFeatureModel(3, hotspot.url);
              setShowFeatureDetails(true);
            }}
          >
            <div className="HotspotAnnotation">{hotspot.id}</div>
          </button>
        ))}
      </model-viewer>

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
          onClick={() => {
            console.log("Floating Hotspot Clicked:", hotspot.id);
            setActiveFeature(hotspot);
            setSelectedFeature(hotspot);
            setActiveFeatureModel(3, hotspot.url);
            setShowFeatureDetails(true);
          }}
        >
          <img src={hotspot.image} className="w-8 h-8 rounded-full border-2 p-1 border-dehn-red" />
        </button>
      ))}

      {selectedFeature && showFeatureDetails && (
        <div
          className="absolute flex items-center bg-gray-800 text-white p-1 px-3 rounded-full shadow-lg w-54 border-l-4 border-dehn-red max-w-md transition-all duration-500"
          style={{
            top: "45%",
            left: "90%",
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
      `}</style>
    </div>
  );
}
