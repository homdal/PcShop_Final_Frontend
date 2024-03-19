import {
  Typography,
  Container,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES.js";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [dataRetrieved, setDataRetrieved] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const visibleRows = useMemo(
    () => products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [products, page, rowsPerPage]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEditProduct = (id) => {
    navigate(`${ROUTES.EDITPRODUCT}/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/products/`);
        setProducts(data);
        setDataRetrieved(true);
      } catch (e) {
        console.log(
          "An error occurred in all_products/All_Products_Page.jsx while retrieving products:",
          e
        );
      }
    })();
  }, []);
  const productRows = (
    <TableBody>
      {visibleRows.map((product) => (
        <TableRow key={product._id}>
          <TableCell>
            <Typography color="secondary">{product._id}</Typography>
          </TableCell>
          <TableCell>
            <Typography color="secondary">{product.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography color="secondary">{product.category}</Typography>
          </TableCell>
          <TableCell>
            <Typography color="secondary">{product.subCategory}</Typography>
          </TableCell>
          <TableCell>
            <Typography color="secondary">{product.stock}</Typography>
          </TableCell>
          <TableCell>
            <Typography color="secondary">{product.price}</Typography>
          </TableCell>
          <TableCell>
            <IconButton onClick={() => handleEditProduct(product._id)}>
              <EditIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
  return (
    <Container
      sx={{
        pb: 15,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component={Paper}
        sx={{ width: "100vw", border: "1px solid black", mb: 2 }}
      >
        <Typography variant="h3">All Products</Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ width: "70vw", border: "1px solid black" }}
      >
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "200px" }}>
                <Typography>Product Id</Typography>
              </TableCell>
              <TableCell sx={{ width: "200px" }}>
                <Typography>Name</Typography>
              </TableCell>
              <TableCell sx={{ width: "200px" }}>
                <Typography>Category</Typography>
              </TableCell>
              <TableCell sx={{ width: "200px" }}>
                <Typography>SubCategory</Typography>
              </TableCell>
              <TableCell sx={{ width: "200px" }}>
                <Typography>Stock</Typography>
              </TableCell>
              <TableCell sx={{ width: "200px" }}>
                <Typography>Price</Typography>
              </TableCell>
              <TableCell sx={{ width: "200px" }}>
                <Typography>Edit</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {dataRetrieved ? productRows : ""}
        </Table>
      </TableContainer>
      {dataRetrieved ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component={Paper}
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            width: "70vw",
            border: "1px solid black",
          }}
        />
      ) : (
        ""
      )}
    </Container>
  );
};
export default AllProducts;
