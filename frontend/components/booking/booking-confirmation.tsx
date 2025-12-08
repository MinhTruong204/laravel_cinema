"use client"

import { Check } from "lucide-react"

interface BookingConfirmationProps {
  movie: {
    title: string
    duration: string
  }
  cinema: string
  booking: {
    seats: number[]
    showtime: string
    price: number
  }
  onComplete: () => void
}

export default function BookingConfirmation({ movie, cinema, booking, onComplete }: BookingConfirmationProps) {
  const getSeatLabel = (index: number) => {
    const row = Math.floor(index / 10)
    const col = index % 10
    return `${String.fromCharCode(65 + row)}${col + 1}`
  }

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
          <Check size={40} className="text-primary" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Đặt vé thành công!</h3>
        <p className="text-muted-foreground">Vui lòng kiểm tra email của bạn để nhận xác nhận</p>
      </div>

      {/* Booking Details */}
      <div className="bg-muted p-4 rounded-lg space-y-3 text-left">
        <div>
          <p className="text-sm text-muted-foreground">Phim</p>
          <p className="font-semibold text-foreground">{movie.title}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Rạp chiếu</p>
          <p className="font-semibold text-foreground">{cinema}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Suất chiếu</p>
            <p className="font-semibold text-foreground">{booking.showtime}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Số ghế</p>
            <p className="font-semibold text-foreground">{booking.seats.map((s) => getSeatLabel(s)).join(", ")}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Tổng tiền</p>
          <p className="font-bold text-lg text-primary">{booking.price.toLocaleString("vi-VN")} VNĐ</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <button
          onClick={onComplete}
          className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition"
        >
          Hoàn tất
        </button>
        <button
          onClick={onComplete}
          className="w-full py-3 border border-border text-foreground font-bold rounded-lg hover:bg-muted transition"
        >
          Tiếp tục xem phim khác
        </button>
      </div>
    </div>
  )
}
