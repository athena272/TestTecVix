import { Colaborator } from "../stores/useZColaboratorRegister";
import type { IUserFromApi } from "../types/userTypes";

export const formatUsersColaboratorData = (
  data: IUserFromApi[],
): Colaborator[] => {
  return data.map((user) => ({
    idUser: user.idUser || "",
    name: (user.fullName ?? user.username) || "",
    username: user.username || "",
    email: user.email || "",
    phone: user.phone ?? undefined,
    position: user.position ?? undefined,
    permission: user.role,
    hiringDate: user.hiringDate ?? null,
    status: user.isActive ? "active" : "inactive",
    lastActivity: user.lastLoginDate ?? null,
    idBrandMaster: user.idBrandMaster ?? undefined,
    profileImgUrl: user.profileImgUrl ?? null,
  }));
};
