import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { itemsStock } from "../recoil/products/atom";
import { cartValue } from "../recoil/cart/atom";

function Products() {
  const [items, setItems] = useRecoilState(itemsStock);
  const [cart, setCart] = useRecoilState(cartValue);
  const params = useParams();
  const navigate = useNavigate();

  function handleImageClick(id) {
    navigate(`/Products/${id}`);
  }

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
        {items.map((item) => (
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
              onClick={() => handleImageClick(item.id)}
            />
            <h3>Price: {item.price} €</h3>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Products;
