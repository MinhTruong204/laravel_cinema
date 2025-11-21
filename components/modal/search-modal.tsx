"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";
import MovieModal from "@/components/modal/movie-modal";

const movies = [
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
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MovieType {
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

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ id: number; title: string }>>(
    []
  );
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.trim().length === 0) {
      setResults([]);
      return;
    }

    const movieTitles = movies.map((m) => ({ id: m.id, title: m.title }));
    const filtered = movieTitles.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  const handleSelectMovie = (movieId: number) => {
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      setSelectedMovie(movie);
      setQuery("");
      setResults([]);
    }
  };

  if (!isOpen) return null;

  if (selectedMovie) {
    return (
      <MovieModal
        movie={selectedMovie}
        onClose={() => {
          setSelectedMovie(null);
          onClose();
        }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-lg shadow-lg w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Tìm kiếm phim</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Nhập tên phim..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {results.length > 0 ? (
              results.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie.id)}
                  className="w-full text-left px-3 py-2 hover:bg-muted rounded-lg transition text-foreground"
                >
                  {movie.title}
                </button>
              ))
            ) : query ? (
              <p className="text-center text-muted-foreground py-8">
                Không tìm thấy phim nào
              </p>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nhập tên phim để tìm kiếm
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
