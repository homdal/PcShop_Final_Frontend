import { Box, Divider, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import ROUTES from "../../routes/ROUTES";
import ErrorIcon from "@mui/icons-material/Error";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGotoHome = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <Container component={Paper} sx={{ border: "1px solid black", p: 10 }}>
      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        Error 404
      </Typography>
      <Typography variant="h5" color="secondary">
        Page Not Found
      </Typography>
      <Divider sx={{ margin: "20px 0 20px 0" }} />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box>
          <Typography variant="h6">
            Oops... The requested URL was not found on this server.
          </Typography>
          <Link
            href="#"
            variant="body1"
            onClick={handleGotoHome}
            sx={{
              fontSize: "18px",
              color: "secondary",
            }}
          >
            <Typography
              variant="h6"
              color="secondary"
              sx={{ textDecoration: "underline" }}
            >
              Click here to return to the home page.
            </Typography>
          </Link>
        </Box>
        <ErrorIcon
          sx={{ height: "200px", width: "200px", margin: "50px 100px 0 0" }}
        />
      </Box>
    </Container>
  );
};

export default NotFoundPage;
