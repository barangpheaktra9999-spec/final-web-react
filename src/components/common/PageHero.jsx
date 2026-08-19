import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function PageHero({ eyebrow, title, description, crumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <nav className="breadcrumbs" aria-label="ទីតាំងទំព័រ">
          <Link to="/"><Home size={14} /> ទំព័រដើម</Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label}><ChevronRight size={14} /> {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : crumb.label}</span>
          ))}
        </nav>
        {eyebrow && <span className="page-hero__eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
