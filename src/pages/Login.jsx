import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Header />
      <main
        style={{ display: "grid", justifyItems: "center", marginTop: "15rem" }}
      >
        <form action="submit" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </form>
        <div
          style={{
            display: "grid",
            justifyItems: "center",
            marginTop: "7.5rem",
          }}
        >
          <p>Want to create an accont?</p>
          <button
            onClick={() => {
              navigate("/CreateAccount");
            }}
          >
            Create Account
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
