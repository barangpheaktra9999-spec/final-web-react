import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { calculateDiscount, formatPrice } from "../../utils/format";
import BookCover from "./BookCover";
import RatingStars from "./RatingStars";

export default function BookCard({ book, layout = "grid", rank }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const discount = calculateDiscount(book.price, book.oldPrice);

  return (
    <motion.article className={`book-card book-card--${layout}`} whileHover={{ y: -7 }} transition={{ duration: 0.22 }}>
      <div className="book-card__visual">
        <Link to={`/books/${book.id}`} aria-label={`មើលព័ត៌មានសៀវភៅ ${book.title}`}>
          <BookCover book={book} />
        </Link>
        <div className="book-card__badges">
          {rank && <span className="badge badge--rank">#{rank}</span>}
          {discount > 0 && <span className="badge badge--discount">-{discount}%</span>}
          {book.isNew && <span className="badge badge--new">ថ្មី</span>}
        </div>
        <button
          className={`icon-button book-card__wish ${isWishlisted(book.id) ? "is-active" : ""}`}
          onClick={() => toggleWishlist(book)}
          aria-label={isWishlisted(book.id) ? "ដកចេញពីបញ្ជីចូលចិត្ត" : "បន្ថែមទៅបញ្ជីចូលចិត្ត"}
          type="button"
        >
          <Heart size={18} fill={isWishlisted(book.id) ? "currentColor" : "none"} />
        </button>
        <Link className="book-card__quick" to={`/books/${book.id}`}>
          <Eye size={16} /> មើលរហ័ស
        </Link>
      </div>
      <div className="book-card__body">
        <span className="book-card__category">{book.category}</span>
        <h3><Link to={`/books/${book.id}`}>{book.title}</Link></h3>
        <p className="book-card__author">ដោយ {book.author}</p>
        <RatingStars rating={book.rating} reviewCount={book.reviewCount} compact />
        {layout === "list" && <p className="book-card__description">{book.description}</p>}
        <div className="book-card__footer">
          <div className="price-display">
            <strong>{formatPrice(book.price)}</strong>
            {book.oldPrice > book.price && <del>{formatPrice(book.oldPrice)}</del>}
          </div>
          <button className="add-cart-button" onClick={() => addToCart(book)} type="button">
            <ShoppingBag size={17} /> <span>បន្ថែម</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
