"use client";

import type React from "react";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Vui lòng nhập email hợp lệ");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary/20 to-primary/10 py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Theo Dõi Những Phim Mới
        </h2>
        <p className="text-muted-foreground mb-8">
          Đăng ký nhận thông báo về những bộ phim sắp ra mắt, khuyến mãi độc
          quyền và sự kiện đặc biệt.
        </p>

        {isSubmitted ? (
          <div className="flex items-center justify-center gap-2 py-3 px-4 bg-green-500/20 border border-green-500 rounded-lg">
            <CheckCircle size={20} className="text-green-500" />
            <span className="text-green-500 font-semibold">
              Đăng ký thành công! Vui lòng kiểm tra email.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition disabled:opacity-50 whitespace-nowrap"
            >
              {isLoading ? "Đang gửi..." : "Đăng Ký"}
            </button>
          </form>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </section>
  );
}
