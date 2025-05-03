"use client";
import React, { useState } from "react";

const companyInfo = {
  phone: "+86-755-81491786/81491789",
  fax: "+86-755-33855909",
  email: "2733924602@qq.com",
  qq: "2733924602",
  address: "东莞市樟木头镇樟深大道南 2318 号三楼",
};

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!form.name.trim() || !form.contact.trim() || !form.message.trim()) {
      setError("请完整填写所有必填项");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", contact: "", message: "" });
      } else if (res.status === 429) {
        setError("提交过于频繁，请稍后再试");
      } else {
        setError("提交失败，请稍后重试");
      }
    } catch {
      setError("网络异常，请检查您的连接");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <section className="mb-10">
        <h1
          className="text-3xl font-bold text-brand mb-4"
          tabIndex={0}
          aria-label="联系我们"
        >
          联系我们
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand">电话：</span>
              <span tabIndex={0} aria-label="联系电话">
                {companyInfo.phone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand">传真：</span>
              <span tabIndex={0} aria-label="传真">
                {companyInfo.fax}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand">邮箱：</span>
              <a
                href={`mailto:${companyInfo.email}`}
                className="underline text-brand"
                tabIndex={0}
                aria-label="邮箱"
              >
                {companyInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand">QQ：</span>
              <span tabIndex={0} aria-label="QQ">
                {companyInfo.qq}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand">地址：</span>
              <span tabIndex={0} aria-label="公司地址">
                {companyInfo.address}
              </span>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow h-48 sm:h-full">
            <iframe
              title="公司地图"
              src="https://ditu.amap.com/place/B0FFG0QK8A"
              className="w-full h-full min-h-[180px] border-0"
              aria-label="公司地图"
              tabIndex={0}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      <section>
        <h2
          className="text-2xl font-semibold text-brand mb-3"
          tabIndex={0}
          aria-label="在线留言"
        >
          在线留言
        </h2>
        <form
          className="bg-white rounded shadow p-6 flex flex-col gap-4 max-w-xl"
          onSubmit={handleSubmit}
          aria-label="在线留言表单"
        >
          <label className="flex flex-col gap-1" htmlFor="name">
            <span className="font-medium text-gray-700">
              姓名 <span className="text-red-500">*</span>
            </span>
            <input
              id="name"
              name="name"
              type="text"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              value={form.name}
              onChange={handleChange}
              required
              aria-label="姓名"
              tabIndex={0}
              autoComplete="name"
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="contact">
            <span className="font-medium text-gray-700">
              联系方式 <span className="text-red-500">*</span>
            </span>
            <input
              id="contact"
              name="contact"
              type="text"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              value={form.contact}
              onChange={handleChange}
              required
              aria-label="联系方式"
              tabIndex={0}
              autoComplete="tel"
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="message">
            <span className="font-medium text-gray-700">
              留言内容 <span className="text-red-500">*</span>
            </span>
            <textarea
              id="message"
              name="message"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand min-h-[80px]"
              value={form.message}
              onChange={handleChange}
              required
              aria-label="留言内容"
              tabIndex={0}
            />
          </label>
          {error && (
            <div className="text-red-600 text-sm" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 text-sm" role="status">
              留言提交成功！我们会尽快与您联系。
            </div>
          )}
          <button
            type="submit"
            className="bg-brand text-white rounded px-6 py-2 font-semibold hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand mt-2 disabled:opacity-60"
            disabled={loading}
            aria-label="提交留言"
            tabIndex={0}
          >
            {loading ? "提交中..." : "提交留言"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
