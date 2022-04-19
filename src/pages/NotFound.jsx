import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../recoil/users/currentUser/atom";
import { useRecoilState } from "recoil";
import userHook from "../hooks/userHook";

function NotFound() {
  const [cUser, setCUser] = useRecoilState(currentUser);
  const { userStorage } = userHook(useRecoilState);
  const navigate = useNavigate();
  useEffect(() => {
    userStorage();
  }, [cUser]);

  function handleClickMenu(gate) {
    if (gate === 1) {
      navigate("/Products");
    } else {
      navigate("/NotFound");
    }
    console.log("Yo Mamma");
    console.log("Yo Mamma");
  }

  return (
    <div>
      <br />
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header />
      <div style={{ textAlign: "center", marginTop: "15rem" }}>
        <h1>Opps there is nothing here!</h1>
        <h2>
          <button
            style={{
              border: "none",
              backgroundColor: "inherit",
              fontSize: "1rem",
            }}
            onClick={() => {
              handleClickMenu(1);
            }}
          >
            Check out our products!
          </button>
        </h2>
        <br />
      </div>

      <Footer />
    </div>
  );
}

export default NotFound;
