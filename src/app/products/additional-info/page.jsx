"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import useProductStore from "@/components/store/useProductStore";
import Image from "next/image";

export default function AdditionalPage() {
  const { id } = useParams();
  const productId = Number(id);
  const products = useProductStore((state) => state.products);
  const product = products.find((p) => p.id === productId);

  const hasTechnicalData = product?.technical;
  const [activeTab, setActiveTab] = useState(hasTechnicalData ? "technical" : "brochure");

  if (!product) {
    return <p className="text-center text-gray-500 mt-10">Product not found.</p>;
  }

  return (
    <div className="flex flex-col items-center py-10 px-5 md:px-20">
      <h2 className="text-red-600 text-3xl md:text-4xl font-bold text-center">
        Additional Information
      </h2>
      <p className="text-gray-500 text-center mt-2">
        Find detailed specifications and product resources.
      </p>

    <div className="mt-6 flex space-x-6 bg-gray-100 p-2 rounded-full ">
       <button
         className={`px-6 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer 
           ${activeTab === "technical" ? "bg-white shadow-md text-red-600" : "text-gray-500"}`}
         onClick={() => setActiveTab("technical")}
       >
         Technical Data
       </button>
   
       <button
         className={`px-6 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer
           ${activeTab === "brochure" ? "bg-white shadow-md text-red-600" : "text-gray-500"}`}
         onClick={() => setActiveTab("brochure")}
       >
         Brochure
       </button>
     </div>

     <div className="mt-6 w-full max-w-3xl bg-white shadow-md rounded-xl p-4">
  {activeTab === "technical" ? (
    <div className="flex flex-col items-center">
      {/* <h3 className="text-lg font-bold text-red-600">Technical Data</h3> */}
      {product.technical ? (
        <Image
          src={product.technical}
          alt="Technical Sheet"
          width={600}
          height={400}
          className="rounded-lg mt-4"
        />
      ) : (
        <p className="text-gray-500 mt-4">No technical data available for this product.</p>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center p-4">
      <h3 className="text-lg font-bold text-red-600 p-2">
        Scan QR to Download Brochure
      </h3>
      {product.brochure ? (
        <img src={product.brochure} className="w-100 h-100" />
      ) : (
        <p className="text-gray-500 mt-4">Brochure not available.</p>
      )}
    </div>
  )}
</div>

    </div>
  );
}
