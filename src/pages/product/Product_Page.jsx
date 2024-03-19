import {
  Typography,
  Grid,
  Box,
  Button,
  Stack,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductTable from "../../components/Product_Table";
import CircularProgress from "@mui/material/CircularProgress";
import { cartActions } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useSaveCart from "../../hooks/useSaveCart";

const ProductPage = () => {
  const idObject = useParams();
  const cart = useSelector((store) => store.cartSlice.items);
  const [thisProduct, setThisProduct] = useState({});
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [addedItem, setAddedItem] = useState(false);
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const saveCart = useSaveCart();

  useEffect(() => {
    if (addedItem) {
      saveCart();
      setAddedItem(false);
    }
  }, [cart, saveCart, addedItem]);

  const handleCustomAmount = (e) => {
    if (+e.target.value < 0 || +e.target.value > 99) {
      return;
    }
    setCounter(+e.target.value);
  };
  const handleIncrease = () => {
    if (counter === 99) {
      return;
    }
    setCounter(+counter + 1);
  };
  const handleDecrease = () => {
    if (counter === 1) {
      return;
    }
    setCounter(+counter - 1);
  };

  const handleAddItem = () => {
    dispatch(cartActions.addItem({ product: thisProduct, amount: counter }));
    setAddedItem(true);
  };

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/products/${idObject.id}`);
        setThisProduct(data);
        setDataRetrieved(true);
      } catch (e) {
        console.log("This error occurred in product/Product_Page.jsx:", e);
      }
    })();
  }, [idObject.id]);

  return (
    <Box>
      {dataRetrieved ? (
        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h3">{thisProduct.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <img
              src={thisProduct.imageUrl}
              alt=""
              style={{
                width: "100%",
                height: "500px",
                border: "1px solid black",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              component={Paper}
              sx={{ pt: 2, pl: 6, pb: 3, border: "1px solid black" }}
            >
              <Stack direction="column" sx={{ pb: 2, width: "90%" }}>
                <Typography variant="h5">Description:</Typography>
                <Typography variant="h5" color="secondary">
                  {thisProduct.description}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="h4" sx={{ mr: 1 }}>
                  Price:
                </Typography>
                <Typography variant="h4" color="secondary">
                  {thisProduct.price}&#8362;
                </Typography>
              </Stack>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Pick up and delivery options:
              </Typography>
              <List dense={true}>
                <ListItem>
                  <Typography color="secondary">
                    Pick up from branch: 1-5 business days 0&#8362;
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography color="secondary">
                    Delivery to customer's home: 1-7 business days 25&#8362; /
                    0&#8362; if purchase is over 300&#8362;
                  </Typography>
                </ListItem>
              </List>
              <Stack direction="row">
                <Typography sx={{ ml: 1, mr: 1 }}>In Stock:</Typography>
                <Typography variant="body1" color="secondary">
                  {thisProduct.stock}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 1, mb: 2 }}
              >
                <IconButton aria-label="add-amount" onClick={handleIncrease}>
                  <AddIcon />
                </IconButton>
                <TextField
                  sx={{ width: "60px" }}
                  size="small"
                  value={counter}
                  onChange={handleCustomAmount}
                />
                <IconButton aria-label="remove-amount" onClick={handleDecrease}>
                  <RemoveIcon />
                </IconButton>
              </Stack>
              <Button sx={{ width: "150px" }} onClick={handleAddItem}>
                Add To Cart
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            component={Paper}
            sx={{ mt: 2, height: "50px", border: "1px solid black" }}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              pb: 1,
            }}
          >
            <ProductTable
              thisProduct={thisProduct}
              specs={thisProduct.specifications}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            component={Paper}
            sx={{ height: "auto", border: "1px solid black", mb: 10 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography color="secondary">Tags:</Typography>
              </Grid>
              {thisProduct.tags.map((tag) => (
                <Grid item key={tag} xs={6} sm={6} md={4} lg={3}>
                  <Typography>{tag}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
export default ProductPage;
