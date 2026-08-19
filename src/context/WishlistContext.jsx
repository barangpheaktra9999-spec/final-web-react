import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage("pannalay-wishlist", []);
  const { showToast } = useToast();

  const isWishlisted = (id) => wishlist.some((book) => book.id === id);
  const toggleWishlist = (book) => {
    if (isWishlisted(book.id)) {
      setWishlist((items) => items.filter((item) => item.id !== book.id));
      showToast("បានដកសៀវភៅចេញពីបញ្ជីចូលចិត្ត។", "info");
    } else {
      setWishlist((items) => [...items, book]);
      showToast("បានរក្សាទុកក្នុងបញ្ជីចូលចិត្ត។");
    }
  };

  const value = useMemo(() => ({ wishlist, isWishlisted, toggleWishlist }), [wishlist]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
