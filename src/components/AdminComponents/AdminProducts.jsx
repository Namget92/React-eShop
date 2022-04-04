import React from "react";
import { useRecoilState } from "recoil";
import { itemsStock, count } from "../../recoil/products/atom";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [items, setItems] = useRecoilState(itemsStock);
  const [counter, setCounter] = useRecoilState(count);
  const navigate = useNavigate();

  function handleRemove(itemID) {
    let c = counter;
    const newArray = items.filter((item) => item.id !== itemID);
    localStorage.setItem("stock", JSON.stringify(newArray));
    setItems(newArray);
    console.log(items);
    c = c + 1;
    setCounter(c);
  }
  function handleImageClick(id) {
    navigate(`/AdminChange/${id}`);
  }

  return (
    <div>
      {" "}
      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "black solid 2px",
              margin: "1rem",
              padding: "0.1rem",
              width: "16rem",
              height: "31rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <h2>{item.title}</h2>
            <img
              src={item.image}
              alt={`picture of ${item.title}`}
              style={{ width: "10rem" }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3>Price: {item.price} €</h3>{" "}
              <button
                style={{
                  marginLeft: "0.5rem",
                  height: "1.5rem",
                  width: "1.5rem",
                }}
                onClick={() => {
                  handleRemove(item.id);
                }}
              >
                x
              </button>
              <button
                style={{
                  marginLeft: "0.5rem",
                  height: "1.5rem",
                  width: "5rem",
                }}
                onClick={() => {
                  handleImageClick(item.id);
                }}
              >
                Change
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default AdminUsers;
