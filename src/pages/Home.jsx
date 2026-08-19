import BestSellers from "../components/home/BestSellers";
import BookShelfSection from "../components/home/BookShelfSection";
import CategorySection from "../components/home/CategorySection";
import HeroSlider from "../components/home/HeroSlider";
import NewArrivals from "../components/home/NewArrivals";
import Newsletter from "../components/home/Newsletter";
import PromoBanner from "../components/home/PromoBanner";
import QuoteSection from "../components/home/QuoteSection";
import Testimonials from "../components/home/Testimonials";
import WhyChooseUs from "../components/home/WhyChooseUs";
import { books } from "../data/books";

export default function Home() {
  const popular = [...books].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
  const recommended = books.filter((book) => book.isFeatured).slice(0, 8);

  return (
    <>
      <HeroSlider />
      <CategorySection />
      <BookShelfSection eyebrow="អ្នកអានកំពុងស្វែងរក" title="សៀវភៅពេញនិយម" description="ជម្រើសដែលកំពុងទទួលបានការចាប់អារម្មណ៍ពីអ្នកអាន។" books={popular} className="popular-books" />
      <NewArrivals />
      <BestSellers />
      <PromoBanner />
      <BookShelfSection eyebrow="ជ្រើសរើសដោយក្រុមការងារ" title="សៀវភៅដែលយើងណែនាំ" description="សៀវភៅពិសេសដែលជួយបើកទូលាយចំណេះដឹង និងការគិត។" books={recommended} className="recommended-books" />
      <WhyChooseUs />
      <QuoteSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
