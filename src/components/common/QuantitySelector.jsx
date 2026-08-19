import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, max = 99, label = "ចំនួន" }) {
  return (
    <div className="quantity-selector" aria-label={label}>
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="បន្ថយចំនួន"><Minus size={15} /></button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} aria-label="បន្ថែមចំនួន"><Plus size={15} /></button>
    </div>
  );
}
