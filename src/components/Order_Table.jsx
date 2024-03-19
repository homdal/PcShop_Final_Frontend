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

const OrderTable = ({ exist, orders }) => {
  const orderRows = (
    <TableBody>
      {orders.map((order) => (
        <TableRow key={order._id}>
          <TableCell>
            <Typography color="secondary">{order.orderNum}</Typography>
          </TableCell>
          <TableCell>
            <Typography color="secondary">{order.total}&#8362;</Typography>
          </TableCell>
          <TableCell>
            <Typography color="secondary">{order.status}</Typography>
          </TableCell>
          <TableCell>
            <Typography color="secondary">
              {order.creationDate.slice(0, 10)}
            </Typography>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "95%", border: "1px solid black" }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "200px" }}>
              <Typography>Order Number</Typography>
            </TableCell>
            <TableCell sx={{ width: "200px" }}>
              <Typography>Total</Typography>
            </TableCell>
            <TableCell sx={{ width: "200px" }}>
              <Typography>Status</Typography>
            </TableCell>
            <TableCell sx={{ width: "200px" }}>
              <Typography>Creation Date</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        {exist ? (
          orderRows
        ) : (
          <TableBody>
            <TableRow>
              <TableCell>No orders found</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
export default OrderTable;
