import { Truck } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="container announcement-bar__inner">
        <span><Truck size={15} /> ដឹកជញ្ជូនដោយឥតគិតថ្លៃ សម្រាប់ការបញ្ជាទិញចាប់ពី ${siteConfig.freeShippingMinimum} ឡើងទៅ</span>
        <span className="announcement-bar__contact">ទំនាក់ទំនង៖ {siteConfig.phone}</span>
      </div>
    </div>
  );
}
