import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
}

const API = 'http://127.0.0.1:8000/api';

const MainWebsitePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCat, setSelectedCat] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/categories`);
      setCategories(res.data);
      if (res.data.length) {
        setSelectedCat(res.data[0].id);
        fetchProducts(res.data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async (catId: number) => {
    setSelectedCat(catId);
    try {
      const res = await axios.get(`${API}/categories/${catId}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-border-color dark:border-white/10 px-4 md:px-10 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 group">
              <div className="size-10 text-primary bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined !text-[28px]">local_bar</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight">ركن العصائر والأراجيل</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                الرئيسية
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">قائمة الطعام</h2>
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`px-4 py-2 rounded whitespace-nowrap ${
                  c.id === selectedCat ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
                onClick={() => fetchProducts(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="border rounded p-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm mb-1">{p.description}</p>
                <p className="font-semibold">{p.price} ريال</p>
              </div>
            ))}
          </div>
        </section>

        {/* يمكنك إضافة أقسام أخرى هنا مثل العروض أو عن الشركة */}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-card border-t border-border-color dark:border-white/10 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary !text-[32px]">local_bar</span>
              <span className="text-lg font-bold">ركن العصائر والأراجيل</span>
            </div>
            <p className="text-sm text-accent dark:text-gray-400 leading-relaxed">
              نقدم لكم أجود أنواع العصائر الطبيعية والمشروبات الطازجة، بالإضافة إلى تشكيلة واسعة من الأراجيل الفاخرة في أجواء متميزة.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3 text-sm text-accent dark:text-gray-400">
              <li><a href="#" className="hover:text-primary">الرئيسية</a></li>
              <li><a href="#" className="hover:text-primary">قائمة الطعام</a></li>
              <li><a href="#" className="hover:text-primary">العروض</a></li>
              <li><a href="#" className="hover:text-primary">الوظائف</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4 text-sm text-accent dark:text-gray-400">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                شارع الأمير سلطان، الرياض، المملكة العربية السعودية
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">call</span>
                +966 50 000 0000
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                info@leszest.com
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-border-color dark:border-white/10 text-center text-xs text-accent/50">
          © {new Date().getFullYear()} جميع الحقوق محفوظة لشركة ركن العصائر والأراجيل.
        </div>
      </footer>
    </div>
  );
};

export default MainWebsitePage;
