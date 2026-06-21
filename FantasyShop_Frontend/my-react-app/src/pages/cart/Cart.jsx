import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CartCard from "./CartCard.jsx";
import AuthModal from "../../components/AuthModel.jsx";
import "./Cart.css";

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });

  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

  }, [cart]);

  function increaseQuantity(id) {

    const updatedCart = cart.map((item) => {

      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id) {

    const updatedCart = cart.map((item) => {

      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }

      return item;
    }).filter((item) => item.quantity > 0);

    setCart(updatedCart);
  }

  function removeFromCart(id) {

    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
  }

  function clearCart() {

    setCart([]);
  }

  function goToCheckout() {

    const token = localStorage.getItem("token");

    if (!token) {
      setShowAuthModal(true);
      return;
    }

    navigate("/checkout");
  }

  function closeAuthModal() {

    setShowAuthModal(false);
  }

  function handleLoginSuccess() {

    setShowAuthModal(false);
    navigate("/checkout");
  }

  const totalPrice = cart.reduce((sum, item) => {
    return sum + Number(item.basePrice) * item.quantity;
  }, 0);

  let authModal = null;

  if (showAuthModal) {

    authModal = (

      <AuthModal
        onClose={closeAuthModal}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (cart.length === 0) {

    return (

      <section className="cart-page">

        <h1>Cart</h1>

        <p>Your cart is empty.</p>

        {authModal}

      </section>
    );
  }

  return (

    <section className="cart-page">

      <h1>Cart</h1>

      <div className="cart-list">

        {cart.map((item) => (

          <CartCard
            key={item.id}
            item={item}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
          />

        ))}

      </div>

      <div className="cart-summary">

        <h2>Total: {totalPrice} kr.</h2>

        <div className="cart-summary-actions">

          <button className="checkout-button" onClick={goToCheckout}>
            Go to checkout
          </button>

          <button onClick={clearCart}>
            Clear cart
          </button>

        </div>

      </div>

      {authModal}

    </section>
  );
}

export default Cart;