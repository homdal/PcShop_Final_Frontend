const desktopRows = [
  {
    id: 1,
    specName: "Processor",
    specDesc: "",
  },
  {
    id: 2,
    specName: "MotherBoard",
    specDesc: "",
  },
  {
    id: 3,
    specName: "Video Card",
    specDesc: "",
  },
  {
    id: 4,
    specName: "Memory",
    specDesc: "",
  },
  {
    id: 5,
    specName: "Power Supply",
    specDesc: "",
  },
  {
    id: 6,
    specName: "Storage",
    specDesc: "",
  },
  {
    id: 7,
    specName: "Case",
    specDesc: "",
  },
  {
    id: 8,
    specName: "System",
    specDesc: "",
  },
];
const laptopRows = [
  {
    id: 1,
    specName: "Processor",
    specDesc: "",
  },
  {
    id: 2,
    specName: "Video Card",
    specDesc: "",
  },
  {
    id: 3,
    specName: "Battery",
    specDesc: "",
  },
  {
    id: 4,
    specName: "Memory",
    specDesc: "",
  },
  {
    id: 5,
    specName: "Storage",
    specDesc: "",
  },
  {
    id: 6,
    specName: "Resolution",
    specDesc: "",
  },
  {
    id: 7,
    specName: "Refresh Rate",
    specDesc: "",
  },
  {
    id: 8,
    specName: "System",
    specDesc: "",
  },
];
const processorRows = [
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Total Cores",
    specDesc: "# Cores",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Total Threads",
    specDesc: "# Thread",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Frequencies",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Power",
    specDesc: "",
  },
];
const motherboardRows = [
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Chipset",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Configuration",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Socket",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Memory Type",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Interface",
    specDesc: "",
  },
];
const videoCardRows = [
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Power",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Memory Type",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Memory Volume",
    specDesc: "",
  },
];
const memoryRows = [
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Memory Type",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Memory Volume",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Frequency",
    specDesc: "",
  },
];
const storageRows = [
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Interface",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Speed",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Volume",
    specDesc: "",
  },
];
const powerSupplyRows = [
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Power Supply",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Cable",
    specDesc: "",
  },
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "Interface",
    specDesc: "",
  },
];
const periphery = [
  {
    id: Math.floor(Math.random() * 1000 + 1),
    specName: "",
    specDesc: "",
  },
];

export {
  desktopRows,
  laptopRows,
  processorRows,
  motherboardRows,
  videoCardRows,
  memoryRows,
  storageRows,
  powerSupplyRows,
  periphery,
};
