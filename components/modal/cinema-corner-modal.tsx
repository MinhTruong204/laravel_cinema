"use client"

import { X } from "lucide-react"

interface CinemaCornerModalProps {
  section: string
  onClose: () => void
}

export default function CinemaCornerModal({ section, onClose }: CinemaCornerModalProps) {
  const genres = [
    { name: "Hành Động", count: 45 },
    { name: "Kinh Dị", count: 23 },
    { name: "Hài Kịch", count: 67 },
    { name: "Tình Cảm", count: 89 },
    { name: "Phiêu Lưu", count: 34 },
    { name: "Khoa Học Viễn Tưởng", count: 28 },
    { name: "Bí Ẩn", count: 19 },
    { name: "Hoạt Hình", count: 52 },
  ]

  const actors = [
    { name: "Tom Cruise", movies: 12 },
    { name: "Leonardo DiCaprio", movies: 15 },
    { name: "Brad Pitt", movies: 18 },
    { name: "Johnny Depp", movies: 22 },
    { name: "Will Smith", movies: 16 },
    { name: "Morgan Freeman", movies: 19 },
    { name: "Meryl Streep", movies: 21 },
    { name: "Angelina Jolie", movies: 14 },
  ]

  const directors = [
    { name: "Steven Spielberg", movies: 28 },
    { name: "Martin Scorsese", movies: 22 },
    { name: "Quentin Tarantino", movies: 10 },
    { name: "Christopher Nolan", movies: 12 },
    { name: "James Cameron", movies: 8 },
    { name: "Ridley Scott", movies: 24 },
    { name: "Denis Villeneuve", movies: 11 },
    { name: "David Fincher", movies: 13 },
  ]

  const reviews = [
    {
      title: "Avatar: Dạo Động",
      author: "Nguyễn Văn A",
      rating: 9.2,
      excerpt: "Một bộ phim siêu phẩm với công nghệ hình ảnh tuyệt vời...",
    },
    {
      title: "Trái Tim Quê Quán",
      author: "Trần Thị B",
      rating: 8.5,
      excerpt: "Câu chuyện cảm xúc về gia đình và quê hương...",
    },
    {
      title: "The Dark Knight",
      author: "Phạm Văn C",
      rating: 9.0,
      excerpt: "Tác phẩm điện ảnh vĩ đại của Christopher Nolan...",
    },
    {
      title: "Inception",
      author: "Hoàng Thị D",
      rating: 8.8,
      excerpt: "Một cuộc hành trình vào thế giới của những giấc mơ...",
    },
  ]

  const blogPosts = [
    { title: "Top 10 phim hay nhất năm 2024", date: "15/11/2024", views: 3400 },
    { title: "Những phim sắp chiếu đáng mong chờ", date: "14/11/2024", views: 2800 },
    { title: "Diễn viên Hollywood nổi tiếng nhất hiện nay", date: "13/11/2024", views: 5200 },
    { title: "Công nghệ âm thanh mới tại Galaxy Cinema", date: "12/11/2024", views: 1900 },
  ]

  const getTitle = () => {
    switch (section) {
      case "genres":
        return "Thể Loại Phim"
      case "actors":
        return "Diễn Viên"
      case "directors":
        return "Đạo Diễn"
      case "reviews":
        return "Bình Luận Phim"
      case "blog":
        return "Blog Điện Ảnh"
      default:
        return "Góc Điện Ảnh"
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">{getTitle()}</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition">
            <X size={24} className="text-foreground" />
          </button>
        </div>

        <div className="p-6">
          {section === "genres" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {genres.map((genre) => (
                <div key={genre.name} className="p-4 bg-muted rounded-lg hover:bg-primary/10 cursor-pointer transition">
                  <p className="font-semibold text-foreground mb-1">{genre.name}</p>
                  <p className="text-sm text-muted-foreground">{genre.count} phim</p>
                </div>
              ))}
            </div>
          )}

          {section === "actors" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {actors.map((actor) => (
                <div
                  key={actor.name}
                  className="p-4 bg-muted rounded-lg hover:bg-primary/10 cursor-pointer transition text-center"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-2"></div>
                  <p className="font-semibold text-foreground mb-1">{actor.name}</p>
                  <p className="text-sm text-muted-foreground">{actor.movies} phim</p>
                </div>
              ))}
            </div>
          )}

          {section === "directors" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {directors.map((director) => (
                <div
                  key={director.name}
                  className="p-4 bg-muted rounded-lg hover:bg-primary/10 cursor-pointer transition text-center"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-2"></div>
                  <p className="font-semibold text-foreground mb-1">{director.name}</p>
                  <p className="text-sm text-muted-foreground">{director.movies} phim</p>
                </div>
              ))}
            </div>
          )}

          {section === "reviews" && (
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <div key={idx} className="p-4 bg-muted rounded-lg hover:bg-primary/5 transition cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground flex-1">{review.title}</h3>
                    <span className="text-primary font-bold ml-4">★ {review.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Bởi {review.author}</p>
                  <p className="text-foreground text-sm">{review.excerpt}</p>
                </div>
              ))}
            </div>
          )}

          {section === "blog" && (
            <div className="space-y-4">
              {blogPosts.map((post, idx) => (
                <div key={idx} className="p-4 bg-muted rounded-lg hover:bg-primary/5 transition cursor-pointer">
                  <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.views.toLocaleString()} lượt xem</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
