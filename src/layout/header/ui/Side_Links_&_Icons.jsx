import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import HardwareIcon from "@mui/icons-material/Hardware";
import MouseIcon from "@mui/icons-material/Mouse";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InfoIcon from "@mui/icons-material/Info";
import AppsIcon from "@mui/icons-material/Apps";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ListItemText from "@mui/material/ListItemText";
import ROUTES from "../../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const DesktopSubCategory = () => {
  const navigate = useNavigate();
  const handleSubClick = (category, subcategory) => {
    navigate(`${ROUTES.CATEGORY}/${category}/${subcategory}`);
  };
  return (
    <List component="div" disablePadding>
      <ListItemButton key="home&officeDesktops" sx={{ pl: 4 }}>
        <ListItemText
          primary="Home & Office"
          onClick={() => handleSubClick("desktops", "home&office")}
        />
      </ListItemButton>
      <ListItemButton key="gamingDesktops" sx={{ pl: 4 }}>
        <ListItemText
          primary="Gaming PC"
          onClick={() => handleSubClick("desktops", "gaming")}
        />
      </ListItemButton>
    </List>
  );
};
const LaptopSubCategory = () => {
  const navigate = useNavigate();
  const handleSubClick = (category, subcategory) => {
    navigate(`${ROUTES.CATEGORY}/${category}/${subcategory}`);
  };
  return (
    <List component="div" disablePadding>
      <ListItemButton key="allLaptops" sx={{ pl: 4 }}>
        <ListItemText
          primary="All Laptops"
          onClick={() => handleSubClick("laptops", "all-laptops")}
        />
      </ListItemButton>
      <ListItemButton key="gamingLaptops" sx={{ pl: 4 }}>
        <ListItemText
          primary="Gaming Laptops"
          onClick={() => handleSubClick("laptops", "gaming")}
        />
      </ListItemButton>
    </List>
  );
};
const HardwareSubCategory = () => {
  const navigate = useNavigate();
  const handleSubClick = (category, subcategory) => {
    navigate(`${ROUTES.CATEGORY}/${category}/${subcategory}`);
  };
  return (
    <List component="div" disablePadding>
      <ListItemButton
        key="processors"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("hardware", "processors")}
      >
        <ListItemText primary="Processors" />
      </ListItemButton>
      <ListItemButton
        key="motherboards"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("hardware", "motherboards")}
      >
        <ListItemText primary="Motherboards" />
      </ListItemButton>
      <ListItemButton
        key="memory"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("hardware", "memory")}
      >
        <ListItemText primary="Memory" />
      </ListItemButton>
      <ListItemButton
        key="videoCards"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("hardware", "videoCards")}
      >
        <ListItemText primary="Video Cards" />
      </ListItemButton>
      <ListItemButton
        key="storage"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("hardware", "storage")}
      >
        <ListItemText primary="Storage" />
      </ListItemButton>
    </List>
  );
};
const PeripherySubCategory = () => {
  const navigate = useNavigate();
  const handleSubClick = (category, subcategory) => {
    navigate(`${ROUTES.CATEGORY}/${category}/${subcategory}`);
  };
  return (
    <List component="div" disablePadding>
      <ListItemButton
        key="mice"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("periphery", "mice")}
      >
        <ListItemText primary="Mice" />
      </ListItemButton>
      <ListItemButton
        key="keyboards"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("periphery", "keyboards")}
      >
        <ListItemText primary="Keyboards" />
      </ListItemButton>
      <ListItemButton
        key="headphones"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("periphery", "headphones")}
      >
        <ListItemText primary="Headphones" />
      </ListItemButton>
      <ListItemButton
        key="speakers"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("periphery", "speakers")}
      >
        <ListItemText primary="Speakers" />
      </ListItemButton>
      <ListItemButton
        key="cameras"
        sx={{ pl: 4 }}
        onClick={() => handleSubClick("periphery", "cameras")}
      >
        <ListItemText primary="Cameras" />
      </ListItemButton>
    </List>
  );
};

const Categories = [
  {
    name: "Desktops",
    icon: <DesktopWindowsIcon />,
    sub: <DesktopSubCategory />,
    footer: ["Home&Office", "Gaming"],
  },
  {
    name: "Laptops",
    icon: <LaptopChromebookIcon />,
    sub: <LaptopSubCategory />,
    footer: ["All-Laptops", "Gaming"],
  },
  {
    name: "Hardware",
    icon: <HardwareIcon />,
    sub: <HardwareSubCategory />,
    footer: ["Processors", "Motherboards", "Memory", "Video Cards", "Storage"],
  },
  {
    name: "Periphery",
    icon: <MouseIcon />,
    sub: <PeripherySubCategory />,
    footer: ["Mice", "Keyboards", "Headphones", "Speakers", "Cameras"],
  },
];

const Services = [
  {
    name: "Find Order",
    icon: <SearchIcon />,
    page: "FINDORDER",
  },
  { name: "About", icon: <InfoIcon />, page: "ABOUT" },
];
const Employee = [
  { name: "Add Product", icon: <AddBoxIcon />, page: "ADDPRODUCT" },
  { name: "All Products", icon: <AppsIcon />, page: "ALLPRODUCTS" },
  { name: "All Orders", icon: <FormatListBulletedIcon />, page: "ALLORDERS" },
];
const Admin = [
  { name: "Register Employee", icon: <HowToRegIcon />, page: "REGISTEREMP" },
];
const Account = [
  { name: "My Account", icon: <AccountBoxIcon />, page: "ACCOUNT" },
  { name: "Cart", icon: <ShoppingCartIcon />, page: "CART" },
];
const FooterAccount = [
  { name: "My Account", icon: <AccountBoxIcon />, page: "ACCOUNT" },
  { name: "Cart", icon: <ShoppingCartIcon />, page: "CART" },
];

export { Categories, Services, Account, FooterAccount, Employee, Admin };
