import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminGuard = ({ children }) => {
  const userData = useSelector((store) => store.userDataSlice.user);
  if (userData?.isAdmin) {
    return children;
  } else {
    toast.warning("You must be an admin to view this page!");
    <Navigate to="/home" replace={true} />;
  }
};
export default AdminGuard;
