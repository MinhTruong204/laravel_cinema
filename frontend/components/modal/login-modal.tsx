"use client";

import React, { useState } from "react";
import { X, Loader2, Eye, EyeOff } from "lucide-react";
import api, { initCsrf } from "@/lib/api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: any) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^(\+84|0)[0-9]{9,11}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        // === LOGIC ĐĂNG KÝ ===
        if (!fullName.trim()) {
          setError("Vui lòng nhập họ tên");
          setIsLoading(false);
          return;
        }
        if (!validateEmail(email)) {
          setError("Email không hợp lệ");
          setIsLoading(false);
          return;
        }
        if (!validatePhone(phone)) {
          setError("Số điện thoại không hợp lệ (VN)");
          setIsLoading(false);
          return;
        }
        if (password.length < 8) {
          setError("Mật khẩu phải có ít nhất 8 ký tự");
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError("Mật khẩu xác nhận không khớp");
          setIsLoading(false);
          return;
        }

        await initCsrf();
        await api.post("/register", {
          full_name: fullName,
          email,
          phone,
          password,
          password_confirmation: confirmPassword,
        });

        setSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
        setTimeout(() => {
          setFullName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setConfirmPassword("");
          setSuccess("");
          setIsSignUp(false);
        }, 2000);
      } else {
        // === LOGIC ĐĂNG NHẬP ===
        if (!validateEmail(email)) {
          setError("Email không hợp lệ");
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Mật khẩu phải có ít nhất 6 ký tự");
          setIsLoading(false);
          return;
        }

        await initCsrf();
        const response = await api.post("/login", { email, password });

        console.log("👉 API Response:", response);
        const data = response.data;

        // Tìm user ở nhiều vị trí có thể xảy ra trong response
        let userData = data.user || data.data?.user || data.data || null;

        // Fallback: nếu data chính là user (có id và email)
        if (!userData && data.id && data.email) {
          userData = data;
        }

        const token =
          data.token || data.access_token || data.data?.access_token;

        console.log("👉 User tìm thấy:", userData);

        if (userData) {
          localStorage.setItem("user_info", JSON.stringify(userData));
          if (token) localStorage.setItem("access_token", token);

          if (onLoginSuccess) {
            console.log("✅ Gọi onLoginSuccess");
            onLoginSuccess(userData);
          } else {
            console.warn("⚠️ Chưa truyền onLoginSuccess");
          }
        }

        setSuccess("Đăng nhập thành công!");

        setTimeout(() => {
          setEmail("");
          setPassword("");
          setError("");
          setSuccess("");
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      // === XỬ LÝ LỖI ===
      console.error("Lỗi:", err);
      let errorMessage = "Đã xảy ra lỗi không xác định.";

      if (err.response?.data?.errors) {
        const validationErrors = err.response.data.errors;
        const firstErrorKey = Object.keys(validationErrors)[0];
        errorMessage = validationErrors[firstErrorKey][0];
      } else {
        errorMessage =
          err.response?.data?.message ||
          (isSignUp ? "Đăng ký thất bại." : "Sai email hoặc mật khẩu");
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-card bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">
            {isSignUp ? "Đăng Ký" : "Đăng Nhập"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Họ tên
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="0901234567"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                placeholder="••••••••"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm font-semibold">{success}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Đang xử lý...
              </>
            ) : isSignUp ? (
              "Đăng Ký"
            ) : (
              "Đăng Nhập"
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            {isSignUp ? (
              <>
                Đã có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-orange-500 hover:underline font-semibold"
                >
                  Đăng nhập
                </button>
              </>
            ) : (
              <>
                Chưa có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-orange-500 hover:underline font-semibold"
                >
                  Đăng ký ngay
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}