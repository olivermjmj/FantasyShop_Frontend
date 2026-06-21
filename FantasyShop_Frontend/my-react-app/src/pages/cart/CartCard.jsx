function CartCard({ item, onIncrease, onDecrease, onRemove }) {

  return (

    <article className="cart-card">

      <div className="cart-card-content">

        <h3>{item.name}</h3>

        <p>{item.description}</p>

        <p className="cart-card-price">
          Pris: {item.basePrice} kr.
        </p>

        <p className="cart-card-quantity">
          Antal: {item.quantity}
        </p>

      </div>

      <div className="cart-card-actions">

        <button className="cart-quantity-button" onClick={() => onDecrease(item.id)}>
          -
        </button>

        <button className="cart-quantity-button" onClick={() => onIncrease(item.id)}>
          +
        </button>

        <button className="cart-remove-button" onClick={() => onRemove(item.id)}>
          Fjern
        </button>

      </div>

    </article>
  );
}

export default CartCard;