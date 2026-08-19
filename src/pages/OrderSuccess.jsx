import { CalendarDays, CheckCircle2, MapPin, PackageCheck, ReceiptText } from "lucide-react";
import { Link } from "react-router-dom";
import BookCover from "../components/common/BookCover";
import EmptyState from "../components/common/EmptyState";
import { formatDateKh, formatPrice } from "../utils/format";
import { getLatestOrder } from "../utils/orders";

export default function OrderSuccess() {
  const order = getLatestOrder();
  if (!order) return <div className="container"><EmptyState title="មិនមានការបញ្ជាទិញថ្មីទេ" description="នៅពេលអ្នកបញ្ជាទិញ ព័ត៌មាននឹងបង្ហាញនៅទីនេះ។" /></div>;
  return (
    <section className="order-success section">
      <div className="container order-success__inner">
        <span className="order-success__icon"><CheckCircle2 size={46} /></span>
        <span className="order-success__eyebrow">ការបញ្ជាទិញបានជោគជ័យ!</span>
        <h1>អរគុណសម្រាប់ការជ្រើសរើសបណ្ណាល័យខ្មែរ</h1>
        <p>យើងបានទទួលការបញ្ជាទិញរបស់អ្នក ហើយកំពុងរៀបចំសៀវភៅសម្រាប់ការដឹកជញ្ជូន។</p>
        <div className="order-success__meta"><span><ReceiptText size={18} /><small>លេខបញ្ជាទិញ</small><strong>{order.id}</strong></span><span><CalendarDays size={18} /><small>កាលបរិច្ឆេទ</small><strong>{formatDateKh(order.date)}</strong></span><span><PackageCheck size={18} /><small>ស្ថានភាព</small><strong>{order.status}</strong></span></div>
        <div className="success-order-card">
          <div className="success-order-card__head"><h2>ព័ត៌មានការបញ្ជាទិញ</h2><span>{order.paymentMethod}</span></div>
          <div className="success-order-items">{order.items.map((item) => <div key={item.id}><BookCover book={item} /><span><strong>{item.title}</strong><small>{item.quantity} ក្បាល × {formatPrice(item.price)}</small></span><b>{formatPrice(item.price * item.quantity)}</b></div>)}</div>
          <div className="success-address"><MapPin size={20} /><div><strong>អាសយដ្ឋានដឹកជញ្ជូន</strong><p>{order.customer.name} · {order.customer.phone}<br />{order.customer.address}, {order.customer.commune}, {order.customer.district}, {order.customer.province}</p></div></div>
          <div className="success-order-card__total"><span>សរុបចុងក្រោយ</span><strong>{formatPrice(order.total)}</strong></div>
        </div>
        <div className="order-success__actions"><Link className="button button--primary" to="/books">បន្តទិញសៀវភៅ</Link><Link className="button button--outline" to="/orders">មើលការបញ្ជាទិញ</Link></div>
      </div>
    </section>
  );
}
