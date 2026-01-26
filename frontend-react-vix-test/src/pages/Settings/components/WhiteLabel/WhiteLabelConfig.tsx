import { useTranslation } from "react-i18next";
import { themeColors, useZTheme } from "../../../../stores/useZTheme";
import { useZBrandInfo } from "../../../../stores/useZBrandStore";
import { useZUserProfile } from "../../../../stores/useZUserProfile";
import { useBrandMasterResources } from "../../../../hooks/useBrandMasterResources";
import { CheckboxLabel } from "../../../../components/CheckboxLabel";
import { Box, Stack } from "@mui/material";
import { PaintIcon } from "../../../../icons/PaintIcon";
import { TextRob16Font1S } from "../../../../components/Text1S";

interface IWhiteLabelConfigProps {
  theme: {
    dark: themeColors;
    light: themeColors;
  };
}

export const WhiteLabelConfig = ({ theme }: IWhiteLabelConfigProps) => {
  const { mode } = useZTheme();
  const { t } = useTranslation();
  const { allowLogoChange, setBrandInfo } = useZBrandInfo();
  const { role, idBrand } = useZUserProfile();
  const { updateWhiteLabelConfig } = useBrandMasterResources();

  const isAdmin = role === "admin";
  const canEdit = isAdmin && !!idBrand;
  const allowChange = allowLogoChange ?? true;

  const handleAllowLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const next = e.target.checked;
    setBrandInfo({ allowLogoChange: next });
    const res = await updateWhiteLabelConfig(next);
    if (!res) {
      setBrandInfo({ allowLogoChange: !next });
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
        <PaintIcon fill={theme[mode].primary} />
        <TextRob16Font1S
          sx={{
            color: theme[mode].primary,
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          {t("whiteLabel.configTitle")}
        </TextRob16Font1S>
      </Box>
      <Stack sx={{ gap: "16px" }}>
        <CheckboxLabel
          checked={allowChange}
          handleChange={handleAllowLogoChange}
          label={t("whiteLabel.allowLogoChange")}
          disabled={!canEdit}
        />
        <CheckboxLabel
          checked
          handleChange={() => {}}
          label={t("whiteLabel.onlyAdminCanChange")}
          disabled
        />
      </Stack>
    </Stack>
  );
};
