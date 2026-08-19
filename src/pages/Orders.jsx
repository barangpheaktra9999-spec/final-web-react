import { ChevronDown, PackageOpen } from "lucide-react";
import { useState } from "react";
import EmptyState from "../components/common/EmptyState";
import PageHero from "../components/common/PageHero";
import { formatDateKh, formatPrice } from "../utils/format";
import { getOrders } from "../utils/orders";

const statusClass = { "កំពុងរៀបចំ": "preparing", "កំពុងដឹកជញ្ជូន": "shipping", "បានដឹកជញ្ជូន": "delivered", "បានបញ្ចប់": "completed", "បានបោះបង់": "cancelled" };

export default function Orders() {
  const [orders] = useState(() => getOrders());
  const [open, setOpen] = useState(null);
  return (
    <>
      <PageHero eyebrow="ប្រវត្តិការទិញ" title="ការបញ្ជាទិញរបស់ខ្ញុំ" description="តាមដានស្ថានភាព និងមើលព័ត៌មាននៃការបញ្ជាទិញរបស់អ្នក។" crumbs={[{ label: "ការបញ្ជាទិញ" }]} />
      <section className="section orders-page"><div className="container orders-list">{orders.length ? orders.map((order) => <article className={`order-card ${open === order.id ? "is-open" : ""}`} key={order.id}><button className="order-card__summary" type="button" onClick={() => setOpen(open === order.id ? null : order.id)}><span><small>លេខបញ្ជាទិញ</small><strong>{order.id}</strong></span><span><small>កាលបរិច្ឆេទ</small><strong>{formatDateKh(order.date)}</strong></span><span><small>ចំនួន</small><strong>{order.items.reduce((sum, item) => sum + item.quantity, 0)} ក្បាល</strong></span><span><small>សរុប</small><strong>{formatPrice(order.total)}</strong></span><em className={`order-status order-status--${statusClass[order.status] || "preparing"}`}>{order.status}</em><ChevronDown size={19} /></button>{open === order.id && <div className="order-card__details"><div>{order.items.map((item) => <p key={item.id}><span>{item.title} × {item.quantity}</span><strong>{formatPrice(item.price * item.quantity)}</strong></p>)}</div><div className="order-card__delivery"><strong>ដឹកទៅ៖ {order.customer.name}</strong><p>{order.customer.address}, {order.customer.commune}, {order.customer.district}, {order.customer.province}</p><small>ទូទាត់៖ {order.paymentMethod}</small></div></div>}</article>) : <EmptyState icon={PackageOpen} title="អ្នកមិនទាន់មានការបញ្ជាទិញទេ" description="ការបញ្ជាទិញថ្មីរបស់អ្នកនឹងបង្ហាញនៅទីនេះ។" />}</div></section>
    </>
  );
}
