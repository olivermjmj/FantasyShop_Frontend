import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/api.js";
import "./Orders.css";

function formatOrderDate(createdAt) {

  const createdAtNumber = Number(createdAt);

  let date;

  if (!Number.isNaN(createdAtNumber)) {
    date = new Date(createdAtNumber * 1000);
  } else {
    date = new Date(createdAt);
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return day + "-" + month + "-" + year;
}

function Orders() {

  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {

    getMyOrders()
    .then((data) => {
      setOrders(data);
    })
    .catch((error) => {
      console.log(error);
      setMessage("Could not fetch your orders.");
    });

  }, []);

  if (orders.length === 0) {

    return (

      <section className="orders-page">

        <h1>My orders</h1>

        <p>You have no orders yet.</p>

        <p>{message}</p>

      </section>
    );
  }

  return (

    <section className="orders-page">

      <h1>My orders</h1>

      <div className="orders-list">

        {orders.map((order) => (

          <article key={order.id} className="order-card">

            <h2>Order #{order.id}</h2>

            <p>Status: {order.orderStatus}</p>
            <p>Date: {formatOrderDate(order.createdAt)}</p>
            <p>Address ID: {order.addressId}</p>

          </article>

        ))}

      </div>

    </section>
  );
}

export default Orders;