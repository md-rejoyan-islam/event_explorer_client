export interface EVENT_TYPE {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  status: "DRAFT" | "PUBLISHED";
  additional_info: string[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
  organizer: USER_TYPE;
  isEnrolled?: boolean;
  totalEnrolled: number;
}

export interface USER_TYPE {
  id: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  role: "USER" | "ADMIN";
  events: EVENT_TYPE[];
  createdAt: string;
  updatedAt: string;
}

export interface SessionType {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: number;
}

export interface REGISTER_TYPE {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}

export interface LOGIN_TYPE {
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface ENROLLED_EVENT {
  id: string;
  event: Event;
  eventId: string;
  user: USER_TYPE;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
