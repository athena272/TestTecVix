import { Stack } from "@mui/material";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { ColaboratorRegisterForm } from "./components/ColaboratorRegisterForm";
import { ColaboratorRegisterList } from "./components/ColaboratorRegisterList";
import { useColaboratorResources } from "../../hooks/useColaboratorResources";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";

export const ColaboratorRegisterPage = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { isLoading } = useColaboratorResources();

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("colaboratorRegister.title")} | {t("colaboratorRegister.sideTitle")}
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
    >
      {Boolean(isLoading) && <AbsoluteBackDrop open />}
      <Stack
        sx={{
          width: "100%",
          gap: "26px",
          borderRadius: "16px",
          boxSizing: "border-box",
        }}
      >
        <div id="colaborator-register-form">
          <ColaboratorRegisterForm />
        </div>
        <ColaboratorRegisterList />
      </Stack>
    </ScreenFullPage>
  );
};
