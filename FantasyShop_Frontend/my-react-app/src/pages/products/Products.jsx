import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./ProductCard.jsx";
import "./Products.css";

const API_URL = import.meta.env.VITE_API_URL;

function Products() {

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {

    fetch(`${API_URL}/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => setCategory(data))
    .catch((err) => console.log(err));

    fetch(`${API_URL}/items/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => setItems(data))
    .catch((err) => console.log(err));

  }, [categoryId]);

  function addToCart(item) {

    const savedCart = localStorage.getItem("cart");
    let currentCart = [];

    if (savedCart) {
      currentCart = JSON.parse(savedCart);
    }

    const existingItem = currentCart.find((cartItem) => {
      return cartItem.id === item.id;
    });

    let updatedCart;

    if (existingItem) {

      updatedCart = currentCart.map((cartItem) => {

        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }

        return cartItem;
      });

    } else {
      updatedCart = [...currentCart, { ...item, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  }

  let title = "Produkter";

  if (category) {
    title = category.categoryName;
  }

  return (

    <section className="products-page">

      <h1>{title}</h1>

      <div className="products-grid">
        {items.map((item) => (<ProductCard key={item.id} item={item} onAddToCart={addToCart} />))}
      </div>

    </section>
  );
}

export default Products;