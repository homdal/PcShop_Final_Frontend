import { Grid } from "@mui/material";
import PlaceholderCard from "./Placeholder_Card";

const PlaceholderGrid = () => {
  const placeholderArr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Grid
      container
      spacing={1}
      sx={{
        border: "1px solid black",
        width: "60vw",
        pb: 1,
      }}
    >
      {placeholderArr.map((number) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          key={number}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlaceholderCard />
        </Grid>
      ))}
    </Grid>
  );
};
export default PlaceholderGrid;
