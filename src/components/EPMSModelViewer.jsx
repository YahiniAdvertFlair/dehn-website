"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";
// import '@google/model-viewer';


export default function EPMSModelViewer({ modelPath }) {
  const { activeFeatureModels, setActiveFeatureModel } = useProductStore();
  const activeModel = activeFeatureModels[1] ?? modelPath; // Ensure default model fallback

  useEffect(() => {
    console.log("Active Model Updated:", activeModel);
  }, [activeModel]);

  return (
    <div className="flex items-center justify-center w-full">
      <model-viewer
        src={activeModel}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        tone-mapping="neutral"
        shadow-intensity="1"
        style={{ width: "800px", height: "420px", backgroundColor: "#f0f0f0" }}
      >
        <button className="Hotspot" slot="hotspot-1" data-position="-0.173m 0.299m 0.010m" data-normal="0m 0.7m 0.7m" 
          onClick={() => {
            setActiveFeatureModel(1, "/EPMS/EPMS_Earth_Resistance.glb");
            console.log("Changed Model to: /EPMS/EPMS_Earth_Resistance.glb");
          }}
        >
          <div className="HotspotAnnotation">1</div>
        </button>

        <button className="Hotspot" slot="hotspot-2" data-position="0.173m 0.295m 0.013m" data-normal="0m 0.14m 0.98m" 
          onClick={() => {
            setActiveFeatureModel(1, "/EPMS/EPMS_Wire_connect.glb");
            console.log("Changed Model to: /EPMS/EPMS_Wire_connect.glb");
          }}
        >
          <div className="HotspotAnnotation">2</div>
        </button>

        <button className="Hotspot" slot="hotspot-3" data-position="-0.179m 0.220m 0.109m" data-normal="0m 0.13m 0.99m" 
          onClick={() => {
            setActiveFeatureModel(1, "/EPMS/EPMS_Earth_Neutral.glb");
            console.log("Changed Model to: /EPMS/EPMS_Earth_Neutral.glb");
          }}
        >
          <div className="HotspotAnnotation">3</div>
        </button>

        <button className="Hotspot" slot="hotspot-4" data-position="-0.185m 0.036m 0.013m" data-normal="0m -0.14m 0.98m" 
          onClick={() => {
            setActiveFeatureModel(1, "/EPMS/EPMS_Earth_Leak.glb");
            console.log("Changed Model to: /EPMS/EPMS_Earth_Leak.glb");
          }}
        >
          <div className="HotspotAnnotation">4</div>
        </button>

        <button className="Hotspot" slot="hotspot-5" data-position="0.186m 0.045m 0.014m" data-normal="0m -0.145m 0.98m" 
          onClick={() => {
            setActiveFeatureModel(1, "/EPMS/EPMS.mp4");
            console.log("Changed Model to: /EPMS/EPMS.mp4");
          }}
        >
          <div className="HotspotAnnotation">5</div>
        </button>

        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar"></div>
        </div>

        <button slot="ar-button" id="ar-button">
          View in your space
        </button>

        <div id="ar-prompt">
          <img src="https://modelviewer.dev/shared-assets/icons/hand.png" />
        </div>
      </model-viewer>
    </div>
  );
}
