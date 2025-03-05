import { create } from "zustand";

const initialProducts = [
  {
    id: 1,
    title: "DEHNrecord SD EPMS",
    description: "Advance solution for precise, reliable, and efficient grounding measurements.",
    image: "/assets/EPMS-1.png",
    modelSrc: "/assets/EPMS.glb",
    arLink:"https://beta.portfolio.advflr.com/turnaround/client/dehn/EPMS"
  },
  {
    id: 2,
    title: "DEHNrecord SD CPMS",
    description: "Advanced cathodic protection management system for real-time monitoring, corrosion prevention, and asset longevity.",
    image: "/assets/CPMS-1.png",
    modelSrc: "/assets/CPMS_01.glb",
     arLink:"https://beta.portfolio.advflr.com/turnaround/client/dehn/CPMS_01"
  },
  {
    id: 3,
    title: "DEHNrecord SD PESS",
    description: "Power quality meters for accurate monitoring, analysis, and optimization of power systems.",
    image: "/assets/PESS-1.png",
    modelSrc: "/assets/PESS.glb",
     arLink:"https://beta.portfolio.advflr.com/turnaround/client/dehn/PESS"
  },
  {
    id: 4,
    title: "DEHNvenCI",
    description: "Advanced single-pole lightning current and surge arrester with an integrated backup fuse, ensuring superior protection.",
    image: "/assets/PESS-1.png",
    modelSrc: "/assets/DEHNvenCI.glb",
  },
  {
    id: 5,
    title: "DEHNguard Modular ACI",
    description: "A modular surge arrester with Advanced Circuit Interruption (ACI), eliminating the need for external fuses while ensuring high system reliability.",
    image: "/assets/PESS-1.png",
    modelSrc: "/assets/DEHNguard.glb",
     arLink:"https://beta.portfolio.advflr.com/turnaround/client/dehn/DEHNguard"
  }, {
    id: 6,
    title: "Isolating Spark Gap",
    description: "Isolating spark gap designed for safe lightning equipotential bonding in hazardous areas.",
    image: "/assets/PESS-1.png",
    modelSrc: "/assets/EXFS_1.glb",
  },
  {
    id: 7,
    title: "Isolating Spark Gap",
    description: "Isolating spark gap designed for safe lightning equipotential bonding in hazardous areas.",
    image: "/assets/PESS-1.png",
    modelSrc: "/assets/EXFS_2.glb",
  },
];

const useProductStore = create((set) => ({
  products: initialProducts,
  currentIndex: 0, // Track the current product index

  getProductById: (id) => initialProducts.find((product) => product.id === id),

  getAllProducts: () => initialProducts,

  // Get the current product
  currentProduct: () => initialProducts[0],

  // Move to the next product
  nextProduct: () =>
    set((state) => {
      const newIndex = (state.currentIndex + 1) % initialProducts.length;
      return { currentIndex: newIndex };
    }),

  // Move to the previous product
  prevProduct: () =>
    set((state) => {
      const newIndex =
        (state.currentIndex - 1 + initialProducts.length) %
        initialProducts.length;
      return { currentIndex: newIndex };
    }),
}));

export default useProductStore;
