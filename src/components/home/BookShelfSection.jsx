import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BookCard from "../common/BookCard";
import SectionTitle from "../common/SectionTitle";

export default function BookShelfSection({ eyebrow, title, description, books, className = "", link = "/books" }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="split"
          action={<Link className="text-link" to={link}>មើលទាំងអស់ <ArrowRight size={17} /></Link>}
        />
        <div className="book-grid">
          {books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </div>
    </section>
  );
}
