import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

const useLoadCart = () => {
  const dispatch = useDispatch();
  return () => {
    let arrayString = localStorage.getItem("cart");
    let savedCart = JSON.parse(arrayString);
    if (savedCart) {
      dispatch(cartActions.addArray(savedCart));
    }
  };
};
export default useLoadCart;
