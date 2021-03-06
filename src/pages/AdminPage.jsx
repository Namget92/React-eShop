import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminUsers from "../components/AdminComponents/AdminUsers";
import AdminProducts from "../components/AdminComponents/AdminProducts";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../recoil/users/currentUser/atom";
import { useRecoilState } from "recoil";
import userHook from "../hooks/userHook";

function AdminPage() {
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const { userStorage } = userHook(useRecoilState);
  const [boo, setBoo] = useState(true);

  useEffect(() => {
    userStorage();
  }, [cUser]);

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

  function handleClick() {
    if (boo === true) {
      setBoo(false);
    } else {
      setBoo(true);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "3rem",
      }}
    >
      <Helmet>
        <title>Admins Page</title>
      </Helmet>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        {" "}
        <button onClick={handleClick}>
          {boo ? "Show Users" : "Show Products"}
        </button>
        <button
          onClick={() => {
            navigate("/userCart");
          }}
        >
          See Users Carts
        </button>
      </div>

      <div>{boo ? <AdminProducts /> : <AdminUsers />}</div>

      <Footer />
    </div>
  );
}

export default AdminPage;
