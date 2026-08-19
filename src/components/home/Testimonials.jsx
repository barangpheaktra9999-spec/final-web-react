import { Quote, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import SectionTitle from "../common/SectionTitle";

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <SectionTitle eyebrow="បទពិសោធន៍ពិត" title="មតិពីអ្នកអាន" description="ពាក្យពេចន៍ពីអ្នកអានដែលបានប្រើប្រាស់បណ្ណាល័យខ្មែរ។" />
        <div className="testimonial-grid">
          {testimonials.map((review) => (
            <article className="testimonial-card" key={review.id}>
              <Quote className="testimonial-card__quote" />
              <div className="testimonial-card__stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" />)}</div>
              <p>{review.text}</p>
              <div className="testimonial-card__user"><span>{review.initials}</span><div><strong>{review.name}</strong><small>{review.role}</small></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
