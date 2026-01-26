import { Divider, Stack } from "@mui/material";
import { themeColors, useZTheme } from "../../../../stores/useZTheme";
import { useZBrandInfo } from "../../../../stores/useZBrandStore";
import { useZUserProfile } from "../../../../stores/useZUserProfile";
import { LeftCardLogo } from "./LeftCardLogo";
import { LeftCardDomain } from "./LeftCardDomain";
import { WhiteLabelConfig } from "./WhiteLabelConfig";

interface IWhiteLabelChildProps {
  theme: {
    dark: themeColors;
    light: themeColors;
  };
}
export const LeftCard = ({ theme }: IWhiteLabelChildProps) => {
  const { mode } = useZTheme();
  const { allowLogoChange } = useZBrandInfo();
  const { role, idBrand } = useZUserProfile();
  const isAdmin = role === "admin";
  const canChangeLogo =
    !!idBrand && isAdmin && (allowLogoChange ?? true);

  return (
    <Stack
      sx={{
        width: "calc(55% - 16px)",
        height: "100%",
        boxSizing: "border-box",
        padding: "24px",
        borderRadius: "16px",
        background: theme[mode].mainBackground,
        display: "flex",
        flexDirection: "column",
        "@media (max-width: 1000px)": { width: "100%" },
      }}
    >
      <WhiteLabelConfig theme={theme} />
      {canChangeLogo && (
        <>
          <LeftCardLogo theme={theme} />
          <Divider sx={{ margin: "40px 0", background: theme[mode].grayLight }} />
        </>
      )}
      <LeftCardDomain theme={theme} canChangeLogo={canChangeLogo} />
    </Stack>
  );
};
