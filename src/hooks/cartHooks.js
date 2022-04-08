import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentCartValue } from "../recoil/cart/atom";
import { nanoid } from "nanoid";
import { itemsStock } from "../recoil/products/atom";
import { currentUser } from "../recoil/users/currentUser/atom";

function cartHooks() {
  const [cCart, setCCart] = useRecoilState(currentCartValue);
  const [items, setItems] = useRecoilState(itemsStock);
  const [cUser, setCUser] = useRecoilState(currentUser);

  function addItem(username, itemID) {
    console.log(username);
    console.log(itemID);
    const selectedItem = { uID: username, iID: itemID, pID: nanoid() };
    const amountArray = [];
    amountArray.push(selectedItem);
    console.log(cCart);
    if (cCart !== null) {
      let newCart = cCart.concat(amountArray);
      setCCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      setCCart(amountArray);
      localStorage.setItem("cart", JSON.stringify(amountArray));
    }
  }

  function removeItem(id) {
    const newArray = [];
    cCart.map((item) => {
      if (item.pID !== id) {
        newArray.push(item);
      }
    });
    setCCart(newArray);
    localStorage.setItem("cart", JSON.stringify(newArray || []));
  }

  function priceIsRice() {
    const cartToShow = cCart.filter((item) => item.uID === cUser.username);
    let price = 0;
    const totalPrice = cartToShow.forEach((item) => {
      price = price + items[item.iID - 1].price;
    });
    return price;
  }
  return { addItem, removeItem, priceIsRice };
}

export default cartHooks;
