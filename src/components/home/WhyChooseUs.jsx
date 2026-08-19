import { BadgeDollarSign, BookCheck, Headphones, Truck } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

const reasons = [
  { icon: BookCheck, title: "សៀវភៅមានគុណភាព", text: "ជ្រើសរើសសៀវភៅល្អៗសម្រាប់អ្នកអានគ្រប់វ័យ។" },
  { icon: Truck, title: "ដឹកជញ្ជូនរហ័ស", text: "សេវាដឹកជញ្ជូនងាយស្រួល និងទាន់ពេល។" },
  { icon: BadgeDollarSign, title: "តម្លៃសមរម្យ", text: "តម្លៃសមរម្យ និងមានការផ្តល់ជូនពិសេសជាប្រចាំ។" },
  { icon: Headphones, title: "សេវាកម្មល្អ", text: "យើងរីករាយក្នុងការជួយអតិថិជនគ្រប់ពេល។" }
];

export default function WhyChooseUs() {
  return (
    <section className="section why-us">
      <div className="container">
        <SectionTitle eyebrow="ទំនុកចិត្តរបស់អ្នកអាន" title="ហេតុអ្វីជ្រើសរើសយើង?" />
        <div className="why-us__grid">
          {reasons.map(({ icon: Icon, title, text }) => (
            <article key={title}><span><Icon size={27} /></span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </div>
    </section>
  );
}
