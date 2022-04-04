import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userHook from "../hooks/userHook";
import { useRecoilState } from "recoil";
import { currentUser } from "../recoil/users/currentUser/atom";
import { globalCartValue } from "../recoil/cart/globelCart/atom";
import { currentCartValue } from "../recoil/cart/currentCart/atom";
import { itemsStock } from "../recoil/products/atom";
import { nanoid } from "nanoid";
import cartHooks from "../hooks/cartHooks";

function Cart() {
  const { userStorage } = userHook(useRecoilState);
  const params = useParams();
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const [gCart, setGCart] = useRecoilState(globalCartValue);
  const [cCart, setCCart] = useRecoilState(currentCartValue);
  const [items, setItems] = useRecoilState(itemsStock);
  const { removeItem } = cartHooks(useRecoilState);

  useEffect(() => {
    userStorage();
  }, [cUser]);

  if (items.length === 0) return <h1>Loading...</h1>;

  let price = 0;
  const totalPrice = cCart.forEach((item) => {
    price = price + items[item.iID].price;
    console.log(price);
  });

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "3rem",
      }}
    >
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Header />
      <h1 style={{ textAlign: "center" }}>
        Total cost: {Math.round(price * 100) / 100} €
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <button>Go to checkout</button>
      </div>
      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          minHeight: "77.5vh",
        }}
      >
        {cCart.map((product) => (
          <div
            key={nanoid()}
            style={{
              border: "black solid 2px",
              margin: "1rem",
              padding: "1rem",
              width: "15rem",

              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>{items[product.iID].title}</h2>
            <img
              src={items[product.iID].image}
              alt={`picture of ${items[product.iID].title}`}
              style={{ width: "10rem" }}
            />
            <h3>Price: {items[product.iID].price} €</h3>
            <button
              onClick={() => {
                removeItem(product.pID);
              }}
              style={{ height: "2rem", width: "6rem" }}
            >
              Remove
            </button>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
