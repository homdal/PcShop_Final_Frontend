import { Typography, Container, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const { orderNum } = useParams();
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 5,
        height: "80vh",
      }}
    >
      <Stack direction="column" component={Paper} spacing={2} sx={{ p: 10 }}>
        <Typography variant="h3">Successfully placed your order!</Typography>
        <Stack direction="row" spacing={1}>
          <Typography variant="h4">your order number is:</Typography>
          <Typography variant="h4" color="secondary">
            {orderNum}
          </Typography>
        </Stack>
        <Typography
          variant="h5"
          onClick={handleNavigateHome}
          color="secondary"
          sx={{ cursor: "pointer" }}
        >
          Click here to return to the home page{" "}
        </Typography>
      </Stack>
    </Container>
  );
};
export default OrderSuccess;
