import react, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { itemsStock } from "./recoil/products/atom";
import { allUsers } from "./recoil/users/allUsers/atom";

//Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import UserCart from "./pages/UserCart";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import AdminPage from "./pages/AdminPage";
import CreateAccount from "./pages/CreateAccount";
import AdminChange from "./pages/AdminChange";
import { currentCartValue } from "./recoil/cart/atom";

function App() {
  const [items, setItems] = useRecoilState(itemsStock);
  const [user, setUser] = useRecoilState(allUsers);
  const [cCart, setCCart] = useRecoilState(currentCartValue);

  console.log("New branch");

  useEffect(() => {
    async function getPeople() {
      try {
        await fetch("https://k4backend.osuka.dev/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => setUser(res));
      } catch (error) {
        alert(error);
      }
    }
    getPeople();
  }, []);

  useEffect(() => {
    setCCart(JSON.parse(localStorage.getItem("cart" || [])));
  }, []);
  console.log("App Render");
  console.log(items);

  useEffect(() => {
    async function getStock() {
      try {
        await fetch("https://k4backend.osuka.dev/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => setItems(res));
      } catch (error) {
        alert(error);
      }
    }
    getStock();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products/:id" element={<Product />} />
      <Route path="/Products/" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/UserCart" element={<UserCart />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/MyPage" element={<MyPage />} />
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route path="/AdminChange/:id" element={<AdminChange />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
