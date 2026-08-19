import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, description, align = "center", action }) {
  return (
    <motion.div
      className={`section-title section-title--${align}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}
