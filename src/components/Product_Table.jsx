import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const ProductTable = ({ thisProduct, specs }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" } }}
    >
      <Table
        sx={{ width: "100%", border: "1px solid black" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "200px" }}>
              <Typography color="secondary">Warranty</Typography>
            </TableCell>
            <TableCell>
              <Typography>{thisProduct.warranty}</Typography>
            </TableCell>
          </TableRow>
          {thisProduct.manufacturer ? (
            <TableRow>
              <TableCell sx={{ width: "200px" }}>
                <Typography color="secondary">Manufacturer</Typography>
              </TableCell>
              <TableCell>
                <Typography>{thisProduct.manufacturer}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
          {thisProduct.productModel ? (
            <TableRow>
              <TableCell sx={{ width: "200px" }}>
                <Typography color="secondary">Product Model</Typography>
              </TableCell>
              <TableCell>
                <Typography>{thisProduct.productModel}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
          {thisProduct.color ? (
            <TableRow>
              <TableCell sx={{ width: "200px" }}>
                <Typography color="secondary">Product Color</Typography>
              </TableCell>
              <TableCell>
                <Typography>{thisProduct.color}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
          {thisProduct.dimensions?.height ? (
            <TableRow>
              <TableCell sx={{ width: "200px" }}>
                <Typography color="secondary">Product Dimensions</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  height:{thisProduct.dimensions.height}, width:
                  {thisProduct.dimensions.width}, length:
                  {thisProduct.dimensions.length}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
          {specs.length ? (
            <TableRow>
              <TableCell sx={{ width: "200px" }}>
                <Typography color="secondary">Specifications:</Typography>
              </TableCell>
              <TableCell>
                <Typography color="secondary"></Typography>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
        </TableHead>
        <TableBody>
          {specs.map((spec) => (
            <TableRow key={spec.specName}>
              <TableCell component="th" scope="row">
                <Typography color="secondary">{spec.specName}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{spec.specDesc}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProductTable;
