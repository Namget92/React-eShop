import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { users } from "../recoil/users/allUsers/atom";
import { useRecoilState } from "recoil";

function CreateAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lasttname, setLasttname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(1);
  const [zip, setZip] = useState("");

  const [user, setUser] = useRecoilState(users);

  async function handleSubmit(e) {
    let newUser = [];
    e.preventDefault();
    try {
      await fetch("https://k4backend.osuka.dev/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          role: "user",
          name: {
            firstname: firstname,
            lastname: lasttname,
          },
          address: {
            city: city,
            street: street,
            number: number,
            zipcode: zip,
          },
          phone: phone,
        }),
      })
        .then((res) => res.json())
        .then((res) => (newUser = [...user, res]))
        .then(() => setUser(newUser))
        .then(() => navigate("/Login"));
    } catch (error) {
      alert(error + "Problem with server, try again later");
    }
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <Helmet>
        <title>CreateAccount</title>
      </Helmet>
      <Header />
      <main
        style={{ display: "grid", justifyItems: "center", marginTop: "15rem" }}
      >
        <form style={{ display: "grid" }} onSubmit={handleSubmit}>
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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lasttname"
            value={lasttname}
            onChange={(e) => setLasttname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            type="text"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <button type="submit">CreateAccount</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default CreateAccount;
