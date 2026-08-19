import { Star } from "lucide-react";

export default function RatingStars({ rating = 0, reviewCount, compact = false }) {
  return (
    <div className="rating-stars" aria-label={`ពិន្ទុ ${rating} ក្នុងចំណោម 5`}>
      <span className="rating-stars__icons" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} size={compact ? 13 : 15} fill={index < Math.round(rating) ? "currentColor" : "none"} />
        ))}
      </span>
      <span className="rating-stars__value">{rating}</span>
      {reviewCount !== undefined && <span className="rating-stars__count">({reviewCount})</span>}
    </div>
  );
}
