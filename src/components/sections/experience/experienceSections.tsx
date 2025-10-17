import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";
import { FaStar } from "react-icons/fa";
import DomeGallery from "@/components/layout/animation/dome/DomeGallery";
const ExperienceSections = () => {
  const [experienceRef, experienceVisible] = useScrollAnimation();

  return (
    <section
      ref={experienceRef}
      className={`py-16 bg-[#f1f5f9] transition-all duration-1000 ${
        experienceVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
          <FaStar className="text-lg" />
          Trải Nghiệm
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-dark-800 mb-6">
          Trải Nghiệm Thực Tế Của Học Viên
        </h2>

        <p className="text-xl text-dark-600 max-w-3xl mx-auto font-medium">
          Những trải nghiệm thực tế của các học viên đã thành công với chúng tôi
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="rounded-2xl overflow-hidden">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] max-h-[560px]">
            <DomeGallery autoRotate autoRotateSpeedDegPerSec={6} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSections;
