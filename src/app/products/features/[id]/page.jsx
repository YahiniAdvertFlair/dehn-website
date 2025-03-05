"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useProductStore from "@/components/store/useProductStore";
import EPMSModelViewer from "@/components/EPMSModelViewer";
// import CPMSModelViewer from "@/components/CPMSModelViewer";
import PESSModelViewer from "@/components/PESSModelViewer";
import DefaultModelViewer from "@/components/ProductModelViewer"; 
import Image from "next/image";

export default function ProductFeatures() {
  const { id: paramId } = useParams(); 
  const id = Number(paramId); 
  const { getProductById } = useProductStore();
  const [product, setProduct] = useState(null);
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

  if (!product) return <p className="text-center">Loading...</p>;

  console.log("Loading Model for Product ID:", id, "Model Path:", product.modelSrc); 

  
  const renderModelViewer = () => {
    switch (id) {
      case 1:
        return <EPMSModelViewer modelPath={product.modelSrc} />;
      case 2:
        return <CPMSModelViewer modelPath={product.modelSrc} />;
      case 3:
        return <PESSModelViewer modelPath={product.modelSrc} />;
      default:
        return <DefaultModelViewer modelPath={product.modelSrc} />; 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <header className="absolute top-0 left-0 w-full flex items-center justify-start border-b p-4 border-gray-500/10">
        <Image src="/assets/dehn-logo.png" alt="DEHN Logo" width={140} height={40} />
      </header>

      <div className="text-center max-w-3xl mx-auto mt-6">
        <h1 className="text-4xl md:text-5xl font-bold text-dehn-red">Interactive Features</h1>
        <p className="text-gray-600 mt-2 text-md">
          Unlock real-time monitoring, intelligent diagnostics, and seamless system integration for enhanced surge protection and performance.
        </p>
      </div>

      <div className="relative w-full flex items-center justify-center mt-6">
        {renderModelViewer()} {/* ✅ Loads the correct Model Viewer based on ID */}
      </div>

      <div className="fixed bottom-10 left-20 flex flex-row items-center space-x-2">
        <button
          onClick={() => router.push(`/products/${id}`)}
          className="p-3 border border-dehn-red rounded-full text-dehn-red hover:bg-dehn-red hover:text-white"
        >
          <img src="/assets/back.png" alt="Back" className="w-5 h-5" />
        </button>
        <span className="text-sm text-dehn-red font-bold">Back to Product</span>
      </div>
    </div>
  );
}
