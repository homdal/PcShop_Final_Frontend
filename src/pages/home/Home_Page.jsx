import { Typography, Container, Grid } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-bootstrap/Carousel";
import ProductCard from "../../components/Product_Card";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import PlaceholderGrid from "../../components/Placeholder_Grid";

const HomePage = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [dataRetrieved, setDataRetrieved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/products/new");
        setNewProducts(data);
        setDataRetrieved(true);
      } catch (e) {
        console.log(
          "An error occurred at home/Home_Page.jsx while retrieving new products:",
          e
        );
      }
    })();
  }, []);

  const newProductsGrid = (
    <Grid
      container
      spacing={0}
      sx={{
        border: "1px solid black",
        width: { xl: "60vw", lg: "60vw", md: "60vw", sm: "80vw", xs: "90vw" },
        pb: 1,
      }}
    >
      {newProducts.slice(0, 8).map((product) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          key={product._id}
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
        pb: 10,
      }}
    >
      <Carousel style={{ width: "70vw", height: "500px", marginTop: 10 }}>
        <Carousel.Item>
          <img
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            text="First slide"
            style={{ width: "70vw", height: "500px", borderRadius: "10px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            text="Second slide"
            style={{ width: "70vw", height: "500px", borderRadius: "10px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            text="Third slide"
            style={{ width: "70vw", height: "500px", borderRadius: "10px" }}
          />
        </Carousel.Item>
      </Carousel>
      <Typography
        variant="h4"
        component={Paper}
        style={{
          margin: "10px 0 15px 0",
          border: "1px solid black",
          width: "99.3vw",
          textAlign: "center",
        }}
      >
        New in Stock
      </Typography>
      {dataRetrieved ? newProductsGrid : <PlaceholderGrid />}
    </Container>
  );
};

export default HomePage;
