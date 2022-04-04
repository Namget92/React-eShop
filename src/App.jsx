import react, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { itemsStock } from "./recoil/products/atom";
import { allUsers } from "./recoil/users/allUsers/atom";
// import cartHooks from "./hooks/cartHooks";

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

function App() {
  const [items, setItems] = useRecoilState(itemsStock);
  const [user, setUser] = useRecoilState(allUsers);
  // const { updateCart } = cartHooks(useRecoilState);

  useEffect(() => {
    axios
      .get("https://k4backend.osuka.dev/products")
      .then((response) =>
        localStorage.setItem("stock", JSON.stringify(response.data))
      );
    return setItems(JSON.parse(localStorage.getItem("stock" || [])));
  }, []);

  useEffect(() => {
    axios
      .get("https://k4backend.osuka.dev/users")
      .then((response) =>
        localStorage.setItem("users", JSON.stringify(response.data))
      );
    return setUser(JSON.parse(localStorage.getItem("users" || [])));
  }, []);

  // useEffect(() => {
  //   updateCart();
  // }, []);

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
