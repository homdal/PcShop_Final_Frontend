import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Stack } from "@mui/material";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleGoToProductPage = () => {
    navigate(`${ROUTES.PRODUCTPAGE}/${product._id}`);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 400,
        borderRadius: "500px",
        borderTop: "5px solid black",
        borderBottom: "5px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardMedia
        className="productImage"
        sx={{
          height: 300,
          width: 250,
          mt: 1,
          cursor: "pointer",
        }}
        onClick={handleGoToProductPage}
        image={product.imageUrl}
        title="product"
      />
      <CardContent
        sx={{ textAlign: "center", height: "110px", overflow: "hidden" }}
      >
        <Typography gutterBottom component="div">
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>Price:</Typography>
        <Typography color="secondary">{product.price}&#8362;</Typography>
      </Stack>
      <CardActions>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button size="small" onClick={handleGoToProductPage}>
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
export default ProductCard;
