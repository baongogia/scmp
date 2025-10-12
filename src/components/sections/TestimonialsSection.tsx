"use client";
import React, { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Testimonial {
  id: string;
  name: string;
  age: string;
  course: string;
  rating: number;
  content: string;
  achievement: string;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  const { elementRef: titleRef, fadeInUp } = useScrollAnimation();
  const { elementRef: carouselRef, scaleIn } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);

  fadeInUp(0);
  scaleIn(0.3);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Nguyễn Minh Anh",
      age: "25 tuổi",
      course: "Khóa Nâng Cao",
      rating: 5,
      content:
        "Tôi đã học bơi ở nhiều nơi nhưng chưa nơi nào chuyên nghiệp như ở đây. Các huấn luyện viên rất tận tâm và phương pháp giảng dạy rất khoa học. Chỉ sau 3 tháng, tôi đã có thể bơi được 4 kiểu cơ bản một cách thành thạo.",
      achievement: "Hoàn thành 4 kiểu bơi trong 3 tháng",
      avatar: "/api/placeholder/80/80",
    },
    {
      id: "2",
      name: "Trần Văn Hùng",
      age: "35 tuổi",
      course: "Khóa Cơ Bản",
      rating: 5,
      content:
        "Là người lớn tuổi mới học bơi, tôi rất lo lắng. Nhưng các thầy cô ở đây đã giúp tôi vượt qua nỗi sợ nước và học được bơi một cách tự tin. Môi trường học tập rất an toàn và thân thiện.",
      achievement: "Vượt qua nỗi sợ nước sau 1 tháng",
      avatar: "/api/placeholder/80/80",
    },
    {
      id: "3",
      name: "Lê Thị Mai",
      age: "8 tuổi",
      course: "Khóa Trẻ Em",
      rating: 5,
      content:
        "Con rất thích học bơi ở đây! Các cô giáo rất vui tính và dạy qua nhiều trò chơi thú vị. Bây giờ con đã bơi được rất giỏi và không sợ nước nữa. Con muốn tiếp tục học để trở thành vận động viên bơi lội.",
      achievement: "Từ sợ nước đến yêu thích bơi lội",
      avatar: "/api/placeholder/80/80",
    },
    {
      id: "4",
      name: "Phạm Đức Nam",
      age: "28 tuổi",
      course: "Khóa Chuyên Nghiệp",
      rating: 5,
      content:
        "Tôi đã có nền tảng bơi từ trước nhưng muốn nâng cao kỹ thuật để tham gia thi đấu. Chương trình huấn luyện ở đây rất chuyên sâu, giúp tôi cải thiện đáng kể thành tích và đạt được mục tiêu thi đấu.",
      achievement: "Cải thiện thành tích 30% sau 6 tháng",
      avatar: "/api/placeholder/80/80",
    },
    {
      id: "5",
      name: "Hoàng Thị Lan",
      age: "42 tuổi",
      course: "Khóa Cơ Bản",
      rating: 5,
      content:
        "Tôi học bơi để cải thiện sức khỏe sau khi bác sĩ khuyên. Các huấn luyện viên rất hiểu biết về y học thể thao và đã thiết kế chương trình phù hợp với tình trạng sức khỏe của tôi. Giờ tôi cảm thấy khỏe mạnh hơn rất nhiều.",
      achievement: "Cải thiện sức khỏe và thể lực",
      avatar: "/api/placeholder/80/80",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-ocean-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
            Câu Chuyện Thành Công
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Hàng nghìn học viên đã tin tưởng và đạt được mục tiêu của mình cùng
            chúng tôi. Hãy lắng nghe những chia sẻ chân thật từ họ.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div ref={carouselRef} className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mx-4">
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6 text-yellow-400 mx-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="text-center mb-8">
                      <svg
                        className="w-12 h-12 text-primary-200 mx-auto mb-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-lg md:text-xl text-primary-700 leading-relaxed italic">
                        "{testimonial.content}"
                      </p>
                    </div>

                    {/* Achievement Badge */}
                    <div className="text-center mb-6">
                      <span className="inline-block bg-gradient-to-r from-primary-500 to-ocean-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        🏆 {testimonial.achievement}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-ocean-200 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-primary-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <h4 className="font-bold text-primary-800 text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-primary-600">
                          {testimonial.age} • {testimonial.course}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 text-primary-600 hover:text-primary-800 hover:shadow-xl transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 text-primary-600 hover:text-primary-800 hover:shadow-xl transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary-600 w-8"
                    : "bg-primary-300 hover:bg-primary-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              98%
            </div>
            <div className="text-primary-800 font-medium">Hài Lòng</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-ocean-600 mb-2">
              5000+
            </div>
            <div className="text-primary-800 font-medium">Học Viên</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-wave-600 mb-2">
              4.9/5
            </div>
            <div className="text-primary-800 font-medium">Đánh Giá</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              100%
            </div>
            <div className="text-primary-800 font-medium">Thành Công</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
