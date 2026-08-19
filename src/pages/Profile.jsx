import { Camera, Heart, LogOut, MapPin, PackageOpen, Save, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookGrid from "../components/books/BookGrid";
import PageHero from "../components/common/PageHero";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { formatDateKh, formatPrice } from "../utils/format";
import { getOrders } from "../utils/orders";

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", email: user?.email || "", address: user?.address || "", avatar: user?.avatar || "" });
  const orders = getOrders();

  if (!user?.isLoggedIn) return <><PageHero title="គណនីរបស់ខ្ញុំ" crumbs={[{ label: "គណនី" }]} /><section className="profile-login-call"><span><UserRound size={33} /></span><h2>សូមចូលគណនីជាមុន</h2><p>ចូលគណនីដើម្បីគ្រប់គ្រងព័ត៌មាន និងមើលការបញ្ជាទិញរបស់អ្នក។</p><div><Link className="button button--primary" to="/login">ចូលគណនី</Link><Link className="button button--outline" to="/register">បង្កើតគណនី</Link></div></section></>;

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const uploadAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, avatar: reader.result }));
    reader.readAsDataURL(file);
  };
  const signOut = () => { logout(); navigate("/"); };

  return (
    <>
      <PageHero eyebrow="សូមស្វាគមន៍" title={`ជំរាបសួរ ${user.name}`} description="គ្រប់គ្រងព័ត៌មាន ការបញ្ជាទិញ និងសៀវភៅដែលអ្នកចូលចិត្ត។" crumbs={[{ label: "គណនីរបស់ខ្ញុំ" }]} />
      <section className="section profile-page"><div className="container profile-layout"><aside className="profile-sidebar"><div className="profile-mini"><span>{form.avatar ? <img src={form.avatar} alt="រូប Profile" /> : form.name.slice(0, 1)}</span><div><strong>{user.name}</strong><small>{user.email}</small></div></div><nav><button className={tab === "profile" ? "active" : ""} onClick={() => setTab("profile")}><UserRound size={17} /> ព័ត៌មានផ្ទាល់ខ្លួន</button><button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}><PackageOpen size={17} /> ការបញ្ជាទិញ <em>{orders.length}</em></button><button className={tab === "wishlist" ? "active" : ""} onClick={() => setTab("wishlist")}><Heart size={17} /> បញ្ជីចូលចិត្ត <em>{wishlist.length}</em></button><button className={tab === "address" ? "active" : ""} onClick={() => setTab("address")}><MapPin size={17} /> អាសយដ្ឋាន</button><button className="profile-logout" onClick={signOut}><LogOut size={17} /> ចាកចេញ</button></nav></aside><div className="profile-content">
        {tab === "profile" && <section className="profile-panel"><h2>ព័ត៌មានផ្ទាល់ខ្លួន</h2><p>កែប្រែព័ត៌មាន និងរូប Profile របស់អ្នក។</p><div className="avatar-editor"><span>{form.avatar ? <img src={form.avatar} alt="Preview" /> : form.name.slice(0, 1)}</span><label><Camera size={16} /> ប្ដូររូប<input type="file" accept="image/*" onChange={uploadAvatar} /></label></div><div className="form-grid"><div className="form-field form-field--full"><label>ឈ្មោះពេញ</label><input name="name" value={form.name} onChange={update} /></div><div className="form-field"><label>លេខទូរស័ព្ទ</label><input name="phone" value={form.phone} onChange={update} /></div><div className="form-field"><label>អ៊ីមែល</label><input name="email" value={form.email} onChange={update} /></div><div className="form-field form-field--full"><label>អាសយដ្ឋាន</label><textarea name="address" value={form.address} onChange={update} /></div></div><button className="button button--primary" onClick={() => updateProfile(form)}><Save size={17} /> រក្សាទុក</button></section>}
        {tab === "orders" && <section className="profile-panel"><h2>ការបញ្ជាទិញរបស់ខ្ញុំ</h2>{orders.length ? <div className="profile-orders">{orders.map((order) => <Link to="/orders" key={order.id}><span><strong>{order.id}</strong><small>{formatDateKh(order.date)}</small></span><span>{order.status}</span><b>{formatPrice(order.total)}</b></Link>)}</div> : <p>មិនទាន់មានការបញ្ជាទិញទេ។</p>}</section>}
        {tab === "wishlist" && <section className="profile-panel"><h2>បញ្ជីចូលចិត្ត</h2>{wishlist.length ? <BookGrid books={wishlist.slice(0, 4)} /> : <p>មិនទាន់មានសៀវភៅក្នុងបញ្ជីចូលចិត្តទេ។</p>}</section>}
        {tab === "address" && <section className="profile-panel"><h2>អាសយដ្ឋានដឹកជញ្ជូន</h2><div className="saved-address"><MapPin size={22} /><div><strong>អាសយដ្ឋានចម្បង</strong><p>{form.address || "អ្នកមិនទាន់បានបញ្ចូលអាសយដ្ឋានទេ។"}</p><button onClick={() => setTab("profile")}>កែប្រែអាសយដ្ឋាន</button></div></div></section>}
      </div></div></section>
    </>
  );
}
