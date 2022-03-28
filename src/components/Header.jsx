import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const params = useParams();
  function handleClickMenu(gate) {
    if (gate === 1) {
      navigate("/");
    } else if (gate === 2) {
      navigate("/Products");
    } else if (gate === 3) {
      navigate("/Cart");
    } else if (gate === 4) {
      navigate("/Login");
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

      <button
        onClick={() => {
          handleClickMenu(4);
        }}
      >
        Login
      </button>
    </span>
  );
}
