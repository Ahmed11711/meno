import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://menuo.zayamrock.com/api";  




export default function MenuManagement() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  // 🎯 نموذج إضافة قسم
  const [catName, setCatName] = useState("");

  // 🎯 نموذج المنتج
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  // 🔥 أول تحميل
  useEffect(() => {
    fetchCategories();
  }, []);

  // 📌 جلب الأقسام
  const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data);
    if (res.data.length) setSelectedCat(res.data[0].id);
    if (res.data.length) fetchProducts(res.data[0].id);
  };

  // 📌 جلب المنتجات حسب القسم
  const fetchProducts = async (id) => {
    setSelectedCat(id);
    const res = await axios.get(`${API}/categories/${id}/products`);
    setProducts(res.data);
  };

  // ➕ إضافة قسم
  const addCategory = async () => {
    if (!catName.trim()) return alert("ادخل اسم القسم");
    await axios.post(`${API}/categories`, { name: catName });
    setCatName("");
    fetchCategories();
  };

  // ➕ إضافة منتج
  const addProduct = async () => {
    if (!selectedCat) return alert("اختر قسم أولاً");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);
    fd.append("category_id", selectedCat);
    if (form.image) fd.append("image", form.image);

    await axios.post(`${API}/products`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setForm({ name: "", price: "", description: "", image: null });
    fetchProducts(selectedCat);
    alert("تم إضافة المنتج ✨");
  };

  return (
    <div style={{ padding: 20, display: "flex", gap: 40 }}>

      {/* ⭐ إضافة قسم */}
      <div style={{ width: "30%", border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
        <h2>📁 الأقسام</h2>

        <input
          placeholder="اسم القسم"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        />
        <button onClick={addCategory} style={{ marginTop: 10, width: "100%" }}>
          ➕ إضافة قسم
        </button>

        <hr style={{ margin: "20px 0" }} />

        {categories.map((c) => (
          <div
            key={c.id}
            onClick={() => fetchProducts(c.id)}
            style={{
              padding: 10,
              borderRadius: 8,
              cursor: "pointer",
              background: c.id === selectedCat ? "#eee" : "#fff",
              marginBottom: 5,
            }}
          >
            {c.name}
          </div>
        ))}
      </div>

      {/* ⭐ إضافة منتج */}
      <div style={{ width: "70%", border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
        <h2>🍹 إضافة منتج</h2>

        {!selectedCat ? (
          <p>اختر قسم أولاً</p>
        ) : (
          <>
            <input
              placeholder="اسم المنتج"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <input
              placeholder="السعر"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <textarea
              placeholder="الوصف"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <input
              type="file"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              style={{ marginBottom: 10 }}
            />

            <button onClick={addProduct} style={{ width: "100%" }}>
              ➕ إضافة المنتج
            </button>
          </>
        )}

        <hr style={{ margin: "20px 0" }} />

        {/* ⭐ عرض المنتجات داخل القسم */}
        <h3>📦 منتجات القسم</h3>
        {products.length ? (
          products.map((p) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                padding: "10px 0",
                gap: 10,
              }}
            >
              <img
                src={p.image}
                alt=""
                width={60}
                height={60}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <b>{p.name}</b>
                <p>{p.price} ريال</p>
              </div>
            </div>
          ))
        ) : (
          <p>لا يوجد منتجات</p>
        )}
      </div>
    </div>
  );
}
