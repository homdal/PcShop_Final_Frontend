import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { validateFindOrder } from "../../validation/findOrderValidation";
import { Fragment } from "react";
import { toast } from "react-toastify";

const FindOrder = () => {
  const [order, setOrder] = useState();
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const [error, setError] = useState(false);
  const handleSearchOrder = async () => {
    const JoiResponse = validateFindOrder({
      orderNum,
    });
    if (JoiResponse) {
      setError(JoiResponse);

      return;
    }
    setError(false);
    try {
      let { data } = await axios.get(`/orders/${orderNum}`);
      setOrder(data);
      setDataRetrieved(true);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Order not found");
      } else {
        console.log(
          "This error occurred in find_order/Find_Order_Page.jsx:",
          error
        );
      }
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={Paper}
        sx={{ border: "1px solid black", textAlign: "center", width: "100vw" }}
      >
        <Typography variant="h3">Find Order</Typography>
        <Typography variant="h6">
          Search for an order by it's order number
        </Typography>
      </Box>
      <Box
        component={Paper}
        sx={{
          height: "auto",
          width: { lg: "50vw", md: "50vw", sm: "100vw", xs: "100vw" },
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          p: 2,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
          <TextField
            variant="standard"
            focused
            placeholder="Enter Order Number"
            value={orderNum}
            error={error.orderNum ? true : false}
            helperText={error.orderNum ? error.orderNum : null}
            onChange={(e) => setOrderNum(e.target.value)}
          />
          <Button sx={{ height: "50%" }} onClick={handleSearchOrder}>
            Search
          </Button>
        </Stack>
        {dataRetrieved ? (
          <Box>
            <Typography variant="h6">Order Details:</Typography>
            <Stack direction="row" spacing={1}>
              <Typography>Order Number:</Typography>
              <Typography color="secondary">{order.orderNum}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography>Status:</Typography>
              <Typography color="secondary">{order.status}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography>Total:</Typography>
              <Typography color="secondary">{order.total}&#8362;</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography>Delivery Method:</Typography>
              <Typography color="secondary">{order.deliveryOption}</Typography>
            </Stack>
            <Typography>Items:</Typography>
            {order.items.map((item) => (
              <Fragment key={item.productId}>
                <Stack direction="row" spacing={1}>
                  {/* <Typography>Item Name:</Typography> */}
                  <Typography color="secondary">{item.name}</Typography>
                  <Typography>Quantity:</Typography>
                  <Typography color="secondary">{item.quantity}</Typography>
                  <Typography>Price Per Item:</Typography>
                  <Typography color="secondary">
                    {item.pricePer}&#8362;
                  </Typography>
                </Stack>
              </Fragment>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Customer Details:
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography>Customer Name:</Typography>
              <Typography color="secondary">
                {order.customer.contactInfo.firstName}{" "}
                {order.customer.contactInfo.lastName}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography>Phone:</Typography>
              <Typography color="secondary">
                {order.customer.contactInfo.phone}
              </Typography>
              <Typography>Email:</Typography>
              <Typography color="secondary">
                {order.customer.contactInfo.email}
              </Typography>
            </Stack>
            {order.deliveryOption === "Deliver to customer home" ? (
              <Stack direction="row" spacing={1}>
                <Typography>Address for delivery:</Typography>
                <Typography color="secondary">
                  {order.customer.address.country},{" "}
                  {order.customer.address.city}, {order.customer.address.street}
                  , {order.customer.address.houseNumber},{" "}
                  {order.customer.address.zip}
                </Typography>
              </Stack>
            ) : (
              ""
            )}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
};
export default FindOrder;
