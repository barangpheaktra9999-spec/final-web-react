import { BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({ icon: Icon = BookOpenText, title, description, actionText = "មើលសៀវភៅ", actionLink = "/books" }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon"><Icon size={34} /></span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <Link className="button button--primary" to={actionLink}>{actionText}</Link>
    </div>
  );
}
