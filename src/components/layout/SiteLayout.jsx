import { Outlet } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import ToastViewport from "../common/ToastViewport";

export default function SiteLayout() {
  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <ScrollToTop />
      <ToastViewport />
    </div>
  );
}
