import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  function handleClickMenu(gate) {
    if (gate === 1) {
      navigate("/Products");
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
      </div>

      <Footer />
    </div>
  );
}

export default NotFound;
