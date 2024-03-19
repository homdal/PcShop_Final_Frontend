import Placeholder from "react-bootstrap/Placeholder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const PlaceholderCard = () => {
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
        component="img"
        sx={{
          height: 250,
          width: 250,
          mt: 1,
        }}
        image=""
        title="placeholder"
      />
      <CardContent
        sx={{
          textAlign: "center",
          height: "110px",
          width: "80%",
          overflow: "hidden",
        }}
      >
        <Placeholder animation="wave">
          <Placeholder xl={12} lg={12} md={12} sm={12} xs={12} />{" "}
        </Placeholder>
        <Placeholder animation="wave">
          <Placeholder xl={8} lg={8} md={8} sm={8} xs={8} />{" "}
        </Placeholder>
        <Placeholder animation="wave">
          <Placeholder xl={4} lg={4} md={4} sm={4} xs={4} />{" "}
        </Placeholder>
      </CardContent>
    </Card>
  );
};
export default PlaceholderCard;
