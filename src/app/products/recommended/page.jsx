"use client";
import { useParams, useRouter } from "next/navigation";
import useProductStore from "@/components/store/useProductStore";
import Image from "next/image";

export default function RecommendedProducts() {
  const { id: paramId } = useParams();
  const router = useRouter();
  const productId = Number(paramId);
  const products = useProductStore((state) => state.products);

  const recommendedProducts = products.filter((product) => product.id !== productId);

  return (
    <div className="bg-[#ECEEEB] py-10 px-5 md:px-20 rounded-xl shadow-md w-full max-w-[100%] mx-auto z-99">
      <h2 className="text-red-600 text-3xl md:text-4xl font-bold ">
        Recommended Products
      </h2>
      <p className="text-gray-500  mt-2">
        Explore similar products that might interest you.
      </p>

      <div className="mt-6 flex overflow-x-auto space-x-6 py-6 scrollbar-hide w-full">
        {recommendedProducts.map((product) => (
            <div className="">
          <div
            key={product.id}
            className="flex flex-col items-center justify-between bg-white rounded-xl p-4 shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 min-w-[13.75rem] max-w-[13.75rem] h-[12.5rem]"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            <div className="w-full h-[9.375rem] flex items-center justify-center">
              <Image
                src={product.image}
                width={160}
                height={120}
                alt={product.title}
                className="object-contain"
              />
            </div>
          
          </div>
            <p className="text-xs font-semibold  text-gray-700 text-center mt-4">
            Part No. {product.id} {product.title}
          </p>
          </div>
        ))}
      </div>
    </div>
  );
}
