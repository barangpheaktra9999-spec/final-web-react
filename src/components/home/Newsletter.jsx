import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const submit = (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("សូមបញ្ចូលអ៊ីមែលឲ្យបានត្រឹមត្រូវ។");
      return;
    }
    setError("");
    setEmail("");
    showToast("អរគុណ! អ្នកបានចុះឈ្មោះទទួលព័ត៌មាន។");
  };

  return (
    <section className="newsletter">
      <div className="container newsletter__inner">
        <span className="newsletter__icon"><Mail size={31} /></span>
        <div><h2>ទទួលព័ត៌មានសៀវភៅថ្មីៗ</h2><p>ចុះឈ្មោះដើម្បីទទួលបានព័ត៌មានសៀវភៅថ្មី និងការផ្តល់ជូនពិសេសពីយើង។</p></div>
        <form onSubmit={submit} noValidate>
          <div><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក" aria-label="អ៊ីមែល" /><button type="submit"><Send size={18} /> ចុះឈ្មោះ</button></div>
          {error && <small className="form-error">{error}</small>}
        </form>
      </div>
    </section>
  );
}
