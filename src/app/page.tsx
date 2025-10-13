"use client";
import React from "react";
import {
  HeroSection,
  StorySection,
  TimelineSection,
  CoursesSection,
  InstructorsSection,
  FacilitiesSection,
  TestimonialsSection,
  ContactSection,
} from "../components/sections";
import Footer from "../components/layout/main/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StorySection />
      <TimelineSection />
      <CoursesSection />
      <InstructorsSection />
      <FacilitiesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
