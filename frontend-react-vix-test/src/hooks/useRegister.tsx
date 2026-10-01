import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useZBrandInfo } from "../stores/useZBrandStore";
import { useZUserProfile } from "../stores/useZUserProfile";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { useNavigate } from "react-router-dom";

interface IUserRegisterResponse {
  token: string | null;
  user: {
    createdAt: string | Date;
    deletedAt: string | Date | null;
    email: string;
    idBrandMaster: number | null;
    idUser: string;
    isActive: boolean;
    profileImgUrl: null | string;
    role: "admin" | "manager" | "member";
    updatedAt: string | Date;
    username: string;
  };
}

export const useRegister = () => {
  const { t } = useTranslation();
  const { idBrand } = useZBrandInfo();
  const { setUser } = useZUserProfile();
  const { setLoginTime } = useZGlobalVar();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return t("loginRegister.invalidEmail");
    }
    return null;
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (!password) return t("loginRegister.invalidPassword");
    if (password !== confirmPassword) {
      return t("loginRegister.passwordMismatch");
    }
    return null;
  };
  const goRegister = async ({
    username,
    password,
    email,
    confirmPassword,
  }: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }) => {
    if (!username) {
      toast.error(t("loginRegister.invalidUsername"));
      return;
    }
    const emailError = validateEmail(email);
    const passwordError = validatePasswords(password, confirmPassword);
    if (emailError || passwordError) {
      toast.error(emailError || passwordError);
      return;
    }

    const response = await api.post<IUserRegisterResponse>({
      url: "/user/register",
      data: {
        username,
        password,
        email,
        ...(idBrand !== null && { idBrandMaster: idBrand }),
      },
    });

    if (response.error) {
      toast.error(response.message);
      return;
    }

    // Faz login automático após registro bem-sucedido
    if (response.data.token && response.data.user) {
      setUser({
        idUser: response.data.user.idUser,
        profileImgUrl: response.data.user.profileImgUrl,
        username: response.data.user.username,
        userEmail: response.data.user.email,
        idBrand: response.data.user.idBrandMaster,
        token: response.data.token,
        role: response.data.user.role,
      });
      setLoginTime(new Date());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return { goRegister };
};
