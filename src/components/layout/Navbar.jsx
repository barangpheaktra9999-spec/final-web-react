import { useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { books } from "../../data/books";
import { categories } from "../../data/categories";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const navItems = [
  { label: "ទំព័រដើម", to: "/" },
  { label: "សៀវភៅ", to: "/books" },
  { label: "សៀវភៅថ្មី", to: "/books?filter=new" },
  { label: "លក់ដាច់", to: "/books?filter=best" },
  { label: "អំពីយើង", to: "/about" },
  { label: "ទំនាក់ទំនង", to: "/contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  const suggestions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return books.slice(0, 4);
    return books.filter((book) => `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(term)).slice(0, 5);
  }, [search]);

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(`/books?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container navbar">
          <Link className="brand" to="/" aria-label="បណ្ណាល័យខ្មែរ ទំព័រដើម">
            <span className="brand__icon"><BookOpen size={25} /></span>
            <span><strong>បណ្ណាល័យខ្មែរ</strong><small>Khmer Book Store</small></span>
          </Link>
          <nav className="desktop-nav" aria-label="ម៉ឺនុយសំខាន់">
            {navItems.slice(0, 2).map((item) => <NavLink key={item.label} to={item.to}>{item.label}</NavLink>)}
            <div className="nav-dropdown">
              <button type="button">ប្រភេទសៀវភៅ <ChevronDown size={14} /></button>
              <div className="nav-dropdown__menu">
                {categories.map((category) => <Link key={category.id} to={`/books?category=${category.id}`}>{category.name}<span>{category.count}</span></Link>)}
              </div>
            </div>
            {navItems.slice(2).map((item) => <NavLink key={item.label} to={item.to}>{item.label}</NavLink>)}
          </nav>
          <div className="navbar__actions">
            <button className="icon-button" type="button" onClick={() => setSearchOpen(true)} aria-label="ស្វែងរក"><Search size={20} /></button>
            <Link className="icon-button badge-button" to="/wishlist" aria-label="បញ្ជីចូលចិត្ត"><Heart size={20} /><span>{wishlist.length}</span></Link>
            <Link className="icon-button badge-button" to="/cart" aria-label="រទេះទិញទំនិញ"><ShoppingBag size={20} /><span>{cartCount}</span></Link>
            <Link className="icon-button navbar__profile" to="/profile" aria-label="គណនី"><UserRound size={20} /></Link>
            <button className="icon-button navbar__menu" type="button" onClick={() => setMobileOpen(true)} aria-label="បើកម៉ឺនុយ"><Menu size={22} /></button>
          </div>
        </div>
      </header>

      <div className={`drawer-overlay ${mobileOpen ? "is-open" : ""}`} onClick={() => setMobileOpen(false)} />
      <aside className={`mobile-drawer ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer__header">
          <span className="brand"><span className="brand__icon"><BookOpen size={23} /></span><strong>បណ្ណាល័យខ្មែរ</strong></span>
          <button className="icon-button" type="button" onClick={() => setMobileOpen(false)} aria-label="បិទម៉ឺនុយ"><X /></button>
        </div>
        <nav>
          {navItems.map((item) => <NavLink key={item.label} to={item.to}>{item.label}</NavLink>)}
          <span className="mobile-drawer__label">ប្រភេទសៀវភៅ</span>
          {categories.map((category) => <Link key={category.id} to={`/books?category=${category.id}`}>{category.name}</Link>)}
          <Link to="/faq">សំណួរញឹកញាប់</Link>
        </nav>
      </aside>

      <div className={`search-panel ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
        <button className="search-panel__backdrop" onClick={() => setSearchOpen(false)} aria-label="បិទការស្វែងរក" />
        <div className="search-panel__box">
          <div className="search-panel__header"><strong>ស្វែងរកសៀវភៅ</strong><button className="icon-button" type="button" onClick={() => setSearchOpen(false)}><X /></button></div>
          <form onSubmit={submitSearch} className="global-search">
            <Search size={20} />
            <input autoFocus={searchOpen} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ស្វែងរកតាមឈ្មោះ អ្នកនិពន្ធ ឬប្រភេទ..." />
            <button type="submit" className="button button--primary">ស្វែងរក</button>
          </form>
          <div className="search-suggestions">
            <span>{search ? "លទ្ធផលដែលអាចត្រូវ" : "សៀវភៅណែនាំ"}</span>
            {suggestions.length ? suggestions.map((book) => (
              <Link key={book.id} to={`/books/${book.id}`}>
                <span className={`suggestion-cover suggestion-cover--${book.coverTone}`}>{book.coverMark}</span>
                <span><strong>{book.title}</strong><small>{book.author} · ${book.price.toFixed(2)}</small></span>
              </Link>
            )) : <p className="search-suggestions__empty">មិនមានសៀវភៅដែលត្រូវនឹងការស្វែងរកទេ។</p>}
          </div>
        </div>
      </div>
    </>
  );
}
