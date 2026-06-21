import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard.jsx";
import "./Roleplay.css";

const API_URL = import.meta.env.VITE_API_URL;

function Roleplay() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/categories`)
    .then((res) => res.json())
    .then((data) => setCategories(data))
    .catch((err) => console.log(err));

  }, []);

  return (

    <section className="roleplay-page">

      <h1>Rollespil</h1>

      <p>Vælg en kategori.</p>

      <div className="roleplay-grid">
        {categories.map((category) => (<CategoryCard key={category.id} category={category} />))}
      </div>

    </section>
  );
}

export default Roleplay;