"use client";
import React from "react";
import {
  HeroSection,
  StorySection,
  TimelineSection,
  InstructorsSection,
  FacilitiesSection,
  TestimonialsSection,
  CoursesSection,
  EventsSection,
  ContactSection,
} from "../components/sections";
import Footer from "../components/layout/main/Footer";
import ExperienceSections from "@/components/sections/experience/experienceSections";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <section id="hero">
        <HeroSection />
      </section>
      <StorySection />
      <TimelineSection />
      <InstructorsSection />
      <FacilitiesSection />
      <ExperienceSections />
      <section id="events">
        <EventsSection />
      </section>
      <section id="courses">
        <CoursesSection />
      </section>
      <TestimonialsSection />
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
