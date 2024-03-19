import { Typography, Box, Button } from "@mui/material";
import { Fragment } from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InputBase from "@mui/material/InputBase";
import { toast } from "react-toastify";
import { validateEmailSub } from "../../validation/emailSubscriptionValidation";
import {
  Categories,
  Services,
  FooterAccount,
} from "../header/ui/Side_Links_&_Icons";
import Link from "@mui/material/Link";
import { useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const loggedIn = useSelector((store) => store.userDataSlice.loggedIn);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const handleNavigateCategories = (category, subCategory) => {
    navigate(`${ROUTES.CATEGORY}/${category}/${subCategory}`);
  };
  const handleNavigateOther = (page) => {
    navigate(`${ROUTES[page]}`);
  };
  const handleEmailSub = () => {
    const JoiResponse = validateEmailSub({
      email,
    });
    if (JoiResponse) {
      toast.error(JoiResponse.email);
      return;
    }
    toast.success("Thank you for subscribing!");
  };
  return (
    <Stack
      component={Paper}
      sx={{
        position: "fixed",
        bottom: -200,
        left: 0,
        right: 0,
        height: "auto",
        width: "100vw",
        display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
        justifyContent: "center",
        borderTop: "1px solid black",
        transition: "bottom 1s",
        "&:hover": {
          bottom: 0,
        },
      }}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <Box sx={{ pt: 3, textAlign: "center" }}>
        <Typography color="secondary">
          Subscribe to stay up to date with our sales and new items!
        </Typography>
        <InputBase
          placeholder="               Enter Your Email"
          sx={{
            mr: 1,
            mt: 1,
            borderRadius: "10px",
            height: "50px",
            width: "250px",
            borderTop: "1px solid grey",
            borderBottom: "1px solid grey",
          }}
          id="emailSub"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleEmailSub}>Subscribe</Button>
      </Box>
      <Stack direction="row" sx={{ height: "70px", pt: 4 }}>
        <IconButton>
          <InstagramIcon className="footerIcon" />
        </IconButton>
        <IconButton>
          <XIcon className="footerIcon" />
        </IconButton>
        <IconButton>
          <FacebookIcon className="footerIcon" />
        </IconButton>
      </Stack>
      {Categories.map((category, index) => (
        <List key={index}>
          <ListItem>
            <Typography
              color="secondary"
              sx={{ textDecoration: "underline dotted" }}
            >
              {category.name}
            </Typography>
          </ListItem>
          {category.footer.map((link) => (
            <ListItem key={link}>
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => handleNavigateCategories(category.name, link)}
              >
                {link}
              </Link>
            </ListItem>
          ))}
        </List>
      ))}
      <List>
        <ListItem>
          <Typography
            color="secondary"
            sx={{ textDecoration: "underline dotted" }}
          >
            Services
          </Typography>
        </ListItem>
        {Services.map((category) => (
          <ListItem key={category.name}>
            <Link
              onClick={() => handleNavigateOther(category.page)}
              sx={{ cursor: "pointer" }}
            >
              {category.name}
            </Link>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem>
          <Typography
            color="secondary"
            sx={{ textDecoration: "underline dotted" }}
          >
            Account
          </Typography>
        </ListItem>
        {loggedIn ? (
          FooterAccount.map((category) => (
            <ListItem key={category.name}>
              <Link
                onClick={() => handleNavigateOther(category.page)}
                sx={{ cursor: "pointer" }}
              >
                {category.name}
              </Link>
            </ListItem>
          ))
        ) : (
          <Fragment>
            <ListItem>
              <Link
                href="#"
                onClick={() => handleNavigateOther("LOGINREGISTER")}
              >
                Log In
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#" onClick={() => handleNavigateOther("CART")}>
                Cart
              </Link>
            </ListItem>
          </Fragment>
        )}
      </List>
    </Stack>
  );
};
export default Footer;
