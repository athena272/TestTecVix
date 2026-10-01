export interface IUserResponse {
  idUser: string;
  idBrandMaster: 1;
  createdAt: string | Date;
  deletedAt: string | Date | null;
  email: string | null;
  isActive: boolean;
  lastLoginDate: string | Date;
  profileImgUrl: string | null;
  role: "admin" | "manager" | "member";
  socketId: null | string;
  updatedAt: string | Date;
  username: string;
}

export interface IPincodeInfos {
  expiredPinCodeSeconds: number;
  pinCode: string;
  socketId: string | null;
  updatedAt: Date | string;
}

export interface IUserBasicInfo {
  fullName?: string | null;
  name?: string | null;
  username?: string | null;
  idUser?: string | null;
  idBrandMaster?: number | null;
}

export interface IUserFromApi {
  idUser: string;
  username: string;
  email: string | null;
  profileImgUrl: string | null;
  role: "admin" | "manager" | "member";
  isActive: boolean;
  lastLoginDate: string | Date | null;
  idBrandMaster: number | null;
  fullName?: string | null;
  phone?: string | null;
  position?: string | null;
  department?: string | null;
  hiringDate?: string | Date | null;
  brandMaster?: { brandName: string; brandLogo?: string | null } | null;
}

export interface ICreateUserPayload {
  username: string;
  password: string;
  email: string;
  role?: "admin" | "manager" | "member";
  idBrandMaster?: number | null;
  isActive?: boolean;
  fullName?: string | null;
  phone?: string | null;
  position?: string | null;
  department?: string | null;
  hiringDate?: string | Date | null;
}

export interface IUpdateUserPayload {
  username?: string;
  password?: string;
  email?: string;
  role?: "admin" | "manager" | "member";
  idBrandMaster?: number | null;
  isActive?: boolean;
  fullName?: string | null;
  phone?: string | null;
  position?: string | null;
  department?: string | null;
  hiringDate?: string | Date | null;
}
