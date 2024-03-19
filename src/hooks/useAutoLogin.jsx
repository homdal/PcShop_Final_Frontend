import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { userDataActions } from "../store/userDataSlice.js";
import { toast } from "react-toastify";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        token = sessionStorage.getItem("token");
      }
      if (!token) {
        return;
      }
      const dataFromToken = jwtDecode(token);
      const { data } = await axios.get(`/users/${dataFromToken._id}`);
      dispatch(userDataActions.login(data.user));
      dispatch(userDataActions.clearOrders());
      toast.success(`Welcome ${data.user.contactInfo.firstName}!`);
    } catch (err) {
      console.log("error in auto login", err);
      localStorage.clear();
    }
  };
};

export default useAutoLogin;
