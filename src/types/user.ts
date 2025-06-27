// export interface User {
//   id: string;
//   name?: string;
//   full_name: string;
//   email: string;
//   avatar_url?: string;
//   profile_picture_url?: string;
//   role?: "farmer" | "buyer";
//   picture?: string;
//   uuid?: string;
//   verified?: string;
//   w3a_token?: string;
// }

export type REC = Record<string, any>;
export interface User extends REC {
  id: number;
  uuid?: string;
  email: string;
  password: string;
  roles?: string[];
  verified?: string;
  w3a_token?: string;
  migrate_email?: string;
  auth_providers?: AuthProviderProps[];
  provider_id?: string;
  refresh?: boolean;
  media?: MediaProps[];
}

export interface AuthProviderProps {
  uuid: string;
  user_id: number;
  provider: string;
  verifier_id: string;
  public_key: string;
  profile_image: string;
  aggregate_verifier: string;
  created_at: string;
  banned: boolean;
  linked: boolean;
  isMobile: boolean;
  address: string;
}

export interface MediaProps {
  uuid: string;
  service_id: string;
  deleted?: boolean;
}

export interface UserPreferences {
  locale: string;
  theme: string;
}
