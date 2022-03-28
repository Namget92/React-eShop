import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cart() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <Header />
      <Footer />
    </div>
  );
}

export default Cart;
