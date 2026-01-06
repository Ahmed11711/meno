import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { label: "نظرة عامة", icon: "dashboard", path: "/admin" },
    { label: "إدارة القائمة", icon: "restaurant_menu", path: "/admin/menu" },
    { label: "إدارة الطلبات", icon: "shopping_cart", path: "#", badge: 3 },
    { label: "إدارة التصنيفات", icon: "category", path: "#" },
    { label: "الإعدادات", icon: "settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-light-bg dark:bg-dark-bg">
      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 right-0 z-50 w-72 bg-white dark:bg-dark-card border-l border-border-color dark:border-white/10 shadow-xl transition-transform duration-300 transform
        lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }
      `}
      >
        <div className="h-20 flex items-center px-8 border-b border-border-color dark:border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 text-primary bg-primary/10 rounded-xl flex items-center justify-center">
              <span class="material-symbols-outlined !text-[24px]">
                local_bar
              </span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Leszest Cafe</h1>
              <span className="text-[10px] text-accent font-bold uppercase tracking-widest">
                لوحة التحكم
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5"
                    : "text-accent dark:text-gray-400 hover:bg-light-bg dark:hover:bg-white/5 hover:text-primary"
                }
              `}
            >
              <span
                className={`material-symbols-outlined ${
                  location.pathname === item.path ? "fill-current" : ""
                }`}
              >
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
              {item.badge && (
                <span className="mr-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border-color dark:border-white/10">
          <div className="flex items-center gap-3 p-3 bg-light-bg dark:bg-white/5 rounded-xl border border-border-color/50 dark:border-white/5 mb-4">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
              A
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold truncate">مدير النظام</span>
              <span className="text-[10px] text-accent truncate">
                admin@leszest.com
              </span>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl text-sm font-bold transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">logout</span>
            خروج
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-20 bg-white dark:bg-dark-card border-b border-border-color dark:border-white/10 px-6 lg:px-10 flex items-center justify-between z-40">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden size-10 flex items-center justify-center rounded-xl bg-light-bg dark:bg-white/5 text-accent"
          >
            <span class="material-symbols-outlined">menu</span>
          </button>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-accent text-[20px]">
                search
              </span>
              <input
                className="w-full h-10 pr-10 pl-4 rounded-xl border-border-color dark:border-white/10 bg-light-bg dark:bg-white/5 text-sm focus:border-primary focus:ring-0 transition-colors"
                placeholder="بحث في لوحة التحكم..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative size-10 flex items-center justify-center rounded-xl hover:bg-light-bg dark:hover:bg-white/5 text-accent">
              <span class="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 left-3 size-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-card"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
