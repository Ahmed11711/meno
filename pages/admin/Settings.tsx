import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const API = "https://menuo.zayamrock.com/api";

export default function Settings() {
  const [siteName, setSiteName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [accentColor, setAccentColor] = useState("#22c55e");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    youtube: "",
    tiktok: "",
    instagram: "",
    whatsapp: "",
  });

  const [message, setMessage] = useState(null);

  // ✅ جلب آخر إعداد عند فتح الصفحة
  useEffect(() => {
    axios
      .get(`${API}/settings`)
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          const latest = data[data.length - 1]; // آخر صف
          setSiteName(latest.site_name || "");
          setPrimaryColor(latest.primary_color || "#4f46e5");
          setAccentColor(latest.accent_color || "#22c55e");
          setPreview(latest.logo || null);
          setSocialLinks(
            latest.social_links || {
              facebook: "",
              youtube: "",
              tiktok: "",
              instagram: "",
              whatsapp: "",
            }
          );
        } else {
          // لو مفيش بيانات
          setSiteName("");
          setPrimaryColor("#4f46e5");
          setAccentColor("#22c55e");
          setPreview(null);
          setSocialLinks({
            facebook: "",
            youtube: "",
            tiktok: "",
            instagram: "",
            whatsapp: "",
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSocialChange = (key, value) => {
    setSocialLinks({ ...socialLinks, [key]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("site_name", siteName);
      formData.append("primary_color", primaryColor);
      formData.append("accent_color", accentColor);
      if (logo) formData.append("logo", logo);
      formData.append("social_links", JSON.stringify(socialLinks));

      const res = await axios.post(`${API}/settings`, formData);

      // تحديث الفورم بالبيانات الجديدة
      setSiteName(res.data.site_name);
      setPrimaryColor(res.data.primary_color);
      setAccentColor(res.data.accent_color);
      setPreview(res.data.logo);
      setSocialLinks(res.data.social_links || socialLinks);

      setMessage({ type: "success", text: "تم حفظ الإعدادات ✅" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "حصل خطأ أثناء الحفظ ❌" });
    } finally {
      setLoading(false);
    }
  };

  const icons = {
    facebook: <FaFacebookF size={20} color="#1877F2" />,
    youtube: <FaYoutube size={20} color="#FF0000" />,
    tiktok: <FaTiktok size={20} color="#000000" />,
    instagram: <FaInstagram size={20} color="#E1306C" />,
    whatsapp: <FaWhatsapp size={20} color="#25D366" />,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      {/* رسالة نجاح / خطأ */}
      {message && (
        <div
          className={`p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* General */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border">
        <h2 className="font-bold mb-4">الإعدادات العامة</h2>
        <input
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          className="w-full h-11 rounded-xl border px-4"
          placeholder="اسم الموقع"
        />
      </div>

      {/* Colors */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border">
        <h2 className="font-bold mb-4">ألوان الموقع</h2>
        <div className="flex gap-6">
          <div>
            <label className="text-sm">Primary</label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm">Accent</label>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border">
        <h2 className="font-bold mb-4">لوجو الموقع</h2>
        {preview && <img src={preview} className="h-20 mb-4 rounded" />}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setLogo(file);
            setPreview(URL.createObjectURL(file));
          }}
        />
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border">
        <h2 className="font-bold mb-4">روابط السوشيال ميديا</h2>
        {["facebook", "youtube", "tiktok", "instagram", "whatsapp"].map(
          (key) => (
            <div
              key={key}
              className="flex items-center gap-3 mb-3 border rounded px-3 py-2"
            >
              <span>{icons[key]}</span>
              <input
                type="text"
                value={socialLinks[key]}
                onChange={(e) => handleSocialChange(key, e.target.value)}
                placeholder={`رابط ${key}`}
                className="w-full outline-none"
              />
            </div>
          )
        )}
      </div>

      {/* حفظ */}
      <button
        onClick={handleSave}
        disabled={loading}
        className={`bg-primary text-white px-6 py-3 rounded-xl font-bold ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
      </button>
    </div>
  );
}
