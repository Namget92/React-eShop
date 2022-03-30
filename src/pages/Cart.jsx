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

function Cart() {
  const { userStorage } = userHook(useRecoilState);
  const params = useParams();
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const [gCart, setGCart] = useRecoilState(globalCartValue);
  const [cCart, setCCart] = useRecoilState(currentCartValue);

  console.log("c" + "-" + cCart + "-");
  console.log("g" + "-" + gCart + "-");

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
        {cCart.map((item) => (
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
