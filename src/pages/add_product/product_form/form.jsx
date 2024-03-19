import { useState } from "react";
import { Typography, Box, InputBase } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { basicInfo, dimensions } from "./form_template";
import SpecTable from "../ui/Spec_Table";
import { productValidation } from "../../../validation/productValidation";
import axios from "axios";
import { toast } from "react-toastify";

const ProductForm = ({ category, subCategory }) => {
  const [errorsState, setErrorsState] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [input, setInput] = useState({
    name: "",
    category: category,
    subCategory: subCategory,
    description: "",
    stock: "",
    warranty: "",
    manufacturer: "",
    productModel: "",
    color: "",
    height: "",
    width: "",
    length: "",
    weight: "",
    price: 0,
  });
  const handleInputChange = (event) => {
    setInput((currentInput) => ({
      ...currentInput,
      [event.target.id]: event.target.value,
    }));
  };
  const handleFileInput = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleSubmit = async (e, specs) => {
    e.preventDefault();
    const JoiResponse = productValidation({
      ...input,
    });
    if (JoiResponse) {
      setErrorsState(JoiResponse);
      console.log(JoiResponse);
      return;
    }
    setErrorsState(false);
    if (!imageFile) {
      setImageError(true);
      return;
    } else {
      setImageError(false);
    }
    const formData = new FormData();
    formData.append("productImage", imageFile);
    try {
      const image = await axios.post("/product-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { data } = await axios.post("/products", {
        name: input.name,
        category: input.category,
        subCategory: input.subCategory,
        description: input.description,
        stock: input.stock,
        warranty: input.warranty,
        manufacturer: input.manufacturer,
        productModel: input.productModel,
        color: input.color,
        imageUrl: image.data.imageUrl,
        dimensions: {
          height: input.height,
          width: input.width,
          length: input.length,
          weight: input.weight,
        },
        specifications: specs,
        price: input.price,
      });
      toast.success("Successfully added a new product");
    } catch (error) {
      console.log(
        "This error occurred in add_product/product_form/form.jsx handleSubmit function:",
        error
      );
      toast.error(`Failed to add a product because: ${error.response.data}`);
    }
  };

  return (
    <Box>
      <InputLabel id="basics" className="productFormLabel" sx={{ mt: 2 }}>
        Basic Info:
      </InputLabel>
      <TextField
        required
        id="name"
        color="secondary"
        variant="standard"
        label="Product Name"
        onChange={handleInputChange}
        error={errorsState.name ? true : false}
        helperText={errorsState.name ? errorsState.name : null}
      />
      <TextField
        color="secondary"
        variant="standard"
        required
        id="description"
        label="Product Description"
        multiline
        maxRows={4}
        onChange={handleInputChange}
        error={errorsState.description ? true : false}
        helperText={errorsState.description ? errorsState.description : null}
      />
      <TextField
        required
        color="secondary"
        variant="standard"
        id="stock"
        type="number"
        label="Stock"
        InputProps={{
          inputProps: {
            min: 0,
            max: 50,
          },
        }}
        onChange={handleInputChange}
        error={errorsState.stock ? true : false}
        helperText={errorsState.stock ? errorsState.stock : null}
      />
      {basicInfo.map((field) => (
        <TextField
          color="secondary"
          variant="standard"
          required={field.required}
          id={field.id}
          label={field.label}
          key={field.id}
          onChange={handleInputChange}
          error={errorsState[field.id] ? true : false}
          helperText={errorsState[field.id] ? errorsState[field.id] : null}
        />
      ))}
      <InputLabel id="productImage" className="productFormLabel" sx={{ mt: 2 }}>
        Product Image:
      </InputLabel>
      <InputBase type="file" sx={{ pt: 2, pl: 1 }} onChange={handleFileInput} />
      <Typography
        variant="body2"
        color="error"
        sx={{
          display: imageError ? "block" : "none",
          textDecoration: "overline",
          mt: "3px",
        }}
      >
        Must provide product image
      </Typography>
      <InputLabel id="dimensions" className="productFormLabel" sx={{ mt: 2 }}>
        Dimensions:
      </InputLabel>
      {dimensions.map((field) => (
        <TextField
          color="secondary"
          variant="standard"
          required={field.required}
          id={field.id}
          label={field.label}
          key={field.id}
          onChange={handleInputChange}
          error={errorsState[field.id] ? true : false}
          helperText={errorsState[field.id] ? errorsState[field.id] : null}
        />
      ))}
      <InputLabel id="specifications" sx={{ mt: 2, mb: 1 }}>
        Specifications:
      </InputLabel>
      <SpecTable
        category={category}
        subCategory={subCategory}
        submit={handleSubmit}
      />
    </Box>
  );
};
export default ProductForm;
