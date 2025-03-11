"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";

export default function CPMSModelViewer({ modelPath, setActiveFeature, activeFeature }) {
  const { activeFeatureModels } = useProductStore();
  const activeModel = activeFeatureModels[2] ?? modelPath;

  const [activeMedia, setActiveMedia] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    console.log("Active Model Updated:", activeModel);
  }, [activeModel]);

  const hotspots = [
    { id: 1, name: "AC Voltage Monitoring", image: "/CPMS/AC_voltage.webp", size: "w-10 h-10", position: { top: "5%", left: "85%" } },
    { id: 2, name: "DC PSP ON/OFF Voltage Monitoring", image: "/CPMS/DC_PSP.webp", size: "w-10 h-8", position: { top: "25%", left: "78%" } },
    { id: 3, name: "AC/DC Current Monitoring", image: "/CPMS/ACDC_current.webp", size: "w-12 h-12", position: { top: "40%", left: "90%" } },
    { id: 4, name: "Wireless Connectivity via LoRa", image: "/CPMS/Internet.webp", size: "w-10 h-10", position: { top: "55%", left: "78%" } },
    { id: 5, name: "Real-Time Data & History", image: "/CPMS/real_time.webp", size: "w-9 h-9", position: { top: "70%", left: "89%" } },
    { id: 6, name: "Automated Alerts & Diagnostics", video: "/CPMS/CPMS Alert.mp4", preview: "/CPMS/clapperboard.png", size: "w-8 h-8", position: { top: "85%", left: "73%" } } 
  ];

  return (
    <div className="flex items-center justify-center w-full relative">
      {activeMedia ? (
        activeMedia.type === "video" ? (
          <video width="800" height="420" controls autoPlay className="rounded-lg shadow-lg">
            <source src={activeMedia.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={activeMedia.src}
            alt="Feature Image"
            className="w-[50rem] h-[26.25rem] object-contain rounded-lg shadow-lg"
          />
        )
      ) : (
        <model-viewer
          src={activeModel}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          min-camera-orbit="auto auto 1m"
          max-camera-orbit="auto auto 3m"
          tone-mapping="neutral"
          shadow-intensity="1"
          style={{ width: "50rem", height: "26.25rem" }}
          className="model-container"
        />
      )}

      {hotspots.map((hotspot, index) => (
        <button
          key={hotspot.id}
          className={`absolute flex items-center justify-center cursor-pointer ${
            activeMedia
              ? "w-10 h-10 bg-gray-500 text-white font-bold rounded-full shadow-lg right-5"
              : `${hotspot.size} bg-transparent rounded-full flex items-center justify-center text-white transition duration-300`
          } ${selectedFeature?.id === hotspot.id ? "border-2 border-red-500 shadow-lg" : "border-2 border-transparent"}`}
          style={
            activeMedia
              ? { top: `${index * 12 + 10}%`, right: "0%" } 
              : { top: hotspot.position.top, left: hotspot.position.left } 
          }
          onClick={() => {
            setSelectedFeature(hotspot);
            setActiveFeature(hotspot);

            if (hotspot.video) {
              setActiveMedia({ type: "video", src: hotspot.video });
            } else {
              setActiveMedia({ type: "image", src: hotspot.image });
            }
            console.log(`Displaying ${hotspot.video ? "Video" : "Image"}: ${hotspot.video || hotspot.image}`);
          }}
        >
          {activeMedia ? (
              <img
              src={hotspot.video ? hotspot.preview : hotspot.image} 
              alt={hotspot.name}
              className="w-8 h-8 rounded-full border-2 border-dehn-red"
            />
          ) : (
            <img
              src={hotspot.video ? hotspot.preview : hotspot.image} 
              alt={hotspot.name}
              className="w-8 h-8 rounded-full border-2 border-dehn-red"
            />
          )}
        </button>
      ))}

   

{activeMedia && (
        <button
          className="absolute bottom-[3] text-sm bg-gray-200 rounded-lg right-5 flex items-center space-x-2 text-dehn-red px-2 py-2 cursor-pointer"
          onClick={() => {
            setActiveMedia(null);
            setSelectedFeature(null);
            setActiveFeature(null);
          }}
        >
          <img src="/assets/arrow.png" alt="back-icon" className="w-5 h-5" />
        </button>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(1.25rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
