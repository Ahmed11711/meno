import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const API = "https://menuo.zayamrock.com/api";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
}

export default function MainWebsitePage() {
  const [settings, setSettings] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCat, setSelectedCat] = useState<number | null>(null);

  // جلب الإعدادات
  useEffect(() => {
    axios
      .get(`${API}/settings`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setSettings({
          site_name: data?.site_name || "مقهى رعاة لتقديم المشروبات",
          logo: data?.logo || "",
          primary_color: data?.primary_color || "#0ea5e9",
          accent_color: data?.accent_color || "#f97316",
          social_links: data?.social_links || {},
        });
      })
      .catch((err) => {
        console.error(err);
        // لو حصل خطأ، استخدم القيم الافتراضية
        setSettings({
          site_name: "ركن العصائر والأراجيل",
          logo: "",
          primary_color: "#0ea5e9",
          accent_color: "#f97316",
          social_links: {},
        });
      });
  }, []);

  // جلب الأقسام
  useEffect(() => {
    axios
      .get(`${API}/categories`)
      .then((res) => {
        setCategories(res.data || []);
        if (res.data?.length) {
          setSelectedCat(res.data[0].id);
          fetchProducts(res.data[0].id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const fetchProducts = (catId: number) => {
    setSelectedCat(catId);
    axios
      .get(`${API}/categories/${catId}/products`)
      .then((res) => setProducts(res.data || []))
      .catch(console.error);
  };

  // الرموز الاجتماعية
  const socialIcons = {
    facebook: <FaFacebookF size={24} />,
    youtube: <FaYoutube size={24} />,
    tiktok: <FaTiktok size={24} />,
    instagram: <FaInstagram size={24} />,
    whatsapp: <FaWhatsapp size={24} />,
  };

  const getColorClass = (key: string) => {
    switch (key) {
      case "facebook":
        return "bg-blue-100 text-blue-600";
      case "youtube":
        return "bg-red-100 text-red-600";
      case "tiktok":
        return "bg-black text-white";
      case "instagram":
        return "bg-pink-100 text-pink-500";
      case "whatsapp":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // لو settings لسه محملش، استخدم loader
  if (!settings) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-4 md:px-10 py-3 shadow-sm border-b"
        style={{ backgroundColor: settings.primary_color }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {settings.logo ? (
              <img src={settings.logo} alt="Logo" className="w-12 h-12" />
            ) : (
              <span className="text-white font-bold text-xl">
                {settings.site_name || "ركن العصائر والأراجيل"}
              </span>
            )}
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
          {settings.logo ? (
            <img
              src={settings.logo}
              alt="Logo Hero"
              className="h-24 w-24 mb-4 rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <span className="material-symbols-outlined text-white text-[52px] mb-4">
              local_bar
            </span>
          )}
          <h1 className="text-white text-4xl md:text-6xl font-black mb-6 drop-shadow-2xl">
            {settings.site_name || "ركن العصائر والأراجيل"}
          </h1>
          <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-10">
            استمتع بأفضل المشروبات الطازجة، الكوكتيلات المميزة، والأراجيل
            الفاخرة
          </p>
          <button
            className="h-14 px-10 font-bold rounded-2xl shadow-xl transition"
            style={{ backgroundColor: settings.accent_color, color: "#fff" }}
          >
            تصفح القائمة
          </button>
        </div>
      </section>

      {/* Categories & Products */}
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

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="group bg-white dark:bg-dark-card rounded-xl border border-border-color dark:border-white/10 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-md font-semibold group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <span className="text-primary font-bold text-sm">
                      {p.price} ريال
                    </span>
                  </div>
                  <p className="text-xs text-accent dark:text-gray-400 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Social Media Section */}
      <section className="py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <h4 className="text-2xl font-extrabold text-center md:text-left mb-6 md:mb-0">
            تابعنا على وسائل التواصل الاجتماعي
          </h4>
          <div className="flex items-center gap-6 justify-center md:justify-end">
            {Object.entries(settings.social_links || {}).map(([key, link]) =>
              link ? (
                <a
                  key={key}
                  href={String(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300 ${getColorClass(
                    key
                  )}`}
                >
                  {socialIcons[key] || <span>{key}</span>}
                </a>
              ) : null
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
