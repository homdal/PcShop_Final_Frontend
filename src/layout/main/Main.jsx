import { Container } from "@mui/material";

const Main = ({ children }) => {
  return (
    <Container sx={{ height: "auto", pb: 2, pt: 2 }}>{children}</Container>
  );
};
export default Main;
