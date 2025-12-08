"use client";

import { useState } from "react";
import { X } from "lucide-react";
import SeatBooking from "@/components/booking/seat-booking";
import BookingConfirmation from "@/components/booking/booking-confirmation";

interface Movie {
  id: number;
  title: string;
  rating: number;
  image: string;
  badge: string;
  genre: string;
  duration: string;
  director: string;
  description: string;
  releaseDate: string;
}

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const CINEMAS = [
  { id: 1, name: "Galaxy Cine Hà Nội" },
  { id: 2, name: "Galaxy Cine TP.HCM" },
  { id: 3, name: "Galaxy Cine Đà Nẵng" },
  { id: 4, name: "Galaxy Cine Hải Phòng" },
];

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [bookingState, setBookingState] = useState<
    "details" | "cinema" | "booking" | "confirmation"
  >("details");
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [bookingData, setBookingData] = useState<{
    seats: number[];
    showtime: string;
    price: number;
    cinema: string;
  } | null>(null);

  const isMovieReleased = () => {
    const releaseDate = new Date(movie.releaseDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return releaseDate <= today;
  };

  const handleStartBooking = () => {
    setBookingState("cinema");
  };

  const handleSelectCinema = (cinemaName: string) => {
    setSelectedCinema(cinemaName);
    setBookingState("booking");
  };

  const handleConfirmBooking = (
    seats: number[],
    showtime: string,
    price: number,
    cinema: string
  ) => {
    setBookingData({ seats, showtime, price, cinema });
    setBookingState("confirmation");
  };

  const handleBackToBooking = () => {
    setBookingState("booking");
  };

  const handleCompleteBooking = () => {
    setBookingState("confirmation");
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {bookingState === "details" && (
          <>
            <div className="relative">
              <img
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {movie.title}
                </h2>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded font-semibold">
                    {movie.badge}
                  </span>
                  <span className="text-foreground">{movie.genre}</span>
                  <span className="text-muted-foreground">
                    {movie.duration}
                  </span>
                  <span className="text-yellow-500 font-bold">
                    {movie.rating}/10
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Đạo diễn</p>
                  <p className="text-foreground font-semibold">
                    {movie.director}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ngày phát hành</p>
                  <p className="text-foreground font-semibold">
                    {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-2">Mô tả</p>
                <p className="text-foreground">{movie.description}</p>
              </div>

              <div className="flex gap-3 pt-4">
                {isMovieReleased() ? (
                  <button
                    onClick={handleStartBooking}
                    className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition"
                  >
                    Mua vé ngay
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 py-3 bg-muted text-muted-foreground font-bold rounded-lg cursor-not-allowed"
                  >
                    Phim chưa phát hành
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-border text-foreground font-bold rounded-lg hover:bg-muted transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </>
        )}

        {bookingState === "cinema" && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Chọn rạp chiếu
              </h3>
              <p className="text-muted-foreground">{movie.title}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CINEMAS.map((cinema) => (
                <button
                  key={cinema.id}
                  onClick={() => handleSelectCinema(cinema.name)}
                  className="p-4 border-2 border-primary/30 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
                >
                  <p className="font-bold text-foreground">{cinema.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chọn để tiếp tục
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setBookingState("details")}
              className="w-full py-3 border border-border text-foreground font-bold rounded-lg hover:bg-muted transition"
            >
              Quay lại
            </button>
          </div>
        )}

        {bookingState === "booking" && (
          <div className="p-6">
            <SeatBooking
              movie={movie}
              cinema={selectedCinema}
              onBack={() => setBookingState("cinema")}
              // onConfirm={handleConfirmBooking}
            />
          </div>
        )}

        {bookingState === "confirmation" && bookingData && (
          <div className="p-6">
            <BookingConfirmation
              movie={movie}
              cinema={bookingData.cinema}
              booking={{
                seats: bookingData.seats,
                showtime: bookingData.showtime,
                price: bookingData.price,
              }}
              onComplete={onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
}
