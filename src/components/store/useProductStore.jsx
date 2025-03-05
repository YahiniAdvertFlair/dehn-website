import { create } from "zustand";

const initialProducts = [
  {
    id: 1,
    title: "DEHNrecord SD EPMS",
    description: "Advance solution for precise, reliable, and efficient grounding measurements.",
    image: "/assets/EPMS-1.png",
    modelSrc: "/assets/EPMS.glb",
    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/EPMS",
    hotspots: [
      { id: 1, name: "Earth Resistance Measurement", url: "/EPMS/EPMS_Earth_Resistance.glb" },
      { id: 2, name: "Earth Integrity", url: "/EPMS/EPMS_Wire_connect.glb" },
      { id: 3, name: "Neutral-Earth Voltage", url: "/EPMS/EPMS_Earth_Neutral.glb" },
      { id: 4, name: "Earth Leakage Current", url: "/EPMS/EPMS_Earth_Leak.glb" },
      { id: 5, name: "Noise Filtering", url: "/EPMS/EPMS.mp4" }
    ]
  },
  {
    id: 2,
    title: "DEHNrecord SD CPMS",
    description: "Advanced cathodic protection management system for real-time monitoring, corrosion prevention, and asset longevity.",
    image: "/assets/CPMS-1.png",
    modelSrc: "/assets/CPMS_01.glb",
    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/CPMS_01"
  },
  {
    id: 3,
    title: "DEHNrecord SD PESS",
    description: "Power quality meters for accurate monitoring, analysis, and optimization of power systems.",
    image: "/assets/PESS-1.png",
    modelSrc: "/assets/PESS.glb",
    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/PESS"
  }
];

const useProductStore = create((set) => ({
  activeFeatureModels: {},

  setActiveFeatureModel: (productId, url) =>
    set((state) => ({
      activeFeatureModels: {
        ...state.activeFeatureModels,
        [productId]: url || state.products.find(p => p.id === productId)?.modelSrc
      }
    })),
  

  products: initialProducts,
  currentIndex: 0,

  // ✅ Fix: These should return values, not functions
  getProductById: (id) => initialProducts.find((product) => product.id === id),

  getAllProducts: () => initialProducts,

  currentProduct: (state) => initialProducts[state.currentIndex],

  nextProduct: () =>
    set((state) => ({
      currentIndex: (state.currentIndex + 1) % state.products.length
    })),

  prevProduct: () =>
    set((state) => ({
      currentIndex: (state.currentIndex - 1 + state.products.length) % state.products.length
    }))
}));

export default useProductStore;
