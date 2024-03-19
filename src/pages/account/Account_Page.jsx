import {
  Typography,
  Container,
  Grid,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import OrderTable from "../../components/Order_Table";
import { useState, useEffect } from "react";
import axios from "axios";

const AccountPage = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const userData = useSelector((store) => store.userDataSlice.user);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/orders/my-orders/");
        setMyOrders(data);
        setDataRetrieved(true);
      } catch (e) {
        console.log("An error occurred while retrieving account data:", e);
      }
    })();
  }, []);
  return (
    <Container
      sx={{
        pt: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: "auto",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          border: "1px solid black",
          width: { lg: "60vw", md: "60vw", sm: "100vw", xs: "100vw" },
          pb: 1,
          mb: 20,
        }}
        component={Paper}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ textAlign: "center" }}
        >
          <Typography variant="h3">Your Account</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar
            sx={{
              mb: 3,
              height: "200px",
              width: "200px",
              border: "5px solid rgba(225,225,225,0.5)",
              boxShadow: "0px 5px 3px rgba(0,0,0,0.3) ",
            }}
            alt={userData?.contactInfo?.firstName}
            src={userData?.imageUrl}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">Name: </Typography>
            <Typography variant="h6" color="secondary">
              {userData?.contactInfo?.firstName}{" "}
              {userData?.contactInfo?.lastName}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">Email:</Typography>
            <Typography variant="h6" color="secondary">
              {userData?.contactInfo?.email}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">Phone:</Typography>
            <Typography variant="h6" color="secondary">
              {userData?.contactInfo?.phone}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">Address:</Typography>
            <Typography variant="h6" color="secondary">
              {userData?.address?.country}, {userData?.address?.city},{" "}
              {userData?.address?.street}, {userData?.address?.houseNumber},{" "}
              {userData?.address?.zip}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Your Orders:</Typography>
          {dataRetrieved && myOrders.length ? (
            <OrderTable exist={true} orders={myOrders} />
          ) : (
            <OrderTable exist={false} orders={myOrders} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
export default AccountPage;
