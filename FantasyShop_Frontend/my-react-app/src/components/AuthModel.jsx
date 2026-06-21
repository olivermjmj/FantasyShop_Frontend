import { useState } from "react";
import { loginUser, registerUser } from "../api/api.js";
import "./AuthModel.css";

function AuthModal({ onClose, onLoginSuccess }) {

  const [mode, setMode] = useState("login");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [message, setMessage] = useState("");

  function showRegister() {

    setMode("register");
    setMessage("");
  }

  function showLogin() {

    setMode("login");
    setMessage("");
  }

  function handleLogin(event) {

    event.preventDefault();

    loginUser(loginUsername, loginPassword)
    .then((data) => {
      onLoginSuccess(data.username);
    })
    .catch((err) => {
      console.log(err);
      setMessage("Wrong username or password.");
    });
  }

  function handleRegister(event) {

    event.preventDefault();

    if (registerUsername.trim().length < 3) {
      setMessage("Username must be at least 3 characters.");
      return;
    }

    if (registerPassword.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    registerUser(name, email, registerUsername, registerPassword)
    .then(() => {
      setMessage("User created. You can now log in.");
      setMode("login");
    })
    .catch((err) => {
      console.log(err);
      setMessage("Something went wrong while creating the user.");
    });
  }

  let formContent;

  if (mode === "login") {

    formContent = (

      <form onSubmit={handleLogin} className="auth-form">

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(event) => setLoginUsername(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        />

        <button type="submit">
          Log in
        </button>

      </form>
    );
  }

  if (mode === "register") {

    formContent = (

      <form onSubmit={handleRegister} className="auth-form">

        <h2>Create account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          value={registerUsername}
          onChange={(event) => setRegisterUsername(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(event) => setRegisterPassword(event.target.value)}
        />

        <button type="submit">
          Create user
        </button>

      </form>
    );
  }

  let authButton;

  if (mode === "login") {

    authButton = (

      <button onClick={showRegister}>
        Create account
      </button>
    );
  }

  if (mode === "register") {

    authButton = (

      <button onClick={showLogin}>
        Back to login
      </button>
    );
  }

  let authMessage = null;

  if (message !== "") {

    authMessage = (

      <p className="auth-message">
        {message}
      </p>
    );
  }

  return (

    <div className="auth-overlay">

      <div className="auth-modal">

        <button className="auth-close-button" onClick={onClose}>
          ×
        </button>

        <section className="auth-left">

          {formContent}

          {authMessage}

        </section>

        <section className="auth-right">

          <h2>Become a customer</h2>

          <p>Track your order status</p>
          <p>Save your contact information</p>
          <p>Create and save your wishlist</p>
          <p>Faster checkout when buying</p>

          {authButton}

        </section>

      </div>

    </div>
  );
}

export default AuthModal;