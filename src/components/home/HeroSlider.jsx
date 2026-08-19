import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { slides } from "../../data/slides";

const sequence = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="hero" aria-label="សៀវភៅ និងសារណែនាំ">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        slidesPerView={1}
        loop
        speed={850}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <article
              className={`hero-slide hero-slide--content-${slide.contentPosition}`}
              style={{ backgroundImage: `url(${slide.image})`, backgroundPosition: slide.imagePosition }}
            >
              <div className={`hero-slide__shade hero-slide__shade--${slide.contentPosition}`} />
              <div className="container hero-slide__inner">
                {activeIndex === index && (
                  <motion.div key={`${slide.id}-${activeIndex}`} className="hero-slide__content" variants={sequence} initial="hidden" animate="visible">
                    <motion.span className="hero-slide__eyebrow" variants={item}>{slide.eyebrow}</motion.span>
                    <motion.h1 variants={item}>{slide.title}</motion.h1>
                    <motion.blockquote variants={item}><Quote size={22} /> {slide.quote}</motion.blockquote>
                    <motion.p variants={item}>{slide.description}</motion.p>
                    <motion.div className="hero-slide__actions" variants={item}>
                      <Link className="button button--primary" to={slide.primaryButton.link}>{slide.primaryButton.text} <ArrowRight size={18} /></Link>
                      <Link className="button button--outline" to={slide.secondaryButton.link}>{slide.secondaryButton.text}</Link>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero__scroll-hint" aria-hidden="true"><span /> រំកិលចុះក្រោម</div>
    </section>
  );
}
