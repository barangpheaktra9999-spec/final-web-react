import { ArrowLeft, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found"><div className="not-found__number">404</div><span><SearchX size={36} /></span><h1>រកមិនឃើញទំព័រនេះទេ</h1><p>តំណភ្ជាប់ប្រហែលមិនត្រឹមត្រូវ ឬទំព័រនេះត្រូវបានផ្លាស់ទី។</p><div><Link className="button button--primary" to="/"><ArrowLeft size={18} /> ទៅទំព័រដើម</Link><Link className="button button--outline" to="/books">មើលសៀវភៅ</Link></div></section>
  );
}
