import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import userHook from "../hooks/userHook";
import { useRecoilState } from "recoil";
import { currentUser } from "../recoil/users/currentUser/atom";
import { currentCartValue } from "../recoil/cart/atom";
import { itemsStock, count, count2 } from "../recoil/products/atom";
import { nanoid } from "nanoid";
import cartHooks from "../hooks/cartHooks";
import { useNavigate } from "react-router-dom";

function UserCart() {
  const { userStorage } = userHook(useRecoilState);
  const [cUser, setCUser] = useRecoilState(currentUser);
  const [counter, setCounter] = useRecoilState(count);
  const [cCart, setCCart] = useRecoilState(currentCartValue);
  const [items, setItems] = useRecoilState(itemsStock);
  const { removeItem } = cartHooks(useRecoilState);
  const [counter2, setCounter2] = useRecoilState(count2);
  const navigate = useNavigate();

  useEffect(() => {
    userStorage();
  }, [cUser]);

  useEffect(() => {
    setCCart(JSON.parse(localStorage.getItem("cart" || [])));
  }, []);

  if (items.length === 0) return <h1>Loading...</h1>;
  if (Object.keys(cUser).length === 0 || cUser.role !== "admin")
    return (
      <div>
        Admin not loged in <br />{" "}
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Home
        </button>{" "}
      </div>
    );

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
            <h2>{items[product.iID - 1].title}</h2>
            <img
              src={items[product.iID - 1].image}
              alt={`picture of ${items[product.iID - 1].title}`}
              style={{ width: "10rem" }}
            />
            <h3>Price: {items[product.iID - 1].price} €</h3>
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
