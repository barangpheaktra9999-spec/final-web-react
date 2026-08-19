export const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

export const formatDateKh = (value) =>
  new Intl.DateTimeFormat("km-KH", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));

export const calculateDiscount = (price, oldPrice) =>
  oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
