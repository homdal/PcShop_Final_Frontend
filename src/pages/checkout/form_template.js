const customerDetails = [
  { id: "firstName", label: "First Name", required: true },
  { id: "lastName", label: "Last Name", required: true },
  { id: "phone", label: "Phone", required: true },
  { id: "email", label: "Email Address", required: true },
  { id: "country", label: "Country", required: true },
  { id: "city", label: "City", required: true },
  { id: "street", label: "Street", required: true },
  { id: "houseNumber", label: "House Number", required: true },
  { id: "zip", label: "Zip Code", required: true },
];

const creditPayment = [
  { id: "creditNumber", label: "Credit Number", required: true },
  { id: "cvv", label: "CVV", required: true },
  { id: "creditOwnerName", label: "Credit Owner Name", required: true },
  { id: "creditOwnerId", label: "Credit owner ID number", required: true },
];

export { customerDetails, creditPayment };
