import React, { useEffect } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { itemsStock } from "../recoil/products/atom";
import { globalCartValue } from "../recoil/cart/globelCart/atom";
import { currentCartValue } from "../recoil/cart/currentCart/atom";

import userHook from "../hooks/userHook";
import cartHooks from "../hooks/cartHooks";
import { currentUser } from "../recoil/users/currentUser/atom";

function Product() {
  const [items, setItems] = useRecoilState(itemsStock);
  const [gCart, setGCart] = useRecoilState(globalCartValue);
  const [cCart, setCCart] = useRecoilState(currentCartValue);
  const [cUser, setCUser] = useRecoilState(currentUser);
  const params = useParams();
  const item = items[params.id - 1];
  const { addItem } = cartHooks(useRecoilState);
  const { userStorage } = userHook(useRecoilState);

  useEffect(() => {
    return setItems(JSON.parse(localStorage.getItem("stock" || [])));
  }, []);

  useEffect(() => {
    userStorage();
  }, [cUser]);

  if (items.length === 0) return <h1>Loading...</h1>;

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "3rem",
      }}
    >
      <Helmet>
        <title>{item.title}</title>
      </Helmet>
      <Header />
      <main style={{ display: "grid", justifyContent: "center" }}>
        <div
          style={{
            border: "black solid 2px",
            margin: "0 1rem 0 1rem",
            padding: "0 1rem 0 1rem",
            width: "90vw",
            height: "80vh",
            display: "grid",
            justifyItems: "center",
            padding: "1rem",
            margin: "1rem",
          }}
        >
          <h2>{item.title}</h2>
          <img
            src={item.image}
            alt={`picture of ${item.title}`}
            style={{ width: "20rem" }}
          />
          <ul style={{ padding: "0", marginTop: "1rem" }}>
            <li style={{ listStyleType: "none" }}>Price: {item.price} €</li>
            <li style={{ listStyleType: "none" }}>
              Rating: {item.rating.rate} ⭐
            </li>
            <li style={{ listStyleType: "none", visibility: "revert" }}>
              {item.description}
            </li>
          </ul>
          <button
            onClick={() => {
              addItem(cUser.id, item.id);
            }}
            style={{ height: "2rem", width: "6rem" }}
          >
            Add to cart
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Product;
