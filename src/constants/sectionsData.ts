import {
  FaSwimmer,
  FaUserGraduate,
  FaTrophy,
  FaShieldAlt,
  FaChalkboardTeacher,
  FaMedal,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaStar,
  FaWater,
  FaThermometerHalf,
  FaTools,
  FaShower,
} from "react-icons/fa";
import {
  Course,
  Instructor,
  Testimonial,
  Facility,
  ContactInfo,
} from "../types/sections";

export const coursesData: Course[] = [
  {
    id: "basic",
    title: "Bơi Cơ Bản",
    description:
      "Dành cho người mới bắt đầu, học các kỹ thuật bơi cơ bản và an toàn dưới nước.",
    price: "2.500.000đ",
    features: [
      "Học bơi ếch, bơi sải",
      "Kỹ thuật thở dưới nước",
      "An toàn dưới nước",
    ],
    icon: FaSwimmer,
    color: "primary",
  },
  {
    id: "advanced",
    title: "Bơi Nâng Cao",
    description:
      "Nâng cao kỹ thuật bơi, học thêm các kiểu bơi phức tạp và tăng cường thể lực.",
    price: "3.500.000đ",
    features: [
      "Bơi bướm, bơi ngửa",
      "Kỹ thuật xuất phát",
      "Tăng cường thể lực",
    ],
    icon: FaWater,
    color: "ocean",
  },
  {
    id: "competition",
    title: "Bơi Thi Đấu",
    description:
      "Đào tạo chuyên sâu cho các vận động viên thi đấu, chuẩn bị cho các giải đấu.",
    price: "5.000.000đ",
    features: ["Kỹ thuật thi đấu", "Tâm lý thi đấu", "Chế độ dinh dưỡng"],
    icon: FaTrophy,
    color: "wave",
  },
];

export const instructorsData: Instructor[] = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    role: "Huấn luyện viên trưởng",
    experience: "15 năm kinh nghiệm",
    icon: FaChalkboardTeacher,
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    role: "Chuyên gia bơi bướm",
    experience: "12 năm kinh nghiệm",
    icon: FaUserGraduate,
  },
  {
    id: "3",
    name: "Lê Minh Cường",
    role: "Huấn luyện viên thi đấu",
    experience: "10 năm kinh nghiệm",
    icon: FaTrophy,
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Nguyễn Thị Mai",
    age: "25 tuổi",
    content:
      "Tôi đã học bơi ở đây và rất hài lòng. Huấn luyện viên rất tận tình, phương pháp dạy dễ hiểu.",
    rating: 5,
  },
  {
    id: "2",
    name: "Trần Văn Nam",
    age: "30 tuổi",
    content:
      "Con tôi 6 tuổi đã biết bơi sau 3 tháng học. Cảm ơn các thầy cô rất nhiều!",
    rating: 5,
  },
  {
    id: "3",
    name: "Lê Thị Hoa",
    age: "35 tuổi",
    content:
      "Môi trường học tập rất tốt, an toàn và chuyên nghiệp. Tôi sẽ giới thiệu cho bạn bè.",
    rating: 5,
  },
];

export const facilitiesData: Facility[] = [
  {
    id: "1",
    title: "Hồ Bơi Olympic",
    description: "50m x 25m, đạt tiêu chuẩn quốc tế",
    icon: FaSwimmer,
    color: "primary",
  },
  {
    id: "2",
    title: "Hệ Thống Sưởi",
    description: "Nhiệt độ nước luôn ổn định",
    icon: FaThermometerHalf,
    color: "ocean",
  },
  {
    id: "3",
    title: "Lọc Nước Hiện Đại",
    description: "Hệ thống lọc 24/7",
    icon: FaTools,
    color: "wave",
  },
  {
    id: "4",
    title: "Phòng Thay Đồ",
    description: "Rộng rãi, sạch sẽ",
    icon: FaShower,
    color: "accent",
  },
];

export const contactInfo: ContactInfo = {
  phone: "0901 234 567",
  email: "info@swimcenter.vn",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  workingHours: "6:00 - 22:00 (Hàng ngày)",
};

export const socialLinks = [
  { icon: FaFacebook, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaTwitter, href: "#" },
];

export const courseOptions = [
  { value: "basic", label: "Bơi Cơ Bản" },
  { value: "advanced", label: "Bơi Nâng Cao" },
  { value: "competition", label: "Bơi Thi Đấu" },
];
