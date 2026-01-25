import { Stack, Divider, Box } from "@mui/material";
import { LabelInputVM } from "../../VirtualMachine/components/LabelInputVM";
import { InputUploadLabelTooltip, InputUploadLabelTooltipRef } from "../../../components/Inputs/InputUploadLabelTooltip";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../components/Text1S";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useState, useRef } from "react";

interface IProps {
  onBack: () => void;
  onSubmit: () => void;
  onClear: () => void;
  isEditing?: boolean;
}

export const MspRegisterStep2 = ({ onBack, onSubmit, onClear, isEditing = false }: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    mspDomain,
    setMSPDomain,
    admName,
    setAdmName,
    admEmail,
    setAdmEmail,
    admPhone,
    setAdmPhone,
    position,
    setPosition,
    admUsername,
    setAdmUsername,
    brandLogoUrl,
    brandObjectName,
    setBrandLogo,
  } = useZMspRegisterPage();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [mspDomainError, setMspDomainError] = useState<string | null>(null);
  const [admNameError, setAdmNameError] = useState<string | null>(null);
  const uploadInputRef = useRef<InputUploadLabelTooltipRef>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t("mspRegister.emailAlertMessage"));
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleSubmit = () => {
    // Limpar erros anteriores
    setMspDomainError(null);
    setAdmNameError(null);
    setEmailError(null);

    let hasError = false;

    if (!mspDomain || mspDomain.trim() === "") {
      setMspDomainError(t("mspRegister.fillField") || t("mspRegister.alertMessage"));
      hasError = true;
    }

    if (!admName || admName.trim() === "") {
      setAdmNameError(t("mspRegister.fillField") || t("mspRegister.alertMessage"));
      hasError = true;
    }

    if (!admEmail || !validateEmail(admEmail)) {
      if (!admEmail || admEmail.trim() === "") {
        setEmailError(t("mspRegister.fillField") || t("mspRegister.alertMessage"));
      } else {
        setEmailError(t("mspRegister.emailAlertMessage"));
      }
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onSubmit();
  };

  return (
    <Stack
      sx={{
        width: "100%",
        gap: "24px",
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <TextRob16Font1S
        sx={{
          color: theme[mode].primary,
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        {t("mspRegister.principalAdmin")}
      </TextRob16Font1S>

      <Divider sx={{ borderColor: theme[mode].grayLight }} />

      {/* Dominio do MSP */}
      <Stack sx={{ flexDirection: "column", gap: "4px" }}>
        <LabelInputVM
          label={`${t("mspRegister.mspDomain")} ${t("mspRegister.required")}`}
          value={mspDomain}
          onChange={(value) => {
            setMSPDomain(value);
            if (value && mspDomainError) {
              setMspDomainError(null);
            }
          }}
          placeholder={t("mspRegister.mspDomainPlaceholder")}
        />
        {mspDomainError && (
          <TextRob16Font1S
            sx={{
              color: theme[mode].danger,
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            {mspDomainError}
          </TextRob16Font1S>
        )}
      </Stack>

      <Divider sx={{ borderColor: theme[mode].grayLight }} />

      {/* Nome completo e Email */}
      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 660px)": {
            flexDirection: "row",
          },
        }}
      >
        <Stack sx={{ flex: 1, flexDirection: "column", gap: "4px" }}>
          <LabelInputVM
            label={`${t("mspRegister.completeName")} ${t("mspRegister.required")}`}
            value={admName}
            onChange={(value) => {
              setAdmName(value);
              if (value && admNameError) {
                setAdmNameError(null);
              }
            }}
            placeholder={t("mspRegister.completeNamePlaceholder")}
            containerSx={{
              flex: 1,
            }}
          />
          {admNameError && (
            <TextRob16Font1S
              sx={{
                color: theme[mode].danger,
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {admNameError}
            </TextRob16Font1S>
          )}
        </Stack>
        <Stack sx={{ flex: 1, flexDirection: "column", gap: "4px" }}>
          <LabelInputVM
            label={`${t("mspRegister.email")} ${t("mspRegister.required")}`}
            value={admEmail}
            onChange={(value) => {
              setAdmEmail(value);
              if (value && emailError) {
                validateEmail(value);
              } else if (!value) {
                setEmailError(null);
              }
            }}
            placeholder={t("mspRegister.emailPlaceholder")}
            type="email"
          />
          {emailError && (
            <TextRob16Font1S
              sx={{
                color: theme[mode].danger,
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {emailError}
            </TextRob16Font1S>
          )}
        </Stack>
      </Stack>

      {/* Telefone e Cargo */}
      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 660px)": {
            flexDirection: "row",
          },
        }}
      >
        <LabelInputVM
          label={t("mspRegister.phone")}
          value={admPhone}
          onChange={setAdmPhone}
          placeholder="(00) 00000-0000"
          containerSx={{
            flex: 1,
          }}
        />
        <LabelInputVM
          label={t("mspRegister.position")}
          value={position}
          onChange={setPosition}
          placeholder={t("mspRegister.positionPlaceholder")}
          disabled={true}
          containerSx={{
            flex: 1,
          }}
        />
      </Stack>

      {/* Senha inicial (gerada pelo sistema) e Nome de Usuário */}
      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 660px)": {
            flexDirection: "row",
          },
        }}
      >
        <LabelInputVM
          label={`${t("mspRegister.initialPassword")} ${t("mspRegister.required")}`}
          value={t("mspRegister.initialPasswordPlaceholder")}
          onChange={() => {}}
          placeholder={t("mspRegister.initialPasswordPlaceholder")}
          disabled={true}
          containerSx={{
            flex: 1,
          }}
        />
        <LabelInputVM
          label={t("mspRegister.username")}
          value={admUsername}
          onChange={setAdmUsername}
          placeholder={t("mspRegister.username")}
          containerSx={{
            flex: 1,
          }}
        />
      </Stack>

      <Divider sx={{ borderColor: theme[mode].grayLight }} />

      {/* Logotipo da empresa */}
      <TextRob16Font1S
        sx={{
          color: theme[mode].primary,
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {t("mspRegister.companyLogo")}
      </TextRob16Font1S>
      <TextRob16Font1S
        sx={{
          color: theme[mode].gray,
          fontSize: "14px",
          fontWeight: "400",
          marginTop: "-16px",
        }}
      >
        {t("mspRegister.companyLogoSubtitle")}
      </TextRob16Font1S>

      <InputUploadLabelTooltip
        ref={uploadInputRef}
        label=""
        toolTipMessage=""
        onUploaded={({ url, objectName }) => {
          setBrandLogo({ brandLogoUrl: url, brandObjectName: objectName });
        }}
        sxContainer={{
          marginBottom: "8px",
        }}
      />
      {brandLogoUrl && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
              border: `1px solid ${theme[mode].grayLight}`,
              borderRadius: "12px",
            }}
          >
            <img
              src={brandLogoUrl}
              alt="Logo"
              style={{
                maxWidth: "200px",
                maxHeight: "100px",
                objectFit: "contain",
              }}
            />
          </Box>
          <Stack
            sx={{
              flexDirection: "row",
              gap: "16px",
            }}
          >
            <TextRob16Font1S
              sx={{
                color: theme[mode].blue,
                fontSize: "14px",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => {
                uploadInputRef.current?.openFileDialog();
              }}
            >
              {t("whiteLabel.changeLogo") || "Alterar logo"}
            </TextRob16Font1S>
            <TextRob16Font1S
              sx={{
                color: theme[mode].danger,
                fontSize: "14px",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => {
                setBrandLogo({ brandLogoUrl: "", brandObjectName: "" });
              }}
            >
              {t("whiteLabel.removeLogo") || "Remover logo"}
            </TextRob16Font1S>
          </Stack>
          <Stack
            sx={{
              gap: "4px",
              marginTop: "8px",
            }}
          >
            <TextRob16Font1S
              sx={{
                color: theme[mode].gray,
                fontSize: "12px",
              }}
            >
              {t("whiteLabel.defaultSize") || "Padrão: 165x50px"}
            </TextRob16Font1S>
            <TextRob16Font1S
              sx={{
                color: theme[mode].gray,
                fontSize: "12px",
              }}
            >
              {t("whiteLabel.maxSize") || "Tamanho: 50mb"}
            </TextRob16Font1S>
            <TextRob16Font1S
              sx={{
                color: theme[mode].gray,
                fontSize: "12px",
              }}
            >
              {t("whiteLabel.acceptedFormats") || "Formatos: .svg .png .jpg .gif .webp"}
            </TextRob16Font1S>
          </Stack>
        </Box>
      )}

      {/* Botões */}
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <Btn
          onClick={onBack}
          sx={{
            background: theme[mode].grayLight,
            color: theme[mode].primary,
            padding: "12px 24px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "400",
            "&:hover": {
              background: theme[mode].gray,
            },
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
            }}
          >
            {t("mspRegister.back")}
          </TextRob16Font1S>
        </Btn>
        <Stack
          sx={{
            flexDirection: "row",
            gap: "16px",
          }}
        >
          <Btn
            onClick={onClear}
            sx={{
              background: theme[mode].grayLight,
              color: theme[mode].primary,
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "400",
              "&:hover": {
                background: theme[mode].gray,
              },
            }}
          >
            <TextRob16Font1S
              sx={{
                color: theme[mode].primary,
              }}
            >
              {t("mspRegister.clear")}
            </TextRob16Font1S>
          </Btn>
          <Btn
            onClick={handleSubmit}
            sx={{
              background: theme[mode].blue,
              color: theme[mode].btnText,
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "400",
              "&:hover": {
                background: theme[mode].blueDark,
              },
            }}
          >
            <TextRob16Font1S
              sx={{
                color: theme[mode].btnText,
              }}
            >
              {isEditing ? t("mspRegister.save") : t("mspRegister.confirm")}
            </TextRob16Font1S>
          </Btn>
        </Stack>
      </Stack>
    </Stack>
  );
};
