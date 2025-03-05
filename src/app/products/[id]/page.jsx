"use client";
import { useEffect, useState, useRef } from "react";
import { useParams,useRouter } from "next/navigation";
import useProductStore from "../../../components/store/useProductStore";
import Image from "next/image";
import ModelViewer from "@/components/ModelViewer";
import ProductModelViewer from "@/components/ProductModelViewer";
import {QRCodeCanvas} from "qrcode.react"; 
// import { useRouter } from "next/router";

export default function ProductDetails() {
  const { id } = useParams();
  const { getProductById } = useProductStore();
  const [product, setProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const modelRef = useRef(null);
  const [activeMode, setActiveMode] = useState("360"); 
  const [showArModal, setShowArModal] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(parseInt(id));
      setProduct(fetchedProduct);
    }
  }, [id]);

  
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

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isFullScreen ? "fixed inset-0 bg-white z-50" : ""}`}>
      <header className="absolute top-0 left-0 w-full flex items-center justify-start border-b p-4 border-gray-500/10">
        <Image src="/assets/dehn-logo.png" alt="DEHN Logo" width={140} height={40} />
      </header>

      <div className="text-center max-w-3xl mx-auto mt-6">
        <h1 className="text-4xl md:text-5xl font-bold text-dehn-red">{product.title}</h1>
        <p className="text-gray-600 mt-2 text-md">{product.description}</p>
      </div>

      <div ref={modelRef} className={`relative w-full flex items-center justify-center bg-transparent ${isFullScreen ? "h-screen bg-white" : ""}`}>
        <ProductModelViewer modelPath={product.modelSrc} />

        <div className="absolute right-10 top-1/4 flex flex-col space-y-4">
          <button
            onClick={() => setActiveMode("360")}
            className={`p-2 rounded-full shadow-md transition flex items-center justify-center w-10 h-10 cursor-pointer ${
              activeMode === "360" ? "bg-dehn-eerieblack text-white" : "bg-dehn-eerieblack hover:bg-gray-300"
            }`}
          >
            <img src="/assets/360.png" alt="360°" className="w-5 h-5" />
          </button>

          <button
            onClick={toggleFullScreen}
            className={`p-2 rounded-full shadow-md transition flex items-center justify-center w-10 h-10 cursor-pointer ${
              activeMode === "fullscreen" ? "bg-gray-500 text-white" : "bg-white hover:bg-gray-300"
            }`}
          >
            <img src="/assets/full-screen.png" alt="Full-Screen" className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowArModal(true)} 
            className={`p-2 rounded-full shadow-md transition flex items-center justify-center w-10 h-10 cursor-pointer ${
              activeMode === "ar" ? "bg-gray-50 text-white" : "bg-white hover:bg-gray-300"
            }`}
          >
            <img src="/assets/AR.png" alt="AR Mode" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showArModal && (
        <div className="fixed inset-0 bg-gray-400/70 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative ">
            <button
              onClick={() => setShowArModal(false)}
              className="absolute top-2 right-2 bg-dehn-white text-dehn-red  hover:bg-dehn-eerieblack hover:text-dehn-white  border cursor-pointer rounded-full px-1.5"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-dehn-red mb-4 ">Scan to View in AR</h2>
            <div className="flex justify-center items-center">
        <QRCodeCanvas value={product.arLink} size={180} />
      </div>            
          </div>
        </div>
      )}

      <div className="absolute left-10 top-1/2 -rotate-90 text-gray-500 text-sm flex gap-2">
        <img src="/assets/360.png" alt="360°" className="w-5 h-5 bg-gray-500 rounded-3xl" />
        360° DEGREE ROTATION ENABLED
      </div>
      <div className="fixed bottom-10 right-20 flex flex-row items-center space-x-2">
      <span className="text-sm text-dehn-red font-bold">Delve Deeper</span>

  <button onClick={() => router.push(`/products/features/${id}`)}
    className="p-3 border border-dehn-red rounded-full text-dehn-red hover:bg-dehn-red hover:text-white transition  "
  >
   <img src="/assets/delve-deeper.png" alt="" className="w-5 h-5" />
  </button>
</div>

    </div>
  );
}
