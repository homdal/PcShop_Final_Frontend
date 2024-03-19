import { Box, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UpdateProductForm from "./product_form/form";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const idObject = useParams();
  const [thisProduct, setThisProduct] = useState({});
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);

  const handleCategoryPick = (event) => {
    setCategory(event.target.value);
    setSubCategory(0);
  };
  const handleSubCategoryPick = (event) => {
    setSubCategory(event.target.value);
  };
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/products/${idObject.id}`);
        if (!data) {
          throw new Error("Failed to get data");
        }
        setThisProduct(data);
        setDataRetrieved(true);
        setCategory(data.category);
        setSubCategory(data.subCategory);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [idObject.id]);

  return (
    <Container sx={{ height: "auto" }}>
      <Box component={Paper} sx={{ p: 2 }}>
        <Box
          component="form"
          encType="multipart/form-data"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            mt: 2,
            pb: 10,
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <Box>
              <Select
                id="category"
                value={category}
                label=""
                defaultValue={0}
                onChange={handleCategoryPick}
                sx={{ mb: 1 }}
              >
                <MenuItem value={0}>Choose a category..</MenuItem>
                <MenuItem value={"desktop"}>Desktop</MenuItem>
                <MenuItem value={"laptop"}>Laptop</MenuItem>
                <MenuItem value={"hardware"}>Hardware</MenuItem>
                <MenuItem value={"periphery"}>Periphery</MenuItem>
              </Select>
            </Box>
          </FormControl>
          {category === "desktop" ? (
            <Select
              id="subCategory"
              value={subCategory}
              label=""
              defaultValue={0}
              onChange={handleSubCategoryPick}
            >
              <MenuItem value={0}>Choose a sub-category..</MenuItem>
              <MenuItem value={"Home&Office"}>Home & Office</MenuItem>
              <MenuItem value={"Gaming"}>Gaming</MenuItem>
            </Select>
          ) : (
            ""
          )}
          {category === "laptop" ? (
            <Select
              id="subCategory"
              value={subCategory}
              label=""
              defaultValue={0}
              onChange={handleSubCategoryPick}
            >
              <MenuItem value={0}>Choose a sub-category..</MenuItem>
              <MenuItem value={"Home&Office"}>Home & Office</MenuItem>
              <MenuItem value={"Gaming"}>Gaming</MenuItem>
            </Select>
          ) : (
            ""
          )}
          {category === "hardware" && (
            <Select
              id="subCategory"
              value={subCategory}
              label=""
              defaultValue={0}
              onChange={handleSubCategoryPick}
            >
              <MenuItem value={0}>Choose a sub-category..</MenuItem>
              <MenuItem value={"Processors"}>Processors</MenuItem>
              <MenuItem value={"Motherboards"}>Motherboards</MenuItem>
              <MenuItem value={"VideoCards"}>Video Cards</MenuItem>
              <MenuItem value={"Memory"}>Memory</MenuItem>
              <MenuItem value={"Storage"}>Storage</MenuItem>
              <MenuItem value={"Power Supply"}>Power Supply</MenuItem>
            </Select>
          )}
          {category === "periphery" && (
            <Select
              id="subCategory"
              value={subCategory}
              label=""
              defaultValue={0}
              onChange={handleSubCategoryPick}
            >
              <MenuItem value={0}>Choose a sub-category..</MenuItem>
              <MenuItem value={"Mice"}>Mice</MenuItem>
              <MenuItem value={"Keyboards"}>Keyboards</MenuItem>
              <MenuItem value={"Headphones"}>Headphones</MenuItem>
              <MenuItem value={"Speakers"}>Speakers</MenuItem>
              <MenuItem value={"Cameras"}>Cameras</MenuItem>
            </Select>
          )}
          {dataRetrieved ? <UpdateProductForm product={thisProduct} /> : ""}
        </Box>
      </Box>
    </Container>
  );
};
export default EditProduct;
