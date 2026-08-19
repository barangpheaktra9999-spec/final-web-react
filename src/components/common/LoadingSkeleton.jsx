export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="book-grid" aria-label="កំពុងផ្ទុកសៀវភៅ" aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <span className="skeleton skeleton--cover" />
          <span className="skeleton skeleton--short" />
          <span className="skeleton skeleton--title" />
          <span className="skeleton skeleton--text" />
          <span className="skeleton skeleton--button" />
        </div>
      ))}
    </div>
  );
}
