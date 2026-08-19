import { Banknote, Building2, CheckCircle2, CreditCard, MapPin, QrCode, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookCover from "../components/common/BookCover";
import EmptyState from "../components/common/EmptyState";
import PageHero from "../components/common/PageHero";
import { siteConfig } from "../config/siteConfig";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { createOrderId, saveOrder } from "../utils/orders";
import { formatPrice } from "../utils/format";

const paymentMethods = [
  { id: "cod", label: "បង់ប្រាក់ពេលទទួលទំនិញ", detail: "បង់ជាសាច់ប្រាក់ដល់អ្នកដឹកជញ្ជូន", icon: Banknote },
  { id: "aba", label: "ABA", detail: "Mock payment interface", icon: CreditCard },
  { id: "acleda", label: "ACLEDA", detail: "Mock payment interface", icon: Building2 },
  { id: "khqr", label: "KHQR", detail: "Mock QR interface", icon: QrCode }
];

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", email: user?.email || "", province: "ភ្នំពេញ", district: "", commune: "", address: user?.address || "", note: "" });
  const [errors, setErrors] = useState({});
  const shipping = subtotal >= siteConfig.freeShippingMinimum ? 0 : 2.5;
  const total = subtotal + shipping;
  const selectedPayment = useMemo(() => paymentMethods.find((item) => item.id === payment), [payment]);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "សូមបញ្ចូលឈ្មោះពេញ។";
    if (!/^0\d{8,9}$/.test(form.phone.replace(/\s/g, ""))) next.phone = "សូមបញ្ចូលលេខទូរស័ព្ទខ្មែរឲ្យត្រឹមត្រូវ។";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "អ៊ីមែលមិនត្រឹមត្រូវ។";
    if (!form.district.trim()) next.district = "សូមបញ្ចូលស្រុក ឬខណ្ឌ។";
    if (!form.commune.trim()) next.commune = "សូមបញ្ចូលឃុំ ឬសង្កាត់។";
    if (!form.address.trim()) next.address = "សូមបញ្ចូលអាសយដ្ឋាន។";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = (event) => {
    event.preventDefault();
    if (!validate()) { showToast("សូមពិនិត្យព័ត៌មានដែលបានបញ្ចូល។", "info"); return; }
    const order = {
      id: createOrderId(), date: new Date().toISOString(), status: "កំពុងរៀបចំ", customer: form, items: cart,
      subtotal, shipping, total, paymentMethod: selectedPayment.label
    };
    saveOrder(order);
    clearCart();
    showToast("ការបញ្ជាទិញបានជោគជ័យ!");
    navigate("/order-success");
  };

  if (!cart.length) return <><PageHero title="បញ្ជាទិញ" crumbs={[{ label: "បញ្ជាទិញ" }]} /><div className="container"><EmptyState title="មិនមានសៀវភៅសម្រាប់បញ្ជាទិញទេ" description="សូមបន្ថែមសៀវភៅទៅក្នុងរទេះជាមុនសិន។" /></div></>;

  return (
    <>
      <PageHero eyebrow="ជំហានចុងក្រោយ" title="បញ្ជាទិញ និងទូទាត់" description="បំពេញព័ត៌មានដឹកជញ្ជូន រួចពិនិត្យការបញ្ជាទិញរបស់អ្នក។" crumbs={[{ label: "រទេះ", to: "/cart" }, { label: "បញ្ជាទិញ" }]} />
      <section className="section checkout-page">
        <form className="container checkout-layout" onSubmit={placeOrder} noValidate>
          <div className="checkout-main">
            <section className="checkout-card">
              <div className="checkout-card__title"><span><MapPin size={20} /></span><div><h2>ព័ត៌មានដឹកជញ្ជូន</h2><p>សូមបញ្ចូលព័ត៌មានពិតប្រាកដ ដើម្បីងាយស្រួលទំនាក់ទំនង។</p></div></div>
              <div className="form-grid">
                <div className="form-field form-field--full"><label htmlFor="name">ឈ្មោះពេញ *</label><input id="name" name="name" value={form.name} onChange={update} placeholder="ឈ្មោះរបស់អ្នក" />{errors.name && <small className="field-error">{errors.name}</small>}</div>
                <div className="form-field"><label htmlFor="phone">លេខទូរស័ព្ទ *</label><input id="phone" name="phone" value={form.phone} onChange={update} placeholder="012 345 678" />{errors.phone && <small className="field-error">{errors.phone}</small>}</div>
                <div className="form-field"><label htmlFor="email">អ៊ីមែល</label><input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="name@example.com" />{errors.email && <small className="field-error">{errors.email}</small>}</div>
                <div className="form-field"><label htmlFor="province">រាជធានី / ខេត្ត *</label><select id="province" name="province" value={form.province} onChange={update}><option>ភ្នំពេញ</option><option>កណ្ដាល</option><option>សៀមរាប</option><option>បាត់ដំបង</option><option>កំពង់ចាម</option><option>ខេត្តផ្សេងទៀត</option></select></div>
                <div className="form-field"><label htmlFor="district">ស្រុក / ខណ្ឌ *</label><input id="district" name="district" value={form.district} onChange={update} placeholder="ឧ. ទួលគោក" />{errors.district && <small className="field-error">{errors.district}</small>}</div>
                <div className="form-field"><label htmlFor="commune">ឃុំ / សង្កាត់ *</label><input id="commune" name="commune" value={form.commune} onChange={update} placeholder="ឧ. បឹងកក់ទី១" />{errors.commune && <small className="field-error">{errors.commune}</small>}</div>
                <div className="form-field form-field--full"><label htmlFor="address">អាសយដ្ឋានលម្អិត *</label><input id="address" name="address" value={form.address} onChange={update} placeholder="ផ្ទះលេខ ផ្លូវ ភូមិ..." />{errors.address && <small className="field-error">{errors.address}</small>}</div>
                <div className="form-field form-field--full"><label htmlFor="note">ព័ត៌មានបន្ថែម</label><textarea id="note" name="note" value={form.note} onChange={update} placeholder="កំណត់ចំណាំសម្រាប់អ្នកដឹកជញ្ជូន..." /></div>
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-card__title"><span><CreditCard size={20} /></span><div><h2>វិធីទូទាត់</h2><p>ជ្រើសរើសវិធីដែលងាយស្រួលសម្រាប់អ្នក។</p></div></div>
              <div className="payment-options">
                {paymentMethods.map(({ id, label, detail, icon: Icon }) => <label className={`payment-option ${payment === id ? "is-selected" : ""}`} key={id}><input type="radio" name="payment" value={id} checked={payment === id} onChange={(event) => setPayment(event.target.value)} /><span><Icon size={21} /></span><div><strong>{label}</strong><small>{detail}</small></div>{payment === id && <CheckCircle2 className="payment-option__check" size={19} />}</label>)}
              </div>
              {payment !== "cod" && <div className="mock-payment-notice"><ShieldCheck size={19} /><span><strong>Mock Payment UI</strong> មិនមានការផ្ទេរប្រាក់ពិតប្រាកដក្នុង Front-End Project នេះទេ។</span></div>}
            </section>
          </div>

          <aside className="checkout-summary">
            <h2>ការបញ្ជាទិញរបស់អ្នក</h2>
            <div className="checkout-summary__items">{cart.map((item) => <div className="checkout-mini-item" key={item.id}><BookCover book={item} /><div><strong>{item.title}</strong><small>{item.quantity} × {formatPrice(item.price)}</small></div><span>{formatPrice(item.price * item.quantity)}</span></div>)}</div>
            <div className="checkout-summary__row"><span>តម្លៃសរុប</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="checkout-summary__row"><span>ថ្លៃដឹកជញ្ជូន</span><strong>{shipping ? formatPrice(shipping) : "ឥតគិតថ្លៃ"}</strong></div>
            <div className="checkout-summary__total"><span>សរុបចុងក្រោយ</span><strong>{formatPrice(total)}</strong></div>
            <button className="button button--primary button--full" type="submit"><CheckCircle2 size={18} /> បញ្ជាក់ការបញ្ជាទិញ</button>
            <p className="checkout-terms">ដោយចុចបញ្ជាក់ អ្នកយល់ព្រមនឹងលក្ខខណ្ឌរបស់យើង។ <Link to="/faq">ស្វែងយល់បន្ថែម</Link></p>
          </aside>
        </form>
      </section>
    </>
  );
}
