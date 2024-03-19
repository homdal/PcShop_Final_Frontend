import { Container, Grid, Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../../components/Product_Card";
import PlaceholderGrid from "../../components/Placeholder_Grid";

const CategoryPage = () => {
  const categories = useParams();
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          `/products/${categories.category}/${categories.subcategory}`
        );
        setProducts(data);
        setDataRetrieved(true);
      } catch (e) {
        console.log(
          "An error occurred in category/Category_Page.jsx while retrieving products:",
          e
        );
      }
    })();
  }, [categories]);
  const productGrid = (
    <Grid
      container
      spacing={0}
      sx={{
        mt: 1,
        border: "1px solid black",
        width: { xl: "60vw", lg: "60vw", md: "60vw", sm: "80vw", xs: "90vw" },
        pb: 1,
      }}
    >
      {products.map((product) => (
        <Grid
          key={product._id}
          item
          xs={12}
          sm={6}
          md={3}
          lg={4}
          xl={3}
          sx={{
            mt: 1,
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <Box
        component={Paper}
        sx={{
          width: "99.3vw",
          border: "1px solid black",
          mb: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          {categories.category.charAt(0).toUpperCase() +
            categories.category.slice(1)}
        </Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {categories.subcategory}
        </Typography>
      </Box>

      {dataRetrieved ? productGrid : <PlaceholderGrid />}
    </Container>
  );
};
export default CategoryPage;
