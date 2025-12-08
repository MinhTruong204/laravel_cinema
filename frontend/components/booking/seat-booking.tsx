"use client";

import { useState } from "react";
import { ChevronLeft, Check, Loader2 } from "lucide-react"; // Import thêm Loader2
import api, { initCsrf } from "../../lib/api";

interface SeatBookingProps {
  movie: {
    id: number;
    title: string;
    image: string;
    badge: string;
    duration: string;
    director: string;
  };
  cinema: string;
  onBack: () => void;
  // onConfirm không cần thiết nữa vì ta xử lý trực tiếp ở đây
}

const SHOWTIMES = ["19:00"]; // Để 1 suất khớp với dữ liệu mẫu trong DB
const SEAT_PRICE = 120000;

export default function SeatBooking({
  movie,
  cinema,
  onBack,
}: SeatBookingProps) {
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState<string>("");
  const [conflictSeats, setConflictSeats] = useState<string[]>([]);

  const totalSeats = 80;
  // Đây là các ghế đã bán giả lập (để test giao diện)
  const [bookedSeats, setBookedSeats] = useState<number[]>([
    5, 12, 18, 25, 32, 45, 52, 61, 72,
  ]);

  const toggleSeat = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const getSeatLabel = (index: number) => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    return `${String.fromCharCode(65 + row)}${col + 1}`;
  };

  // --- HÀM GỌI API BACKEND ---
  const handlePayment = async () => {
    if (!selectedShowtime || selectedSeats.length === 0) return;

    try {
      setIsLoading(true);
      setError("");
      setConflictSeats([]);

      const seatIdsMapped = selectedSeats.map((index) => index + 1);
      const payload = {
        user_id: 7,
        showtime_id: 1,
        seat_ids: seatIdsMapped,
      };

      console.log("Gửi API:", payload);
      await initCsrf();
      const response = await api.post("/booking/create", payload);

      if (response.data.payUrl) {
        window.location.href = response.data.payUrl;
      }
    } catch (error: any) {
      console.error("Chi tiết lỗi:", error.response?.data);

      const status = error.response?.status;
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      const conflicts = error.response?.data?.conflicts || [];

      if (status === 409) {
        console.log("Ghế bị conflict:", conflicts);

        // Chuyển đổi ID ghế sang label (ví dụ: [1,2,3] => ['A1','A2','A3'])
        const conflictLabels = conflicts.map((id: number) =>
          getSeatLabel(id - 1)
        );
        setConflictSeats(conflictLabels);

        // Cập nhật danh sách ghế đã bán
        if (Array.isArray(conflicts) && conflicts.length > 0) {
          const conflictIndices = conflicts.map((id: number) => id - 1);
          setBookedSeats((prev) =>
            Array.from(new Set([...prev, ...conflictIndices]))
          );
          // Xóa ghế conflict khỏi danh sách ghế đã chọn
          setSelectedSeats((prev) =>
            prev.filter((i) => !conflictIndices.includes(i))
          );
        }

        setError(
          `Ghế ${conflictLabels.join(
            ", "
          )} đã được chọn bởi người khác. Vui lòng chọn ghế khác.`
        );
      } else if (status === 400) {
        setError(message || "Yêu cầu không hợp lệ");
      } else if (status === 401) {
        setError("Bạn cần đăng nhập để tiếp tục");
      } else {
        setError(message || "Có lỗi khi xử lý đặt vé");
      }

      console.error("Lỗi booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSelectDisabled = !selectedShowtime;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-lg transition"
        >
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <div>
          <h3 className="font-bold text-foreground">{movie.title}</h3>
          <p className="text-sm text-muted-foreground">
            {cinema} • {movie.duration}
          </p>
        </div>
      </div>

      {/* Showtime Selection */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Chọn suất chiếu</h4>
        <div className="flex gap-2">
          {SHOWTIMES.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedShowtime(time)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedShowtime === time
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Seat Selection */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Chọn ghế</h4>

        {/* Screen */}
        <div className="text-center mb-8">
          <div className="inline-block w-full max-w-md h-2 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full mb-2" />
          <p className="text-xs text-muted-foreground">Màn hình</p>
        </div>

        {/* Seat Grid */}
        <div className="flex justify-center overflow-x-auto pb-4">
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
          >
            {Array.from({ length: totalSeats }).map((_, index) => {
              const isBooked = bookedSeats.includes(index);
              const isSelected = selectedSeats.includes(index);

              return (
                <button
                  key={index}
                  onClick={() => toggleSeat(index)}
                  disabled={isBooked || isSelectDisabled}
                  className={`w-8 h-8 rounded text-xs font-bold transition flex items-center justify-center ${
                    isBooked
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-primary/20"
                  }`}
                  title={getSeatLabel(index)}
                >
                  {isSelected ? <Check size={16} /> : getSeatLabel(index)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 justify-center mt-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted rounded" />
            <span className="text-sm text-muted-foreground">Trống</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded" />
            <span className="text-sm text-muted-foreground">Đã chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-400 rounded" />
            <span className="text-sm text-muted-foreground">Đã bán</span>
          </div>
        </div>
      </div>

      {/* Summary and Confirm */}
      <div className="space-y-4 pt-4 border-t border-border">
        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold">Lỗi đặt vé</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {selectedSeats.length > 0 && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Ghế đã chọn:{" "}
              <span className="font-semibold text-foreground">
                {selectedSeats.map((i) => getSeatLabel(i)).join(", ")}
              </span>
            </p>
            <p className="font-bold text-foreground text-lg">
              Tổng tiền:{" "}
              {(selectedSeats.length * SEAT_PRICE).toLocaleString("vi-VN")} VNĐ
            </p>
          </div>
        )}

        {/* Nút thanh toán mới */}
        <button
          onClick={handlePayment}
          disabled={
            !selectedShowtime || selectedSeats.length === 0 || isLoading
          }
          className={`w-full py-3 font-bold rounded-lg transition flex justify-center items-center gap-2 ${
            !selectedShowtime || selectedSeats.length === 0 || isLoading
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-700" // Màu hồng MoMo
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" /> Đang xử lý...
            </>
          ) : (
            "Thanh toán qua MoMo"
          )}
        </button>
      </div>
    </div>
  );
}
