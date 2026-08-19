import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "សូមបញ្ចូលឈ្មោះពេញ។";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "អ៊ីមែលមិនត្រឹមត្រូវ។";
    if (!/^0\d{8,9}$/.test(form.phone.replace(/\s/g, ""))) next.phone = "លេខទូរស័ព្ទមិនត្រឹមត្រូវ។";
    if (form.password.length < 6) next.password = "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច 6 តួ។";
    if (form.password !== form.confirmPassword) next.confirmPassword = "ពាក្យសម្ងាត់មិនដូចគ្នា។";
    setErrors(next);
    if (!Object.keys(next).length) { register(form); navigate("/profile"); }
  };
  return (
    <section className="auth-page auth-page--register"><div className="auth-visual"><div><span>ចាប់ផ្ដើមដំណើរអាន</span><h1>បង្កើតគណនីអ្នកអានរបស់អ្នក</h1><p>រក្សាទុកសៀវភៅ តាមដានការបញ្ជាទិញ និងទទួលបានការណែនាំពិសេស។</p></div></div><div className="auth-panel"><div className="auth-panel__inner"><span className="auth-icon"><UserPlus size={25} /></span><h2>បង្កើតគណនី</h2><p>បំពេញព័ត៌មានខាងក្រោម។</p><form onSubmit={submit} noValidate><div className="form-field"><label htmlFor="reg-name">ឈ្មោះពេញ</label><input id="reg-name" name="name" value={form.name} onChange={update} />{errors.name && <small className="field-error">{errors.name}</small>}</div><div className="form-grid"><div className="form-field"><label htmlFor="reg-email">អ៊ីមែល</label><input id="reg-email" name="email" type="email" value={form.email} onChange={update} />{errors.email && <small className="field-error">{errors.email}</small>}</div><div className="form-field"><label htmlFor="reg-phone">លេខទូរស័ព្ទ</label><input id="reg-phone" name="phone" value={form.phone} onChange={update} />{errors.phone && <small className="field-error">{errors.phone}</small>}</div></div><div className="form-field password-row"><label htmlFor="reg-password">ពាក្យសម្ងាត់</label><input id="reg-password" name="password" type={show ? "text" : "password"} value={form.password} onChange={update} /><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>{errors.password && <small className="field-error">{errors.password}</small>}</div><div className="form-field"><label htmlFor="reg-confirm">បញ្ជាក់ពាក្យសម្ងាត់</label><input id="reg-confirm" name="confirmPassword" type={show ? "text" : "password"} value={form.confirmPassword} onChange={update} />{errors.confirmPassword && <small className="field-error">{errors.confirmPassword}</small>}</div><button className="button button--primary button--full" type="submit">បង្កើតគណនី</button></form><p className="auth-switch">មានគណនីរួចហើយ? <Link to="/login">ចូលគណនី</Link></p></div></div></section>
  );
}
