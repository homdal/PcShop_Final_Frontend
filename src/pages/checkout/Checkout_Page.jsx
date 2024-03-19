import {
  Typography,
  Container,
  Grid,
  Box,
  Button,
  Paper,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { customerDetails, creditPayment } from "./form_template";
import { useSelector, useDispatch } from "react-redux";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import CheckoutTable from "../../components/Checkout_Table";
import { purchaseValidation } from "../../validation/purchaseValidation";
import createOrder from "./create_order";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { cartActions } from "../../store/cartSlice";
import { useParams } from "react-router-dom";
import { userDataActions } from "../../store/userDataSlice.js";
import useSaveCart from "../../hooks/useSaveCart.jsx";
import CheckoutTextField from "./Checkout_TextField.jsx";

const CheckoutPage = () => {
  const { type } = useParams();
  const cart = useSelector((store) => store.cartSlice.items);
  const user = useSelector((store) => store.userDataSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saveCart = useSaveCart();
  const [total, setTotal] = useState(0);
  const [expiryYear, setExpiryYear] = useState(0);
  const [expiryMonth, setExpiryMonth] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [deliveryDesc, setDeliveryDesc] = useState();
  const [errorsState, setErrorsState] = useState(false);
  const [inputValue, changeValue] = useState(
    type === "guest"
      ? {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          country: "",
          city: "",
          street: "",
          houseNumber: "",
          zip: "",
          creditNumber: "",
          cvv: "",
          creditOwnerName: "",
          creditOwnerId: "",
        }
      : {
          firstName: user.contactInfo?.firstName,
          lastName: user.contactInfo?.lastName,
          phone: user.contactInfo?.phone,
          email: user.contactInfo?.email,
          country: user.address?.country,
          city: user.address?.city,
          street: user.address?.street,
          houseNumber: user.address?.houseNumber,
          zip: user.address?.zip,
          creditNumber: "",
          cvv: "",
          creditOwnerName: "",
          creditOwnerId: "",
        }
  );
  const years = ["24", "25", "26", "27"];
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const handleInputChange = (e) => {
    changeValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleExpiryYear = (e) => {
    setExpiryYear(e.target.value);
  };
  const handleExpiryMonth = (e) => {
    setExpiryMonth(e.target.value);
  };
  const handleDeliveryPick = (e) => {
    if (e.target.value === 1) {
      setDeliveryOption(1);
      setDeliveryDesc("Deliver to customer home");
      if (total >= 300) {
        setDeliveryPrice(0);
      } else {
        setDeliveryPrice(25);
      }
    } else if (e.target.value === 2) {
      setDeliveryOption(2);
      setDeliveryDesc("Pick up from store branch");
      setDeliveryPrice(0);
    } else {
      setDeliveryOption(0);
      setDeliveryDesc("");
      setDeliveryPrice(0);
    }
  };
  const handlePurchase = async (e) => {
    e.preventDefault();
    const JoiResponse = purchaseValidation({
      ...inputValue,
      expiryYear: expiryYear,
      expiryMonth: expiryMonth,
      deliveryOption: deliveryDesc,
    });
    setErrorsState(JoiResponse);
    if (JoiResponse) return;
    const order = createOrder(
      cart,
      inputValue,
      deliveryDesc,
      total + deliveryPrice
    );
    if (order) {
      try {
        const { data } = await axios.post("/orders", order);
        if (data) {
          if (user) {
            dispatch(userDataActions.addMyOrder(data));
          }
          navigate(`${ROUTES.ORDERSUCCESS}/${data.order.orderNum}`);
        }
        dispatch(cartActions.removeAllItems());
        saveCart();
      } catch (error) {
        console.log(
          "This error occurred in checkout/Checkout_Page.jsx while placing an order:",
          error
        );
      }
    }
  };
  useEffect(() => {
    let total = 0;
    for (let item of cart) {
      total += item.amount * item.product.price;
    }
    setTotal(total);
  }, [cart]);
  return (
    <Container
      sx={{
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pb: 5,
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
          Checkout
        </Typography>
      </Box>
      <Grid
        container
        spacing={1}
        component={Paper}
        sx={{ p: 2, border: "1px solid black" }}
      >
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
          >
            <Typography color="primary">Customer Details:</Typography>
            {customerDetails.map((field) => (
              <CheckoutTextField
                key={field.id}
                field={field}
                inputChange={handleInputChange}
                errorsState={errorsState}
                inputValue={inputValue[field.id]}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
          >
            <Typography color="primary" sx={{ mt: 2 }}>
              Payment Info:
            </Typography>
            {creditPayment.map((field) => (
              <CheckoutTextField
                key={field.id}
                field={field}
                inputChange={handleInputChange}
                errorsState={errorsState}
                inputValue={inputValue[field.id]}
              />
            ))}
            <FormControl error={errorsState.expiryYear ? true : false}>
              <Select
                id="expiryYear"
                value={expiryYear}
                label=""
                defaultValue={0}
                onChange={handleExpiryYear}
                variant="standard"
                sx={{ m: 1, width: "21ch" }}
              >
                <MenuItem value={0}>Choose expiry year</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={+year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errorsState.expiryYear ? errorsState.expiryYear : null}
              </FormHelperText>
            </FormControl>
            <FormControl error={errorsState.expiryMonth ? true : false}>
              <Select
                id="expiryMonth"
                value={expiryMonth}
                label=""
                defaultValue={0}
                onChange={handleExpiryMonth}
                variant="standard"
                sx={{ m: 1, width: "21ch" }}
              >
                <MenuItem value={0}>Choose expiry month</MenuItem>
                {months.map((month) => (
                  <MenuItem key={month} value={+month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errorsState.expiryMonth ? errorsState.expiryMonth : null}
              </FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FormControl error={errorsState.deliveryOption ? true : false}>
            <Select
              id="delivery"
              value={deliveryOption}
              label=""
              defaultValue={0}
              onChange={handleDeliveryPick}
            >
              <MenuItem value={0}>Pick a Delivery option</MenuItem>
              <MenuItem value={1}>Deliver to customer home</MenuItem>
              <MenuItem value={2}>Pick up from store branch</MenuItem>
            </Select>
            <FormHelperText>
              {errorsState.deliveryOption ? errorsState.deliveryOption : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ mt: 1 }}>
            <CheckoutTable cart={cart} />
            <Stack
              direction="column"
              spacing={1}
              sx={{ border: "1px solid black", p: 2 }}
            >
              <Stack direction="row" spacing={1}>
                <Typography>Items:</Typography>
                <Typography color="secondary">{total}&#8362;</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography>Delivery:</Typography>
                {total >= 300 && deliveryOption === 1 ? (
                  <Typography color="secondary">
                    {deliveryPrice}&#8362; free shipping when over 300
                  </Typography>
                ) : (
                  <Typography color="secondary">
                    {deliveryPrice}&#8362;
                  </Typography>
                )}
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography>Total:</Typography>
                <Typography color="secondary">
                  {total + deliveryPrice}&#8362;
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ textAlign: "Center" }}
        >
          <Button onClick={handlePurchase} sx={{ width: "40%" }}>
            Finalize Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CheckoutPage;
