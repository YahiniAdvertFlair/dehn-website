"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";

export default function EPMSModelViewer({ modelPath, setActiveFeature, activeFeature }) {
  const { activeFeatureModels, setActiveFeatureModel } = useProductStore();
  const activeModel = activeFeatureModels[1] ?? modelPath;
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showFeatureDetails, setShowFeatureDetails] = useState(false);

  useEffect(() => {
    console.log("Active Model Updated:", activeModel);
  }, [activeModel]);
  useEffect(() => {
    if (selectedFeature) {
      setShowFeatureDetails(true);
    }
  }, [selectedFeature]);

  const hotspots = [
    { id: 1, name: "Earth Resistance Measurement", url: "/EPMS/EPMS_Earth_Resistance.glb", position: "-0.173m 0.299m 0.010m", hotspotPosition: { top: "10%", left: "75%" }, image: "/EPMS/EPMS_1.png" },
    { id: 2, name: "Earth Integrity", url: "/EPMS/EPMS_Wire_connect.glb", position: "0.173m 0.295m 0.013m", hotspotPosition: { top: "25%", left: "86%" }, image: "/EPMS/EPMS_1.png" },
    { id: 3, name: "Neutral-Earth Voltage", url: "/EPMS/EPMS_Earth_Neutral.glb", position: "-0.179m 0.220m 0.109m", hotspotPosition: { top: "50%", left: "80%" }, image: "/EPMS/EPMS_3.png" },
    { id: 4, name: "Earth Leakage Current", url: "/EPMS/EPMS_Earth_Leak.glb", position: "-0.185m 0.036m 0.013m", hotspotPosition: { top: "70%", left: "86%" }, image: "/EPMS/EPMS_4.png" },
    { id: 5, name: "Noise Filtering", url: "/EPMS/noise_filter.mp4", position: "0.186m 0.045m 0.014m", hotspotPosition: { top: "81%", left: "76%" }, image: "/CPMS/clapperboard.png" }
  ];

  return (
    <div className="flex items-center justify-center w-full relative">
     {isVideoActive && (
  <div className="absolute flex flex-col items-center bg-dehn-eerieblack bg-opacity-80 p-4 rounded-lg shadow-lg z-40">
    <video width="300" height="200" controls autoPlay className="rounded-lg shadow-lg relative z-50">
      <source src="/EPMS/noise_filter.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <button
      className="mt-2 bg-white text-white px-2 py-2 rounded-lg shadow-md transition duration-300 hover:bg-red-700 relative z-50"
      onClick={() => {setIsVideoActive(false)
        setSelectedFeature(null);
        setActiveFeature(null);
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

              setActiveFeatureModel(3, hotspot.url);
              setShowFeatureDetails(true);
              if (hotspot.id === 5) {
                setIsVideoActive(true);
              } else {
                setIsVideoActive(false);
                setActiveFeatureModel(1, hotspot.url);
              }
            }}
          >
            <div className="HotspotAnnotation">{hotspot.id}</div>
          </button>
        ))}
      </model-viewer>

      {hotspots.map((hotspot) => (
        <button
          key={`hotspot-btn-${hotspot.id}`}
          className={`absolute flex items-center justify-center cursor-pointer transition-all duration-500  ${
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
            if (hotspot.id === 5) {
              setIsVideoActive(true);
            } else {
              setIsVideoActive(false);
              setActiveFeatureModel(1, hotspot.url);
            }
          }}
        >
          <img src={hotspot.image} className="w-8 h-8 rounded-full border-2 p-1 border-dehn-red" />
        </button>
      ))}
        {selectedFeature && showFeatureDetails && (
        <div
          className="absolute flex items-center bg-gray-800 text-white p-1 px-3 rounded-full shadow-lg w-58 border-l-4 border-dehn-red max-w-md transition-all duration-500"
          style={{
            top: "40%",
            left: "85%",
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
