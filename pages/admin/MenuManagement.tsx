import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://menuo.zayamrock.com/api";

export default function MenuManagement() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  const [catName, setCatName] = useState("");
  const [editCatId, setEditCatId] = useState(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= Categories ================= */

  const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data);
    if (res.data.length) {
      setSelectedCat(res.data[0].id);
      fetchProducts(res.data[0].id);
    }
  };

  const addCategory = async () => {
    if (!catName.trim()) return;
    await axios.post(`${API}/categories`, { name: catName });
    setCatName("");
    fetchCategories();
  };

  const updateCategory = async (id) => {
    await axios.put(`${API}/categories/${id}`, { name: catName });
    setEditCatId(null);
    setCatName("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    if (!confirm("حذف القسم؟")) return;
    await axios.delete(`${API}/categories/${id}`);
    fetchCategories();
  };

  /* ================= Products ================= */

  const fetchProducts = async (id) => {
    setSelectedCat(id);
    const res = await axios.get(`${API}/categories/${id}/products`);
    setProducts(res.data);
  };

  const submitProduct = async () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);
    fd.append("category_id", selectedCat);
    if (form.image) fd.append("image", form.image);

    if (form.id) {
      await axios.post(`${API}/products/${form.id}?_method=PUT`, fd);
    } else {
      await axios.post(`${API}/products`, fd);
    }

    resetProductForm();
    fetchProducts(selectedCat);
  };

  const editProduct = (p) => {
    setForm({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      image: null,
    });
  };

  const deleteProduct = async (id) => {
    if (!confirm("حذف المنتج؟")) return;
    await axios.delete(`${API}/products/${id}`);
    fetchProducts(selectedCat);
  };

  const resetProductForm = () => {
    setForm({ id: null, name: "", price: "", description: "", image: null });
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة القائمة</h1>
        <p className="text-sm text-accent">CRUD كامل للأقسام والمنتجات</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===== Categories ===== */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border">
          <h2 className="font-bold mb-4">📁 الأقسام</h2>

          <input
            className="w-full h-10 px-4 rounded-xl mb-2"
            placeholder="اسم القسم"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />

          {editCatId ? (
            <button
              onClick={() => updateCategory(editCatId)}
              className="w-full h-10 rounded-xl bg-green-500 text-white"
            >
              حفظ التعديل
            </button>
          ) : (
            <button
              onClick={addCategory}
              className="w-full h-10 rounded-xl bg-primary text-white"
            >
              إضافة قسم
            </button>
          )}

          <div className="mt-4 space-y-2">
            {categories.map((c) => (
              <div
                key={c.id}
                className={`flex justify-between items-center px-4 py-2 rounded-xl cursor-pointer
                  ${
                    selectedCat === c.id ? "bg-primary/10" : "hover:bg-light-bg"
                  }
                `}
                onClick={() => fetchProducts(c.id)}
              >
                <span>{c.name}</span>
                <div className="flex gap-2 text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditCatId(c.id);
                      setCatName(c.name);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCategory(c.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Products ===== */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-card p-6 rounded-2xl border">
          <h2 className="font-bold mb-4">🍹 المنتجات</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <input
              placeholder="اسم المنتج"
              className="h-10 px-4 rounded-xl"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="السعر"
              className="h-10 px-4 rounded-xl"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <textarea
            placeholder="الوصف"
            className="w-full p-3 rounded-xl mb-3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="mb-3"
          />

          <button
            onClick={submitProduct}
            className="w-full h-11 rounded-xl bg-primary text-white font-bold"
          >
            {form.id ? "تعديل المنتج" : "إضافة المنتج"}
          </button>

          {/* Products List */}
          <div className="mt-6 space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-light-bg"
              >
                <img
                  src={p.image}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="font-bold text-sm">{p.name}</div>
                  <div className="text-xs text-accent">{p.price} جنيه</div>
                </div>

                <button onClick={() => editProduct(p)}>✏️</button>
                <button onClick={() => deleteProduct(p.id)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
