import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { userDataActions } from "../../../store/userDataSlice.js";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES.js";
import { toast } from "react-toastify";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dispatch(userDataActions.logout());
    handleCloseUserMenu();
    navigate(ROUTES.HOME);
    toast(`Logged out. See you soon!`);
  };
  const handleNavigateToAccount = () => {
    navigate(ROUTES.ACCOUNT);
  };
  return (
    <Fragment>
      <IconButton
        className="accountIcon"
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpenUserMenu}
        color="inherit"
        sx={{ padding: { xs: 1, sm: 1 } }}
      >
        <AccountCircle className="headerIcon" />
      </IconButton>
      <Menu
        id="user_menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseUserMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleNavigateToAccount}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          My Account
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
export default UserMenu;
