import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Search, StyledInputBase } from "./ui/Search";
import SideMenu from "./ui/Side_Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import darkLogo from "./images/dark.jpg";
import { useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserMenu from "./ui/User_Menu";
import { useSearchParams } from "react-router-dom";

const Header = () => {
  const cart = useSelector((store) => store.cartSlice.items);
  const loggedIn = useSelector((store) => store.userDataSlice.loggedIn);
  const [itemsInCart, setItemsInCart] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!searchQuery) {
      return;
    }
    setSearchParams({ q: searchQuery });
    navigate(`${ROUTES.SEARCH}/search?q=${encodeURIComponent(searchQuery)}`);
  };
  useEffect(() => {
    let itemAmount = 0;
    for (let item of cart) {
      itemAmount += item.amount;
    }
    setItemsInCart(itemAmount);
  }, [cart]);
  const handleCartClick = () => {
    navigate(ROUTES.CART);
  };
  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
  };
  const handleGoToLogin = () => {
    navigate(ROUTES.LOGINREGISTER);
  };
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          alignItems: {
            xl: "center",
            lg: "center",
            md: "center",
            sm: "start",
            xs: "start",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: {
              xl: "50vw",
              lg: "50vw",
              md: "50vw",
              sm: "70vw",
              xs: "70vw",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: {
                  xl: "block",
                  lg: "block",
                  md: "block",
                  sm: "none",
                  xs: "none",
                },
                width: "60px",
                height: "60px",
                backgroundImage: `url(${darkLogo})`,
                backgroundPosition: "center",
                backgroundSize: "70px 200%",
                borderRadius: "30px",
                mr: 1,
              }}
            />
            <Typography
              className="logoTypo"
              variant="h4"
              noWrap
              component="div"
              onClick={handleLogoClick}
              sx={{
                display: {
                  xl: "block",
                  lg: "block",
                  md: "block",
                  sm: "none",
                  xs: "none",
                },
              }}
            >
              PC Shop
            </Typography>
            <SideMenu />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Search>
              <StyledInputBase
                placeholder="Search Products…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <IconButton onClick={handleSearch}>
                <SearchIcon className="headerIcon" />
              </IconButton>
            </Search>
            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "flex",
                  alignItems: "center",
                },
              }}
            >
              <IconButton
                className="cartIcon"
                size="large"
                color="inherit"
                sx={{ padding: { xs: 1, sm: 1 } }}
                onClick={handleCartClick}
              >
                <Badge badgeContent={itemsInCart} color="error">
                  <ShoppingCartIcon className="headerIcon" />
                </Badge>
              </IconButton>
              {loggedIn ? (
                <UserMenu />
              ) : (
                <Button
                  className="loginButton"
                  onClick={handleGoToLogin}
                  sx={{
                    display: {
                      lg: "block",
                      md: "block",
                      sm: "none",
                      xs: "none",
                    },
                  }}
                >
                  Log In
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component={Paper}
        sx={{
          height: "40px",
          borderBottom: "1px solid black",
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Newest generations available!</Typography>
      </Box>
    </Box>
  );
};
export default Header;
