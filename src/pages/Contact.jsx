import { Clock3, Facebook, Mail, Map, MapPin, Phone, Send, Smartphone } from "lucide-react";
import { useState } from "react";
import PageHero from "../components/common/PageHero";
import { siteConfig } from "../config/siteConfig";
import { useToast } from "../context/ToastContext";

const info = [
  { icon: Phone, label: "លេខទូរស័ព្ទ", value: siteConfig.phone },
  { icon: Send, label: "Telegram", value: "@pannalaykhmer" },
  { icon: Facebook, label: "Facebook", value: "បណ្ណាល័យខ្មែរ" },
  { icon: Mail, label: "អ៊ីមែល", value: siteConfig.email },
  { icon: MapPin, label: "អាសយដ្ឋាន", value: siteConfig.address },
  { icon: Clock3, label: "ម៉ោងធ្វើការ", value: "ចន្ទ–សៅរ៍ · 8:00–18:00" }
];

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "សូមបញ្ចូលឈ្មោះ។";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "អ៊ីមែលមិនត្រឹមត្រូវ។";
    if (!form.subject.trim()) next.subject = "សូមបញ្ចូលប្រធានបទ។";
    if (form.message.trim().length < 10) next.message = "សារត្រូវមានយ៉ាងតិច 10 តួអក្សរ។";
    setErrors(next);
    if (!Object.keys(next).length) { showToast("បានទទួលសាររបស់អ្នក។ យើងនឹងឆ្លើយតបឆាប់ៗនេះ។"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }
  };
  return (
    <>
      <PageHero eyebrow="យើងរីករាយក្នុងការជួយ" title="ទំនាក់ទំនងមកកាន់យើង" description="មានសំណួរអំពីសៀវភៅ ការបញ្ជាទិញ ឬចង់ផ្ដល់យោបល់? ផ្ញើសារមកយើងបានគ្រប់ពេល។" crumbs={[{ label: "ទំនាក់ទំនង" }]} />
      <section className="section contact-page"><div className="container contact-grid"><div className="contact-info"><span className="section-title__eyebrow">Contact Information</span><h2>យើងនៅទីនេះសម្រាប់អ្នកអាន</h2><p>ជ្រើសរើសវិធីដែលងាយស្រួលបំផុតសម្រាប់អ្នក។ ក្រុមការងាររបស់យើងនឹងឆ្លើយតបឲ្យបានឆាប់។</p><div className="contact-info__list">{info.map(({ icon: Icon, label, value }) => <div key={label}><span><Icon size={19} /></span><div><small>{label}</small><strong>{value}</strong></div></div>)}</div></div><form className="contact-form" onSubmit={submit} noValidate><div className="contact-form__head"><span><Smartphone size={24} /></span><div><h2>ផ្ញើសារមកយើង</h2><p>វាលដែលមាន * គឺតម្រូវឲ្យបំពេញ។</p></div></div><div className="form-grid"><div className="form-field"><label htmlFor="contact-name">ឈ្មោះ *</label><input id="contact-name" name="name" value={form.name} onChange={update} />{errors.name && <small className="field-error">{errors.name}</small>}</div><div className="form-field"><label htmlFor="contact-email">អ៊ីមែល *</label><input id="contact-email" name="email" type="email" value={form.email} onChange={update} />{errors.email && <small className="field-error">{errors.email}</small>}</div><div className="form-field"><label htmlFor="contact-phone">លេខទូរស័ព្ទ</label><input id="contact-phone" name="phone" value={form.phone} onChange={update} /></div><div className="form-field"><label htmlFor="contact-subject">ប្រធានបទ *</label><input id="contact-subject" name="subject" value={form.subject} onChange={update} />{errors.subject && <small className="field-error">{errors.subject}</small>}</div><div className="form-field form-field--full"><label htmlFor="contact-message">សារ *</label><textarea id="contact-message" name="message" value={form.message} onChange={update} />{errors.message && <small className="field-error">{errors.message}</small>}</div></div><button className="button button--primary" type="submit"><Send size={17} /> ផ្ញើសារ</button><small className="contact-mock">Form នេះជាមុខងារ Front-End Mock—មិនបានផ្ញើទៅ Server ពិតប្រាកដទេ។</small></form></div></section>
      <section className="contact-map"><div className="container contact-map__box"><div><Map size={42} /><span>ផែនទីទីតាំង</span><small>Map Placeholder</small></div><div><h2>មកកាន់ហាងរបស់យើង</h2><p>{siteConfig.address}</p><a className="button button--dark" href="https://maps.google.com" target="_blank" rel="noreferrer">បើក Google Maps</a></div></div></section>
    </>
  );
}
