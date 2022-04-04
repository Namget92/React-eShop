import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { itemsStock, count } from "../recoil/products/atom";
import { useNavigate } from "react-router-dom";
import userHook from "../hooks/userHook";
import { currentUser } from "../recoil/users/currentUser/atom";

function AdminChange() {
  const [items, setItems] = useRecoilState(itemsStock);
  const [cUser, setCUser] = useRecoilState(currentUser);
  const params = useParams();
  const [counter, setCounter] = useRecoilState(count);
  const item = items[params.id - counter];
  const { userStorage } = userHook(useRecoilState);
  const [titel, setTitel] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [rate, setRate] = useState(0);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    userStorage();
  }, [cUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch(`https://k4backend.osuka.dev/products/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          description: description,
          image: image,
          price: price,
          rating: {
            rate: rate,
            count: count,
          },
          title: titel,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const newArray = items.filter(
            (item) => item.id !== items[params.id - counter].id
          );
          console.log(newArray);

          const newNewArray = newArray.concat(res);
          console.log(newNewArray);
          newNewArray.sort((a, b) => {
            return a.id - b.id;
          });
          console.log(newNewArray);
          setItems(newNewArray);
          localStorage.setItem("stock", JSON.stringify(newNewArray));
          navigate("/adminpage");
        });
    } catch (error) {
      alert(error);
    }
  }

  if (items.length === 0) return <h1>Loading...</h1>;

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "3rem",
      }}
    >
      <Helmet>
        <title>{item.title}</title>
      </Helmet>
      <Header />
      <main
        style={{
          display: "grid",
          justifyContent: "center",
          minHeight: "87vh",
        }}
      >
        <div
          style={{
            border: "black solid 2px",
            margin: "1rem",
            padding: "1rem",
            width: "90vw",
            display: "grid",
            justifyItems: "center",
          }}
        >
          <form style={{ display: "grid" }} onSubmit={handleSubmit}>
            <p
              style={{
                margin: "0",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              Titel
            </p>
            <input
              type="text"
              value={titel}
              onChange={(e) => setTitel(e.target.value)}
            />
            <p
              style={{
                margin: "0",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              Price
            </p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p
              style={{
                margin: "0",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              Rate
            </p>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            <p
              style={{
                margin: "0",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              Count
            </p>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />

            <p
              style={{
                margin: "0",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              Description
            </p>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p
              style={{
                margin: "0",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              Image Url
            </p>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <p
              style={{
                margin: "0",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              Category
            </p>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                marginBottom: "1rem",
              }}
            />
            <button type="submit">Change Product</button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminChange;
