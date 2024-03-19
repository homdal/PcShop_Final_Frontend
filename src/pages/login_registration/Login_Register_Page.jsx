import LoginForm from "./Login_Form";
import RegisterForm from "./Register_Form";
import { useState } from "react";
import darkLogo from "../../layout/header/images/dark.jpg";
import { Typography, Grid, Box, Paper, Stack } from "@mui/material";
const LoginRegisterPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const handleChangeToRegister = () => {
    setIsRegister(true);
  };
  const handleChangeToLogin = () => {
    setIsRegister(false);
  };
  return (
    <Grid
      container
      sx={{
        height: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        component={Paper}
        elevation={6}
        square
        sx={{
          border: "1px solid black",
          pt: 10,
          pb: { xs: 10 },
          pr: { xs: 0 },
          pl: { xs: 0 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "60px",
            backgroundImage: `url(${darkLogo})`,
            backgroundPosition: "center",
            backgroundSize: "70px 200%",
            borderRadius: "30px",
            border: "1px solid grey",
            mb: 1,
          }}
        />
        <Typography variant="h4" className="loginLogoTypo">
          PC Shop
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography
            component="h1"
            variant="h5"
            color={isRegister ? "primary" : "secondary"}
            onClick={handleChangeToLogin}
            sx={{
              cursor: "pointer",
              textDecoration: isRegister ? "none" : "underline",
            }}
          >
            Sign in
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            color={isRegister ? "secondary" : "primary"}
            onClick={handleChangeToRegister}
            sx={{
              cursor: "pointer",
              textDecoration: isRegister ? "underline" : "none",
            }}
          >
            Register
          </Typography>
        </Stack>
        {isRegister ? (
          <RegisterForm changeForm={handleChangeToLogin} />
        ) : (
          <LoginForm />
        )}
        <Box sx={{ textAlign: "center", pr: { xs: 2 }, pl: { xs: 2 } }}></Box>
      </Grid>
    </Grid>
  );
};
export default LoginRegisterPage;
