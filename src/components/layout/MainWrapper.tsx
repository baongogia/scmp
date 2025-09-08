"use client";

import { usePathname } from "next/navigation";

interface MainWrapperProps {
  children: React.ReactNode;
}

export function MainWrapper({ children }: MainWrapperProps) {
  const pathname = usePathname();

  // Check if we're on instructor pages
  const isInstructorPage = pathname?.startsWith("/instructor");

  // For instructor pages, don't wrap in main tag to avoid double rendering
  // The instructor layout will handle its own container
  if (isInstructorPage) {
    return <>{children}</>;
  }

  // For other pages, use normal main wrapper
  return <main className="flex-1">{children}</main>;
}
