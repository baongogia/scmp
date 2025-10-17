"use client";
import React from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { FaStar } from "react-icons/fa";
import CircularGallery from "@/components/layout/animation/Gallery/CircularGallery";

const EventsSection = () => {
  const [eventsRef, eventsVisible] = useScrollAnimation();
  return (
    <section
      id="events"
      ref={eventsRef}
      className={`py-12 pb-28 bg-[#f1f5f9] relative overflow-hidden transition-all duration-1000 ${
        eventsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="relative z-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            <FaStar className="text-lg" />
            Sự Kiện
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-dark-800 mb-6">
            Sự Kiện Thường Niên
          </h2>

          <p className="text-xl text-dark-600 max-w-3xl mx-auto font-medium">
            Những sự kiện thường niên của chúng tôi
          </p>
        </div>
        <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            bend={3}
            textColor="#000000"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
