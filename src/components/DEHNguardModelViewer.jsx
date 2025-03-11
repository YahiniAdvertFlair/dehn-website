

"use client";
import { useEffect, useRef, useState } from "react";
import useProductStore from "@/components/store/useProductStore";

export default function DEHNguardModelViewer({ modelPath, setActiveFeature, activeFeature }) {
  const { activeFeatureModels, setActiveFeatureModel } = useProductStore();
  const activeModel = activeFeatureModels[5] ?? modelPath;
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showFeatureDetails, setShowFeatureDetails] = useState(false);
  const [activeText, setActiveText] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRef = useRef(null);


  useEffect(() => {
    console.log("Active Model Updated:", activeModel);
  }, [activeModel]);
  useEffect(() => {
    if (selectedFeature) {
      setShowFeatureDetails(true);
    }
  }, [selectedFeature]);

  useEffect(() => {
    if (isVideoActive && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoActive]);

  const hotspots = [
        { id: 1, name: "ACI Technology",videoText:"⚡Built-in switch/spark gap combination", video: "/DEHNguard/ACI_part_animation.mp4", position: "-0.034229252092449584m 0.09609835561690527m 0.01671331316461716m", hotspotPosition: { top: "10%", left: "75%" }, image: "/DEHNguard/dehnguard.png" },
        { id: 2, name: "Status indication",videoText:"✅ Visual Fault Indication for Quick Diagnosis", video: "/DEHNguard/ACI_arc_fuse_current.mp4", position: "0.03299075453367157m 0.09595904160810245m 0.0168733273708101m", hotspotPosition: { top: "15%", left: "86%" }, image: "/DEHNguard/dehnguard.png" },
        { id: 3, name: "Zero Leakage Current",videoText:"✅ Ensures safe and efficient operation", video: "/DEHNguard/current_dissipated_SPD.mp4", position: "-0.03497720896088569m 0.07384910615046268m 0.04418744728111765m",hotspotPosition: { top: "50%", left: "88%" }, image: "/DEHNguard/dehnguard.png" },
        { id: 4, name: "High TOV Withstand(440V AC)", text: "⚡Handles temporary overvoltages effectively", position: "0.034446589678363275m 0.07452957860749204m 0.04370905489627286m", hotspotPosition: { top: "60%", left: "77%" }, image: "/DEHNguard/dehnguard.png" },
        { id: 5, name: "Push-In Connection System", text: "🔌Quick and easy tool-free installation", position: "-0.034124522203320816m 0.012002792336987339m 0.019447603353213327m", hotspotPosition: { top: "75%", left: "75%" }, image: "/DEHNguard/dehnguard.png" },
        { id: 6, name: "Vibration & Shock Tested", text: "🛡️Ensures durability in tough environments", position: "0.03479702838378839m 0.011463536687446332m 0.01931655630432m", hotspotPosition: { top: "73%", left: "87%" }, image: "/DEHNguard/dehnguard.png" }
      ];

  return (
    <div className="flex items-center justify-center w-full relative">
{isVideoActive && selectedFeature?.id <= 3 && (
  <div className="absolute flex flex-col items-center bg-black bg-opacity-80 p-4 rounded-lg shadow-lg z-40">
    {/* <p className="text-white text-sm animate-textFadeIn">{activeText}</p> */}
    
    <video key={activeVideo} ref={videoRef} width="350" height="250" controls autoPlay className="rounded-lg shadow-lg relative z-50">
      <source src={activeVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <button
      className="mt-2 bg-white text-black px-2 py-2 rounded-lg shadow-md transition duration-300 hover:bg-red-700 hover:text-white relative z-50 cursor-pointer"
      onClick={() => {
        setIsVideoActive(false);
        setSelectedFeature(null);
        setActiveFeature(null);
        setActiveText(null);
        setActiveVideo(null);
      }}
    >
<img src="/assets/arrow.png" alt="" className="w-5 h-5"/>   
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
                
                if (hotspot.video) {
                  setActiveVideo(hotspot.video);
                  setActiveText(hotspot.videoText);
                  setIsVideoActive(true);
                } else {
                  setIsVideoActive(false);
                  setActiveText(hotspot.text || null);
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
          onClick={() => {
            setActiveFeature(hotspot);
            setSelectedFeature(hotspot);
            setActiveFeatureModel(3, hotspot.url);
            setShowFeatureDetails(true);
      
            if (hotspot.video) {
              console.log(`Playing Video: ${hotspot.video}`); 
              setActiveVideo(hotspot.video);
              setActiveText(hotspot.videoText);
              setIsVideoActive(true);
            } else {
              setIsVideoActive(false);
              setActiveText(hotspot.text || null);
            }
          }}
        >
          <img src={hotspot.image} className="w-10 h-10 rounded-full border-1 border-dehn-red p-2" />
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
          <div className="relative flex items-center justify-center bg-white rounded-full w-10 h-10 p-1 border-2 border-gray-200">
            <img src={selectedFeature.image} className="w-full h-full object-contain rounded-full" />
            <span className="absolute top-[-0.25rem] right-[-0.25rem] bg-white text-dehn-red text-[0.5em] font-bold border border-dehn-red rounded-full px-1 py-0.1">
              {selectedFeature.id}
            </span>
          </div>
          <div className="flex flex-col flex-grow ml-3">
            <h2 className="text-xs font-bold mt-2">{selectedFeature.name}</h2>
            <button className="mt-2 flex items-center space-x-2 py-1 rounded-full text-white font-bold">
              <span className="text-[0.5em]">Delve Deeper</span>
              <img src="/assets/delve-deeper.png" alt="Delve Deeper" className="w-5 h-5 brightness-10 contrast-0" />
            </button>
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

