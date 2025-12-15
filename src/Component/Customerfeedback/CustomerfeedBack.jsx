import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import client1 from "../../assets/client1.jpg";
import client2 from "../../assets/client2.jpg";
import client3 from "../../assets/client3.jpg";
import client4 from "../../assets/client4.jpg";

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

const CustomerfeedBack = () => {
  return (
    <section className="my-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold mb-4 text-pink-500">
          Customer Feedback
        </h3>
        <p className="text-gray-400 mb-12">
          Hear what our customers say about their experience.
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
        >
          {slides.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="bg-pink-50 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                <img
                  src={img}
                  alt="client"
                  className="w-24 h-24 rounded-full object-cover border-2 border-pink-300 mb-4"
                />
                <p className="text-gray-700 italic mb-2">
                  {feedbacks[index]}
                </p>
                <h4 className="text-pink-500 font-semibold">
                  {names[index]}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerfeedBack;
