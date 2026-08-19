import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("pannalay-cart", []);
  const { showToast } = useToast();

  const addToCart = (book, quantity = 1) => {
    setCart((items) => {
      const current = items.find((item) => item.id === book.id);
      if (current) {
        return items.map((item) => item.id === book.id ? { ...item, quantity: Math.min(item.quantity + quantity, book.stock) } : item);
      }
      return [...items, { ...book, quantity: Math.min(quantity, book.stock) }];
    });
    showToast("បានបន្ថែមសៀវភៅទៅក្នុងរទេះទិញទំនិញ។");
  };

  const updateQuantity = (id, quantity) =>
    setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item));

  const removeFromCart = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
    showToast("បានដកសៀវភៅចេញពីរទេះ។", "info");
  };

  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const value = useMemo(() => ({ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, subtotal }), [cart, cartCount, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
