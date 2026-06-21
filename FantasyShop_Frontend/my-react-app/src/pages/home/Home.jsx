import { useEffect, useState } from "react";
import { Link } from "react-router";
import roleplayImage from "../../assets/home-images/roleplayImage.png";

import { getRole } from "../../api/api.js";
import AdminHome from "../admin/AdminHome.jsx";

import "./Home.css";

function Home() {

  const [role, setRole] = useState(getRole());

  useEffect(() => {

    function updateRole() {
      setRole(getRole());
    }

    window.addEventListener("authUpdated", updateRole);

    return () => {
      window.removeEventListener("authUpdated", updateRole);
    };

  }, []);

  if (role === "ADMIN") {

    return (

      <AdminHome />
    );
  }

  return (

    <section className="home-page">

      <section className="home-hero">

        <div className="home-hero-content">

          <h1>Fantasy Shop</h1>

          <p>
            Welcome to Fantasy Shop. Here you can find equipment, weapons, armor, and adventuring gear for your next roleplaying adventure.
          </p>

        </div>

      </section>

      <section className="home-categories">

        <h2>Categories</h2>

        <div className="home-category-grid">

          <Link to="/roleplay" className="home-category-card">

           <div className="home-category-image">
              <img src={roleplayImage} alt="Roleplaying equipment" />
            </div>

            <div className="home-category-content">

              <h3>Roleplaying</h3>

              <p>
                Find categories such as weapons, armor, tools, and other equipment.
              </p>

            </div>

          </Link>

        </div>

      </section>

    </section>
  );
}

export default Home;