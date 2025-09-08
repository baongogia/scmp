import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./index.scss";
import "antd/dist/reset.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/components/provider/NotificationProvider";
import { MainWrapper } from "@/components/layout/MainWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swim Course Instructors - Hệ thống quản lý khóa học bơi",
  description:
    "Hệ thống quản lý khóa học bơi chuyên nghiệp, kết nối học viên với các huấn luyện viên chất lượng cao.",
  keywords: [
    "bơi lội",
    "khóa học bơi",
    "huấn luyện viên",
    "swimming",
    "swim course",
  ],
  authors: [{ name: "Swim Course Team" }],
  openGraph: {
    title: "Swim Course Instructors",
    description: "Hệ thống quản lý khóa học bơi chuyên nghiệp",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <NotificationProvider>
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
