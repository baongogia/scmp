"use client";

import { Sidebar } from "@/components/layout/sidebar";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex bg-white">
        <Sidebar userRole="INSTRUCTOR" />
        <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
