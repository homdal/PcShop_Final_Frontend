import Main from "./main/Main";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Theme } from "../theme/Theme";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const currentTheme = createTheme(Theme());
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Header />
      <Main>{children}</Main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme={"dark"}
      />
    </ThemeProvider>
  );
};
export default Layout;
