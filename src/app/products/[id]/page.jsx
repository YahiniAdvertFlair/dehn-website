"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import useProductStore from "../../../components/store/useProductStore";
import Image from "next/image";
import ProductModelViewer from "@/components/ProductModelViewer";
import { QRCodeCanvas } from "qrcode.react";
import DelveDeeperButton from "@/components/DelveDeeperButton";
import Link from "next/link";
import ProductFeatures from "../features/[id]/page";
import ApplicationPage from "../applications/page";
import BenefitsPage from "../benefits/page";
import AdditionalPage from "../additional-info/page";
import RecommendedProducts from "../recommended/page";

export default function ProductDetails() {
  const { id: paramId } = useParams();
  const router = useRouter();
  const { getProductById } = useProductStore();
  const [product, setProduct] = useState(null);
  const [activeVariant, setActiveVariant] = useState(Number(paramId));
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeMode, setActiveMode] = useState("360");
  const [showArModal, setShowArModal] = useState(false);
  const modelRef = useRef(null);
  const [scrollStep, setScrollStep] = useState(0); 


  const featuresRef=useRef(null);
   const applicationRef = useRef(null);
    const benefitsRef = useRef(null);
    const additionalRef = useRef(null);

  useEffect(() => {
    const fetchedProduct = getProductById(activeVariant);
    setProduct(fetchedProduct);
  }, [activeVariant]);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      modelRef.current.requestFullscreen?.();
      setIsFullScreen(true);
      setActiveMode("fullscreen");
    } else {
      document.exitFullscreen?.();
      setIsFullScreen(false);
      setActiveMode("360");
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        setActiveMode("360");
      }
    };
  
    document.addEventListener("fullscreenchange", handleFullscreenChange);
  
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  
  const FullScreen = () => {
    if (!isFullScreen && modelRef.current) {
      modelRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };
  const handleScrollToSection = () => {
    const headerHeight = 60; 
  
    let targetRef;
    if (scrollStep === 0) {
      targetRef = featuresRef;
    } else if (scrollStep === 1) {
      targetRef = applicationRef;
    } else if (scrollStep === 2) {
      targetRef = benefitsRef;
    }else if(scrollStep ===3){
      targetRef = additionalRef;
    }
  
    if (targetRef?.current) {
      const targetPosition = targetRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition - headerHeight, 
        behavior: "smooth"
      });
    }
  
    setScrollStep((prevStep) => (prevStep + 1) % 4);
  };
  

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center mt-30 md:px-10 ${isFullScreen ? "fixed inset-0 bg-white z-50" : ""}`}>
     
     <header className="fixed top-0 left-0 w-full z-50 flex items-center p-4 border-b border-gray-200 bg-white">
        <Link href="/" passHref>
          <Image
            src="/assets/dehn-logo.png"
            alt="DEHN Logo"
            width={140}
            height={40}
            className="cursor-pointer"
          />
        </Link>            
      </header>

  <nav className="text-sm text-gray-500 flex space-x-2 absolute left-20 top-25">
    <Link href="/" className="hover:text-dehn-red hover:underline">Home </Link>
    <span> &gt; </span>
    <span className="text-dehn-red font-medium">{product.title}</span>
  </nav>
      
      <div className="text-center max-w-3xl mx-auto md:mt-6 ">
        <h1 className="text-xl md:text-5xl font-bold text-dehn-red">{product.title}</h1>
        <p className="text-gray-600 mt-2 md:text-md text-xs">{product.description}</p>
      </div>

      {paramId == "6" && (
        <div className="flex space-x-4 mt-4">
          <button
            className={`px-2 py-2 rounded-full text-sm font-bold transition ${activeVariant === 6 ? "border border-dehn-red " : "border border-gray-500  opacity-50"}`}
            onClick={() => setActiveVariant(6)}
          >
            <img src="/EXFS/EXFS_1.png" alt="" className="w-5 h-5 object-cover" />
          </button>
          <button
            className={`px-2 py-2 rounded-full text-sm font-bold transition ${activeVariant === 7 ? " border border-dehn-red " : "border border-gray-500 text-dehn-red opacity-50"}`}
            onClick={() => setActiveVariant(7)}
          >
            <img src="/EXFS/EXFS_2.png" alt="" className="w-5 h-5 object-cover" />
          </button>
        </div>
      )}

      <div
        ref={modelRef}
        className={`relative flex items-center justify-center bg-transparent ${
          isFullScreen ? "h-screen w-screen bg-white" : "w-full"
        }`}
      >
        <ProductModelViewer
          modelPath={product.modelSrc}
          size={isFullScreen ? "large" : "small"} 
        />

       
<div className="absolute md:right-10 md:top-1/4 right-1 top-4 flex flex-col space-y-4">
  
  <div className="relative group">
    <button
      onClick={() => setActiveMode("360")}
      className={`p-2 rounded-full shadow-md transition flex items-center justify-center w-10 h-10 cursor-pointer ${
        activeMode === "360" ? "bg-dehn-eerieblack text-white" : "bg-dehn-eerieblack hover:bg-gray-300"
      }`}
    >
      <img src="/assets/360.png" alt="360°" className="w-5 h-5" />
    </button>
    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-dehn-textgrey text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
      360° View
    </span>
  </div>

  <div className="relative group">
    <button
      onClick={toggleFullScreen}
      className={`p-2 rounded-full shadow-md transition flex items-center justify-center w-10 h-10 cursor-pointer ${
        activeMode === "fullscreen" ? "bg-gray-500 text-white" : "bg-white hover:bg-gray-300"
      }`}
    >
      <img src="/assets/full-screen.png" alt="Full-Screen" className="w-5 h-5" />
    </button>
    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-dehn-textgrey text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
      Fullscreen
    </span>
  </div>

  {!isFullScreen && (
    <div className="relative group">
      <button
        onClick={() => setShowArModal(true)}
        className={`p-2 rounded-full shadow-md transition md:flex items-center justify-center w-10 h-10 cursor-pointer hidden ${
          activeMode === "ar" ? "bg-gray-50 text-white" : "bg-white hover:bg-gray-300"
        }`}
      >
        <img src="/assets/AR.png" alt="AR Mode" className="w-5 h-5" />
      </button>
      <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-dehn-textgrey text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        View in AR
      </span>
    </div>
  )}

</div>

      </div>

      {showArModal && (
        <div className="fixed inset-0 bg-gray-400/70 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
            <button
              onClick={() => setShowArModal(false)}
              className="absolute top-2 right-2 bg-dehn-white text-dehn-red hover:bg-dehn-eerieblack hover:text-dehn-white border cursor-pointer rounded-full px-1.5"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-dehn-red mb-4">Scan to View in AR</h2>
            <div className="flex justify-center items-center">
              <QRCodeCanvas value={product.arLink} size={180} />
            </div>
          </div>
        </div>
      )}

      <div className="absolute left-10 top-1/2 -rotate-90 text-gray-500 text-sm md:flex gap-2 hidden">
        <img src="/assets/360.png" alt="360°" className="w-5 h-5 bg-gray-500 rounded-3xl" />
        360° DEGREE ROTATION ENABLED
      </div>

      <div className="fixed bottom-10 left-20 flex flex-row items-center space-x-2 cursor-pointer z-[-1]">
        <button
          onClick={() => router.push(`/`)}
          className="p-3 border border-dehn-red rounded-full text-dehn-red hover:bg-gray-200 hover:text-white cursor-pointer"
        >
          <img src="/assets/arrow.png" alt="Back" className="w-5 h-5" />
        </button>
        <span className="text-sm text-dehn-red font-bold hidden md:block">Back to Home</span>
      </div>

      <div className="fixed bottom-10 right-20 flex flex-row items-center space-x-2 group  ">
        <span className="text-sm text-dehn-red font-bold hidden md:block">Delve Deeper</span>
        <DelveDeeperButton id={activeVariant} handleScrollToSection={handleScrollToSection}/>
        <span className="absolute -top-8 left-1/2 -translate-x-1/9 bg-dehn-textgrey text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Explore More
    </span>
      </div>
      <section ref={featuresRef}>
      <ProductFeatures/>
      </section>
        <section ref={applicationRef} >
              <ApplicationPage />
            </section>
            <section ref={benefitsRef}>
              <BenefitsPage />
            </section>
            <section ref={additionalRef}>
              <AdditionalPage />
            </section>
      <section>
            <RecommendedProducts />
      </section>
    </div>
  );
}
