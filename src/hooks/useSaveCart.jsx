import { useSelector } from "react-redux";

const useSaveCart = () => {
  const cart = useSelector((store) => store.cartSlice.items);
  return () => {
    let arrayString = JSON.stringify(cart);
    localStorage.setItem("cart", arrayString);
  };
};
export default useSaveCart;
