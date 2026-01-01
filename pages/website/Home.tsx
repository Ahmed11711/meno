
import React, { useState, useEffect } from 'react';
import { websiteApi } from '../../services/website.api';
import { Product, CategoryType } from '../../types';
import { CATEGORIES } from '../../constants';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(CategoryType.ALL);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await websiteApi.getProducts(activeCategory);
      setProducts(data);
      setLoading(false);
    };
    fetch();
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Hero Banner */}
      <section className="relative h-[450px] md:h-[550px] mt-6 rounded-[2rem] overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/40 to-dark-bg/70 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=1200" 
          alt="Juice Banner" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
        />
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="mb-8 w-40 opacity-90 drop-shadow-xl animate-fade-in">
             <div className="size-20 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-3xl mx-auto flex items-center justify-center mb-6">
                <span className="material-symbols-outlined !text-[48px] text-primary">local_bar</span>
             </div>
          </div>
          <span className="bg-primary/20 backdrop-blur-md text-primary-light border border-primary/40 px-6 py-2 rounded-full text-xs md:text-sm font-bold text-primary mb-6 uppercase tracking-widest shadow-lg">طازج ومنعش 100%</span>
          <h1 className="text-white text-4xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            قائمة العصائر والمشروبات
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-10 drop-shadow-lg">
            استمتع بأفضل المشروبات الطازجة، الكوكتيلات المميزة، والأراجيل الفاخرة في أجواء راقية ومريحة.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* <button className="h-14 px-10 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all transform hover:-translate-y-1">اطلب الآن</button> */}
            <button className="h-14 px-10 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all">تصفح العروض</button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-[72px] z-30 mt-10 py-4 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md -mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                h-12 px-6 rounded-2xl flex items-center gap-3 whitespace-nowrap transition-all font-bold text-sm border
                ${activeCategory === cat.id 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105' 
                  : 'bg-white dark:bg-white/5 text-accent border-border-color dark:border-white/10 hover:border-primary/50'}
              `}
            >
              <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Section Header */}
      <div className="flex items-center justify-between mt-12 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-10 bg-primary rounded-full shadow-lg shadow-primary/40" />
          <h2 className="text-3xl font-black">العصيرات الأكثر طلباً</h2>
        </div>
        <button className="text-primary font-bold flex items-center gap-1 group">
          عرض الكل
          <span className="material-symbols-outlined rotate-180 group-hover:-translate-x-1 transition-transform">arrow_right_alt</span>
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-200 dark:bg-white/5 animate-pulse rounded-[2rem]" />
          ))
        ) : (
          products.map((product) => (
            <div 
              key={product.id}
              className="group bg-white dark:bg-dark-card rounded-[2rem] border border-border-color dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-dark-bg/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-500 text-[16px] fill-current">star</span>
                  {product.rating || '4.5'}
                </div>
                {product.isNew && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">جديد</div>
                )}
                {product.isBestSeller && (
                  <div className="absolute top-4 right-4 bg-black/80 text-white border border-primary/50 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[16px]">local_fire_department</span>
                    الأكثر مبيعاً
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="flex flex-col items-end">
                    <span className="text-primary font-black text-xl">{product.price.toFixed(2)}</span>
                    <span className="text-[10px] text-accent font-bold">SAR</span>
                  </div>
                </div>
                <p className="text-accent dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">{product.description}</p>
                
                <div className="mt-auto pt-6 border-t border-border-color/50 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-accent dark:text-gray-400 text-xs">
                     <span className="material-symbols-outlined text-[18px]">schedule</span>
                     {product.metadata?.prepTime || product.metadata?.calories + ' سعرة' || '15 دقيقة'}
                  </div>
                   
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Cart Button for Mobile */}
     
    </div>
  );
};

export default Home;
