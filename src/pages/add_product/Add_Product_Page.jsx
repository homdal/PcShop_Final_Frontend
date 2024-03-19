import { Box, Container, Paper } from "@mui/material";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductForm from "./product_form/form";

const AddProduct = () => {
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);

  const handleCategoryPick = (event) => {
    setCategory(event.target.value);
    setSubCategory(0);
  };
  const handleSubCategoryPick = (event) => {
    setSubCategory(event.target.value);
  };

  return (
    <Container sx={{ height: "auto", pb: 5 }}>
      <Box
        component={Paper}
        sx={{ border: "1px solid black", pr: 2, pl: 2, pb: 2 }}
      >
        <Box
          component="form"
          encType="multipart/form-data"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            mt: 2,
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
                <MenuItem value={"Desktop"}>Desktop</MenuItem>
                <MenuItem value={"Laptop"}>Laptop</MenuItem>
                <MenuItem value={"Hardware"}>Hardware</MenuItem>
                <MenuItem value={"Periphery"}>Periphery</MenuItem>
              </Select>
            </Box>
          </FormControl>
          {category === "Desktop" ? (
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
          {category === "Laptop" ? (
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
          {category === "Hardware" && (
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
          {category === "Periphery" && (
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
          {subCategory !== 0 && category !== 0 && (
            <ProductForm category={category} subCategory={subCategory} />
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default AddProduct;
