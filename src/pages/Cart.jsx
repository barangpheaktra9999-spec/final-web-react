import { ShoppingBag, Tag, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BookCover from "../components/common/BookCover";
import EmptyState from "../components/common/EmptyState";
import PageHero from "../components/common/PageHero";
import QuantitySelector from "../components/common/QuantitySelector";
import { siteConfig } from "../config/siteConfig";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatPrice } from "../utils/format";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const { showToast } = useToast();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= siteConfig.freeShippingMinimum ? 0 : 2.5;
  const total = subtotal - discount + shipping;

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "READ10") { setPromoApplied(true); showToast("បានអនុវត្តកូដបញ្ចុះតម្លៃ 10%។"); }
    else showToast("កូដនេះមិនត្រឹមត្រូវទេ។ សាកល្បង READ10", "info");
  };

  return (
    <>
      <PageHero eyebrow="ការទិញរបស់អ្នក" title="រទេះទិញទំនិញ" description="ពិនិត្យសៀវភៅ ចំនួន និងតម្លៃ មុនបន្តទៅការបញ្ជាទិញ។" crumbs={[{ label: "រទេះទិញទំនិញ" }]} />
      <section className="section cart-page">
        <div className="container">
          {!cart.length ? <EmptyState icon={ShoppingBag} title="រទេះទិញទំនិញរបស់អ្នកនៅទទេ" description="ស្វែងរកសៀវភៅដែលអ្នកចូលចិត្ត ហើយបន្ថែមវាទៅក្នុងរទេះ។" /> : (
            <div className="cart-layout">
              <div className="cart-items">
                <div className="cart-items__head"><span>{cart.length} មុខទំនិញ</span><Link to="/books">បន្តទិញសៀវភៅ</Link></div>
                {cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <Link to={`/books/${item.id}`}><BookCover book={item} /></Link>
                    <div className="cart-item__info"><span>{item.category}</span><h2><Link to={`/books/${item.id}`}>{item.title}</Link></h2><p>{item.author}</p><strong>{formatPrice(item.price)}</strong></div>
                    <div className="cart-item__actions"><QuantitySelector value={item.quantity} onChange={(value) => updateQuantity(item.id, value)} max={item.stock} /><strong>{formatPrice(item.price * item.quantity)}</strong><button type="button" onClick={() => removeFromCart(item.id)} aria-label="ដកចេញ"><Trash2 size={18} /></button></div>
                  </article>
                ))}
                <div className="promo-code"><Tag size={19} /><input value={promo} onChange={(event) => setPromo(event.target.value)} placeholder="កូដបញ្ចុះតម្លៃ (សាក READ10)" /><button type="button" onClick={applyPromo}>អនុវត្ត</button></div>
              </div>
              <aside className="order-summary">
                <h2>សង្ខេបការបញ្ជាទិញ</h2>
                <div><span>តម្លៃសរុប</span><strong>{formatPrice(subtotal)}</strong></div>
                <div><span>ការបញ្ចុះតម្លៃ</span><strong className="discount-text">−{formatPrice(discount)}</strong></div>
                <div><span>ថ្លៃដឹកជញ្ជូន</span><strong>{shipping ? formatPrice(shipping) : "ឥតគិតថ្លៃ"}</strong></div>
                {subtotal < siteConfig.freeShippingMinimum && <p className="shipping-note"><Truck size={16} /> ទិញបន្ថែម {formatPrice(siteConfig.freeShippingMinimum - subtotal)} ដើម្បីដឹកជញ្ជូនឥតគិតថ្លៃ។</p>}
                <div className="order-summary__total"><span>សរុបចុងក្រោយ</span><strong>{formatPrice(total)}</strong></div>
                <Link className="button button--primary button--full" to="/checkout">បន្តទៅការបញ្ជាទិញ</Link>
                <small>ការទូទាត់នៅក្នុង project នេះជា Mock UI ប៉ុណ្ណោះ។</small>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
