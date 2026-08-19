import { BookHeart, BriefcaseBusiness, Feather, Landmark, Languages, Laptop, Shapes, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import SectionTitle from "../common/SectionTitle";

const icons = { BookHeart, BriefcaseBusiness, Feather, Landmark, Languages, Laptop, Shapes, Sparkles };

export default function CategorySection() {
  return (
    <section className="section categories-section" id="categories">
      <div className="container">
        <SectionTitle eyebrow="ជ្រើសរើសតាមចំណូលចិត្ត" title="ស្វែងរកសៀវភៅតាមប្រភេទ" description="ពីអក្សរសិល្ប៍ខ្មែរ ទៅបច្ចេកវិទ្យា—មានសៀវភៅសម្រាប់អ្នកអានគ្រប់រូប។" />
        <div className="category-grid">
          {categories.map((category, index) => {
            const Icon = icons[category.icon];
            return (
              <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                <Link className="category-card" to={`/books?category=${category.id}`}>
                  <span className="category-card__icon"><Icon size={25} /></span>
                  <span><strong>{category.name}</strong><small>{category.count} ក្បាល</small></span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
