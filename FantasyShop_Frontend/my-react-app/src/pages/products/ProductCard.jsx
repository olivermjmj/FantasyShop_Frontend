import "./Products.css";

function ProductCard({ item, onAddToCart }) {

  let productLetter = "?";

  if (item.name) {
    productLetter = item.name.charAt(0);
  }

  return (

    <article className="product-card">

      <div className="product-image">

        <span>{productLetter}</span>

      </div>

      <div className="product-content">

        <h3>{item.name}</h3>

        <p className="product-description">
          {item.description}
        </p>

        <div className="product-bottom">

          <p className="product-price">
            {item.basePrice} kr.
          </p>

          <button onClick={() => onAddToCart(item)}>
            Læg i kurv
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;