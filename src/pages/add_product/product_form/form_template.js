const basicInfo = [
  { id: "warranty", label: "Warranty", required: true },
  { id: "manufacturer", label: "Manufacturer", required: false },
  { id: "productModel", label: "Product Model", required: false },
  { id: "color", label: "Product Color", required: false },
  { id: "price", label: "Price", required: true },
];
const dimensions = [
  { id: "height", label: "Height", required: false },
  { id: "width", label: "Width", required: false },
  { id: "length", label: "Length", required: false },
  { id: "weight", label: "Weight", required: false },
];

export { basicInfo, dimensions };
