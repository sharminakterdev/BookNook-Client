
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    subtitle: "DISCOVER YOUR NEXT STORY",
    title: "Every Book Opens a New World",
    description:
      "Explore thousands of amazing books and discover stories that inspire, educate and entertain.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1800",
  },
  {
    subtitle: "A WORLD OF KNOWLEDGE",
    title: "Read More. Dream Bigger.",
    description:
      "From timeless classics to modern masterpieces, find the perfect book for every moment.",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1800",
  },
  {
    subtitle: "YOUR NEXT FAVORITE BOOK",
    title: "Stories Worth Sharing",
    description:
      "Build your personal collection and let every page take you somewhere extraordinary.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1800",
  },
];

export default function HeroSlider() {
  return (
    <section className="book-hero">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="book-hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="book-hero-slide"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="book-hero-overlay">
                <div className="book-hero-content">
                  <span className="book-hero-subtitle">
                    {slide.subtitle}
                  </span>

                  <h1>{slide.title}</h1>

                  <p>{slide.description}</p>

                  <Link href="/books" className="book-hero-button">
                    Browse Books
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}


