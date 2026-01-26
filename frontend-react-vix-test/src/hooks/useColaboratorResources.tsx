import { useState } from "react";
import { useAuth } from "./useAuth";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Colaborator } from "../stores/useZColaboratorRegister";
import { formatUsersColaboratorData } from "../utils/formatUsersColaboratorData";
import type {
  IUserFromApi,
  ICreateUserPayload,
  IUpdateUserPayload,
} from "../types/userTypes";

export const useColaboratorResources = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getAuth } = useAuth();
  const { t } = useTranslation();

  const listUsers = async (): Promise<Colaborator[]> => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.get<IUserFromApi[]>({
      url: "/user",
      auth,
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message || t("generic.errorToSaveData"));
      return [];
    }
    const data = response.data;
    if (!Array.isArray(data)) return [];
    return formatUsersColaboratorData(data);
  };

  const createUser = async (
    payload: ICreateUserPayload & { password: string },
  ): Promise<IUserFromApi | null> => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.post<IUserFromApi>({
      url: "/user",
      auth,
      data: {
        ...payload,
        idBrandMaster:
          payload.idBrandMaster == null || payload.idBrandMaster === 0
            ? null
            : payload.idBrandMaster,
      },
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message || t("generic.errorToSaveData"));
      return null;
    }
    toast.success(t("colaboratorRegister.userCreated"));
    return response.data;
  };

  const updateUser = async (
    idUser: string,
    payload: IUpdateUserPayload,
  ): Promise<IUserFromApi | null> => {
    const auth = await getAuth();
    setIsLoading(true);
    const dataToSend = { ...payload };
    if (dataToSend.idBrandMaster === 0) {
      dataToSend.idBrandMaster = null;
    }
    if (dataToSend.password === "" || dataToSend.password == null) {
      delete dataToSend.password;
    }
    const response = await api.put<IUserFromApi>({
      url: `/user/${idUser}`,
      auth,
      data: dataToSend,
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message || t("generic.errorToSaveData"));
      return null;
    }
    toast.success(t("colaboratorRegister.userEdited"));
    return response.data;
  };

  const deleteUser = async (idUser: string): Promise<boolean> => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.delete<unknown>({
      url: `/user/${idUser}`,
      auth,
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message || t("generic.errorToSaveData"));
      return false;
    }
    return true;
  };

  return {
    isLoading,
    listUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
