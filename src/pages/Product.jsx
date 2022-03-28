import React, { useEffect } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { itemsStock } from "../recoil/products/atom";
import { cartValue } from "../recoil/cart/atom";

function Product() {
  const [items, setItems] = useRecoilState(itemsStock);
  const [cart, setCart] = useRecoilState(cartValue);
  const params = useParams();
  const item = items[params.id - 1];

  useEffect(() => {
    return setItems(JSON.parse(localStorage.getItem("stock" || [])));
  }, []);

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
      <main style={{ justifyContent: "center" }}>
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
          <button style={{ height: "2rem", width: "6rem" }}>Add to cart</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Product;
