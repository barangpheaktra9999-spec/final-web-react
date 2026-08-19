const ORDERS_KEY = "pannalay-orders";
const LATEST_ORDER_KEY = "pannalay-latest-order";

export function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const orders = getOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
  localStorage.setItem(LATEST_ORDER_KEY, JSON.stringify(order));
}

export function getLatestOrder() {
  try {
    return JSON.parse(localStorage.getItem(LATEST_ORDER_KEY));
  } catch {
    return null;
  }
}

export function createOrderId() {
  return `KH-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
}
