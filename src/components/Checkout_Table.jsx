import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const CheckoutTable = ({ cart }) => {
  const navigate = useNavigate();
  const handleGoToProductPage = (id) => {
    navigate(`${ROUTES.PRODUCTPAGE}/${id}`);
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", border: "1px solid black" }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "200px" }}>
              <Typography>Item</Typography>
            </TableCell>
            <TableCell sx={{ width: "200px" }}>
              <Typography>Amount</Typography>
            </TableCell>
            <TableCell sx={{ width: "200px" }}>
              <Typography>Price per item</Typography>
            </TableCell>
            <TableCell sx={{ width: "200px" }}>
              <Typography>Collective price</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((item) => (
            <TableRow key={item.product._id}>
              <TableCell>
                <Typography
                  color="secondary"
                  onClick={() => handleGoToProductPage(item.product._id)}
                  sx={{ cursor: "pointer" }}
                >
                  {item.product.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="secondary">{item.amount}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="secondary">{item.product.price}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="secondary">
                  {item.product.price * item.amount}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CheckoutTable;
