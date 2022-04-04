import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../recoil/users/currentUser/atom";
import { useRecoilState } from "recoil";
import userHook from "../hooks/userHook";
import { globalCartValue } from "../recoil/cart/globelCart/atom";
import { currentCartValue } from "../recoil/cart/currentCart/atom";
import { allUsers } from "../recoil/users/allUsers/atom";

function MyPage() {
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const { userStorage } = userHook(useRecoilState);
  const [gCart, setGCart] = useRecoilState(globalCartValue);
  const [cCart, setCCart] = useRecoilState(currentCartValue);
  let [boo, setBoo] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lasttname, setLasttname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zip, setZip] = useState("");

  const [user, setUser] = useRecoilState(allUsers);

  useEffect(() => {
    userStorage("MyPage");
  }, [cUser]);

  async function changeUser(e) {
    let newUser = [];
    e.preventDefault();
    try {
      await fetch(`https://k4backend.osuka.dev/users/${cUser.id}`, {
        method: "PUT",
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
        .then((res) => setCUser(res));
    } catch (error) {
      console.log(error);
    }
  }

  if (Object.keys(cUser).length === 0) return <div>Loading..</div>;

  return (
    <div>
      <Helmet>
        <title>My Page</title>
      </Helmet>
      <Header />
      <div style={{ textAlign: "center", marginTop: "15rem" }}>
        <p>Email: {cUser.email}</p>
        <p>
          Address: {cUser.address.street} {cUser.address.number}{" "}
          {cUser.address.city} {cUser.address.zipcode}
        </p>
        <p>
          Name: {cUser.name.firstname}
          {cUser.name.lastname}
        </p>
        <p>Phone: {cUser.phone}</p>
        <p>Username: {cUser.username}</p>
        <p>Password: {cUser.password}</p>
      </div>

      {boo ? (
        <button
          onClick={() => {
            setBoo((boo = !boo));
          }}
        >
          Update your info?
        </button>
      ) : (
        <form style={{ display: "grid" }} onSubmit={changeUser}>
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

          <button type="submit">Update Info</button>
        </form>
      )}

      <Footer />
    </div>
  );
}

export default MyPage;
