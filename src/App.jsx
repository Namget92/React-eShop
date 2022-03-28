import react, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { itemsStock } from "./recoil/products/atom";

//Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import AdminPage from "./pages/AdminPage";
import CreateAccount from "./pages/CreateAccount";

function App() {
  const [items, setItems] = useRecoilState(itemsStock);

  useEffect(() => {
    axios
      .get("https://k4backend.osuka.dev/products")
      .then((response) =>
        localStorage.setItem("stock", JSON.stringify(response.data))
      );
    return setItems(JSON.parse(localStorage.getItem("stock" || [])));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products/:id" element={<Product />} />
      <Route path="/Products/" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/MyPage" element={<MyPage />} />
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
