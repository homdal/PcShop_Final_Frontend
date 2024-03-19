import { useState } from "react";
import {
  Typography,
  Box,
  InputBase,
  Grid,
  TextField,
  Container,
  Button,
  InputLabel,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { address, personalDetails } from "./ui/register_template";
import axios from "axios";
import { registerValidation } from "../../validation/registerValidation";
import { toast } from "react-toastify";

const RegisterForm = ({ changeForm }) => {
  const [imageFile, setImageFile] = useState();
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
  const registerSuccess = () => {
    changeForm();
  };
  const handleFileInput = (e) => {
    setImageFile(e.target.files[0]);
  };
  const [errorsState, setErrorsState] = useState(false);
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const ImageUpload = async (formData) => {
    const image = await axios.post("/user-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return image.data.imageUrl;
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

    const formData = new FormData();
    formData.append("userImage", imageFile);
    try {
      const { data } = await axios.post("/users", {
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
        imageUrl: imageFile ? await ImageUpload(formData) : "",
        isEmployee: false,
      });
      toast.success("You have successfully registered! Be sure to login.");
      registerSuccess();
    } catch (error) {
      if (error) {
        toast.warning(error?.response?.data.message);
      }
      console.log(
        "This error occurred in the handleRegister function in RegisterForm.jsx: ",
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
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Typography>Personal Details:</Typography>
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
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputLabel id="userImage">
                <Typography color="secondary"> User Image:</Typography>
              </InputLabel>
              <InputBase type="file" onChange={handleFileInput} />
            </Grid>
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

export default RegisterForm;
