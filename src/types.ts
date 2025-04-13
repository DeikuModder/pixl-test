export interface DecodedUserData {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export interface ProductEvent {
  id: string;
  title: string;
  description: string;
  price: number;
  user_id: string;
  date: string;
  image?: string;
}
