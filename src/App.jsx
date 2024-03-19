import Layout from "./layout/Layout";
import Router from "./routes/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import useLoadCart from "./hooks/useLoadCart";
import useAutoLogin from "./hooks/useAutoLogin";
import { useEffect } from "react";

const App = () => {
  const loadCart = useLoadCart();
  const autoLogin = useAutoLogin();
  useEffect(() => {
    loadCart();
    autoLogin();
  }, []);
  return (
    <Layout>
      <Router />
    </Layout>
  );
};

export default App;
