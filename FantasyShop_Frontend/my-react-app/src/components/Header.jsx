import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getUsername, logoutUser } from "../api/api.js";
import AuthModal from "./AuthModel.jsx";
import "./Header.css";

function getCartCount() {

  const savedCart = localStorage.getItem("cart");

  if (!savedCart) {
    return 0;
  }

  const cart = JSON.parse(savedCart);

  return cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
}

function Header() {

  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [username, setUsername] = useState(getUsername());
  const [cartCount, setCartCount] = useState(getCartCount());
  const [searchText, setSearchText] = useState("");

  useEffect(() => {

    function updateCartCount() {
      setCartCount(getCartCount());
    }

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };

  }, []);

  function handleSearch(event) {

    event.preventDefault();

    const trimmedSearchText = searchText.trim();

    if (trimmedSearchText === "") {
      return;
    }

    navigate("/search?query=" + encodeURIComponent(trimmedSearchText));

    setSearchText("");
  }

  function openAuthModal() {
    setShowAuthModal(true);
  }

  function closeAuthModal() {
    setShowAuthModal(false);
  }

  function handleLoginSuccess(loggedInUsername) {

    setUsername(loggedInUsername);
    setShowAuthModal(false);

    window.dispatchEvent(new Event("authUpdated"));
  }

  function logout() {

    logoutUser();
    setUsername(null);

    window.dispatchEvent(new Event("authUpdated"));
  }

  let authButton;

  if (username) {

    authButton = (

      <button className="header-login-button" onClick={logout}>
        Log out
      </button>
    );

  } else {

    authButton = (

      <button className="header-login-button" onClick={openAuthModal}>
        Login
      </button>
    );
  }

  let ordersLink = null;

  if (username) {

    ordersLink = (

      <Link to="/orders">
        My orders
      </Link>
    );
  }

  let authModal = null;

  if (showAuthModal) {

    authModal = (

      <AuthModal
        onClose={closeAuthModal}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  let cartBadge = null;

  if (cartCount > 0) {

    cartBadge = (

      <span className="cart-count">
        {cartCount}
      </span>
    );
  }

  return (

    <>
      <header className="header">

        <div className="header-content">

          <Link to="/" className="header-logo">
            Fantasy Shop
          </Link>

          <form className="header-search" onSubmit={handleSearch}>

            <input
              type="text"
              placeholder="Search wares..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <button type="submit">
              Search
            </button>

          </form>

          <nav className="header-nav">

            {authButton}

            {ordersLink}

            <Link to="/cart" className="cart-link">
              Cart {cartBadge}
            </Link>

          </nav>

        </div>

      </header>

      {authModal}
    </>
  );
}

export default Header;