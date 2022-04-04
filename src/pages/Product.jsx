import React, { useEffect } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { itemsStock, count } from "../recoil/products/atom";
import userHook from "../hooks/userHook";
import cartHooks from "../hooks/cartHooks";
import { currentUser } from "../recoil/users/currentUser/atom";

function Product() {
  const [items, setItems] = useRecoilState(itemsStock);
  const [cUser, setCUser] = useRecoilState(currentUser);
  const [counter, setCounter] = useRecoilState(count);
  const { addItem } = cartHooks(useRecoilState);
  const { userStorage } = userHook(useRecoilState);
  const item = items.find((item) => item.id === counter);

  console.log(item);

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
      <main
        style={{
          display: "grid",
          justifyContent: "center",
          minHeight: "87vh",
        }}
      >
        <div
          style={{
            border: "black solid 2px",
            margin: "0 1rem 0 1rem",
            padding: "0 1rem 0 1rem",
            width: "90vw",
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

            <li style={{ listStyleType: "none", visibility: "revert" }}>
              {item.description}
            </li>
          </ul>
          <button
            onClick={() => {
              addItem(cUser.username, item.id);
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
