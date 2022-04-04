import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { itemsStock } from "../recoil/products/atom";
import { currentUser } from "../recoil/users/currentUser/atom";
import userHook from "../hooks/userHook";

function Products() {
  const [items, setItems] = useRecoilState(itemsStock);
  const [category, setCategory] = useState("all");
  const [arrProd, setArrProd] = useState(items);
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const { userStorage } = userHook(useRecoilState);

  function handleImageClick(id) {
    navigate(`/Products/${id}`);
  }

  useEffect(() => {
    userStorage();
  }, [cUser]);

  useEffect(() => {
    if (category === "all") {
      setArrProd(items);
    } else {
      const result = items.filter((item) => item.category === category);
      setArrProd(result);
    }
  }, [category]);

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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "1rem",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2>Category</h2>
        <select
          style={{
            width: "15rem",
          }}
          type="text"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value={"all"}>All</option>
          <option value={"men's clothing"}>Men's clothing</option>
          <option value={"jewelery"}>Jewelery</option>
          <option value={"electronics"}>Electronics</option>
          <option value={"women's clothing"}>Women's clothing</option>
        </select>
      </div>
      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          minHeight: "74.5vh",
        }}
      >
        {arrProd.map((item) => (
          <div
            key={item.id}
            style={{
              border: "black solid 2px",
              margin: "1rem",
              padding: "1rem",
              width: "15rem",
              maxHeight: "30rem",
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
