"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";
import EPMSModelViewer from "@/components/EPMSModelViewer";
import Image from "next/image";
import PESSModelViewer from "@/components/PESSModelViewer";
import CPMSModelViewer from "@/components/CPMSModelViewer";
import DEHNvenciModelViewer from "@/components/DEHNvenciModelViewer";
import ApplicationPage from "../../applications/page";
import BenefitsPage from "../../benefits/page";
import AdditionalPage from "../../additional-info/page";
import RecommendedProducts from "../../recommended/page";
import DEHNguardModelViewer from "@/components/DEHNguardModelViewer";
import EXFS_1ModelViewer from "@/components/EXFS_1ModelViewer";
import EXFS_2ModelViewer from "@/components/EXFS_2ModelViewer";

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
        <p className="text-gray-600 mt-2 text-md mb-2">
          Unlock real-time monitoring, intelligent diagnostics, and seamless system integration for enhanced surge protection and performance.
        </p>
      </div>

   
      <div 
  className="relative flex items-center justify-center p-6 border border-gray-400 rounded-lg bg-cover bg-center bg-no-repeat "
  style={{
    minWidth: "56.25rem", 
    minHeight: "28.125rem", 
    height: "28.125rem", 
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
        maxHeight: "26.875rem",  

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
  ): id === 5 ? (
    <DEHNguardModelViewer 
      modelPath={product.modelSrc} 
      setActiveFeature={setActiveFeature} 
      activeFeature={activeFeature} 
    />
  ): id === 6 ? (
    <EXFS_1ModelViewer 
      modelPath={product.modelSrc} 
      setActiveFeature={setActiveFeature} 
      activeFeature={activeFeature} 
    />
  )
  : id === 7 ? (
    <EXFS_2ModelViewer 
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
  ): id===1 &&(
    <EPMSModelViewer 
      modelPath={product.modelSrc} 
      setActiveFeature={setActiveFeature} 
      activeFeature={activeFeature} 
      style={{ display: !isVideoActive ? "block" : "none" }} 
    />
  )}
    
        
       
   
</div>


      

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
