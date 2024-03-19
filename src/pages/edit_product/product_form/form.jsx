import { useState } from "react";
import { Box, InputBase } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import {
  basicInfo,
  dimensions,
} from "../../add_product/product_form/form_template";
import EditSpecTable from "../ui/Spec_Table";
import { productValidation } from "../../../validation/productValidation";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProductForm = ({ product }) => {
  const [errorsState, setErrorsState] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [input, setInput] = useState({
    name: product.name,
    category: product.category,
    subCategory: product.subCategory,
    description: product.description,
    stock: product.stock,
    warranty: product.warranty,
    manufacturer: product.manufacturer,
    productModel: product.productModel,
    color: product.color,
    height: product.dimensions?.height,
    width: product.dimensions?.width,
    length: product.dimensions?.length,
    weight: product.dimensions?.weight,
    price: product.price,
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
  const ImageUpload = async (formData) => {
    const image = await axios.post("/product-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return image.data.imageUrl;
  };
  const handleSubmit = async (e, specs) => {
    e.preventDefault();
    const JoiResponse = productValidation({
      ...input,
    });
    if (JoiResponse) {
      setErrorsState(JoiResponse);
      return;
    }
    setErrorsState(false);
    const formData = new FormData();
    formData.append("productImage", imageFile);
    try {
      const { data } = await axios.put(`/products/${product._id}`, {
        name: input.name,
        category: input.category,
        subCategory: input.subCategory,
        description: input.description,
        stock: input.stock,
        warranty: input.warranty,
        manufacturer: input.manufacturer,
        productModel: input.productModel,
        color: input.color,
        imageUrl: imageFile ? await ImageUpload(formData) : product.ImageUrl,
        dimensions: {
          height: input.height,
          width: input.width,
          length: input.length,
          weight: input.weight,
        },
        specifications: specs,
        price: input.price,
      });
      toast.success("Successfully updated the product");
    } catch (error) {
      console.log(
        "This error occurred in edit_product/product_form/form.jsx handleSubmit function:",
        error
      );
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
        value={input.name}
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
        value={input.description}
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
        value={input.stock}
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
          value={input[field.id]}
          onChange={handleInputChange}
          error={errorsState[field.id] ? true : false}
          helperText={errorsState[field.id] ? errorsState[field.id] : null}
        />
      ))}
      <InputLabel id="productImage" className="productFormLabel" sx={{ mt: 2 }}>
        Product Image:
      </InputLabel>
      <InputBase type="file" sx={{ pt: 2, pl: 1 }} onChange={handleFileInput} />
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
          value={input[field.id]}
          onChange={handleInputChange}
          error={errorsState[field.id] ? true : false}
          helperText={errorsState[field.id] ? errorsState[field.id] : null}
        />
      ))}
      <InputLabel id="specifications" sx={{ mt: 2, mb: 1 }}>
        Specifications:
      </InputLabel>
      <EditSpecTable
        productSpecs={product.specifications}
        submit={handleSubmit}
      />
    </Box>
  );
};
export default UpdateProductForm;
