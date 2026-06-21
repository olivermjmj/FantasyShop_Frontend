import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  getAllOrders,
  updateOrderStatus,
  getOrderItemsByOrderId,
  getAddressById,
  getItems
} from "../../api/api.js";
import "./AdminHome.css";

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

function AdminHome() {

  const [searchParams] = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [addresses, setAddresses] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [message, setMessage] = useState("");

  const orderSearch = searchParams.get("orderSearch") || "";

  useEffect(() => {

    async function loadAdminData() {

      try {

        const fetchedOrders = await getAllOrders();
        const fetchedItems = await getItems();

        const uniqueAddressIds = [];

        fetchedOrders.forEach((order) => {

          if (!uniqueAddressIds.includes(order.addressId)) {
            uniqueAddressIds.push(order.addressId);
          }
        });

        const fetchedAddresses = await Promise.all(
          uniqueAddressIds.map((addressId) => getAddressById(addressId))
        );

        const addressMap = {};

        fetchedAddresses.forEach((address) => {
          addressMap[address.id] = address;
        });

        setOrders(fetchedOrders);
        setItems(fetchedItems);
        setAddresses(addressMap);

      } catch (error) {

        console.log(error);
        setMessage("Could not fetch admin data.");
      }
    }

    loadAdminData();

  }, []);

  function handleStatusChange(orderId, newStatus) {

    updateOrderStatus(orderId, newStatus)
    .then((updatedOrder) => {

      const updatedOrders = orders.map((order) => {

        if (order.id === orderId) {
          return updatedOrder;
        }

        return order;
      });

      setOrders(updatedOrders);
    })
    .catch((error) => {
      console.log(error);
      setMessage("Could not update orderstatus.");
    });
  }

  function toggleOrderDetails(order) {

    if (selectedOrderId === order.id) {
      setSelectedOrderId(null);
      return;
    }

    setSelectedOrderId(order.id);

    if (orderDetails[order.id]) {
      return;
    }

    getOrderItemsByOrderId(order.id)
    .then((data) => {

      setOrderDetails((currentDetails) => {

        const updatedDetails = { ...currentDetails };

        updatedDetails[order.id] = data;

        return updatedDetails;
      });
    })
    .catch((error) => {
      console.log(error);
      setMessage("Could not fetch orderlines.");
    });
  }

  function getItemName(itemId) {

    const foundItem = items.find((item) => {
      return item.id === itemId;
    });

    if (foundItem) {
      return foundItem.name;
    }

    return "Item ID: " + itemId;
  }

  function getAddressText(order) {

    const address = addresses[order.addressId];

    if (!address) {
      return "Address ID: " + order.addressId;
    }

    return address.street + ", " + address.postalCode + " " + address.city + ", " + address.country;
  }

  function getDetailsButtonText(order) {

    if (selectedOrderId === order.id) {
      return "Hide details";
    }

    return "Show details";
  }

  function renderOrderDetails(order) {

    if (selectedOrderId !== order.id) {
      return null;
    }

    const orderItems = orderDetails[order.id];

    if (!orderItems) {

      return (

        <div className="admin-order-details">

          <p>Fetch Orderlines...</p>

        </div>
      );
    }

    const orderTotal = orderItems.reduce((sum, orderItem) => {
      return sum + Number(orderItem.priceAtPurchase) * orderItem.quantity;
    }, 0);

    return (

      <div className="admin-order-details">

        <h3>Wares in order</h3>

        <div className="admin-order-items">

          {orderItems.map((orderItem) => (

            <div key={orderItem.id} className="admin-order-item">

              <p>{getItemName(orderItem.itemId)}</p>

              <span>
                Amount: {orderItem.quantity}
              </span>

              <span>
                Price: {orderItem.priceAtPurchase} kr.
              </span>

            </div>

          ))}

        </div>

        <h4>Order total: {orderTotal} kr.</h4>

      </div>
    );
  }

  let filteredOrders = orders;

  if (statusFilter !== "ALL") {

    filteredOrders = filteredOrders.filter((order) => {
      return order.orderStatus === statusFilter;
    });
  }

  if (orderSearch.trim() !== "") {

    const lowerSearchText = orderSearch.toLowerCase();

    filteredOrders = filteredOrders.filter((order) => {

      const orderId = String(order.id).toLowerCase();
      const userId = String(order.userId).toLowerCase();
      const status = String(order.orderStatus).toLowerCase();
      const addressText = getAddressText(order).toLowerCase();

      return orderId.includes(lowerSearchText)
        || userId.includes(lowerSearchText)
        || status.includes(lowerSearchText)
        || addressText.includes(lowerSearchText);
    });
  }

  let searchInfo = null;

  if (orderSearch.trim() !== "") {

    searchInfo = (

      <p className="admin-search-info">
        Searching after: {orderSearch}
      </p>
    );
  }

  return (

    <section className="admin-page">

      <div className="admin-header">

        <div>
          <h1>Admin dashboard</h1>
          <p>Overview over customers orders.</p>
        </div>

        <div className="admin-stats">
          <p>Total orders: {orders.length}</p>
          <p>Viste orders: {filteredOrders.length}</p>
        </div>

      </div>

      <div className="admin-tools">

        <div>
          {searchInfo}
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="ALL">All statuses</option>
          <option value="CREATED">CREATED</option>
          <option value="PAID">PAID</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

      </div>

      <p className="admin-message">{message}</p>

      <div className="admin-orders">

        {filteredOrders.map((order) => (

          <article key={order.id} className="admin-order-card">

            <div className="admin-order-main">

              <div>
                <h2>Order #{order.id}</h2>
                <p>Customer ID: {order.userId}</p>
                <p>Address: {getAddressText(order)}</p>
                <p>Date: {formatOrderDate(order.createdAt)}</p>
              </div>

              <div className="admin-order-actions">

                <label>
                  Status
                  <select
                    value={order.orderStatus}
                    onChange={(event) => handleStatusChange(order.id, event.target.value)}
                  >
                    <option value="CREATED">CREATED</option>
                    <option value="PAID">PAID</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </label>

                <button onClick={() => toggleOrderDetails(order)}>
                  {getDetailsButtonText(order)}
                </button>

              </div>

            </div>

            {renderOrderDetails(order)}

          </article>

        ))}

      </div>

    </section>
  );
}

export default AdminHome;