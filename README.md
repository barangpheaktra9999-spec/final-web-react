# បណ្ណាល័យខ្មែរ — React JS Book Store

Website លក់សៀវភៅ Front-End ពេញលេញ ដែលប្រើ React JS + Vite + JavaScript/JSX។ UI ប្រើភាសាខ្មែរ និងរចនាបទ Gold + Cream + White + Dark Brown។

## 1. របៀប Run

ត្រូវមាន Node.js 20 ឬថ្មីជាងនេះ។ បើក Terminal ក្នុង Project ហើយវាយ៖

```bash
npm install
npm run dev
```

បន្ទាប់មកបើក URL ដែល Vite បង្ហាញក្នុង Terminal។

សម្រាប់ Production Build៖

```bash
npm run build
npm run preview
```

## 2. Technology

- React JS + Vite
- JavaScript និង JSX
- React Router DOM
- Framer Motion
- Swiper.js
- Lucide React
- CSS3
- localStorage
- Mock Data

Project នេះជា Front-End only។ មិនមាន Backend, Database, Real Authentication ឬ Real Payment API ទេ។

## 3. ទំព័រ

- Home
- Books + Search + Filter + Sort + Grid/List
- Book Detail
- Cart
- Wishlist
- Checkout
- Order Success
- My Orders
- Login / Register (Mock)
- Profile
- About Us
- Contact Us
- FAQ
- 404 Not Found

## 4. កែ Hero Slider

ចូលទៅ៖

```text
src/data/slides.js
```

អ្នកអាចកែ `image`, `eyebrow`, `title`, `quote`, `description`, button text និង button link។ រូបភាព Slider ទុកនៅ៖

```text
public/images/slides/
```

## 5. បន្ថែម ឬកែសៀវភៅ

ចូលទៅ៖

```text
src/data/books.js
```

Copy object សៀវភៅមួយ ហើយប្ដូរ `id`, `title`, `author`, `category`, `price`, `stock` និងព័ត៌មានផ្សេងៗ។

## 6. កែព័ត៌មាន Website

ចូលទៅ៖

```text
src/config/siteConfig.js
```

អាចកែឈ្មោះ Website, លេខទូរស័ព្ទ, អ៊ីមែល, Telegram, Facebook និងអាសយដ្ឋាន។

## 7. ទិន្នន័យក្នុង localStorage

Website រក្សាទុក Cart, Wishlist, Orders, User និង Recently Viewed ក្នុង Browser។ បើចង់សម្អាតទិន្នន័យ សូម Clear Site Data ឬ localStorage ក្នុង Browser DevTools។

## 8. កូដបញ្ចុះតម្លៃសាកល្បង

ក្នុង Cart អាចវាយ៖

```text
READ10
```

ដើម្បីសាកល្បងបញ្ចុះតម្លៃ 10%។
