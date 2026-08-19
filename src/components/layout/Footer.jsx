import { BookOpen, Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";

const columns = [
  { title: "អំពីយើង", links: [["អំពីយើង", "/about"], ["ទំនាក់ទំនង", "/contact"], ["សេវាកម្ម", "/about#services"]] },
  { title: "ជំនួយ", links: [["សំណួរញឹកញាប់", "/faq"], ["ការដឹកជញ្ជូន", "/faq"], ["ការត្រឡប់ទំនិញ", "/faq"], ["គោលការណ៍ឯកជនភាព", "/faq"]] },
  { title: "គណនី", links: [["គណនីរបស់ខ្ញុំ", "/profile"], ["រទេះទិញទំនិញ", "/cart"], ["បញ្ជីចូលចិត្ត", "/wishlist"], ["ការបញ្ជាទិញ", "/orders"]] }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__ornament" aria-hidden="true">✦ ៚ ✦</div>
      <div className="container site-footer__grid">
        <div className="footer-about">
          <Link className="brand brand--footer" to="/"><span className="brand__icon"><BookOpen /></span><strong>{siteConfig.siteName}</strong></Link>
          <p>កន្លែងប្រមូលផ្តុំសៀវភៅល្អៗ និងគំនិតថ្មីៗ សម្រាប់អ្នកអានខ្មែរគ្រប់វ័យ។</p>
          <ul className="footer-contact">
            <li><Phone size={16} /> {siteConfig.phone}</li>
            <li><Mail size={16} /> {siteConfig.email}</li>
            <li><MapPin size={16} /> {siteConfig.address}</li>
          </ul>
        </div>
        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}
          </div>
        ))}
        <div className="footer-column footer-social">
          <h3>តាមដានយើង</h3>
          <div className="social-links">
            <a href={siteConfig.facebook} aria-label="Facebook"><Facebook /></a>
            <a href={siteConfig.telegram} aria-label="Telegram"><Send /></a>
            <a href={siteConfig.instagram} aria-label="Instagram"><Instagram /></a>
          </div>
          <p>ទទួលព័ត៌មានសៀវភៅ និងកម្មវិធីពិសេសថ្មីៗពីយើង។</p>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© {siteConfig.copyrightYear} {siteConfig.siteName}។ រក្សាសិទ្ធិគ្រប់យ៉ាង។</span>
        <span>បង្កើតដោយក្ដីស្រឡាញ់ចំពោះការអាន</span>
      </div>
    </footer>
  );
}
