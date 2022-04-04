import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { allUsers } from "../recoil/users/allUsers/atom";
import { currentUser } from "../recoil/users/currentUser/atom";
import cartHooks from "../hooks/cartHooks";
import { useRecoilState } from "recoil";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(allUsers);
  const [cUser, setCUser] = useRecoilState(currentUser);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    user.forEach((person) => {
      if (person.username === username && person.password === password) {
        setCUser(person);
        localStorage.setItem("currentUsers", JSON.stringify(person));
        if (person.role === "user") {
          navigate("/MyPage");
        } else if (person.role === "admin") {
          navigate("/AdminPage");
        }
      }
    });
  }

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Header />
      <main
        style={{ display: "grid", justifyItems: "center", marginTop: "12rem" }}
      >
        <h2>Login</h2>
        <form
          style={{ display: "grid", justifyItems: "center" }}
          action="submit"
          onSubmit={handleSubmit}
        >
          <input
            style={{ margin: "0.25rem", height: "2rem", textAlign: "center" }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={{ margin: "0.25rem", height: "2rem", textAlign: "center" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={{
              margin: "0.25rem",
              height: "2rem",
              textAlign: "center",
              width: "50%",
            }}
            type="submit"
          >
            Login
          </button>
        </form>
        <div
          style={{
            display: "grid",
            justifyItems: "center",
            marginTop: "2rem",
          }}
        >
          <h4>Want to create an accont?</h4>
          <button
            style={{
              margin: "0.25rem",
              height: "rem",
              textAlign: "center",
              width: "50%",
            }}
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
