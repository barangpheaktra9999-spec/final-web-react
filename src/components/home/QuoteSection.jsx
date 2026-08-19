import { Quote } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { quotes } from "../../data/quotes";

export default function QuoteSection() {
  return (
    <section className="quote-section">
      <div className="container quote-section__inner">
        <span className="quote-section__icon"><Quote size={31} /></span>
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop>
          {quotes.map((quote) => (
            <SwiperSlide key={quote.id}><blockquote>«{quote.text}»<cite>— {quote.author}</cite></blockquote></SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
