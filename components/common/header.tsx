"use client";
import { useState, useMemo, useEffect } from "react"; // 👈 THÊM useEffect//import { useState } from "react";
import { Menu, X, Search, User, Heart, ChevronDown } from "lucide-react";
import SearchModal from "@/components/modal/search-modal";
import LoginModal from "@/components/modal/login-modal";
import CinemaCornerModal from "@/components/modal/cinema-corner-modal";
import MovieModal from "@/components/modal/movie-modal";
import { movies } from "@/components/movie_grid/movie-grid";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCinemaCorner, setShowCinemaCorner] = useState(false);
  const [showPhimDropdown, setShowPhimDropdown] = useState(false);
  const [showCinemaDropdown, setShowCinemaDropdown] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState("Galaxy Nguyễn Du");
  const [cinemaCornerSection, setCinemaCornerSection] = useState<string | null>(
    null
  );
  const [selectedMovie, setSelectedMovie] = useState<(typeof movies)[0] | null>(
    null
  );

  const cinemas = [
    "Galaxy Nguyễn Du",
    "Galaxy Sala",
    "Galaxy Tân Bình",
    "Galaxy Kinh Dương Vương",
    "Galaxy Quang Trung",
    "Galaxy Bến Tre",
    "Galaxy Mipec Long Biên",
    "Galaxy Đà Nẵng",
    "Galaxy Cà Mau",
  ];

  const today = useMemo(() => new Date(), []); // 👈 Tạo đối tượng Date chỉ 1 lần

  const showingMovies = useMemo(() => {
    return movies.filter((movie) => {
      const releaseDate = new Date(movie.releaseDate);
      return releaseDate <= today;
    });
  }, [movies, today]);

  const upcomingMovies = useMemo(() => {
    return movies.filter((movie) => {
      const releaseDate = new Date(movie.releaseDate);
      return releaseDate > today;
    });
  }, [movies, today]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  G
                </span>
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:inline">
                Vie Cinema
              </span>
            </div>

            <nav className="hidden md:flex space-x-8 items-center">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-foreground hover:text-primary transition">
                  <span>Phim</span>
                  <ChevronDown size={18} />
                </button>
                <div className="absolute left-0 mt-0 w-[900px] bg-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6 z-50">
                  {/* Phim Đang Chiếu Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-primary mb-4 pb-2 border-l-4 border-primary pl-3">
                      PHIM ĐANG CHIẾU
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {showingMovies.slice(0, 4).map((movie) => (
                        <div
                          key={movie.id}
                          onClick={() => setSelectedMovie(movie)}
                          className="group cursor-pointer"
                        >
                          <div className="relative mb-2 overflow-hidden rounded-lg h-48 bg-muted">
                            <img
                              src={movie.image || "/placeholder.svg"}
                              alt={movie.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition"
                            />
                            <div className="absolute bottom-1 right-1 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
                              {movie.badge}
                            </div>
                          </div>
                          <p className="text-xs font-semibold text-foreground line-clamp-2">
                            {movie.title}
                          </p>
                          <div className="flex text-primary text-xs mt-1">
                            ★ {movie.rating}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phim Sắp Chiếu Section */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4 pb-2 border-l-4 border-primary pl-3">
                      PHIM SẮP CHIẾU
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {upcomingMovies.slice(0, 4).map((movie) => (
                        <div
                          key={movie.id}
                          onClick={() => setSelectedMovie(movie)}
                          className="group cursor-pointer"
                        >
                          <div className="relative mb-2 overflow-hidden rounded-lg h-48 bg-muted">
                            <img
                              src={movie.image || "/placeholder.svg"}
                              alt={movie.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition"
                            />
                            <div className="absolute bottom-1 right-1 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
                              {movie.badge}
                            </div>
                          </div>
                          <p className="text-xs font-semibold text-foreground line-clamp-2">
                            {movie.title}
                          </p>
                          <div className="flex text-primary text-xs mt-1">
                            ★ {movie.rating}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-foreground hover:text-primary transition">
                  <span>Góc Điện Ảnh</span>
                  <ChevronDown size={18} />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                  <button
                    onClick={() => setCinemaCornerSection("genres")}
                    className="w-full text-left px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition"
                  >
                    Thể Loại Phim
                  </button>
                  <button
                    onClick={() => setCinemaCornerSection("actors")}
                    className="w-full text-left px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition"
                  >
                    Diễn Viên
                  </button>
                  <button
                    onClick={() => setCinemaCornerSection("directors")}
                    className="w-full text-left px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition"
                  >
                    Đạo Diễn
                  </button>
                  <button
                    onClick={() => setCinemaCornerSection("reviews")}
                    className="w-full text-left px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition"
                  >
                    Bình Luận Phim
                  </button>
                  <button
                    onClick={() => setCinemaCornerSection("blog")}
                    className="w-full text-left px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition"
                  >
                    Blog Điện Ảnh
                  </button>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-foreground hover:text-primary transition">
                  <span>Rạp/Giá Vé</span>
                  <ChevronDown size={18} />
                </button>
                <div className="absolute left-0 mt-0 w-56 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                  {cinemas.map((cinema) => (
                    <button
                      key={cinema}
                      onClick={() => setSelectedCinema(cinema)}
                      className={`w-full px-4 py-2 text-left transition ${
                        selectedCinema === cinema
                          ? "bg-primary/20 text-primary font-semibold"
                          : "text-foreground hover:bg-muted hover:text-primary"
                      }`}
                    >
                      {cinema}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="#promotions"
                className="text-foreground hover:text-primary transition"
              >
                Khuyến mãi
              </a>
              <a
                href="#events"
                className="text-foreground hover:text-primary transition"
              >
                Sự kiện
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition"
              >
                Liên hệ
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-muted rounded-lg transition"
              >
                <Search size={20} className="text-foreground" />
              </button>
              <button className="hidden sm:flex p-2 hover:bg-muted rounded-lg transition relative">
                <Heart size={20} className="text-foreground" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                <User size={18} />
                <span>Đăng Nhập</span>
              </button>
              <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => setShowPhimDropdown(!showPhimDropdown)}
                className="w-full flex items-center justify-between px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
              >
                <span>Phim</span>
                <ChevronDown
                  size={18}
                  className={`transform transition-transform ${
                    showPhimDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showPhimDropdown && (
                <div className="pl-4 space-y-3 mt-2 pb-3 border-b border-border">
                  <div>
                    <p className="text-xs font-bold text-primary mb-2">
                      PHIM ĐANG CHIẾU
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {showingMovies.slice(0, 4).map((movie) => (
                        <button
                          key={`mobile-showing-${movie.id}`}
                          onClick={() => setSelectedMovie(movie)}
                          className="text-xs text-muted-foreground truncate hover:text-primary transition"
                        >
                          {movie.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary mb-2">
                      PHIM SẮP CHIẾU
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {upcomingMovies.slice(0, 4).map((movie) => (
                        <button
                          key={`mobile-upcoming-${movie.id}`}
                          onClick={() => setSelectedMovie(movie)}
                          className="text-xs text-muted-foreground truncate hover:text-primary transition"
                        >
                          {movie.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowCinemaCorner(!showCinemaCorner)}
                  className="w-full flex items-center justify-between px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
                >
                  <span>Góc Điện Ảnh</span>
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform ${
                      showCinemaCorner ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showCinemaCorner && (
                  <div className="pl-4 space-y-1 mt-1">
                    <button
                      onClick={() => setCinemaCornerSection("genres")}
                      className="w-full text-left block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
                    >
                      Thể Loại Phim
                    </button>
                    <button
                      onClick={() => setCinemaCornerSection("actors")}
                      className="w-full text-left block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
                    >
                      Diễn Viên
                    </button>
                    <button
                      onClick={() => setCinemaCornerSection("directors")}
                      className="w-full text-left block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
                    >
                      Đạo Diễn
                    </button>
                    <button
                      onClick={() => setCinemaCornerSection("reviews")}
                      className="w-full text-left block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
                    >
                      Bình Luận Phim
                    </button>
                    <button
                      onClick={() => setCinemaCornerSection("blog")}
                      className="w-full text-left block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
                    >
                      Blog Điện Ảnh
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowCinemaDropdown(!showCinemaDropdown)}
                className="w-full flex items-center justify-between px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
              >
                <span>Rạp/Giá Vé</span>
                <ChevronDown
                  size={18}
                  className={`transform transition-transform ${
                    showCinemaDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showCinemaDropdown && (
                <div className="pl-4 space-y-1 mt-1 pb-3 border-b border-border">
                  {cinemas.map((cinema) => (
                    <button
                      key={cinema}
                      onClick={() => {
                        setSelectedCinema(cinema);
                        setShowCinemaDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCinema === cinema
                          ? "bg-primary/20 text-primary font-semibold"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {cinema}
                    </button>
                  ))}
                </div>
              )}
              <a
                href="#promotions"
                className="block px-4 py-2 hover:bg-muted rounded-lg transition"
              >
                Khuyến mãi
              </a>
              <a
                href="#events"
                className="block px-4 py-2 hover:bg-muted rounded-lg transition"
              >
                Sự kiện
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 hover:bg-muted rounded-lg transition"
              >
                Liên hệ
              </a>
              <button
                onClick={() => setShowLogin(true)}
                className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                Đăng Nhập
              </button>
            </nav>
          )}
        </div>
      </header>

      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      {cinemaCornerSection && (
        <CinemaCornerModal
          section={cinemaCornerSection}
          onClose={() => setCinemaCornerSection(null)}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
