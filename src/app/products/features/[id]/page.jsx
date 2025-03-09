"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";
import EPMSModelViewer from "@/components/EPMSModelViewer";
import DefaultModelViewer from "@/components/ProductModelViewer"; 
import Image from "next/image";
import PESSModelViewer from "@/components/PESSModelViewer";
import CPMSModelViewer from "@/components/CPMSModelViewer";
import DEHNvenciModelViewer from "@/components/DEHNvenciModelViewer";
import Applicationpage from "../../applications/page";
import ApplicationPage from "../../applications/page";
import BenefitsPage from "../../benefits/page";
import AdditionalPage from "../../additional-info/page";
import RecommendedProducts from "../../recommended/page";

export default function ProductFeatures() {
  const { id: paramId } = useParams(); 
  const id = Number(paramId); 
  const { getProductById, setActiveFeatureModel } = useProductStore();
  const [product, setProduct] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [forceReload, setForceReload] = useState(false); 
  const [isScrollingUp, setIsScrollingUp] = useState(false); 

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchedProduct = getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      router.replace("/404"); 
    }
  }, [id]);

  useEffect(() => {
   
    if (!isVideoActive && activeFeature?.id !== 5) {
      setForceReload(true);  
      setTimeout(() => setForceReload(false), 200); 
      setActiveFeatureModel(id, activeFeature?.url);
    }
  }, [isVideoActive, activeFeature]);

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  relative">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center p-4">
        <Image src="/assets/dehn-logo.png" alt="DEHN Logo" width={140} height={40} />
      </header>

      <div className="text-center max-w-3xl mx-auto mt-26">
        <h1 className="text-4xl md:text-5xl font-bold text-dehn-red">Interactive Features</h1>
        <p className="text-gray-600 mt-2 text-md">
          Unlock real-time monitoring, intelligent diagnostics, and seamless system integration for enhanced surge protection and performance.
        </p>
      </div>

   
      <div 
  className="relative flex items-center justify-center p-6 border border-gray-400 rounded-lg bg-cover bg-center bg-no-repeat "
  style={{
    minWidth: "900px", 
    minHeight: "450px", 
    height: "450px", 
    width: "auto",
    transition: "all 0.3s ease-in-out"
  }}

>
<div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
    backgroundImage: "url('/assets/BG.png')",
    opacity: 0.5, 
    zIndex: -1 
  }}></div>
  {isVideoActive ? (
    <video 
      width="500" 
      height="180" 
      controls 
      autoPlay 
      className="rounded-lg shadow-lg"
      onEnded={() => setIsVideoActive(false)} 
      style={{ display: isVideoActive ? "block" : "none",
        maxHeight: "430px",  

      }}     
    >
      <source src="/EPMS/noise_filter.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) :  id === 2 ? (
    <CPMSModelViewer 
      modelPath={product.modelSrc} 
      setActiveFeature={setActiveFeature} 
      activeFeature={activeFeature} 
    />
  ):  id === 3 ? (
    <PESSModelViewer 
      modelPath={product.modelSrc} 
      setActiveFeature={setActiveFeature} 
      activeFeature={activeFeature} 
    />
  ): id === 4 ? (
    <DEHNvenciModelViewer 
      modelPath={product.modelSrc} 
      setActiveFeature={setActiveFeature} 
      activeFeature={activeFeature} 
    />
  ): !forceReload && id===1 &&(
    <EPMSModelViewer 
      modelPath={product.modelSrc} 
      setActiveFeature={setActiveFeature} 
      activeFeature={activeFeature} 
      style={{ display: !isVideoActive ? "block" : "none" }} 
    />
  )}
      {/* {!isVideoActive && id === 1  && product?.hotspots?.map((hotspot) => (
          <button
            key={hotspot.id}
            className="absolute flex items-center justify-center w-10 h-10 bg-gray-500 text-white font-bold rounded-full shadow-lg transition-transform duration-300"
            style={{ top: `${hotspot.id * 15}%`, right: "10%" }}
            onClick={() => {
              setActiveFeature(hotspot);
              
              if (hotspot.id === 5) {
                setIsVideoActive(true); 
              } else {
                setIsVideoActive(false); 
                setForceReload(true); 
                setTimeout(() => {
                  setForceReload(false);
                  setActiveFeatureModel(id, hotspot.url);
                }, 100);
              }
              console.log(`Changed to: ${hotspot.id === 5 ? "Video" : "3D Model"}`);
            }}
          >
            <img src="/assets/EPMS.png" />
          </button>
        ))} */}
          {/* {!isVideoActive && id === 3  && product?.hotspots?.map((hotspot) => (
          <button
            key={hotspot.id}
            className="absolute flex items-center justify-center w-10 h-10 bg-gray-500 text-white font-bold rounded-full shadow-lg transition-transform duration-300"
            style={{ top: `${hotspot.id * 15}%`, right: "10%" }}
            onClick={() => {
              setActiveFeature(hotspot);
              
            
              console.log(`Changed to: ${hotspot.id === 5 ? "Video" : "3D Model"}`);
            }}
          >
            <img src="/assets/EPMS.png" />
          </button>
        ))} */}
   
</div>


      {activeFeature && (id !== 1 && id !== 3) &&  (
        <div className="absolute flex items-center bg-gray-800 text-white p-1 px-3 rounded-full shadow-lg w-64 max-w-md right-25 top-60 border-l-6 border-dehn-red">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center mr-3">
            <span className="text-dehn-red font-bold text-sm">{activeFeature.id}</span>
          </div>
          <div className="flex flex-col flex-grow">
            <h2 className="text-xs font-bold mt-2">{activeFeature.name}</h2>
            <button className="mt-2 flex items-center space-x-2 py-1 rounded-full text-white font-bold ">
              <span className="text-[0.5em]">Delve Deeper</span>
              <img src="/assets/delve-deeper.png" alt="Delve Deeper" className="w-5 h-5 brightness-10 contrast-0" />
            </button>
          </div>
        </div>
      )}
        {activeFeature && (id===1 ) && (
            <div className="absolute flex items-center bg-gray-800 text-white p-1 px-3 rounded-full shadow-lg w-64 max-w-md right-78 top-90 border-l-6 border-dehn-red">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center mr-3">
                <span className="text-dehn-red font-bold text-sm">{activeFeature.id}</span>
              </div>
              <div className="flex flex-col flex-grow">
                <h2 className="text-xs font-bold mt-2">{activeFeature.name}</h2>
                <button className="mt-2 flex items-center space-x-2 py-1 rounded-full text-white font-bold">
                  <span className="text-[0.5em]">Delve Deeper</span>
                  <img src="/assets/delve-deeper.png" alt="Delve Deeper" className="w-5 h-5 brightness-10 contrast-0" />
                </button>
              </div>
            </div>
          )}

      <div className="fixed bottom-10 left-20 flex flex-row items-center space-x-2 cursor-pointer">
        <button
          onClick={() => router.push(`/products/${id}`)}
          className="p-3 border border-dehn-red rounded-full text-dehn-red hover:bg-gray-200 hover:text-white"
        >
          <img src="/assets/arrow.png" alt="Back" className="w-5 h-5" />
        </button>
        <span className="text-sm text-red-600 font-bold">Back to Product</span>
      </div>

      <div className="fixed bottom-10 right-20 flex flex-row items-center space-x-2">
        <span className="text-sm text-dehn-red font-bold">Delve Deeper</span>
        <button
          onClick={() => {
            setIsScrollingUp(true); 
            setTimeout(() => setIsScrollingUp(false), 800); 
          }}
          className="p-3 border border-dehn-red rounded-full text-red-600 hover:bg-dehn-eerieblack hover:text-white"
        >
          <img src="/assets/delve-deeper.png" alt="Delve Deeper" className="w-5 h-5" />
        </button>
      </div>
      <ApplicationPage/>
      <BenefitsPage/>
      <AdditionalPage/>
      <RecommendedProducts/>
    </div>

  );
}
