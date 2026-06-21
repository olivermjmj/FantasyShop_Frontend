import { Link } from "react-router";

function getCategoryIcon(categoryName) {

  const name = categoryName.toLowerCase();

  if (name.includes("weapon")) {
    return "⚔";
  }

  if (name.includes("armor")) {
    return "🛡";
  }

  if (name.includes("tool")) {
    return "🧰";
  }

  if (name.includes("mount")) {
    return "🐎";
  }

  if (name.includes("adventuring")) {
    return "🎒";
  }

  return "✦";
}

function getCategoryClass(categoryName) {

  const name = categoryName.toLowerCase();

  if (name.includes("weapon")) {
    return "weapon-image";
  }

  if (name.includes("armor")) {
    return "armor-image";
  }

  if (name.includes("tool")) {
    return "tools-image";
  }

  if (name.includes("mount")) {
    return "mounts-image";
  }

  if (name.includes("adventuring")) {
    return "gear-image";
  }

  return "default-image";
}

function CategoryCard({ category }) {

  const imageClass = "roleplay-image " + getCategoryClass(category.categoryName);

  return (

    <Link to={"/roleplay/category/" + category.id} className="roleplay-card">

      <div className={imageClass}>

        <span>{getCategoryIcon(category.categoryName)}</span>

      </div>

      <div className="roleplay-card-content">

        <h3>{category.categoryName}</h3>

        <p>View products in this category.</p>

      </div>

    </Link>
  );
}

export default CategoryCard;