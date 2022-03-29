import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { allUsers } from "../recoil/users/allUsers/atom";
import { currentUser } from "../recoil/users/currentUser/atom";

import { useRecoilState } from "recoil";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(allUsers);
  const [cUser, setCUser] = useRecoilState(currentUser);
  const navigate = useNavigate();
  console.log(cUser);

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
        style={{ display: "grid", justifyItems: "center", marginTop: "15rem" }}
      >
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
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
