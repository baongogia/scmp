"use client";
import React, { useEffect, useRef, MouseEvent } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import {
  FaUserPlus,
  FaComments,
  FaClipboardCheck,
  FaRoute,
  FaSwimmer,
  FaChartLine,
  FaCertificate,
} from "react-icons/fa";

const steps = [
  {
    title: "Đăng ký học",
    description:
      "Điền thông tin cơ bản hoặc liên hệ trực tiếp qua hotline/zalo.",
    Icon: FaUserPlus,
  },
  {
    title: "Tư vấn lộ trình",
    description:
      "Chuyên viên gọi tư vấn, xác định mục tiêu và thời gian phù hợp.",
    Icon: FaComments,
  },
  {
    title: "Kiểm tra đầu vào",
    description: "Đánh giá thể lực, kỹ năng và tâm lý nước để xếp lớp.",
    Icon: FaClipboardCheck,
  },
  {
    title: "Thiết kế lộ trình",
    description:
      "Cá nhân hóa giáo án theo mục tiêu: an toàn, kỹ thuật, thi đấu.",
    Icon: FaRoute,
  },
  {
    title: "Đào tạo bài bản",
    description:
      "Huấn luyện 1-1/nhóm nhỏ, công nghệ phản hồi video, bài tập bổ trợ.",
    Icon: FaSwimmer,
  },
  {
    title: "Đánh giá định kỳ",
    description:
      "Theo dõi tiến bộ hằng buổi/tuần, tinh chỉnh kỹ thuật và thể lực.",
    Icon: FaChartLine,
  },
  {
    title: "Hoàn thành khóa học",
    description: "Kiểm tra đầu ra, nhận chứng nhận, tư vấn duy trì/tăng cường.",
    Icon: FaCertificate,
  },
];

const TimelineSection: React.FC = () => {
  const [ref, visible] = useScrollAnimation(0.2);
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-timeline-card]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("revealed");
          } else {
            el.classList.remove("revealed");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    cards.forEach((el) => {
      const side = el.dataset.side;
      if (side === "left") {
        el.classList.add("reveal-left");
      } else {
        el.classList.add("reveal-right");
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax for vertical timeline line
  useEffect(() => {
    const sectionEl = ref.current;
    const lineEl = lineRef.current;
    if (!sectionEl || !lineEl) return;

    const handleScroll = () => {
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const sectionHeight = rect.height || 1;
      const progress = Math.min(
        1,
        Math.max(0, 1 - (rect.top + sectionHeight) / (vh + sectionHeight))
      );
      const offset = (progress - 0.5) * -80;
      lineEl.style.transform = `translateY(${offset}px)`;
      lineEl.style.opacity = String(0.6 + progress * 0.4);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);

  // Hover tilt handlers
  const handleTiltMove = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -6;
    const rotateY = (x / rect.width - 0.5) * 6;
    target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleTiltLeave = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      ref={ref}
      className={`py-32 bg-gradient-to-b from-dark-100 to-dark-200 relative overflow-hidden transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
            Lộ Trình Học
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-dark-800 leading-tight">
            Từ Đăng Ký Đến Hoàn Thành
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-ocean-600">
              Lộ Trình Rõ Ràng, Hiện Đại
            </span>
          </h2>
          <p className="mt-4 text-dark-600 text-lg font-medium">
            Mọi bước đều được tối ưu với phản hồi theo thời gian thực và trải
            nghiệm mượt mà.
          </p>
        </div>

        <div ref={listRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary-500/0 via-primary-500/40 to-primary-500/0 will-change-transform"
          />

          <ul className="space-y-12">
            {steps.map(({ title, description, Icon }, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li
                  key={title}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Card */}
                  <div
                    className={`order-2 md:order-${isLeft ? "1" : "2"} ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div
                      data-timeline-card
                      data-side={isLeft ? "left" : "right"}
                      className="glass rounded-2xl p-6 md:p-8 hover-glow transition-all duration-700 will-change-transform"
                      style={{ transitionDelay: `${index * 80}ms` }}
                      onMouseMove={handleTiltMove}
                      onMouseLeave={handleTiltLeave}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-ocean-500 text-white shadow-xl">
                          <Icon className="text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-dark-800">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}.{" "}
                            {title}
                          </h3>
                          <p className="mt-2 text-dark-600 font-medium">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer to keep alternating two-column layout; dots removed by request */}
                  <div
                    className={`hidden md:block ${
                      isLeft ? "order-2" : "order-1"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
