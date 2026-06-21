import { Routes, Route } from "react-router";

import Layout from "./layout/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import Roleplay from "./pages/roleplay/Roleplay.jsx";
import Products from "./pages/products/Products.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import Orders from "./pages/orders/Orders.jsx";
import Search from "./pages/search/Search.jsx";

import "./App.css";

function App() {

  return (

    <Routes>

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="roleplay" element={<Roleplay />} />
        <Route path="roleplay/category/:categoryId" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
        <Route path="search" element={<Search />} />

      </Route>

    </Routes>
  );
}

export default App;