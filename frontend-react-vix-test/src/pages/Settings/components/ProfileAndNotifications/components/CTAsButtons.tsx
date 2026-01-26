import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../../stores/useZTheme";
import { TextRob16FontL } from "../../../../../components/TextL";
import { toast } from "react-toastify";
import {
  IUserDB,
  useUserResources,
} from "../../../../../hooks/useUserResources";
import { useZFormProfileNotifications } from "../../../../../stores/useZFormProfileNotifications";
import { useZUserProfile } from "../../../../../stores/useZUserProfile";
import { useZBrandInfo } from "../../../../../stores/useZBrandStore";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CTAsButtons = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { updateUser, isLoading } = useUserResources();
  const {
    fullNameForm,
    userName,
    userEmail,
    userPhone,
    password,
    confirmPassword,
  } = useZFormProfileNotifications();
  const { idUser, profileImgUrl, role } = useZUserProfile();
  const {
    allowEditContactInfo,
    allowEditPassword,
    allowEditProfileImage,
  } = useZBrandInfo();

  const canEditContactInfo = allowEditContactInfo ?? true;
  const canEditPassword = allowEditPassword ?? true;
  const canEditProfileImage = allowEditProfileImage ?? true;

  const handleSave = async () => {
    if (!idUser) {
      toast.error(t("generic.errorToSaveData"));
      return;
    }

    // Valida permissões antes de salvar
    if (!canEditContactInfo && (fullNameForm.value?.trim() || userPhone.value?.trim())) {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    }

    if (password.value?.trim() && !canEditPassword) {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    }

    if (profileImgUrl && role === "admin" && !canEditProfileImage) {
      toast.error(t("generic.errorOlnlyAdmin"));
      return;
    }

    if (!userName.value?.trim()) {
      toast.error(t("profileAndNotifications.requiredField"));
      return;
    }
    if (userName.value.length < 4 || userName.value.length > 100) {
      toast.error(t("profileAndNotifications.invalidData"));
      return;
    }

    if (!userEmail.value?.trim()) {
      toast.error(t("profileAndNotifications.requiredField"));
      return;
    }
    if (!emailRegex.test(userEmail.value) || userEmail.value.length > 100) {
      toast.error(t("profileAndNotifications.invalidData"));
      return;
    }

    if (password.value && password.value !== confirmPassword.value) {
      toast.error(t("colaboratorRegister.dontMatch"));
      return;
    }

    const payload: Partial<IUserDB> & { password?: string } = {
      username: userName.value.trim(),
    };

    // Só adiciona campos de contato se a permissão estiver habilitada
    if (canEditContactInfo) {
      payload.email = userEmail.value.trim();
      payload.fullName = fullNameForm.value?.trim() || null;
      payload.phone = userPhone.value?.trim() || null;
    }

    // Só adiciona senha se a permissão estiver habilitada
    if (password.value?.trim() && canEditPassword) {
      payload.password = password.value.trim();
    }

    // Só adiciona imagem de perfil se a permissão estiver habilitada
    if (role === "admin" && profileImgUrl && canEditProfileImage) {
      payload.profileImgUrl = profileImgUrl.trim() || null;
    }

    const result = await updateUser(payload);
    if (result) {
      toast.success(t("generic.dataSavesuccess"));
    }
  };

  return (
    <Stack
      flexDirection={"row"}
      sx={{
        gap: "24px",
        "@media (max-width: 745px)": {
          flexDirection: "column",
        },
      }}
    >
      <Button
        disabled={isLoading}
        sx={{
          background: theme[mode].blue,
          border: `1px solid ${theme[mode].blue}`,
          textTransform: "none",
          borderRadius: "12px",
          height: "48px",
          fontWeight: "500",
          fontSize: "16px",
          width: "100%",
          maxWidth: "330px",
          "@media (max-width: 745px)": {
            maxWidth: "100%",
          },
        }}
        onClick={handleSave}
      >
        <TextRob16FontL
          sx={{
            color: theme[mode].btnText,
            fontWeight: "500",
            fontFamily: "Roboto",
            lineHeight: "16px",
          }}
        >
          {t("profileAndNotifications.saveChanges")}
        </TextRob16FontL>
      </Button>
      <Button
        sx={{
          background: "transparent",
          border: `1px solid ${theme[mode].blueDark}`,
          textTransform: "none",
          borderRadius: "12px",
          height: "48px",
          fontWeight: "500",
          fontSize: "16px",
          width: "100%",
          maxWidth: "330px",
          "@media (max-width: 745px)": {
            maxWidth: "100%",
          },
        }}
        onClick={() => {}}
      >
        <TextRob16FontL
          sx={{
            color: theme[mode].blueDark,
            fontWeight: "500",
            fontFamily: "Roboto",
            lineHeight: "16px",
          }}
        >
          {t("profileAndNotifications.redefineAllData")}
        </TextRob16FontL>
      </Button>
    </Stack>
  );
};
