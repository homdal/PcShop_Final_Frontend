import { Box, Drawer, Divider, IconButton, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HouseIcon from "@mui/icons-material/House";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Categories,
  Services,
  Account,
  Employee,
  Admin,
} from "./Side_Links_&_Icons";
import { Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import ROUTES from "../../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const loggedIn = useSelector((store) => store.userDataSlice.loggedIn);
  const userData = useSelector((store) => store.userDataSlice.user);
  const [sideMenu, setSideMenu] = useState(false);
  const [expandListItem, setExpandListItem] = useState(0);
  const navigate = useNavigate();
  const handleLinkClick = (page) => {
    navigate(ROUTES[page]);
  };
  const handleToggleMenu = () => {
    setSideMenu(!sideMenu);
  };
  const handleExpand = (event, index) => {
    if (expandListItem === 0 || expandListItem !== index) {
      setExpandListItem(index);
    } else if (expandListItem === index) {
      setExpandListItem(0);
    }
  };
  const linkList = (
    <Box role="presentation" sx={{ width: "300px" }}>
      <List>
        <ListItem
          key="homePageLink"
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            display: { lg: "none", md: "none", sm: "block", xs: "block" },
          }}
        >
          <ListItemButton onClick={() => handleLinkClick("HOME")}>
            <ListItemIcon>
              <HouseIcon />
            </ListItemIcon>
            <ListItemText primary={"Home Page"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="categoryTitle"
          sx={{
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          Categories
        </ListItem>
        {Categories.map((category, index) => (
          <List key={`${category.name}List`}>
            <ListItem key={category.name} disablePadding>
              <ListItemButton
                onClick={(event) => handleExpand(event, index + 1)}
              >
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.name} />
                {expandListItem === index + 1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse
              in={expandListItem === index + 1}
              timeout="auto"
              unmountOnExit
            >
              {category.sub}
            </Collapse>
          </List>
        ))}
      </List>
      <Divider />
      {userData?.isEmployee && (
        <ListItem
          key="employeeTitle"
          sx={{
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          Employee
        </ListItem>
      )}
      {userData?.isEmployee && (
        <List>
          {Employee.map((category) => (
            <ListItem key={category.name} disablePadding>
              <ListItemButton onClick={() => handleLinkClick(category.page)}>
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      {userData?.isEmployee && <Divider />}
      {userData?.isAdmin && (
        <ListItem
          key="adminTitle"
          sx={{
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          Admin
        </ListItem>
      )}
      {userData?.isAdmin && (
        <List>
          {Admin.map((category) => (
            <ListItem key={category.name} disablePadding>
              <ListItemButton onClick={() => handleLinkClick(category.page)}>
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      {userData?.isAdmin && <Divider />}
      <ListItem key="servicesTitle" sx={{ fontWeight: 600, fontSize: "20px" }}>
        Services
      </ListItem>
      <List>
        {Services.map((category) => (
          <ListItem key={category.name} disablePadding>
            <ListItemButton onClick={() => handleLinkClick(category.page)}>
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem key="accountTitle" sx={{ fontWeight: 600, fontSize: "20px" }}>
        Account
      </ListItem>
      <List>
        {loggedIn ? (
          Account.map((category) => (
            <ListItem key={category.name} disablePadding>
              <ListItemButton onClick={() => handleLinkClick(category.page)}>
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Fragment>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleLinkClick("LOGINREGISTER")}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Log In" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleLinkClick("CART")}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>
          </Fragment>
        )}
      </List>
    </Box>
  );

  return (
    <Box>
      <IconButton
        className="categoryButton"
        onClick={handleToggleMenu}
        sx={{ mr: { xs: 1, sm: 1, md: 0, lg: 0 } }}
      >
        <MenuIcon
          sx={{ mr: { xs: 0, sm: 0, md: 1, lg: 1 } }}
          className="headerIcon"
        />
        <Typography
          className="categoryTypo"
          sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
        >
          Categories
        </Typography>
      </IconButton>
      <Box>
        <Drawer open={sideMenu} onClose={handleToggleMenu}>
          {linkList}
        </Drawer>
      </Box>
    </Box>
  );
};

export default SideMenu;
