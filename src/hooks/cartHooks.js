import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentCartValue } from "../recoil/cart/currentCart/atom";
import { nanoid } from "nanoid";

function cartHooks() {
  const [cCart, setCCart] = useRecoilState(currentCartValue);

  function addItem(username, itemID) {
    const selectedItem = { uID: username, iID: itemID - 1, pID: nanoid() };
    const amountArray = [];
    amountArray.push(selectedItem);
    console.log(cCart);
    let newCart = cCart.concat(amountArray);
    setCCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function removeItem(id) {
    const newArray = [];
    cCart.map((item) => {
      if (item.pID !== id) {
        newArray.push(item);
      }
    });
    setCCart(newArray);
    localStorage.setItem("cart", JSON.stringify(newArray));
  }

  function updateCart() {
    setCCart(JSON.parse(localStorage.getItem("cart" || [])));
    console.log("tets");
  }

  return { addItem, removeItem, updateCart };
}

export default cartHooks;
