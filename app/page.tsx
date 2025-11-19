"use client";

import Header from "@/components/common/header";
import Hero from "@/components/slider/hero";
import QuickBooking from "@/components/booking/quick-booking";
import MovieGrid from "@/components/movie_grid/movie-grid";
import Promotions from "@/components/promotion/promotions";
import Newsletter from "@/components/signup/newsletter";
import Footer from "@/components/common/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <QuickBooking />
      <MovieGrid />
      <Promotions />
      <Newsletter />
      <Footer />
    </div>
  );
}
