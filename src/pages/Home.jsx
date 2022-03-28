import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  function handleLink() {
    navigate(`/Products`);
  }
  function handleClickMenu(gate) {
    if (gate === 1) {
      navigate("/Products");
    } else if (gate === 2) {
      navigate("/Login");
    } else {
      navigate("/NotFound");
    }
  }
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
