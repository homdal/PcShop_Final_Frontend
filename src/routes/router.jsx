import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/home/Home_Page";
import AddProduct from "../pages/add_product/Add_Product_Page";
import ProductPage from "../pages/product/Product_Page";
import LoginRegisterPage from "../pages/login_registration/Login_Register_Page";
import CartPage from "../pages/cart/Cart_Page";
import CheckoutPage from "../pages/checkout/Checkout_Page";
import OrderSuccess from "../pages/order_success/Order_Succes_Page";
import CategoryPage from "../pages/category/Category_Page";
import AboutPage from "../pages/about/About_Page";
import EmployeeGuard from "../guards/Employee_Guard";
import AdminGuard from "../guards/Admin_Guard";
import RegisterEmployee from "../pages/register-employee/Register_Employee_Page";
import AccountPage from "../pages/account/Account_Page";
import SearchPage from "../pages/search/Search_Page";
import EditProduct from "../pages/edit_product/Edit_Product_Page";
import AllProducts from "../pages/all_products/All_Products_Page";
import AllOrders from "../pages/all_orders/All_Orders_Page";
import FindOrder from "../pages/find_order/Find_Order_Page";
import NotFoundPage from "../pages/404/Not_Found_Page";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route
        path={ROUTES.ADDPRODUCT}
        element={
          <EmployeeGuard>
            <AddProduct />
          </EmployeeGuard>
        }
      />
      <Route
        path={ROUTES.ALLPRODUCTS}
        element={
          <EmployeeGuard>
            <AllProducts />
          </EmployeeGuard>
        }
      />
      <Route
        path={ROUTES.ALLORDERS}
        element={
          <EmployeeGuard>
            <AllOrders />
          </EmployeeGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITPRODUCT}/:id`}
        element={
          <EmployeeGuard>
            <EditProduct />
          </EmployeeGuard>
        }
      />
      <Route
        path={ROUTES.REGISTEREMP}
        element={
          <AdminGuard>
            <RegisterEmployee />
          </AdminGuard>
        }
      />
      <Route path={`${ROUTES.PRODUCTPAGE}/:id`} element={<ProductPage />} />
      <Route path={ROUTES.LOGINREGISTER} element={<LoginRegisterPage />} />
      <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={`${ROUTES.SEARCH}/:search`} element={<SearchPage />} />
      <Route path={ROUTES.FINDORDER} element={<FindOrder />} />
      <Route
        path={`${ROUTES.ORDERSUCCESS}/:orderNum`}
        element={<OrderSuccess />}
      />
      <Route
        path={`${ROUTES.CHECKOUT}/:guestOrUser`}
        element={<CheckoutPage />}
      />
      <Route
        path={`${ROUTES.CATEGORY}/:category/:subcategory`}
        element={<CategoryPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default Router;
