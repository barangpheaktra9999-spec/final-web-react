import { useEffect, useMemo, useState } from "react";
import { Check, Heart, PackageCheck, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookCard from "../components/common/BookCard";
import BookCover from "../components/common/BookCover";
import PageHero from "../components/common/PageHero";
import QuantitySelector from "../components/common/QuantitySelector";
import RatingStars from "../components/common/RatingStars";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { books, getBookById } from "../data/books";
import { calculateDiscount, formatPrice } from "../utils/format";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = getBookById(id);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("description");
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (!book) return;
    try {
      const viewed = JSON.parse(localStorage.getItem("pannalay-recently-viewed")) || [];
      localStorage.setItem("pannalay-recently-viewed", JSON.stringify([book.id, ...viewed.filter((item) => item !== book.id)].slice(0, 8)));
    } catch { /* localStorage can be unavailable in private mode */ }
  }, [book]);

  const related = useMemo(() => book ? books.filter((item) => item.id !== book.id && item.categoryId === book.categoryId).slice(0, 4) : [], [book]);
  if (!book) return <section className="coming-soon"><h1>រកមិនឃើញសៀវភៅ</h1><p>សៀវភៅនេះប្រហែលត្រូវបានផ្លាស់ទី ឬលុបចេញ។</p><Link className="button button--primary" to="/books">ត្រឡប់ទៅសៀវភៅ</Link></section>;

  const buyNow = () => { addToCart(book, quantity); navigate("/checkout"); };
  const discount = calculateDiscount(book.price, book.oldPrice);

  return (
    <>
      <PageHero eyebrow={book.category} title={book.title} description={`ស្នាដៃរបស់ ${book.author}`} crumbs={[{ label: "សៀវភៅ", to: "/books" }, { label: book.title }]} />
      <section className="section book-detail">
        <div className="container book-detail__top">
          <div className="book-detail__visual"><BookCover book={book} eager />{discount > 0 && <span className="detail-discount">សន្សំ {discount}%</span>}</div>
          <div className="book-detail__info">
            <span className="book-detail__category">{book.category}</span>
            <h1>{book.title}</h1>
            <p className="book-detail__author">ដោយ <strong>{book.author}</strong> · {book.publisher}</p>
            <div className="book-detail__rating"><RatingStars rating={book.rating} reviewCount={book.reviewCount} /><span className="stock-status"><Check size={14} /> មានក្នុងស្តុក ({book.stock})</span></div>
            <p className="book-detail__summary">{book.description}</p>
            <div className="detail-price"><strong>{formatPrice(book.price)}</strong>{book.oldPrice > book.price && <del>{formatPrice(book.oldPrice)}</del>}<span>រួមបញ្ចូលពន្ធ</span></div>
            <div className="detail-purchase">
              <QuantitySelector value={quantity} onChange={setQuantity} max={book.stock} />
              <button className="button button--primary" type="button" onClick={() => addToCart(book, quantity)}><ShoppingBag size={18} /> បន្ថែមទៅរទេះ</button>
              <button className={`icon-button detail-wish ${isWishlisted(book.id) ? "is-active" : ""}`} type="button" onClick={() => toggleWishlist(book)} aria-label="បញ្ជីចូលចិត្ត"><Heart fill={isWishlisted(book.id) ? "currentColor" : "none"} /></button>
            </div>
            <button className="button button--dark detail-buy" type="button" onClick={buyNow}>ទិញឥឡូវនេះ</button>
            <div className="detail-benefits"><span><Truck size={19} /><strong>ដឹកជញ្ជូនរហ័ស</strong><small>1–3 ថ្ងៃក្នុងភ្នំពេញ</small></span><span><ShieldCheck size={19} /><strong>ទូទាត់សុវត្ថិភាព</strong><small>Mock checkout only</small></span><span><RotateCcw size={19} /><strong>អាចប្ដូរបាន</strong><small>ក្នុងរយៈពេល 7 ថ្ងៃ</small></span></div>
          </div>
        </div>
        <div className="container detail-tabs">
          <div className="detail-tabs__nav"><button className={tab === "description" ? "active" : ""} onClick={() => setTab("description")}>សេចក្តីពិពណ៌នា</button><button className={tab === "details" ? "active" : ""} onClick={() => setTab("details")}>ព័ត៌មានលម្អិត</button><button className={tab === "shipping" ? "active" : ""} onClick={() => setTab("shipping")}>ការដឹកជញ្ជូន</button></div>
          <div className="detail-tabs__content">
            {tab === "description" && <div><h2>អំពីសៀវភៅនេះ</h2><p>{book.description} សៀវភៅនេះត្រូវបានរៀបចំឲ្យអានងាយ មានលំដាប់លំដោយច្បាស់ និងសមស្របសម្រាប់អ្នកអានដែលចង់ពង្រីកចំណេះដឹង។</p></div>}
            {tab === "details" && <dl className="book-specs"><div><dt>អ្នកនិពន្ធ</dt><dd>{book.author}</dd></div><div><dt>អ្នកបោះពុម្ព</dt><dd>{book.publisher}</dd></div><div><dt>ISBN</dt><dd>{book.isbn}</dd></div><div><dt>ភាសា</dt><dd>{book.language}</dd></div><div><dt>ចំនួនទំព័រ</dt><dd>{book.pages} ទំព័រ</dd></div><div><dt>ឆ្នាំបោះពុម្ព</dt><dd>{book.publishYear}</dd></div></dl>}
            {tab === "shipping" && <div className="shipping-copy"><PackageCheck size={28} /><div><h2>ដឹកជញ្ជូនទូទាំងប្រទេស</h2><p>ការបញ្ជាទិញត្រូវបានរៀបចំក្នុងរយៈពេល 24 ម៉ោង។ ការបញ្ជាទិញចាប់ពី $25 ឡើងទៅ ដឹកជញ្ជូនដោយឥតគិតថ្លៃ។</p></div></div>}
          </div>
        </div>
      </section>
      <section className="section related-books"><div className="container"><div className="section-title"><span className="section-title__eyebrow">សម្រាប់អ្នកផងដែរ</span><h2>សៀវភៅដែលអ្នកប្រហែលជាចូលចិត្ត</h2></div><div className="book-grid">{related.map((item) => <BookCard key={item.id} book={item} />)}</div></div></section>
    </>
  );
}
