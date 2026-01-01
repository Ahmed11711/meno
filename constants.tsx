
import React from 'react';
import { Product, CategoryType, Order } from './types';

export const CATEGORIES = [
  { id: CategoryType.ALL, label: 'الكل', icon: 'restaurant_menu' },
  { id: CategoryType.JUICES, label: 'العصيرات', icon: 'water_drop' },
  { id: CategoryType.FRESH, label: 'العصيرات الطازجة', icon: 'nutrition' },
  { id: CategoryType.SHISHA, label: 'الأراجيل', icon: 'local_fire_department' },
  { id: CategoryType.HOT, label: 'مشروبات ساخنة', icon: 'local_cafe' },
  { id: CategoryType.SOFT, label: 'مشروبات غازية', icon: 'bubble_chart' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'مانجا طازج',
    description: 'عصير مانجا طبيعي 100%، غني ومكثف، محضر يومياً من أفضل أنواع المانجا المصرية.',
    price: 15.0,
    image: 'https://images.unsplash.com/photo-1546173159-315724a9369b?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.FRESH,
    rating: 4.8,
    isBestSeller: true,
    status: 'available',
    metadata: { prepTime: '15 دقيقة' }
  },
  {
    id: '2',
    name: 'موهيتو فراولة',
    description: 'مزيج منعش من الفراولة الطازجة والنعناع والليمون مع الثلج المجروش.',
    price: 18.0,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.JUICES,
    isNew: true,
    status: 'available',
    metadata: { calories: 75 }
  },
  {
    id: '3',
    name: 'شيشة تفاحتين',
    description: 'النكهة الكلاسيكية الأصلية، تبغ فاخر محضر بعناية لأفضل تجربة.',
    price: 45.0,
    image: 'https://images.unsplash.com/photo-1516053303387-949e2954840d?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.SHISHA,
    isBestSeller: true,
    status: 'available',
    metadata: { origin: 'الفاخر' }
  },
  {
    id: '4',
    name: 'أفوكادو بالعسل',
    description: 'سموذي الأفوكادو الكريمي مع المكسرات والعسل الطبيعي.',
    price: 22.0,
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.FRESH,
    status: 'available',
    metadata: { prepTime: '10 دقائق' }
  },
  {
    id: '5',
    name: 'بلو لاجون',
    description: 'مشروب غازي أزرق بنكهة الحمضيات الاستوائية.',
    price: 20.0,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.SOFT,
    status: 'available',
    metadata: { calories: 120 }
  },
  {
    id: '6',
    name: 'كابتشينو',
    description: 'قهوة غنية بالكريمة مع رغوة حليب كثيفة.',
    price: 14.0,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.HOT,
    status: 'available',
    metadata: { prepTime: '5 دقائق' }
  }
];

export const MOCK_ORDERS: Order[] = [
  { id: '1024', customerName: 'أحمد محمد', total: 45.0, status: 'preparing', time: 'منذ 5 د' },
  { id: '1023', customerName: 'سارة علي', total: 72.5, status: 'completed', time: 'منذ 15 د' },
  { id: '1022', customerName: 'طاولة 4', total: 120.0, status: 'pending', time: 'منذ 22 د' },
  { id: '1021', customerName: 'خالد عمر', total: 35.0, status: 'completed', time: 'منذ 45 د' },
];
