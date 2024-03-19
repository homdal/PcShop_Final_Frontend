import { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Container,
  Button,
  Paper,
} from "@mui/material";
import {
  address,
  personalDetails,
} from "../login_registration/ui/register_template";
import axios from "axios";
import { registerValidation } from "../../validation/registerValidation";
import { toast } from "react-toastify";

const RegisterEmployee = () => {
  const [inputsValue, setInputsValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errorsState, setErrorsState] = useState(false);
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSendRequest = async (e) => {
    e.preventDefault();
    const JoiResponse = registerValidation({
      ...inputsValue,
    });
    if (JoiResponse) {
      setErrorsState(JoiResponse);
      return;
    }
    setErrorsState(false);
    try {
      const { data } = await axios.post("/users/register-employee", {
        contactInfo: {
          firstName: inputsValue.firstName,
          lastName: inputsValue.lastName,
          email: inputsValue.email,
          phone: inputsValue.phone,
        },
        password: inputsValue.password,
        address: {
          country: inputsValue.country,
          city: inputsValue.city,
          street: inputsValue.street,
          houseNumber: inputsValue.houseNumber,
          zip: inputsValue.zip,
        },
        imageUrl: "",
        isEmployee: true,
      });
      toast.success(
        `Created new employee user ${data.user.contactInfo.firstName} ${data.user.contactInfo.lastName}`
      );
    } catch (error) {
      if (error) {
        toast.warning(error?.response?.data.message);
      }
      console.log(
        "This error occurred in the handleRegister function in Register_Employee_Page.jsx: ",
        error
      );
    }
  };
  return (
    <Container
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Box
        component={Paper}
        sx={{
          width: "100vw",
          border: "1px solid black",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Register An Employee:
        </Typography>
      </Box>
      <Box
        component={Paper}
        sx={{
          width: { lg: "40vw", md: "50vw", sm: "100vw", xs: "100vw" },
          p: 4,
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid black",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Typography>Employee Details:</Typography>
          <Grid container spacing={2} mt={1} mb={2}>
            {personalDetails.map((field) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={field.id}>
                <TextField
                  error={errorsState[field.id] ? true : false}
                  helperText={
                    errorsState[field.id] ? errorsState[field.id] : null
                  }
                  color="secondary"
                  variant="standard"
                  required={field.required}
                  fullWidth
                  id={field.id}
                  label={field.label}
                  value={inputsValue[field.id]}
                  onChange={handleInputsChange}
                />
              </Grid>
            ))}
          </Grid>
          <Typography>Address:</Typography>
          <Grid container spacing={2} mt={1} mb={1}>
            {address.map((field) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={field.id}>
                <TextField
                  error={errorsState[field.id] ? true : false}
                  helperText={
                    errorsState[field.id] ? errorsState[field.id] : null
                  }
                  color="secondary"
                  variant="standard"
                  required={field.required}
                  fullWidth
                  id={field.id}
                  label={field.label}
                  value={inputsValue[field.id]}
                  onChange={handleInputsChange}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} mt={1} mb={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} textAlign="center">
              <Button onClick={handleSendRequest}>Submit</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterEmployee;
