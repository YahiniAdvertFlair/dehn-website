"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useProductStore from "../components/store/useProductStore";
import Image from "next/image";
import ModelViewer from "@/components/ModelViewer";

export default function Home() {
  const { products, currentIndex } = useProductStore();
  const [currentProduct, setCurrentProduct] = useState(products[0]);
  const router = useRouter();

  useEffect(() => {
    setCurrentProduct(products[currentIndex]);
  }, [currentIndex, products]);

  return (
    <div className="bg-transparent min-h-screen flex flex-col items-center justify-center px-4 md:px-10">
      <header className="w-full flex items-center justify-between p-4 border-b border-gray-500/10">
        <Image 
          src="/assets/dehn-logo.png" 
          alt="DEHN Logo" 
          width={120} 
          height={35} 
          className="md:w-[8.25rem] md:h-[2.5rem]" 
        />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mt-4">
        {products.filter((product) => product.id !== 7).map((product) => (
          <div
            key={product.id}
            className="bg-dehn-offwhite p-4 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            <div className="relative w-full h-40 sm:h-48 md:h-60 overflow-hidden">
              <ModelViewer modelPath={product.modelSrc} />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-dehn-red mt-4">
              {product.title}
            </h3>

            <p className="text-dehn-eerieblack text-xs sm:text-sm mt-1">
              {product.description}
            </p>

            <div className="flex items-end justify-end mt-2">
              <button className="flex items-center justify-center border border-dehn-red rounded-full text-dehn-red hover:bg-dehn-red hover:text-white transition w-6 h-6">
                →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
