import BookCard from "../common/BookCard";

export default function BookGrid({ books, layout = "grid" }) {
  return (
    <div className={`book-grid book-grid--${layout}`}>
      {books.map((book) => <BookCard key={book.id} book={book} layout={layout} />)}
    </div>
  );
}
