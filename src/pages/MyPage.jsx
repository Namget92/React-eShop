import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../recoil/users/currentUser/atom";
import { useRecoilState } from "recoil";
import userHook from "../hooks/userHook";

function MyPage() {
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);
  const { userStorage } = userHook(useRecoilState);

  useEffect(() => {
    userStorage("MyPage");
  }, [cUser]);

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

      <Footer />
    </div>
  );
}

export default MyPage;
