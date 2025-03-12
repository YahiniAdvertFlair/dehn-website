import { create } from "zustand";

const S3_BASE_URL = "https://d3do0z2iitg65g.cloudfront.net/outputs/";

const initialProducts = [
  {
    id: 1,
    title: "DEHNrecord SD EPMS",
    description: "Advanced solution for precise, reliable, and efficient grounding measurements.",
    image: "/assets/EPMS.png",
    modelSrc:`${S3_BASE_URL}EPMS_01.glb`,
    "brochure": "/EPMS/EPMS_brochure.png",

    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/EPMS_01",
    technical: "/EPMS/EPMS_technical_sheet.png",
    "benefits": [
      { "x": 20, "y": 15, "label": "One-touch IoT platform.","image":"/assets/EPMS.png"},
      { "x": 75, "y": 20, "label": "Predictive Maintenance","image":"/assets/EPMS.png" },
      {
        "x": 10,
        "y": 60,
        "label": "Intelligent diagnosis & data-driven actions"
        ,"image":"/assets/EPMS.png"
      },
      { "x": 80, "y": 80, "label": "Enhanced safety & reliability.","image":"/assets/EPMS.png" }
    ],
    benefitVideo: "/EPMS/EPMS.mp4",

    hotspots: [
      { id: 1, name: "Earth Resistance Measurement", url: "/EPMS/EPMS_Earth_Resistance.glb" },
      { id: 2, name: "Earth Integrity", url: "/EPMS/EPMS_Wire_connect.glb" },
      { id: 3, name: "Neutral-Earth Voltage", url: "/EPMS/EPMS_Earth_Neutral.glb" },
      { id: 4, name: "Earth Leakage Current", url: "/EPMS/EPMS_Earth_Leak.glb" },
      { id: 5, name: "Noise Filtering", url: "/EPMS/noise_filter.mp4" }
    ],
    applications: [
      { name: "Substations", image: "/EPMS/substation.png" },
      { name: "EV Stations", image: "/EPMS/EV.jpeg" },
      { name: "Railway & Metro", image: "/EPMS/metro.jpeg" },
      { name: "Oil & Gas", image: "/EPMS/oil&gas.jpg" },
      { name: "Airports", image: "/EPMS/Airport.jpg" },
      { name: "Data Centers", image: "/EPMS/datacenter.jpg" }
    ],
  },
  {
    id: 2,
    title: "DEHNrecord SD CPMS",
    description: "Advanced cathodic protection management system for real-time monitoring, corrosion prevention, and asset longevity.",
    image: "/assets/CPMS.png",
    modelSrc: `${S3_BASE_URL}CPMS_01.glb`,
    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/CPMS_01",
    "brochure": "/CPMS/CPMS_brochure.png",
    applications: [
      { name: "Oil & Gas", image: "/CPMS/underground_pipeline.png" }
    ],
    benefitVideo: "/CPMS/CPMS.mp4",
    "hotspots": [
      {
        "id": 1,
        "name": "AC Voltage Monitoring (Range : 0.1v ~ 200v)",
        "image":"/assets/EPMS.png",
        "x": "10%",
        "y": "0%",
        "description": "Ensures safe grounding and protection."
      },
      {
        "id": 2,
        "name": "DC PSP ON/OFF Voltage monitoring (Range : -10v ~ 10v)",
        "image":"/PESS/Industrial.webp",
        "x": "25%",
        "y": "0%",
        "description": "Monitors continuity and stability of the earth connection."
      },
      {
        "id": 3,
        "name": "AC/DC current monitoring (Range: 10μA ~ 30mA)",
        "x": "40%",
        "y": "0%",
        "description": "Checks voltage differences between neutral and earth."
      },
      {
        "id": 4,
        "name": "Wireless connectivity via LoRa network",
        "x": "55%",
        "y": "0%",
        "description": "Detects leakage currents to prevent hazards."
      },
      {
        "id": 5,
        "name": "Real-Time Data & History",
        "x": "55%",
        "y": "0%",
        "description": "Detects leakage currents to prevent hazards."
      },
      {
        "id": 6,
        "name": "Automated Alerts & Diagnostics",
        "x": "55%",
        "y": "0%",
        "description": "Detects leakage currents to prevent hazards."
      }
    ]

  },
  {
    id: 3,
    title: "DEHNrecord SD PESS",
    description: "Power quality meters for accurate monitoring, analysis, and optimization of power systems.",
    image: "/assets/pess.png",
    modelSrc:`${S3_BASE_URL}PESS.glb`,
    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/PESS",
    brochure: "/PESS/PESS_brochure.png",
    benefitVideo: "/PESS/PESS.mp4",
    applications: [
      { "name": "Oil & Gas", "image": "/PESS/oil&gas.webp" },
      { "name": "EV Station", "image": "/PESS/commercial.webp" },
      { "name": "Substations", "image": "/PESS/Substation.webp" },
      {
        "name": "Commercial Buildings",
        "image": "/PESS/commercial_building.webp"
      },
      { "name": "Industrial Buildings", "image": "/PESS/Industrial.webp" },
      { "name": "Telecom", "image": "/PESS/Telecom.webp" }
    ],
    "hotspots": [
      {
        "id": 1,
        "name": "Earthquake Detection",
        "url": "/PESS/PESS_Seimic(si).glb",
        "image":"/PESS/Telecom.webp",

        "x": "10%",
        "y": "5%",
        "description": "Ensures safe grounding and protection."
      },
      {
        "id": 2,
        "name": "Overcurrent Protection",
        "url": "/PESS/PESS_Current(A).glb",

        "x": "25%",
        "y": "15%",
        "description": "Monitors continuity and stability of the earth connection."
      },
      {
        "id": 3,
        "name": "Earth Leakage",
        "url": "/PESS/PESS_Leakage_Current.glb",

        "x": "40%",
        "y": "5%",
        "description": "Checks voltage differences between neutral and earth."
      },
      {
        "id": 4,
        "name": "Under Voltage",
        "url": "/PESS/PESS_Voltage.glb",

        "x": "55%",
        "y": "15%",
        "description": "Detects leakage currents to prevent hazards."
      },
      {
        "id": 5,
        "name": "Over Voltage",
        "url": "/PESS/PESS_Voltage.glb",

        "x": "70%",
        "y": "5%",
        "description": "Filters out unwanted electrical noise and interference."
      },
      {
        "id": 6,
        "name": "Phase Loss",
        "url": "/PESS/PESS_Voltage.glb",

        "x": "85%",
        "y": "15%",
        "description": "Provides connectivity options for monitoring systems."
      }
    ]
  },
  {
    id: 4,
    title: "DEHNvenCI",
    description: "Advanced single-pole lightning current and surge arrester with an integrated backup fuse, ensuring superior protection.",
    image: "/assets/dehnvenci.png",
    modelSrc: `${S3_BASE_URL}DEHNvenCI.glb`,
    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/DEHNvenCI",
    brochure: "/DEHNVenci/general_QR.png",
    technical: "/DEHNVenci/venci_technical_sheet.jpg",
    applications: [
      { name: "Oil & Gas Facilities", image: "/DEHNVenci/oil&gas.jpg" },
      { name: "Commercial Buildings", image: "/PESS/commercial.webp" },
      {
        name: "Manufacturing Plants",
        image: "/DEHNVenci/manufacturing_plants.jpg"
      },
      {
        name: "Renewable Energy Plants",
        image: "/DEHNVenci/renewable.jpeg"
      },
      { name: "Railway & Metros", image: "/DEHNVenci/metro.jpeg" },
      { name: "Airports", image: "/DEHNVenci/Airport.jpg" }
    ], 
    "hotspots": [
      {
        "id": 1,
        "name": "Integrated Backup Fuse",
        "x": "10%",
        "y": "5%",
        "description": "Ensures safe grounding and protection."
      },
      {
        "id": 2,
        "name": "High Lightning Current Discharge Capacity",
        "x": "25%",
        "y": "15%",
        "description": "Monitors continuity and stability of the earth connection."
      },
      {
        "id": 3,
        "name": "RADAX Flow Technology",
        "x": "40%",
        "y": "5%",
        "description": "Checks voltage differences between neutral and earth."
      },
      {
        "id": 4,
        "name": "Low Voltage Protection Level (≤ 1.5 kV)",
        "x": "55%",
        "y": "15%",
        "description": "Detects leakage currents to prevent hazards."
      },
      {
        "id": 5,
        "name": "Green/Red Indicator for Fault Detection",
        "x": "70%",
        "y": "5%",
        "description": "Filters out unwanted electrical noise and interference."
      }
    ],
  },  {
    "id": 5,
    "title": "DEHNguard Modular ACI",
    "description": "A modular surge arrester with Advanced Circuit Interruption (ACI), eliminating the need for external fuses while ensuring high system reliability.",
    "label": "DEHNguard",
    image: "/assets/dehnguard.png",

    "brochure": "/DEHNguard/DEHNguard_QR.webp",
    "technical": "/DEHNguard/DEHNguard_technical.webp",
    "benefitVideo": "/DEHNguard/DEHNguard.mp4",
    "modelSrc": `${S3_BASE_URL}DEHNguard.glb`,
    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/DEHNguard",
    
    "hotspots": [
      {
        "id": 1,
        "name": "ACI Technology",
        "x": "10%",
        "y": "5%",
        "description": "Ensures safe grounding and protection."
      },
      {
        "id": 2,
        "name": "Status indication",
        "x": "25%",
        "y": "15%",
        "description": "Monitors continuity and stability of the earth connection."
      },
      {
        "id": 3,
        "name": "Zero Leakage Current",
        "x": "40%",
        "y": "5%",
        "description": "Checks voltage differences between neutral and earth."
      },
      {
        "id": 4,
        "name": "High TOV Withstand (440V AC)",
        "x": "55%",
        "y": "15%",
        "description": "Detects leakage currents to prevent hazards."
      },
      {
        "id": 5,
        "name": "Push-In Connection System",
        "x": "70%",
        "y": "5%",
        "description": "Filters out unwanted electrical noise and interference."
      },
      {
        "id": 6,
        "name": "Vibration & Shock Tested",
        "x": "85%",
        "y": "15%",
        "description": "Provides connectivity options for monitoring systems."
      }
    ],
    "applications": [
      { "name": "Industrial Buildings", "image": "/PESS/oil&gas.webp" },
      { "name": "Commercial Buildings", "image": "/PESS/commercial.webp" },
      { "name": "Renewable Energy Systems", "image": "/PESS/Substation.webp" },
      { "name": "Railway & Metros", "image": "/PESS/commercial_building.webp" },
      { "name": "Oil & Gas Industry", "image": "/PESS/Industrial.webp" },
      { "name": "Telecom Infrastructure", "image": "/PESS/Telecom.webp" }
    ]
  },
  {
    "id": 6,
    "title": "Isolating Spark Gap",
    "description": "Isolating spark gap designed for safe lightning equipotential bonding in hazardous areas.",
    "label": "EXFS_1",
    image: "/assets/EXFS_1.png",

    "brochure": "/EXFS/EXFS_QR.png",
    "modelSrc": `${S3_BASE_URL}EXFS_1.glb`,
    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/EXFS_1",
    
    "technical": "/EXFS/EXFS_100_technical.webp",
    "hotspots": [
      {
        "id": 1,
        "name": "Lightning Protection",
        "x": "10%",
        "y": "5%",
        "description": "Ensures safe grounding and protection."
      },
      {
        "id": 2,
        "name": "High Current Capacity",
        "x": "25%",
        "y": "15%",
        "description": "Monitors continuity and stability of the earth connection."
      },
      {
        "id": 3,
        "name": "Low Sparkover Voltage",
        "x": "40%",
        "y": "5%",
        "description": "Checks voltage differences between neutral and earth."
      },
      {
        "id": 4,
        "name": "ATEX & IECEx Certified",
        "x": "55%",
        "y": "15%",
        "description": "Detects leakage currents to prevent hazards."
      },
      {
        "id": 5,
        "name": "Rugged & Waterproof",
        "x": "70%",
        "y": "5%",
        "description": "Filters out unwanted electrical noise and interference."
      },
      {
        "id": 6,
        "name": "Versatile Installation",
        "x": "85%",
        "y": "15%",
        "description": "Provides connectivity options for monitoring systems."
      }
    ],
    "applications": [
      { "name": "Pipelines", "image": "/EXFS/pipeline.png" },
      {
        "name": "LPG Plants",
        "image": "/EXFS/LPG.webp"
      }
    ]
  },
  {
    "id": 7,
    "title": "Isolating Spark Gap",
    "description": "Isolating spark gap designed for safe lightning equipotential bonding in hazardous areas.",
    "label": "EXFS_2",
    image: "/assets/EXFS_2.png",

    "brochure": "/EXFS/EXFS_QR.png",
    "modelSrc": `${S3_BASE_URL}EXFS_2.glb`,
    "technical": "/EXFS/EXFS_100_KU_technical.webp",
    arLink: "https://beta.portfolio.advflr.com/turnaround/client/dehn/EXFS_2",
    "hotspots": [
      {
        "id": 1,
        "name": "Lightning Protection",
        "x": "10%",
        "y": "5%",
        "description": "Ensures safe grounding and protection."
      },
      {
        "id": 2,
        "name": "High Current Capacity",
        "x": "25%",
        "y": "15%",
        "description": "Monitors continuity and stability of the earth connection."
      },
      {
        "id": 3,
        "name": "Low Sparkover Voltage",
        "x": "40%",
        "y": "5%",
        "description": "Checks voltage differences between neutral and earth."
      },
      {
        "id": 4,
        "name": "ATEX & IECEx Certified",
        "x": "55%",
        "y": "15%",
        "description": "Detects leakage currents to prevent hazards."
      },
      {
        "id": 5,
        "name": "Rugged & Waterproof",
        "x": "70%",
        "y": "5%",
        "description": "Filters out unwanted electrical noise and interference."
      },
      {
        "id": 6,
        "name": "Versatile Installation",
        "x": "85%",
        "y": "15%",
        "description": "Provides connectivity options for monitoring systems."
      }
    ],
    "applications": [
      { "name": "Oil & Gas Pipelines", "image": "/PESS/oil&gas.webp" },
      {
        "name": "Chemical & Petrochemical Plants",
        "image": "/PESS/Commercial.webp"
      },
      {
        "name": "Storage Tanks & Refineries",
        "image": "/PESS/Substation.webp"
      },
      {
        "name": "Mining & Processing Facilities",
        "image": "/PESS/commercial_building.webp"
      },
      {
        "name": "Underground & Aboveground Installations",
        "image": "/PESS/Industrial.webp"
      }
    ]
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
