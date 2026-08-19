import { ArrowRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { books } from "../../data/books";
import BookCard from "../common/BookCard";
import SectionTitle from "../common/SectionTitle";

export default function BestSellers() {
  const best = books.filter((book) => book.isBestSeller).slice(0, 6);
  return (
    <section className="section best-sellers">
      <div className="container">
        <SectionTitle eyebrow="ជម្រើសអ្នកអាន" title="សៀវភៅលក់ដាច់បំផុត" description="សៀវភៅដែលអ្នកអានជាច្រើនជ្រើសរើស និងផ្ដល់ពិន្ទុខ្ពស់។" align="split" action={<Link className="text-link" to="/books?filter=best">មើលទាំងអស់ <ArrowRight size={17} /></Link>} />
        <div className="best-sellers__label"><Crown size={18} /> ចំណាត់ថ្នាក់ប្រចាំខែ</div>
        <div className="book-grid book-grid--three">
          {best.map((book, index) => <BookCard key={book.id} book={book} rank={index + 1} />)}
        </div>
      </div>
    </section>
  );
}
