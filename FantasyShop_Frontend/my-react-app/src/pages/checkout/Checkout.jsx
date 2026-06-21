import { useState } from "react";
import { useNavigate } from "react-router";
import { createAddress, createOrder, createOrderItem } from "../../api/api.js";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const [cart] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });

  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Denmark");
  const [message, setMessage] = useState("");

  const totalPrice = cart.reduce((sum, item) => {
    return sum + Number(item.basePrice) * item.quantity;
  }, 0);

  async function handleCheckout(event) {

    event.preventDefault();

    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in to complete checkout.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    try {

      const address = await createAddress(street, postalCode, city, country);

      const order = await createOrder(address.id);

      for (const item of cart) {
        await createOrderItem(order.id, item.id, item.quantity);
      }

      localStorage.removeItem("cart");

      window.dispatchEvent(new Event("cartUpdated"));

      setMessage("Order placed successfully.");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {

      console.log(error);
      setMessage("Der skete en fejl ved checkout.");
    }
  }

  if (cart.length === 0) {

    return (

      <section className="checkout-page">

        <h1>Checkout</h1>

        <p>Your basket is empty.</p>

      </section>
    );
  }

  return (

    <section className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-layout">

        <form className="checkout-form" onSubmit={handleCheckout}>

          <h2>Delivery address</h2>

          <label>
            Address
            <input
              type="text"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
              required
            />
          </label>

          <label>
            Zip code
            <input
              type="text"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
            />
          </label>

          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
          </label>

          <label>
            Country
            <input
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
          </label>

          <button type="submit">
            Place order
          </button>

          <p className="checkout-message">
            {message}
          </p>

        </form>

        <aside className="checkout-summary">

          <h2>Your order</h2>

          {cart.map((item) => (

            <div key={item.id} className="checkout-item">

              <p>{item.name}</p>

              <span>
                {item.quantity} x {item.basePrice} kr.
              </span>

            </div>

          ))}

          <h3>Total: {totalPrice} kr.</h3>

        </aside>

      </div>

    </section>
  );
}

export default Checkout;