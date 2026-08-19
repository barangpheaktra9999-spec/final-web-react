import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ។";
    if (form.password.length < 6) next.password = "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច 6 តួអក្សរ។";
    setErrors(next);
    if (!Object.keys(next).length) { login(form); navigate("/profile"); }
  };
  return (
    <section className="auth-page"><div className="auth-visual"><div><span>បណ្ណាល័យខ្មែរ</span><h1>ស្វាគមន៍មកវិញ អ្នកអានជាទីស្រឡាញ់</h1><p>ចូលគណនី ដើម្បីមើលការបញ្ជាទិញ និងរក្សាទុកសៀវភៅដែលអ្នកចូលចិត្ត។</p><blockquote>«រាល់ការអាន គឺជាការជួបជាមួយគំនិតថ្មី»</blockquote></div></div><div className="auth-panel"><div className="auth-panel__inner"><span className="auth-icon"><LogIn size={25} /></span><h2>ចូលគណនី</h2><p>បញ្ចូលព័ត៌មានរបស់អ្នកដើម្បីបន្ត។</p><form onSubmit={submit} noValidate><div className="form-field input-with-icon"><label htmlFor="login-email">អ៊ីមែល / ទូរស័ព្ទ</label><span><Mail size={17} /></span><input id="login-email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="name@example.com" />{errors.email && <small className="field-error">{errors.email}</small>}</div><div className="form-field input-with-icon"><label htmlFor="login-password">ពាក្យសម្ងាត់</label><span><LockKeyhole size={17} /></span><input id="login-password" type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="យ៉ាងតិច 6 តួ" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="បង្ហាញពាក្យសម្ងាត់">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>{errors.password && <small className="field-error">{errors.password}</small>}</div><div className="auth-options"><label><input type="checkbox" checked={form.remember} onChange={(event) => setForm({ ...form, remember: event.target.checked })} /> ចងចាំខ្ញុំ</label><button type="button">ភ្លេចពាក្យសម្ងាត់?</button></div><button className="button button--primary button--full" type="submit">ចូលគណនី</button></form><p className="auth-switch">មិនទាន់មានគណនី? <Link to="/register">បង្កើតគណនីថ្មី</Link></p><small className="auth-mock">Mock authentication — មិនមាន Backend API ទេ។</small></div></div></section>
  );
}
