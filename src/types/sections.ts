export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  experience: string;
  icon: React.ComponentType<any>;
}

export interface Testimonial {
  id: string;
  name: string;
  age: string;
  content: string;
  rating: number;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
}
