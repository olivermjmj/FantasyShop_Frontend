const API_URL = import.meta.env.VITE_API_URL;

export function getToken() {

  return localStorage.getItem("token");
}

export function getUsername() {

  return localStorage.getItem("username");
}

export function getRole() {

  return localStorage.getItem("role");
}

export function logoutUser() {

  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
}

export async function loginUser(username, password) {

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  localStorage.setItem("role", data.role);

  return data;
}

export async function registerUser(name, email, username, password) {

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      username: username,
      password: password
    })
  });

  if (!response.ok) {

    const errorText = await response.text();
    console.log(errorText);

    throw new Error("Register failed");
  }

  return response.json();
}

export async function getItemsByCategory(categoryId) {

  const response = await fetch(`${API_URL}/items/category/${categoryId}`);

  if (!response.ok) {
    throw new Error("Could not fetch items");
  }

  return response.json();
}

export async function getCategories() {

  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Could not fetch categories");
  }

  return response.json();
}

export async function getMyOrders() {

  const token = getToken();

  const response = await fetch(`${API_URL}/orders/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Could not fetch orders");
  }

  return response.json();
}

export async function createAddress(street, postalCode, city, country) {

  const token = getToken();

  const response = await fetch(`${API_URL}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      street: street,
      postalCode: postalCode,
      city: city,
      country: country
    })
  });

  if (!response.ok) {
    throw new Error("Could not create address");
  }

  return response.json();
}

export async function createOrder(addressId) {

  const token = getToken();

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      addressId: addressId
    })
  });

  if (!response.ok) {
    throw new Error("Could not create order");
  }

  return response.json();
}

export async function createOrderItem(orderId, itemId, quantity) {

  const token = getToken();

  const response = await fetch(`${API_URL}/order-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      orderId: orderId,
      itemId: itemId,
      quantity: quantity
    })
  });

  if (!response.ok) {
    throw new Error("Could not create order item");
  }

  return response.json();
}

export async function getItems() {

  const response = await fetch(`${API_URL}/items`);

  if (!response.ok) {
    throw new Error("Could not fetch items");
  }

  return response.json();
}

export async function getAllOrders() {

  const token = getToken();

  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Could not fetch orders");
  }

  return response.json();
}

export async function updateOrderStatus(orderId, orderStatus) {

  const token = getToken();

  const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      orderStatus: orderStatus
    })
  });

  if (!response.ok) {
    throw new Error("Could not update order status");
  }

  return response.json();
}

export async function getOrderItemsByOrderId(orderId) {

  const token = getToken();

  const response = await fetch(API_URL + "/order-items/order/" + orderId, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  if (!response.ok) {
    throw new Error("Could not fetch order items");
  }

  return response.json();
}

export async function getAddressById(addressId) {

  const token = getToken();

  const response = await fetch(API_URL + "/addresses/" + addressId, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  if (!response.ok) {
    throw new Error("Could not fetch address");
  }

  return response.json();
}