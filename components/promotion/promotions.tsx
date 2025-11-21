export default function Promotions() {
  return (
    <section className="bg-card/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12">KHUYẾN MÃI ĐẶC BIỆT</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary transition">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🎬</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Giảm 30% Vé Xem Phim</h3>
            <p className="text-muted-foreground">Áp dụng cho tất cả các suất chiếu từ thứ 2 đến thứ 5 hàng tuần.</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary transition">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🍿</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Combo Bắp & Nước</h3>
            <p className="text-muted-foreground">Mua 1 combo tặng 1 bộ dụng cụ ăn độc quyền Galaxy Cinema.</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary transition">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Thẻ VIP Năm</h3>
            <p className="text-muted-foreground">Đăng ký thẻ VIP nhận điểm thưởng cộng dồn mỗi lần xem phim.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
