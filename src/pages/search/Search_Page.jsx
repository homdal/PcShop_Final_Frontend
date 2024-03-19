import { Container, Grid, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../../components/Product_Card";
import PlaceholderGrid from "../../components/Placeholder_Grid";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setNotFound(false);
        let { data } = await axios.get(`/products/search/${query}`);
        setProducts(data);
        setDataRetrieved(true);
      } catch (e) {
        if (e.response.status === 404) {
          setNotFound(true);
        }
        console.log("An error occurred while retrieving products:", e);
      }
    })();
  }, [query]);
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
        justifyContent: "start",
        alignItems: "center",
        height: "auto",
        mb: 5,
      }}
    >
      <Box
        component={Paper}
        sx={{
          width: "100vw",
          border: "1px solid black",
          mb: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Search Page
        </Typography>
      </Box>
      {dataRetrieved && !notFound ? (
        productGrid
      ) : !dataRetrieved && !notFound ? (
        <PlaceholderGrid />
      ) : (
        <Typography variant="h5" sx={{ height: "60vh" }}>
          No Matches Found
        </Typography>
      )}
    </Container>
  );
};
export default SearchPage;
