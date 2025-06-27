export interface User {
  id: string;
  name?: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  profile_picture_url?: string;
  role?: "farmer" | "buyer";
  picture?: string;
  uuid?: string;
  verified?: string;
  w3a_token?: string;
}