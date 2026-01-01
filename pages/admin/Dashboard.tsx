
import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/admin.api';
import { DashboardStats, Order } from '../../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [s, o] = await Promise.all([adminApi.getDashboardStats(), adminApi.getOrders()]);
      setStats(s);
      setOrders(o);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full"><span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span></div>;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-light-text dark:text-white mb-2">نظرة عامة</h1>
          <p className="text-accent dark:text-gray-400">إليك ما يحدث في متجرك اليوم</p>
        </div>
        <div className="flex gap-3">
          <button className="h-10 px-4 bg-white dark:bg-white/5 border border-border-color dark:border-white/10 rounded-xl text-sm font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">calendar_today</span>
            اليوم: {new Date().toLocaleDateString('ar-EG')}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="الإيرادات اليوم" 
          value={`${stats?.revenue.toLocaleString()} SAR`} 
          change={`${stats?.revenueChange}%`} 
          trend="up" 
          icon="payments" 
          color="green"
        />
        <StatCard 
          title="إجمالي الطلبات" 
          value={`${stats?.ordersCount} طلب`} 
          change={`${stats?.ordersChange}%`} 
          trend="up" 
          icon="shopping_bag" 
          color="blue"
        />
        <StatCard 
          title="طلبات معلقة" 
          value={`${stats?.pendingOrders} طلب`} 
          change="انتبه" 
          trend="warning" 
          icon="pending_actions" 
          color="orange"
        />
        <StatCard 
          title="الأعلى مبيعاً" 
          value={stats?.bestSellingProduct || ''} 
          change="الأعلى" 
          trend="info" 
          icon="stars" 
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Orders Table */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl border border-border-color dark:border-white/10 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border-color dark:border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-lg">أحدث الطلبات</h3>
            <button className="text-primary text-xs font-bold hover:underline">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-light-bg dark:bg-white/5 text-accent">
                <tr>
                  <th className="py-4 px-6 font-bold">رقم الطلب</th>
                  <th className="py-4 px-6 font-bold">العميل</th>
                  <th className="py-4 px-6 font-bold">السعر</th>
                  <th className="py-4 px-6 font-bold">الحالة</th>
                  <th className="py-4 px-6 font-bold">الوقت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color dark:divide-white/5">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-light-bg dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-bold">#{order.id}</td>
                    <td className="py-4 px-6">{order.customerName}</td>
                    <td className="py-4 px-6 font-black text-primary">{order.total.toFixed(2)} SAR</td>
                    <td className="py-4 px-6">
                      <span className={`
                        px-3 py-1 rounded-full text-[10px] font-bold
                        ${order.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 
                          order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' : 
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/30'}
                      `}>
                        {order.status === 'completed' ? 'مكتمل' : order.status === 'preparing' ? 'قيد التحضير' : 'جديد'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-accent text-xs">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-dark-card rounded-2xl border border-border-color dark:border-white/10 p-6">
              <h3 className="font-bold text-lg mb-6">الأصناف الأكثر رواجاً</h3>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="size-14 rounded-xl bg-gray-200 dark:bg-white/5 shrink-0 overflow-hidden">
                      <img src={`https://picsum.photos/100/100?random=${i}`} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">شيشة تفاحتين فاخر</p>
                      <p className="text-[10px] text-accent font-bold">145 طلب هذا الأسبوع</p>
                    </div>
                    <span className="text-primary font-bold text-xs">45 SAR</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 rounded-xl border border-primary text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all">
                تحميل تقرير المبيعات
              </button>
           </div>

           <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl shadow-xl shadow-primary/20 text-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 size-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="font-bold text-xl mb-3">إضافة صنف جديد</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">أضف مشروباً جديداً أو نكهة شيشة جديدة إلى القائمة الخاصة بك بسهولة تامة.</p>
              <button className="bg-white text-primary font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
                <span className="material-symbols-outlined text-[18px]">add</span>
                ابدأ الآن
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'warning' | 'info';
  icon: string;
  color: 'green' | 'blue' | 'orange' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon, color }) => {
  const colorMap = {
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  };

  const trendStyles = {
    up: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    down: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    warning: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    info: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-border-color dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-[10px] font-black dir-ltr flex items-center gap-0.5 ${trendStyles[trend]}`}>
          {change}
          {trend === 'up' && <span class="material-symbols-outlined text-[12px]">trending_up</span>}
        </span>
      </div>
      <h3 className="text-accent dark:text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
};

export default Dashboard;
