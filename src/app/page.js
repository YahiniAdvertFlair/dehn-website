"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useProductStore from "../components/store/useProductStore";
import Image from "next/image";
import ModelViewer from "@/components/ModelViewer";

export default function Home() {
  const { products, currentIndex, nextProduct } = useProductStore();
  const [currentProduct, setCurrentProduct] = useState(products[0]);
  const router = useRouter();

  useEffect(() => {
    setCurrentProduct(products[currentIndex]);
  }, [currentIndex, products]);

  return (
   
  
    <div className="bg-transparent min-h-screen flex flex-col items-center justify-center px-10">
      <header className="w-full flex items-center justify-start p-4 border-b border-gray-500/10">
        <Image src="/assets/dehn-logo.png" alt="DEHN Logo" width={140} height={40} />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-5xl mt-2">
        {products.filter((product)=>product.id !== 7).map((product) => (
               <div
          key={product.id}
          className="bg-dehn-offwhite p-4 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition"
          onClick={() => router.push(`/products/${product.id}`)} // Navigate on click
        >
            <div className=" h-60">
              <ModelViewer modelPath={product.modelSrc} />
            </div>

            <h3 className="text-xl font-bold text-dehn-red mt-4">
              {product.title}
            </h3>

            <p className="text-dehn-eerieblack text-sm mt-1">
              {product.description}
            </p>
            <div className="flex items-end justify-end hover:cursor-pointer">
            <button
              className="flex items-center justify-center border border-dehn-red rounded-full hover:cursor-pointer text-dehn-red hover:bg-dehn-red hover:text-white transition w-6 h-6"
            >
→</button>
      </div>
          </div>
        ))}
      </div>
     
      </div>
  );
}
