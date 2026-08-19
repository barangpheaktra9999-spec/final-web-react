import { ChevronDown, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/common/PageHero";

const faqs = [
  ["តើខ្ញុំអាចកម្មង់សៀវភៅដោយរបៀបណា?", "ជ្រើសរើសសៀវភៅ បន្ថែមទៅរទេះ ចូលទំព័រ Checkout បំពេញព័ត៌មានដឹកជញ្ជូន ហើយចុចបញ្ជាក់ការបញ្ជាទិញ។"],
  ["តើការដឹកជញ្ជូនចំណាយពេលប៉ុន្មាន?", "ជាទូទៅ 1–3 ថ្ងៃសម្រាប់ភ្នំពេញ និង 2–5 ថ្ងៃសម្រាប់បណ្ដាខេត្ត។ ពេលវេលាអាចប្រែប្រួលតាមតំបន់។"],
  ["តើអាចប្ដូរឬត្រឡប់សៀវភៅបានទេ?", "អាចប្ដូរបានក្នុងរយៈពេល 7 ថ្ងៃ ប្រសិនបើសៀវភៅមានបញ្ហាពីការផលិត ឬខូចខាតពេលដឹកជញ្ជូន។"],
  ["តើមានការបង់ប្រាក់តាម ABA ដែរឬទេ?", "ក្នុង UI មានជម្រើស ABA, ACLEDA និង KHQR ប៉ុន្តែសម្រាប់ Front-End Project នេះ វាជា Mock Payment មិនភ្ជាប់ API ធនាគារពិតប្រាកដទេ។"],
  ["តើខ្ញុំអាចតាមដានការបញ្ជាទិញបានទេ?", "បាន។ ចូលទៅកាន់ “ការបញ្ជាទិញរបស់ខ្ញុំ” ដើម្បីមើលលេខបញ្ជាទិញ កាលបរិច្ឆេទ ស្ថានភាព និងព័ត៌មានលម្អិត។"],
  ["តើ Cart និង Wishlist បាត់ពេល Refresh ទេ?", "មិនបាត់ទេ។ ទិន្នន័យត្រូវបានរក្សាទុកនៅ localStorage ក្នុង Browser របស់អ្នក។"],
  ["តើការបញ្ជាទិញចាប់ពីប៉ុន្មានបានដឹកឥតគិតថ្លៃ?", "ការបញ្ជាទិញចាប់ពី $25 ឡើងទៅ ទទួលបានការដឹកជញ្ជូនឥតគិតថ្លៃ។"],
  ["តើខ្ញុំអាចកែព័ត៌មានគណនីបានទេ?", "បាន។ ចូល Profile រួចកែឈ្មោះ លេខទូរស័ព្ទ អ៊ីមែល អាសយដ្ឋាន និងរូប Profile។"]
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHero eyebrow="ចម្លើយរហ័ស" title="សំណួរញឹកញាប់" description="ចម្លើយសម្រាប់សំណួរទូទៅអំពីការទិញ ការដឹកជញ្ជូន ការទូទាត់ និងគណនី។" crumbs={[{ label: "សំណួរញឹកញាប់" }]} />
      <section className="section faq-page"><div className="container faq-layout"><aside><span><HelpCircle size={31} /></span><h2>ត្រូវការជំនួយបន្ថែម?</h2><p>ប្រសិនបើអ្នករកមិនឃើញចម្លើយ អ្នកអាចទាក់ទងក្រុមការងាររបស់យើងបាន។</p><Link className="button button--primary" to="/contact">ទាក់ទងយើង</Link></aside><div className="faq-list">{faqs.map(([question, answer], index) => <article className={open === index ? "is-open" : ""} key={question}><button type="button" onClick={() => setOpen(open === index ? null : index)}><span><MessageCircleQuestion size={18} /> {question}</span><ChevronDown size={19} /></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div></div></section>
    </>
  );
}
