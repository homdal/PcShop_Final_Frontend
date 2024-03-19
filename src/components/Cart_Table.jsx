import {
  Typography,
  Button,
  Stack,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect, useMemo } from "react";
import { cartActions } from "../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import useSaveCart from "../hooks/useSaveCart";

const CartTable = () => {
  const cart = useSelector((store) => store.cartSlice.items);
  const [cartItems, setCartItems] = useState(cart);
  const [total, setTotal] = useState(0);
  const [cartChange, setCartChange] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saveCart = useSaveCart();
  useEffect(() => {
    setCartItems(cart);
    let totalPrice = 0;
    for (let item of cart) {
      totalPrice += item.product.price * item.amount;
    }
    setTotal(totalPrice);
    if (cartChange) {
      saveCart();
      setCartChange(false);
    }
  }, [cart, saveCart, cartChange]);

  // const handleRemoveItem = (id) => {
  //   dispatch(cartActions.removeItem(id));
  //   setCartChange(true);
  // };
  const handleRemoveAllItems = () => {
    dispatch(cartActions.removeAllItems());
    setCartChange(true);
  };
  // const handleIncreaseAmount = (id) => {
  //   dispatch(cartActions.increaseItemAmount(id));
  //   setCartChange(true);
  // };
  // const handleDecreaseAmount = (id) => {
  //   dispatch(cartActions.decreaseItemAmount(id));
  //   setCartChange(true);
  // };
  // const handleGoToProductPage = (id) => {
  //   navigate(`${ROUTES.PRODUCTPAGE}/${id}`);
  // };
  const emptyCart = (
    <TableBody>
      <TableRow>
        <TableCell>
          <Typography>Your Cart is Empty</Typography>
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableBody>
  );
  const cartTableBody = useMemo(() => {
    const handleRemoveItem = (id) => {
      dispatch(cartActions.removeItem(id));
      setCartChange(true);
    };
    const handleIncreaseAmount = (id) => {
      dispatch(cartActions.increaseItemAmount(id));
      setCartChange(true);
    };
    const handleDecreaseAmount = (id) => {
      dispatch(cartActions.decreaseItemAmount(id));
      setCartChange(true);
    };
    const handleGoToProductPage = (id) => {
      navigate(`${ROUTES.PRODUCTPAGE}/${id}`);
    };
    return (
      <TableBody>
        {cartItems.map((item) => (
          <TableRow key={item.product._id}>
            <TableCell>
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                style={{ width: "80px", height: "70px" }}
              />
            </TableCell>
            <TableCell>
              <Typography
                onClick={() => handleGoToProductPage(item.product._id)}
                sx={{ cursor: "pointer" }}
              >
                {item.product.name}
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 1, mb: 2 }}
              >
                <IconButton
                  aria-label="add-amount"
                  onClick={() => handleIncreaseAmount(item.product._id)}
                >
                  <AddIcon />
                </IconButton>
                <Typography>{item.amount}</Typography>
                <IconButton
                  aria-label="remove-amount"
                  onClick={() => handleDecreaseAmount(item.product._id)}
                >
                  <RemoveIcon />
                </IconButton>
              </Stack>
            </TableCell>
            <TableCell align="left">
              <Typography>{item.product.price}&#8362;</Typography>
            </TableCell>
            <TableCell align="left">
              {" "}
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveItem(item.product._id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>
            <Typography color="secondary">Total:</Typography>
          </TableCell>
          <TableCell>
            <Typography>{total}&#8362;</Typography>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    );
  }, [cartItems, total, dispatch, navigate]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: { lg: "95%", md: "95%", sm: "100%", xs: "100%" },
        border: "1px solid black",
      }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "200px" }}></TableCell>
            <TableCell sx={{ width: "300px" }}>
              <Typography color="secondary">Item</Typography>
            </TableCell>
            <TableCell sx={{ width: "200px" }}>
              <Typography color="secondary">Amount</Typography>
            </TableCell>
            <TableCell sx={{ width: "200px" }}>
              <Typography color="secondary">Price</Typography>
            </TableCell>
            <TableCell>
              <Button sx={{ width: "120px" }} onClick={handleRemoveAllItems}>
                Delete All
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        {cartItems.length ? cartTableBody : emptyCart}
      </Table>
    </TableContainer>
  );
};
export default CartTable;
