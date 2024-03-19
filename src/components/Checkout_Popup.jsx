import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const CheckoutPopup = () => {
  const loggedIn = useSelector((store) => store.userDataSlice.loggedIn);
  const cartItems = useSelector((store) => store.cartSlice.items.length);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    if (!cartItems) {
      toast.warning("No Items in cart");
      return;
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNavigateLogin = () => {
    navigate(ROUTES.LOGINREGISTER);
  };
  const handleGuestCheckout = () => {
    navigate(`${ROUTES.CHECKOUT}/guest`);
  };
  const handleUserCheckout = () => {
    if (!cartItems) {
      toast.warning("No Items in cart");
      return;
    }
    navigate(`${ROUTES.CHECKOUT}/user`);
  };
  const choiceDialog = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DialogTitle> How would you like to checkout?</DialogTitle>
      <DialogContent sx={{ width: "300px", height: "200px" }}>
        <Button sx={{ mt: 2, mb: 1 }} onClick={handleNavigateLogin}>
          Log into Account
        </Button>
        <Typography>Or</Typography>
        <Button sx={{ mt: 1 }} onClick={handleGuestCheckout}>
          Guest Checkout
        </Button>
      </DialogContent>
    </Box>
  );

  return (
    <Box>
      {loggedIn ? (
        <Button sx={{ mt: 2 }} onClick={handleUserCheckout}>
          Check Out
        </Button>
      ) : (
        <Button sx={{ mt: 2 }} onClick={handleOpen}>
          Check Out
        </Button>
      )}
      <Dialog onClose={handleClose} open={open} sx={{ textAlign: "center" }}>
        {choiceDialog}
      </Dialog>
    </Box>
  );
};
export default CheckoutPopup;
