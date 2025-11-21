"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import MovieModal from "@/components/modal/movie-modal";

export const movies = [
  {
    id: 1,
    title: "Trái Tim Quê Quán",
    rating: 7.1,
    image: "/vietnamese-movie-poster-drama.jpg",
    badge: "T13",
    genre: "Drama",
    duration: "120 min",
    director: "Nguyễn Văn A",
    description: "Một câu chuyện cảm động về tình yêu và gia đình ở miền quê.",
    releaseDate: "2024-11-15",
  },
  {
    id: 2,
    title: "Quái Thú Về Hình: Vùng Đất Chết",
    rating: 9.2,
    image: "/monster-movie-poster-action.jpg",
    badge: "T16",
    genre: "Action",
    duration: "135 min",
    director: "Trần Đạo Vương",
    description: "Hành động kịch tính với những quái thú đáng sợ.",
    releaseDate: "2024-11-08",
  },
  {
    id: 3,
    title: "Thái Chiều Tây",
    rating: 7.2,
    image: "/thai-movie-poster-horror.jpg",
    badge: "T18",
    genre: "Horror",
    duration: "110 min",
    director: "Vũ Thị B",
    description: "Phim kinh dị độc lập từ Thái Lan.",
    releaseDate: "2024-11-22",
  },
  {
    id: 4,
    title: "Tình Người Duyên Ma 2025",
    rating: 7.4,
    image: "/fantasy-movie-poster-romance.jpg",
    badge: "T13",
    genre: "Romance",
    duration: "125 min",
    director: "Phạm C",
    description: "Tình yêu kỳ ảo giữa người và ma.",
    releaseDate: "2024-11-29",
  },
  {
    id: 5,
    title: "Mộ Đom Đóm",
    rating: 9.0,
    image: "/animated-movie-poster.png",
    badge: "T13",
    genre: "Animation",
    duration: "100 min",
    director: "Phan D",
    description: "Phim hoạt hình cảm động về tình bạn.",
    releaseDate: "2024-11-01",
  },
  {
    id: 6,
    title: "Phá Đảm: Sinh Nhật Mẹ",
    rating: 7.8,
    image: "/comedy-movie-poster.png",
    badge: "T18",
    genre: "Comedy",
    duration: "115 min",
    director: "Lê E",
    description: "Phim hài hước về một bữa tiệc sinh nhật.",
    releaseDate: "2024-11-05",
  },
  {
    id: 7,
    title: "Cực Vàng Của Ngoài",
    rating: 8.3,
    image: "/drama-movie-poster.png",
    badge: "T16",
    genre: "Drama",
    duration: "140 min",
    director: "Võ F",
    description: "Chuyên tâm sâu sắc về cuộc sống.",
    releaseDate: "2024-10-25",
  },
  {
    id: 8,
    title: "Cái Má",
    rating: 7.0,
    image: "/horror-movie-poster.png",
    badge: "T18",
    genre: "Horror",
    duration: "105 min",
    director: "Hoàng G",
    description: "Kinh dị tâm lý về mẹ và con.",
    releaseDate: "2024-11-12",
  },
  // START: Phim ID 9-16 đã được chuyển sang năm 2026 để thành "Sắp chiếu"
  {
    id: 9,
    title: "G-Dragon In Cinema: Übermensch",
    rating: 8.7,
    image: "/movie-poster-9.jpg",
    badge: "T13",
    genre: "Documentary",
    duration: "130 min",
    director: "Park Chan-wook",
    description: "Tài liệu về hành trình âm nhạc của G-Dragon.",
    releaseDate: "2026-01-10",
  },
  {
    id: 10,
    title: "Núi Tế Vong",
    rating: 8.7,
    image: "/movie-poster-10.jpg",
    badge: "T16",
    genre: "Horror",
    duration: "118 min",
    director: "Bong Joon-ho",
    description: "Bí ẩn tả vong trên núi cao.",
    releaseDate: "2026-01-15",
  },
  {
    id: 11,
    title: "Truy Tìm Long Diễn Hương",
    rating: 8.6,
    image: "/movie-poster-10.jpg",
    badge: "T16",
    genre: "Adventure",
    duration: "145 min",
    director: "Denis Villeneuve",
    description: "Cuộc phiêu lưu tìm kiếm kho báu huyền thoại.",
    releaseDate: "2026-01-20",
  },
  {
    id: 12,
    title: "Không Bông Tuyết Nào Trong Sạch",
    rating: 8.7,
    image: "/movie-poster-10.jpg",
    badge: "T16",
    genre: "Drama",
    duration: "142 min",
    director: "Hirokazu Koreeda",
    description: "Câu chuyện cảm động về sự trong sáng.",
    releaseDate: "2026-01-25",
  },
  {
    id: 13,
    title: "Sự Thầy Dạy Sợi Lây",
    rating: 9.6,
    image: "/movie-poster-10.jpg",
    badge: "T16",
    genre: "Comedy",
    duration: "128 min",
    director: "Taika Waititi",
    description: "Hài hước và ấm áp từ một thầy dạy đặc biệt.",
    releaseDate: "2026-02-01",
  },
  {
    id: 14,
    title: "Trùn Chay Thái",
    rating: 8.7,
    image: "/movie-poster-10.jpg",
    badge: "T18",
    genre: "Action",
    duration: "138 min",
    director: "John Woo",
    description: "Hành động kịch tính từ Thái Lan.",
    releaseDate: "2026-02-05",
  },
  {
    id: 15,
    title: "Tái Khởi Chiến",
    rating: 9.4,
    image: "/movie-poster-10.jpg",
    badge: "T13",
    genre: "Fantasy",
    duration: "156 min",
    director: "Peter Jackson",
    description: "Cuộc chiến tái bắt đầu trong thế giới kỳ ảo.",
    releaseDate: "2026-02-10",
  },
  {
    id: 16,
    title: "Les Choses de la Vie",
    rating: 8.7,
    image: "/movie-poster-10.jpg",
    badge: "T16",
    genre: "Drama",
    duration: "134 min",
    director: "Claude Sautet",
    description: "Những điều tế nhị của cuộc sống.",
    releaseDate: "2026-02-15",
  },
  // END: Phim ID 9-16 đã được chuyển sang năm 2026
];

export default function MovieGrid() {
  const [selectedTab, setSelectedTab] = useState<"showing" | "upcoming">(
    "showing"
  );
  const [selectedMovie, setSelectedMovie] = useState<(typeof movies)[0] | null>(
    null
  );
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredMovies = movies.filter((movie) => {
    const releaseDate = new Date(movie.releaseDate);
    const today = new Date();
    if (selectedTab === "showing") {
      // Logic: Ngày phát hành <= Ngày hiện tại
      return releaseDate <= today;
    } else {
      // Logic: Ngày phát hành > Ngày hiện tại
      return releaseDate > today;
    }
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <>
      <section
        id="movies"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              PHIM
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTab("showing")}
                className={`px-4 py-2 border-b-2 font-semibold transition ${
                  selectedTab === "showing"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Đang chiếu
              </button>
              <button
                onClick={() => setSelectedTab("upcoming")}
                className={`px-4 py-2 border-b-2 font-semibold transition ${
                  selectedTab === "upcoming"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Sắp chiếu
              </button>
            </div>
          </div>
          <button className="px-6 py-2 border border-primary text-primary hover:bg-primary/10 rounded-lg transition">
            Xem thêm
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group cursor-pointer transform hover:scale-105 transition duration-300"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded font-bold text-sm">
                  {movie.badge}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(movie.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full transition"
                >
                  <Star
                    size={20}
                    className={
                      favorites.includes(movie.id)
                        ? "fill-primary text-primary"
                        : "text-white"
                    }
                  />
                </button>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button
                    onClick={() => setSelectedMovie(movie)}
                    className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90"
                  >
                    Mua vé
                  </button>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">
                {movie.title}
              </h3>
              <div className="flex items-center gap-1">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(movie.rating / 2)
                          ? "fill-primary"
                          : "opacity-30"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  {movie.rating}
                </span>
              </div>
              {selectedTab === "upcoming" && (
                <button
                  onClick={() => setSelectedMovie(movie)}
                  className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition"
                >
                  Đặt vé sớm
                </button>
              )}
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Không có phim nào để hiển thị.
            </p>
          </div>
        )}
      </section>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
