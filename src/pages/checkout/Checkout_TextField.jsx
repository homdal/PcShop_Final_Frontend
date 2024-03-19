import { TextField } from "@mui/material";

const CheckoutTextField = ({ field, inputChange, inputValue, errorsState }) => {
  return (
    <TextField
      key={field.id}
      variant="standard"
      id={field.id}
      label={field.label}
      required={field.required}
      error={errorsState[field.id] ? true : false}
      helperText={errorsState[field.id] ? errorsState[field.id] : null}
      value={inputValue || ""}
      onChange={inputChange}
    />
  );
};
export default CheckoutTextField;
