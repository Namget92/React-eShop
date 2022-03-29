import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../recoil/users/currentUser/atom";
import { useRecoilState } from "recoil";
import { cartValue } from "../recoil/globelCart/atom";

function cartHooks() {
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const [cart, setCart] = useRecoilState(cartValue);
  const [currentCart, setCurrentCart] = useState({});

  function addItem(userID, itemID, amount) {
    if (userID === undefined) {
      userID = 0;
    }
    setCart([...cart, { userID: userID, itemID: itemID, amount: amount }]);
  }

  return { addItem };
}

export default cartHooks;
