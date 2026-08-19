import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <section className="promo-wrap">
      <motion.div className="container promo-banner" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className="promo-banner__icon"><Gift size={38} /></div>
        <div className="promo-banner__content">
          <span><Sparkles size={15} /> ការផ្តល់ជូនពិសេស</span>
          <h2>បញ្ចុះតម្លៃរហូតដល់ <strong>30%</strong></h2>
          <p>សម្រាប់សៀវភៅជ្រើសរើសក្នុងសប្ដាហ៍នេះ។ កុំខកខានឱកាសបំពេញធ្នើសៀវភៅរបស់អ្នក។</p>
        </div>
        <Link className="button button--dark" to="/books">ទិញឥឡូវនេះ <ArrowRight size={18} /></Link>
      </motion.div>
    </section>
  );
}
