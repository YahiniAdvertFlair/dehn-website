"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useProductStore from "@/components/store/useProductStore";

export default function ApplicationPage() {
  const { id } = useParams(); 
  const { getProductById } = useProductStore();
  const product = getProductById(Number(id)); 

  const applications = product?.applications || [];

  const [selectedApp, setSelectedApp] = useState(applications[0]);

  const [hoveredApp, setHoveredApp] = useState(null);

  useEffect(() => {
    if (applications.length > 0) {
      setSelectedApp(applications[0]);
    }
  }, [product]);

  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      <h1 className="text-4xl font-bold text-dehn-red text-center">
        Utilize in Various Applications
      </h1>
      <p className="text-gray-600 mt-2 text-center">
        Explore our cutting-edge solutions tailored for multiple industries.
      </p>

      <div className="relative mt-6 max-w-5xl w-full h-[30rem] rounded-lg overflow-visible shadow-lg">
        <img
          src={selectedApp?.image || "/applications/main_background.jpg"} 
          alt={selectedApp?.name || "Application Areas"}
          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out rounded-xl"
        />

        <div className="absolute left-[-3.125rem] top-1/2 transform -translate-y-1/2 flex flex-col space-y-12">
          {applications.slice(0, 3).map((app, index) => (
            <div
            key={index}
            className="relative flex items-center"
            onMouseEnter={() => setHoveredApp(app)}
            onMouseLeave={() => setHoveredApp(null)}
            onClick={() => setSelectedApp(app)}
          >
            <div
              className={`p-2 bg-white border-2 rounded-full shadow-lg cursor-pointer transition-all w-full  ${
                selectedApp?.name === app.name ? "border-dehn-red" : "border-gray-300"
              } hover:bg-gray-100 hover:border-dehn-red`}
            >
              <img
                src="/assets/delve-deeper.png"
                alt=""
                className="w-4 h-4"
              />
            </div>

            {hoveredApp?.name === app.name && (
  <div className="absolute left-10 px-3 py-1.5 bg-white text-gray-800 text-sm font-bold shadow-md rounded-lg transition-opacity duration-300 whitespace-nowrap min-w-max">
    {app.name}
  </div>
)}

          </div>
          ))}
        </div>

        <div className="absolute right-[-3.125rem] top-1/2 transform -translate-y-1/2 flex flex-col space-y-12">
          {applications.slice(3, 8).map((app, index) => (
            <div
              key={index}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredApp(app)}
              onMouseLeave={() => setHoveredApp(null)}
              onClick={() => setSelectedApp(app)}
            >
          <div
              className={`p-2 bg-white border-2 rounded-full shadow-lg cursor-pointer transition-all ${
                selectedApp?.name === app.name ? "border-dehn-red" : "border-gray-300"
              } hover:bg-gray-100 hover:border-dehn-red`}
            >
              <img
                src="/assets/delve-deeper.png"
                alt=""
                className="w-4 h-4"
              />
            </div>

              {hoveredApp?.name === app.name && (
                <div className="absolute right-10 px-3 py-1.5 bg-white text-gray-800 text-sm font-bold shadow-md rounded-lg transition-opacity duration-300">
                  {app.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
