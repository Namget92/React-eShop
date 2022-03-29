import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userHook from "../hooks/userHook";
import { useRecoilState } from "recoil";
import { currentUser } from "../recoil/users/currentUser/atom";
import { cartValue } from "../recoil/cart/atom";

function Cart() {
  const { userStorage } = userHook(useRecoilState);
  const params = useParams();
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const [cart, setCart] = useRecoilState(cartValue);

  useEffect(() => {
    userStorage();
  }, [cUser]);

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
      <main
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              border: "black solid 2px",
              margin: "1rem",
              padding: "1rem",
              width: "15rem",
              height: "30rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <h2>{item.title}</h2>
            <img
              src={item.image}
              alt={`picture of ${item.title}`}
              style={{ width: "10rem" }}
            />
            <h3>Price: {item.price} €</h3>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
