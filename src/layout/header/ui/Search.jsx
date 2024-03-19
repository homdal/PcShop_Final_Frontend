import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "rgba(202, 202, 202, 0.2)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.down("md")]: {
    height: "40px",
    width: "200px",
    padding: 0,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.down("md")]: {
      height: "20px",
      width: "150px",
      padding: 0,
      paddingLeft: "10px",
    },
  },
}));

export { Search, StyledInputBase };
