import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getItems } from "../../api/api.js";
import ProductCard from "../products/ProductCard.jsx";
import "./Search.css";

function Search() {

  const [searchParams] = useSearchParams();

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const query = searchParams.get("query");

  useEffect(() => {
    
    getItems()
    .then((data) => {
        setItems(data);
    })
    .catch((error) => {
      console.log(error);
      setMessage("Could not fetch products.");
    });

  }, []);

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

  let filteredItems = [];

  if (query) {

    const lowerQuery = query.toLowerCase();

    filteredItems = items.filter((item) => {

      let name = "";
      let description = "";

      if (item.name) {
        name = item.name.toLowerCase();
      }

      if (item.description) {
        description = item.description.toLowerCase();
      }

      return name.includes(lowerQuery) || description.includes(lowerQuery);
    });
  }

  if (!query) {

    return (

      <section className="search-page">

        <h1>Search products</h1>

        <p>Write something in the search bar.</p>

      </section>
    );
  }

  return (

    <section className="search-page">

      <h1>Search results for "{query}"</h1>

      <p>{message}</p>

      <p>{filteredItems.length} Products found.</p>

      <div className="search-grid">
        {filteredItems.map((item) => (<ProductCard key={item.id} item={item} onAddToCart={addToCart} />))}
      </div>

    </section>
  );
}

export default Search;