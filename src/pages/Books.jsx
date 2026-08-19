import { useEffect, useMemo, useState } from "react";
import { Filter, Grid2X2, List, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import BookGrid from "../components/books/BookGrid";
import EmptyState from "../components/common/EmptyState";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import PageHero from "../components/common/PageHero";
import { books } from "../data/books";
import { categories } from "../data/categories";

const pageSize = 8;

export default function Books() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [author, setAuthor] = useState("all");
  const [rating, setRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const specialFilter = params.get("filter") || "";

  useEffect(() => {
    setSearch(params.get("search") || "");
    setCategory(params.get("category") || "all");
  }, [params]);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    const timer = window.setTimeout(() => setLoading(false), 260);
    return () => window.clearTimeout(timer);
  }, [search, category, author, rating, minPrice, maxPrice, inStock, sort, specialFilter]);

  const authors = useMemo(() => [...new Set(books.map((book) => book.author))].sort(), []);
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = books.filter((book) => {
      const matchesText = !term || `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(term);
      const matchesCategory = category === "all" || book.categoryId === category;
      const matchesAuthor = author === "all" || book.author === author;
      const matchesRating = book.rating >= rating;
      const matchesMin = !minPrice || book.price >= Number(minPrice);
      const matchesMax = !maxPrice || book.price <= Number(maxPrice);
      const matchesStock = !inStock || book.stock > 0;
      const matchesSpecial = specialFilter === "new" ? book.isNew : specialFilter === "best" ? book.isBestSeller : true;
      return matchesText && matchesCategory && matchesAuthor && matchesRating && matchesMin && matchesMax && matchesStock && matchesSpecial;
    });
    return result.sort((a, b) => {
      if (sort === "newest") return b.publishYear - a.publishYear || b.id - a.id;
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });
  }, [search, category, author, rating, minPrice, maxPrice, inStock, sort, specialFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const reset = () => {
    setSearch(""); setCategory("all"); setAuthor("all"); setRating(0); setMinPrice(""); setMaxPrice(""); setInStock(false); setSort("popular");
    setParams({});
  };

  const changeSearch = (value) => {
    setSearch(value);
    const next = new URLSearchParams(params);
    value ? next.set("search", value) : next.delete("search");
    setParams(next, { replace: true });
  };

  return (
    <>
      <PageHero eyebrow="បណ្ណសារ" title={specialFilter === "new" ? "សៀវភៅចេញថ្មី" : specialFilter === "best" ? "សៀវភៅលក់ដាច់" : "សៀវភៅទាំងអស់"} description="ស្វែងរកសៀវភៅដែលសមនឹងចំណូលចិត្ត គោលដៅ និងដំណើររៀនសូត្ររបស់អ្នក។" crumbs={[{ label: "សៀវភៅ" }]} />
      <section className="books-page section">
        <div className="container books-layout">
          <button className="button button--outline mobile-filter-button" onClick={() => setFiltersOpen(true)} type="button"><Filter size={17} /> តម្រងសៀវភៅ</button>
          <div className={`filter-backdrop ${filtersOpen ? "is-open" : ""}`} onClick={() => setFiltersOpen(false)} />
          <aside className={`filter-sidebar ${filtersOpen ? "is-open" : ""}`}>
            <div className="filter-sidebar__title"><span><SlidersHorizontal size={18} /> តម្រងសៀវភៅ</span><button className="icon-button filter-close" type="button" onClick={() => setFiltersOpen(false)}><X size={19} /></button></div>
            <div className="filter-group">
              <label htmlFor="book-search">ស្វែងរក</label>
              <input id="book-search" type="search" value={search} onChange={(event) => changeSearch(event.target.value)} placeholder="ឈ្មោះ ឬអ្នកនិពន្ធ..." />
            </div>
            <div className="filter-group">
              <span>ប្រភេទសៀវភៅ</span>
              <label className="check-row"><input type="radio" name="category" checked={category === "all"} onChange={() => setCategory("all")} /> ទាំងអស់ <small>{books.length}</small></label>
              {categories.map((item) => <label className="check-row" key={item.id}><input type="radio" name="category" checked={category === item.id} onChange={() => setCategory(item.id)} /> {item.name} <small>{books.filter((book) => book.categoryId === item.id).length}</small></label>)}
            </div>
            <div className="filter-group">
              <label htmlFor="author">អ្នកនិពន្ធ</label>
              <select id="author" value={author} onChange={(event) => setAuthor(event.target.value)}><option value="all">អ្នកនិពន្ធទាំងអស់</option>{authors.map((name) => <option key={name}>{name}</option>)}</select>
            </div>
            <div className="filter-group">
              <span>តម្លៃ</span>
              <div className="price-fields"><input type="number" min="0" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="ចាប់ពី $" /><input type="number" min="0" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="ដល់ $" /></div>
            </div>
            <div className="filter-group">
              <label htmlFor="rating-filter">ពិន្ទុអប្បបរមា</label>
              <select id="rating-filter" value={rating} onChange={(event) => setRating(Number(event.target.value))}><option value="0">ពិន្ទុទាំងអស់</option><option value="4.8">4.8 ឡើងទៅ</option><option value="4.5">4.5 ឡើងទៅ</option><option value="4">4.0 ឡើងទៅ</option></select>
              <label className="check-row"><input type="checkbox" checked={inStock} onChange={(event) => setInStock(event.target.checked)} /> មានក្នុងស្តុកប៉ុណ្ណោះ</label>
            </div>
            <button className="button button--outline button--full" type="button" onClick={reset}><RotateCcw size={16} /> កំណត់ឡើងវិញ</button>
          </aside>

          <div className="books-results">
            <div className="books-toolbar">
              <p>រកឃើញ <strong>{filtered.length}</strong> សៀវភៅ</p>
              <div className="books-toolbar__controls">
                <select aria-label="តម្រៀបសៀវភៅ" value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="popular">ពេញនិយមបំផុត</option><option value="newest">ថ្មីបំផុត</option><option value="price-low">តម្លៃទាបទៅខ្ពស់</option><option value="price-high">តម្លៃខ្ពស់ទៅទាប</option><option value="rating">Rating ខ្ពស់បំផុត</option>
                </select>
                <div className="view-toggle"><button type="button" className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="បង្ហាញជាក្រឡា"><Grid2X2 size={17} /></button><button type="button" className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="បង្ហាញជាបញ្ជី"><List size={18} /></button></div>
              </div>
            </div>
            {loading ? <LoadingSkeleton count={8} /> : paginated.length ? <BookGrid books={paginated} layout={view} /> : <EmptyState title="មិនមានសៀវភៅដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ" description="សូមសាកល្បងពាក្យស្វែងរក ឬតម្រងផ្សេងទៀត។" actionText="សម្អាតតម្រង" actionLink="/books" />}
            {!loading && filtered.length > pageSize && <nav className="pagination" aria-label="ទំព័រសៀវភៅ"><button type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>មុន</button>{Array.from({ length: totalPages }, (_, index) => <button type="button" key={index + 1} className={page === index + 1 ? "active" : ""} onClick={() => setPage(index + 1)}>{index + 1}</button>)}<button type="button" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>បន្ទាប់</button></nav>}
          </div>
        </div>
      </section>
    </>
  );
}
