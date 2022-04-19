import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../recoil/users/currentUser/atom";
import { useRecoilState } from "recoil";
import userHook from "../hooks/userHook";

function Home() {
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const { userStorage } = userHook(useRecoilState);

  function handleClickMenu(gate) {
    if (gate === 1) {
      navigate("/Products");
    } else if (gate === 2) {
      navigate("/Login");
    } else {
      navigate("/NotFound");
    }
  }
  console.log("VersionsHanterings kurs 19 april");

  useEffect(() => {
    userStorage();
  }, [cUser]);

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header />

      <div style={{ textAlign: "center", marginTop: "15rem" }}>
        <h1>Welcome!</h1>
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
        <h3>
          <button
            style={{
              border: "none",
              backgroundColor: "inherit",
              fontSize: "0.75rem",
            }}
            onClick={() => {
              handleClickMenu(2);
            }}
          >
            Login/Create Account
          </button>
        </h3>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
