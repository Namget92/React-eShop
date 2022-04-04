import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import userHook from "../hooks/userHook";
import { useRecoilState } from "recoil";
import { currentUser } from "../recoil/users/currentUser/atom";
import { currentCartValue } from "../recoil/cart/currentCart/atom";
import { itemsStock } from "../recoil/products/atom";
import { nanoid } from "nanoid";
import cartHooks from "../hooks/cartHooks";

function UserCart() {
  const { userStorage } = userHook(useRecoilState);
  const [cUser, setCUser] = useRecoilState(currentUser);
  const [cCart, setCCart] = useRecoilState(currentCartValue);
  const [items, setItems] = useRecoilState(itemsStock);
  const { removeItem } = cartHooks(useRecoilState);

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
        <title>User Carts</title>
      </Helmet>
      <Header />
      <h1 style={{ textAlign: "center" }}></h1>

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
            {" "}
            <h2>
              Belongs to:{" "}
              {product.uID === undefined ? "undefined" : product.uID}
            </h2>
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

export default UserCart;
