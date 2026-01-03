import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../src/assets/social/logo.PNG";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

interface Category {
  id: number;
  name: string;
}

const API = "https://menuo.zayamrock.com/api";

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
                <img
                  src={logo}
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                ركن العصائر والأراجيل
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                الرئيسية
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[500px] w-full overflow-hidden isolate">
        <img
          src="https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=1600"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/60 z-10" />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="mb-6 size-24 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-3xl flex items-center justify-center shadow-xl">
            <span className="material-symbols-outlined text-primary text-[52px]">
              local_bar
            </span>
          </div>
          <span className="bg-primary/20 backdrop-blur-md text-primary-light border border-primary/40 px-6 py-2 rounded-full text-sm font-bold mb-6 tracking-widest">
            طازج ومنعش 100%
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-black mb-6 drop-shadow-2xl">
            قائمة العصائر والمشروبات
          </h1>
          <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-10">
            استمتع بأفضل المشروبات الطازجة، الكوكتيلات المميزة، والأراجيل
            الفاخرة
          </p>
          <button className="h-14 px-10 bg-primary text-white font-bold rounded-2xl shadow-xl hover:bg-primary-dark transition">
            تصفح القائمة
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">قائمة الطعام</h2>
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                  c.id === selectedCat
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-primary/20"
                }`}
                onClick={() => fetchProducts(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="group bg-white dark:bg-dark-card rounded-2xl border border-border-color dark:border-white/10 shadow-md hover:shadow-2xl transition-all overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.isNew && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      جديد
                    </div>
                  )}
                  {p.isBestSeller && (
                    <div className="absolute top-3 left-3 bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-400 text-[14px]">
                        local_fire_department
                      </span>
                      الأكثر مبيعاً
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <span className="text-primary font-black">
                      {p.price} ريال
                    </span>
                  </div>
                  <p className="text-sm text-accent dark:text-gray-400 mb-2 line-clamp-3">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Social Media Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <h4 className="text-2xl font-extrabold text-center md:text-left mb-6 md:mb-0">
            تابعنا على وسائل التواصل الاجتماعي
          </h4>
          <div className="flex items-center gap-6 justify-center md:justify-end">
            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300"
            >
              <FaFacebookF size={24} />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/leszest_cafe/?igsh=MXZ6ZGpydHZ5djBncQ%3D%3D&utm_source=qr#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-100 text-pink-500 shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300"
            >
              <FaInstagram size={24} />
            </a>
            {/* Twitter */}
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-full bg-sky-100 text-sky-500 shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300"
            >
              <FaTwitter size={24} />
            </a>
            {/* YouTube */}
            {/* YouTube */}
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300"
            >
              <FaYoutube size={24} />
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@leszestcafe0?_r=1&_t=ZS-92bAkUhYdTI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300"
            >
              <FaTiktok size={24} />
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/966581300818"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-card border-t border-border-color dark:border-white/10 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary !text-[32px]">
                local_bar
              </span>
              <span className="text-lg font-bold">ركن العصائر والأراجيل</span>
            </div>
            <p className="text-sm text-accent dark:text-gray-400 leading-relaxed">
              نقدم لكم أجود أنواع العصائر الطبيعية والمشروبات الطازجة، بالإضافة
              إلى تشكيلة واسعة من الأراجيل الفاخرة في أجواء متميزة.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3 text-sm text-accent dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-primary">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  قائمة الطعام
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  العروض
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  الوظائف
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4 text-sm text-accent dark:text-gray-400">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
                شارع الأمير سلطان، الرياض، المملكة العربية السعودية
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  call
                </span>
                +966 50 000 0000
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
                info@leszest.com
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-border-color dark:border-white/10 text-center text-xs text-accent/50">
          © {new Date().getFullYear()} جميع الحقوق محفوظة لشركة ركن العصائر
          والأراجيل.
        </div>
      </footer>
    </div>
  );
};

export default MainWebsitePage;
