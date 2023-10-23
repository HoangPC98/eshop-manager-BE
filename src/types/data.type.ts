import { UserProfile } from "src/database/entities/user_profile.entity";
import { AuthType, BaseRoles, Gender, UserStatus } from "./enum.type";

export type UserT = {
  id?: string;
  uid: string;
  password: string;
  username: string;
  secret: string;
  auth_type: AuthType;
  role: BaseRoles;
  status: UserStatus;
  own_shop?: string;
};

export type ProfileT = {
  uid: string;
  fullname: string;
  email: string;
  dob: Date;
  avatar?: string;
  phone_number?: string;
  gender?: Gender;
  address?: JSON;
}

export type UserProfileT = {
  id?: string;
  uid: string;
  password: string;
  username: string;
  secret: string;
  auth_type: AuthType;
  role: string;
  status: UserStatus;
  own_shop?: string
  profile: ProfileT
}

export type UserPayload = {
  uid: string;
  email: string;
  phone_number: string;
}