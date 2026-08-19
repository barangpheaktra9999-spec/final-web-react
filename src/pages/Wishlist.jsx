import { Heart } from "lucide-react";
import BookGrid from "../components/books/BookGrid";
import EmptyState from "../components/common/EmptyState";
import PageHero from "../components/common/PageHero";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <>
      <PageHero eyebrow="រក្សាទុកសម្រាប់ពេលក្រោយ" title="បញ្ជីចូលចិត្ត" description="សៀវភៅទាំងអស់ដែលអ្នកបានរក្សាទុកនៅកន្លែងតែមួយ។" crumbs={[{ label: "បញ្ជីចូលចិត្ត" }]} />
      <section className="section wishlist-page"><div className="container">{wishlist.length ? <><div className="wishlist-count">អ្នកបានរក្សាទុក {wishlist.length} សៀវភៅ</div><BookGrid books={wishlist} /></> : <EmptyState icon={Heart} title="អ្នកមិនទាន់មានសៀវភៅក្នុងបញ្ជីចូលចិត្តទេ" description="ចុចរូបបេះដូងលើសៀវភៅណាមួយ ដើម្បីរក្សាទុកនៅទីនេះ។" />}</div></section>
    </>
  );
}
