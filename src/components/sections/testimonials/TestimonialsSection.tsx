"use client";
import React from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { FaStar } from "react-icons/fa";
import { testimonialsData } from "../../../constants/sectionsData";

const TestimonialsSection = () => {
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation();

  return (
    <section
      ref={testimonialsRef}
      className={`py-32 bg-gradient-to-br from-dark-50 to-dark-100 transition-all duration-1000 ${
        testimonialsVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            <FaStar className="text-lg" />
            Cảm Nhận
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-dark-800 mb-6">
            Học Viên Nói Gì Về Chúng Tôi
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto font-medium">
            Những chia sẻ chân thực từ các học viên đã thành công với chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass rounded-2xl p-8 hover-glow transition-all duration-500 hover:-translate-y-3 hover:scale-105"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-dark-700 mb-6 italic font-medium">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-black text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-dark-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-dark-600 text-sm font-medium">
                    {testimonial.age}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
