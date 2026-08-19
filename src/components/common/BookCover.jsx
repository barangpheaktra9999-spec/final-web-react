import { useState } from "react";
import { BookOpen } from "lucide-react";

export default function BookCover({ book, className = "", eager = false }) {
  const [failed, setFailed] = useState(false);
  const showImage = book.image && !failed;

  return (
    <div className={`book-cover book-cover--${book.coverTone || "forest"} ${className}`}>
      {showImage ? (
        <img
          src={book.image}
          alt={`គម្របសៀវភៅ ${book.title}`}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="book-cover__fallback" role="img" aria-label={`គម្របសៀវភៅ ${book.title}`}>
          <span className="book-cover__line" />
          <span className="book-cover__mark">{book.coverMark || <BookOpen />}</span>
          <strong>{book.title}</strong>
          <small>{book.author}</small>
          <span className="book-cover__ornament">✦</span>
        </div>
      )}
    </div>
  );
}
