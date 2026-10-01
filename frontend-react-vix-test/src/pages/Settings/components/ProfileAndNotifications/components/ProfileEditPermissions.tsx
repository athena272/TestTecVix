import { useTranslation } from "react-i18next";
import { themeColors, useZTheme } from "../../../../../stores/useZTheme";
import { useZBrandInfo } from "../../../../../stores/useZBrandStore";
import { useZUserProfile } from "../../../../../stores/useZUserProfile";
import { useBrandMasterResources } from "../../../../../hooks/useBrandMasterResources";
import { CheckboxLabel } from "../../../../../components/CheckboxLabel";
import { Box, Stack } from "@mui/material";
import { AccountCircle } from "../../../../../icons/AccountCircle";
import { TextRob16Font1S } from "../../../../../components/Text1S";

interface IProfileEditPermissionsProps {
  theme: {
    dark: themeColors;
    light: themeColors;
  };
}

export const ProfileEditPermissions = ({
  theme,
}: IProfileEditPermissionsProps) => {
  const { mode } = useZTheme();
  const { t } = useTranslation();
  const {
    allowEditContactInfo,
    allowEditPassword,
    allowEditProfileImage,
    setBrandInfo,
  } = useZBrandInfo();
  const { role, idBrand } = useZUserProfile();
  const { updateProfileEditPermissions } = useBrandMasterResources();

  const isAdmin = role === "admin";
  const canEdit = isAdmin && !!idBrand;
  const allowContactInfo = allowEditContactInfo ?? true;
  const allowPassword = allowEditPassword ?? true;
  const allowProfileImage = allowEditProfileImage ?? true;

  const handleAllowEditContactInfo = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const next = e.target.checked;
    setBrandInfo({ allowEditContactInfo: next });
    const res = await updateProfileEditPermissions({
      allowEditContactInfo: next,
    });
    if (!res) {
      setBrandInfo({ allowEditContactInfo: !next });
    }
  };

  const handleAllowEditPassword = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const next = e.target.checked;
    setBrandInfo({ allowEditPassword: next });
    const res = await updateProfileEditPermissions({
      allowEditPassword: next,
    });
    if (!res) {
      setBrandInfo({ allowEditPassword: !next });
    }
  };

  const handleAllowEditProfileImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const next = e.target.checked;
    setBrandInfo({ allowEditProfileImage: next });
    const res = await updateProfileEditPermissions({
      allowEditProfileImage: next,
    });
    if (!res) {
      setBrandInfo({ allowEditProfileImage: !next });
    }
  };

  return (
    <Stack sx={{ width: "100%", gap: "24px", marginBottom: "24px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "8px",
        }}
      >
        <AccountCircle color={theme[mode].primary} />
        <TextRob16Font1S
          sx={{
            color: theme[mode].primary,
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          {t("profileAndNotifications.configTitle")}
        </TextRob16Font1S>
      </Box>
      <Stack sx={{ gap: "16px" }}>
        <CheckboxLabel
          checked={allowContactInfo}
          handleChange={handleAllowEditContactInfo}
          label={t("profileAndNotifications.allowEditContactInfo")}
          disabled={!canEdit}
        />
        <CheckboxLabel
          checked={allowPassword}
          handleChange={handleAllowEditPassword}
          label={t("profileAndNotifications.allowEditPassword")}
          disabled={!canEdit}
        />
        <CheckboxLabel
          checked={allowProfileImage}
          handleChange={handleAllowEditProfileImage}
          label={t("profileAndNotifications.allowEditProfileImage")}
          disabled={!canEdit}
        />
      </Stack>
    </Stack>
  );
};
