import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { validateLogin } from "../../validation/loginValidation";
import { useNavigate } from "react-router-dom";
import useAutoLogin from "../../hooks/useAutoLogin";
import { useState } from "react";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const autoLogin = useAutoLogin();
  const [remember, setRemember] = useState(false);
  const [inputValue, changeValue] = useState({
    email: "",
    password: "",
  });
  const [errorsState, setErrorsState] = useState(false);
  const handleRememberChange = () => {
    setRemember(!remember);
  };
  const handleInputChange = (e) => {
    changeValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSendRequest = async (e) => {
    e.preventDefault();
    const JoiResponse = validateLogin({
      email: inputValue.email,
      password: inputValue.password,
    });
    setErrorsState(JoiResponse);
    if (JoiResponse) return;
    try {
      const { data } = await axios.post("/users/login", inputValue);
      remember
        ? localStorage.setItem("token", data.jwt)
        : sessionStorage.setItem("token", data.jwt);
      autoLogin();
      navigate(ROUTES.HOME);
    } catch (error) {
      if (
        error?.response?.data.message === "Bad Credentials(pass)" ||
        error?.response?.data.message === "Bad credentials(email)"
      ) {
        toast.error("Bad credentials");
      }
      console.log(
        "This error occurred during a login attempt in LoginForm.jsx: ",
        error
      );
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1, width: "90%" }}>
          <Grid container spacing={2} mt={1} mb={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                error={errorsState.email ? true : false}
                helperText={errorsState.email ? errorsState.email : null}
                margin="normal"
                variant="standard"
                color="secondary"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputValue.email}
                onChange={handleInputChange}
              />
              <TextField
                error={errorsState.password ? true : false}
                helperText={errorsState.password ? errorsState.password : null}
                color="secondary"
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputValue.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControlLabel
                control={
                  <Checkbox value={remember} onChange={handleRememberChange} />
                }
                label="Remember me"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} textAlign="center">
              <Button onClick={handleSendRequest}>Submit</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginForm;
