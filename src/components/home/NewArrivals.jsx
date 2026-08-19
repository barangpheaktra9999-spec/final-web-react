import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { books } from "../../data/books";
import BookCard from "../common/BookCard";
import SectionTitle from "../common/SectionTitle";

export default function NewArrivals() {
  const newBooks = books.filter((book) => book.isNew);
  return (
    <section className="section new-arrivals">
      <div className="container">
        <SectionTitle eyebrow="ទើបមកដល់" title="សៀវភៅចេញថ្មី" description="បន្ថែមចំណេះដឹងថ្មី ជាមួយសៀវភៅដែលទើបចេញផ្សាយ។" align="split" action={<Link className="text-link" to="/books?filter=new">មើលទាំងអស់ <ArrowRight size={17} /></Link>} />
        <Swiper modules={[Navigation, A11y]} navigation spaceBetween={18} slidesPerView={1.15} breakpoints={{ 520: { slidesPerView: 2.1 }, 760: { slidesPerView: 3.1 }, 1024: { slidesPerView: 4.1 } }}>
          {newBooks.map((book) => <SwiperSlide key={book.id}><BookCard book={book} /></SwiperSlide>)}
        </Swiper>
      </div>
    </section>
  );
}
