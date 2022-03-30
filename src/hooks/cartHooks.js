import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../recoil/users/currentUser/atom";
import { useRecoilState } from "recoil";
import { globalCartValue } from "../recoil/cart/globelCart/atom";
import { currentCartValue } from "../recoil/cart/currentCart/atom";
import { itemsStock } from "../recoil/products/atom";

function cartHooks() {
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const [gCart, setGCart] = useRecoilState(globalCartValue);
  const [cCart, setCCart] = useRecoilState(currentCartValue);
  const [items, setItems] = useRecoilState(itemsStock);

  function addItem(userID, itemID) {
    const selectedItem = { uID: userID, iID: itemID };
    const amountArray = [];
    amountArray.push(selectedItem);
    let newCart = cCart.concat(amountArray);
    setCCart(newCart);
    setGCart([...cCart]);
    console.log(cCart);
    console.log(gCart);
  }

  function getMyCart(userID) {
    gCart.find((o) => {
      if (o.id === userID) {
        setCCart(cCart);
      } else {
        let obj = [{ id: userID }];
        setCCart(obj);
        setGCart([...gCart, cCart]);
      }
    });
    console.log("c" + "-" + cCart + "-");
    console.log("g" + "-" + gCart + "-");
  }

  return { addItem, getMyCart };
}

export default cartHooks;
