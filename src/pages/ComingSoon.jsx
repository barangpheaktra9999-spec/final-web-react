import { ArrowLeft, BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <section className="coming-soon">
      <span><BookOpenText size={38} /></span>
      <h1>ទំព័រនេះកំពុងរៀបចំ</h1>
      <p>មុខងារនេះនឹងត្រូវបញ្ចប់នៅជំហានបន្ទាប់។</p>
      <Link className="button button--primary" to="/"><ArrowLeft size={18} /> ទៅទំព័រដើម</Link>
    </section>
  );
}
