import React from "react";
import { allUsers } from "../../recoil/users/allUsers/atom";
import { useRecoilState } from "recoil";

function AdminProducts() {
  const [aUser, setAUser] = useRecoilState(allUsers);

  return (
    <div>
      {" "}
      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {aUser.map((user) => (
          <div
            key={user.id}
            style={{
              border: "black solid 2px",
              margin: "1rem",
              padding: "1rem",
              width: "15rem",
              // height: "30rem",
              display: "grid",
              // flexWrap: "wrap",
              // justifyContent: "center",
            }}
          >
            <p style={{ margin: "0.1rem" }}>
              <b>Firstname:</b> {user.name.firstname}
            </p>
            <p style={{ margin: "0.1rem" }}>
              <b>Lastname:</b>
              {user.name.lastname}
            </p>
            <p style={{ margin: "0.1rem" }}>
              <b>Email:</b> {user.email} €
            </p>
            <p style={{ margin: "0.1rem" }}>
              <b>Address:</b> {user.address.city} {user.address.zipcode}{" "}
              {user.address.street} {user.address.number}{" "}
            </p>
            <p style={{ margin: "0.1rem" }}>
              <b>ID:</b> {user.id}
            </p>{" "}
            <p style={{ margin: "0.1rem" }}>
              <b>Phone:</b> {user.phone}
            </p>{" "}
            <p style={{ margin: "0.1rem" }}>
              <b>Username:</b> {user.username}
            </p>{" "}
            <p style={{ margin: "0.1rem" }}>
              <b>Password:</b> {user.password}
            </p>
            <p style={{ margin: "0.1rem" }}>
              <b>Role:</b> {user.role}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default AdminProducts;
