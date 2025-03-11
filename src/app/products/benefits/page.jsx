"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import useProductStore from "@/components/store/useProductStore";
import Image from "next/image";

export default function BenefitsPage() {
  const { id } = useParams();
  const productId = Number(id);
  const products = useProductStore((state) => state.products);
  const product = products.find((p) => p.id === productId);

  const [activeIndex, setActiveIndex] = useState(1);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!product || !product.benefits) {
      console.error("Product or benefits not found!");
    }
  }, [product]);

  if (!product || !product.benefits) {
    return <p className="text-center text-gray-500 mt-10">No benefits available for this product.</p>;
  }

  return (
    <div className="flex flex-col items-center py-14 px-5 md:px-20 relative">
      <h2 className="text-dehn-red text-3xl md:text-4xl font-bold text-center">
        Key Benefits
      </h2>
      <p className="text-gray-500 text-center mt-2">
        Explore how {product.title} empowers your industry.
      </p>

      <div className="relative mt-8 w-full overflow-hidden">
        <div className="flex items-center justify-center space-x-6 md:space-x-10 transition-all duration-500">
          {product.benefits.map((benefit, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-500 cursor-pointer 
                  ${isActive ? "scale-90 shadow-lg bg-white border-2 border-dehn-red" : "opacity-60 scale-90 bg-gray-100"}
                `}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={benefit.image}
                  width={200}
                  height={150}
                  alt={benefit.label}
                  className="rounded-lg"
                />

                <h3 className={`mt-3 text-center text-lg font-bold ${isActive ? "text-dehn-red" : "text-gray-800"}`}>
                  {benefit.label}
                </h3>

                <p className="text-gray-500 text-xs text-center">{product.description}</p>

                {isActive && product.benefitVideo && (
                  <div className="mt-3 flex items-center justify-between w-full px-4">
                    <button
                      className="px-4 py-2 bg-white border border-gray-300 text-sm rounded-full shadow-md flex items-center space-x-2 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => setIsVideoOpen(true)}
                    >
                      <span className="text-gray-500 text-xs font-semibold">Play Video</span>
                      <Image src="/assets/play-circle.png" width={16} height={16} alt="play" />
                    </button>

                    <div className="border border-dehn-red rounded-full p-2 flex items-center justify-center cursor-pointer hover:bg-dehn-red transition-all">
                      <Image src="/assets/delve-deeper.png" width={12} height={12} alt="Delve Deeper" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-5 space-x-2">
        {product.benefits.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
            ${index === activeIndex ? "bg-dehn-red w-6" : "bg-gray-300"}
          `}
          ></div>
        ))}
      </div>

     {isVideoOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
           <div className="bg-white p-5 rounded-lg shadow-lg w-[80%] max-w-3xl relative">
             <button
               onClick={() => setIsVideoOpen(false)}
               className="absolute top-3 right-4 text-dehn-red hover:text-gray-800 text-xl cursor-pointer"
             >
               ✕
             </button>
   
             <h3 className="text-dehn-red text-xl font-bold">
               {product.benefits[activeIndex].label}
             </h3>
             <p className="text-gray-500 text-sm">
             {product.description}            
              </p>
   
             <div className="mt-4">
               <video controls className="w-full rounded-lg shadow-md">
                 <source src={product.benefitVideo} type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
             </div>
           </div>
         </div>
       )}
    </div>
  );
}
