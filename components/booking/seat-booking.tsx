"use client"

import { useState } from "react"
import { ChevronLeft, Check } from "lucide-react"

interface SeatBookingProps {
  movie: {
    id: number
    title: string
    image: string
    badge: string
    duration: string
    director: string
  }
  cinema: string
  onBack: () => void
  onConfirm: (seats: number[], showtime: string, price: number, cinema: string) => void
}

const SHOWTIMES = ["10:00", "13:30", "16:00", "19:00", "21:30"]
const SEAT_PRICE = 120000 // VND

export default function SeatBooking({ movie, cinema, onBack, onConfirm }: SeatBookingProps) {
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])

  // Generate seat grid (10 columns x 8 rows)
  const totalSeats = 80
  const bookedSeats = [5, 12, 18, 25, 32, 45, 52, 61, 72] // Simulated booked seats

  const toggleSeat = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return
    setSelectedSeats((prev) =>
      prev.includes(seatNumber) ? prev.filter((s) => s !== seatNumber) : [...prev, seatNumber],
    )
  }

  const handleConfirm = () => {
    if (selectedShowtime && selectedSeats.length > 0) {
      onConfirm(selectedSeats, selectedShowtime, selectedSeats.length * SEAT_PRICE, cinema)
    }
  }

  const getSeatLabel = (index: number) => {
    const row = Math.floor(index / 10)
    const col = index % 10
    return `${String.fromCharCode(65 + row)}${col + 1}`
  }

  const isSelectDisabled = !selectedShowtime

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition">
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
        <div className="grid grid-cols-5 gap-2">
          {SHOWTIMES.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedShowtime(time)}
              className={`py-3 rounded-lg font-semibold transition ${
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
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(10, 1fr)" }}>
            {Array.from({ length: totalSeats }).map((_, index) => {
              const isBooked = bookedSeats.includes(index)
              const isSelected = selectedSeats.includes(index)

              return (
                <button
                  key={index}
                  onClick={() => toggleSeat(index)}
                  disabled={isBooked || isSelectDisabled}
                  className={`w-8 h-8 rounded text-xs font-bold transition ${
                    isBooked
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-primary/20"
                  }`}
                  title={getSeatLabel(index)}
                >
                  {isSelected && <Check size={16} className="mx-auto" />}
                </button>
              )
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
            <div className="w-6 h-6 bg-muted rounded" />
            <span className="text-sm text-muted-foreground">Đã bán</span>
          </div>
        </div>
      </div>

      {/* Summary and Confirm */}
      <div className="space-y-4 pt-4 border-t border-border">
        {selectedSeats.length > 0 && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Ghế đã chọn:{" "}
              <span className="font-semibold text-foreground">
                {selectedSeats.map((i) => getSeatLabel(i)).join(", ")}
              </span>
            </p>
            <p className="font-bold text-foreground">
              Tổng tiền: {(selectedSeats.length * SEAT_PRICE).toLocaleString("vi-VN")} VNĐ
            </p>
          </div>
        )}
        <button
          onClick={handleConfirm}
          disabled={!selectedShowtime || selectedSeats.length === 0}
          className={`w-full py-3 font-bold rounded-lg transition ${
            !selectedShowtime || selectedSeats.length === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          Tiếp tục thanh toán
        </button>
      </div>
    </div>
  )
}
