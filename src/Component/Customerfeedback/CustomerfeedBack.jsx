import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Using placeholder images - replace with your actual imported images
const client1 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";
const client2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop";
const client3 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop";
const client4 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop";

const images = [client1, client2, client3, client4];
const slides = [...images, ...images]; // 🔥 duplicate

const names = [
  "Amina Akther",
  "Rahim Ahmed",
  "Nadia Chowdhury",
  "Imran Hossain",
  "Amina Akther",
  "Rahim Ahmed",
  "Nadia Chowdhury",
  "Imran Hossain",
];

const feedbacks = [
  "Very smooth loan process. Highly recommended!",
  "Professional and fast service. Loved it.",
  "Simple, clean and easy to use platform.",
  "Excellent support and quick approval.",
  "Very smooth loan process. Highly recommended!",
  "Professional and fast service. Loved it.",
  "Simple, clean and easy to use platform.",
  "Excellent support and quick approval.",
];

const CustomerFeedback = () => {
  return (
    <section className="py-20 px-4 ">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block bg-[#0050b2]/10 dark:bg-blue-400/10 text-[#0050b2] dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Customer <span className="text-[#0050b2] dark:text-blue-400">Feedback</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Hear what our customers say about their experience with LoanLink.
        </p>

        <Swiper
          loop={true}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: 50,
            depth: 200,
            modifier: 1,
            scale: 0.8,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="pb-12"
        >
          {slides.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <img
                  src={img}
                  alt={`${names[index]} testimonial`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#0050b2] dark:border-blue-400 mb-4"
                />
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-sm leading-relaxed">
                  "{feedbacks[index]}"
                </p>
                <h4 className="text-[#0050b2] dark:text-blue-400 font-bold text-lg">
                  {names[index]}
                </h4>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current text-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx>{`
          .swiper-pagination-bullet {
            background: #0050b2;
            opacity: 0.5;
          }
          .swiper-pagination-bullet-active {
            opacity: 1;
            background: #0050b2;
          }
          :global(.dark) .swiper-pagination-bullet {
            background: #60a5fa;
          }
          :global(.dark) .swiper-pagination-bullet-active {
            background: #60a5fa;
          }
        `}</style>
      </div>
    </section>
  );
};

export default CustomerFeedback;