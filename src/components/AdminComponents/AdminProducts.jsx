import React from "react";
import { useRecoilState } from "recoil";
import { itemsStock } from "../../recoil/products/atom";

function AdminUsers() {
  const [items, setItems] = useRecoilState(itemsStock);

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
              width: "15rem",
              height: "30rem",
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
            <h3>Price: {item.price} €</h3>
          </div>
        ))}
      </main>
    </div>
  );
}

export default AdminUsers;
