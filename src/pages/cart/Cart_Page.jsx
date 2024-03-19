import { Typography, Container, Box, Paper } from "@mui/material";
import CartTable from "../../components/Cart_Table";
import CheckoutPopup from "../../components/Checkout_Popup";

const CartPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "auto",
        pb: 10,
      }}
    >
      <Box
        component={Paper}
        sx={{ width: "100vw", border: "1px solid black", mb: 2 }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Your Cart Items:
        </Typography>
      </Box>
      <CartTable />
      <CheckoutPopup />
    </Container>
  );
};
export default CartPage;
