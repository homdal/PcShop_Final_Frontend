import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeGuard = ({ children }) => {
  const userData = useSelector((store) => store.userDataSlice.user);
  const loggedIn = useSelector((store) => store.userDataSlice.loggedIn);
  if (userData?.isEmployee || userData?.isAdmin) {
    return children;
  } else if (loggedIn) {
    toast.warning("You must be an employee account to view this page!");
    <Navigate to="/home" replace={true} />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};
export default EmployeeGuard;
