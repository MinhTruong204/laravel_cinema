"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const movies = [
  { id: 1, title: "Trái Tim Quê Quán", releaseDate: "2024-11-15" },
  {
    id: 2,
    title: "Quái Thú Về Hình: Vùng Đất Chết",
    releaseDate: "2024-11-08",
  },
  { id: 3, title: "Thái Chiều Tây", releaseDate: "2024-11-22" },
  { id: 4, title: "Tình Người Duyên Ma 2025", releaseDate: "2024-11-29" },
  { id: 5, title: "Mộ Đom Đóm", releaseDate: "2024-11-01" },
  { id: 6, title: "Phá Đảm: Sinh Nhật Mẹ", releaseDate: "2024-11-05" },
  { id: 7, title: "Cực Vàng Của Ngoài", releaseDate: "2024-10-25" },
  { id: 8, title: "Cái Má", releaseDate: "2024-11-12" },
];

const cinemas = [
  { id: 1, name: "Galaxy Cine Hà Nội" },
  { id: 2, name: "Galaxy Cine TP.HCM" },
  { id: 3, name: "Galaxy Cine Đà Nẵng" },
  { id: 4, name: "Galaxy Cine Hải Phòng" },
];

const showtimes = ["09:00", "11:30", "14:00", "16:30", "19:00", "21:30"];

export default function QuickBooking() {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [movieTab, setMovieTab] = useState<"showing" | "upcoming">("showing");

  // State mounted để tránh SSR mismatch
  const [mounted, setMounted] = useState(false);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const arr: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      arr.push(
        d.toLocaleDateString("vi-VN", {
          weekday: "short",
          month: "2-digit",
          day: "2-digit",
        })
      );
    }
    setDates(arr);
  }, []);

  const filteredMovies = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return movies.filter((movie) => {
      const releaseDate = new Date(movie.releaseDate);
      releaseDate.setHours(0, 0, 0, 0);

      if (movieTab === "showing") return releaseDate <= today;
      return releaseDate > today;
    });
  }, [movieTab]);

  const handleSearch = useCallback(() => {
    if (selectedMovie && selectedCinema && selectedDate && selectedShowtime) {
      alert(
        `Tìm kiếm: ${selectedMovie} - ${selectedCinema} - ${selectedDate} - ${selectedShowtime}`
      );
    }
  }, [selectedMovie, selectedCinema, selectedDate, selectedShowtime]);

  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 border-t border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">
          ĐẶT VÉ NHANH
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Movie Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "movie" ? null : "movie")
              }
              className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg flex justify-between items-center text-foreground hover:border-primary transition"
            >
              <span className="text-sm">{selectedMovie || "Chọn phim"}</span>
              <ChevronDown size={18} className="text-muted-foreground" />
            </button>
            {openDropdown === "movie" && mounted && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-primary/30 rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="flex border-b border-primary/20">
                  <button
                    onClick={() => setMovieTab("showing")}
                    className={`flex-1 px-3 py-2 text-sm font-semibold transition ${
                      movieTab === "showing"
                        ? "border-b-2 border-primary text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Đang chiếu
                  </button>
                  <button
                    onClick={() => setMovieTab("upcoming")}
                    className={`flex-1 px-3 py-2 text-sm font-semibold transition ${
                      movieTab === "upcoming"
                        ? "border-b-2 border-primary text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Sắp chiếu
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredMovies.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => {
                        setSelectedMovie(movie.title);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary/10 transition"
                    >
                      {movie.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cinema Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "cinema" ? null : "cinema")
              }
              className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg flex justify-between items-center text-foreground hover:border-primary transition"
            >
              <span className="text-sm">{selectedCinema || "Chọn rạp"}</span>
              <ChevronDown size={18} className="text-muted-foreground" />
            </button>
            {openDropdown === "cinema" && mounted && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-primary/30 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {cinemas.map((cinema) => (
                  <button
                    key={cinema.id}
                    onClick={() => {
                      setSelectedCinema(cinema.name);
                      setOpenDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary/10 transition"
                  >
                    {cinema.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "date" ? null : "date")
              }
              className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg flex justify-between items-center text-foreground hover:border-primary transition"
            >
              <span className="text-sm">{selectedDate || "Chọn ngày"}</span>
              <ChevronDown size={18} className="text-muted-foreground" />
            </button>
            {openDropdown === "date" && mounted && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-primary/30 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {dates.map((date, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDate(date);
                      setOpenDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary/10 transition"
                  >
                    {date}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Showtime Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "showtime" ? null : "showtime")
              }
              className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg flex justify-between items-center text-foreground hover:border-primary transition"
            >
              <span className="text-sm">{selectedShowtime || "Chọn suất"}</span>
              <ChevronDown size={18} className="text-muted-foreground" />
            </button>
            {openDropdown === "showtime" && mounted && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-primary/30 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {showtimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setSelectedShowtime(time);
                      setOpenDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-primary/10 transition"
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            disabled={
              !selectedMovie ||
              !selectedCinema ||
              !selectedDate ||
              !selectedShowtime
            }
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed w-full md:col-span-2 lg:col-span-1"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </section>
  );
}
