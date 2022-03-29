import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentUser } from "../recoil/users/currentUser/atom";
import { useRecoilState } from "recoil";

export default function Header() {
  const navigate = useNavigate();
  const params = useParams();
  const [cUser, setCUser] = useRecoilState(currentUser);
  function handleClickMenu(gate) {
    if (gate === 1) {
      navigate("/");
    } else if (gate === 2) {
      navigate("/Products");
    } else if (gate === 3) {
      navigate("/Cart");
    } else if (gate === 4) {
      navigate("/Login");
    } else if (gate === 5) {
      navigate("/MyPage");
    } else if (gate === 6) {
      localStorage.removeItem("currentUsers");
      setCUser([]);
    } else {
      navigate("/NotFound");
    }
  }
  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        borderBottom: "solid 2px black",
        padding: "1rem",
      }}
    >
      <button
        onClick={() => {
          handleClickMenu(1);
        }}
      >
        Home
      </button>

      <button
        onClick={() => {
          handleClickMenu(2);
        }}
      >
        Products
      </button>

      <button
        onClick={() => {
          handleClickMenu(3);
        }}
      >
        Cart
      </button>

      {cUser.length < 1 ? (
        <button
          onClick={() => {
            handleClickMenu(4);
          }}
        >
          Login
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              handleClickMenu(5);
            }}
          >
            {cUser.name.firstname}´s Page
          </button>
          <button
            onClick={() => {
              handleClickMenu(6);
            }}
          >
            Logout
          </button>
        </>
      )}
    </span>
  );
}
