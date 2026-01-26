import { Stack, Divider } from "@mui/material";
import { LabelInputVM } from "../../VirtualMachine/components/LabelInputVM";
import { CheckboxLabel } from "../../VirtualMachine/components/CheckboxLabel";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../components/Text1S";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { maskCNPJ } from "../../../utils/maskCNPJ";
import { isValidCNPJ } from "../../../utils/isValidCNPJ";
import { onlyDigits } from "../../../utils/onlyDigits";
import { useState } from "react";

interface IProps {
  onNext: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const MspRegisterStep1 = ({ onNext, onCancel, isEditing = false }: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    companyName,
    setCompanyName,
    cnpj,
    setCnpj,
    phone,
    setPhone,
    sector,
    setSector,
    contactEmail,
    setContactEmail,
    locality,
    setLocality,
    minConsumption,
    setMinConsumption,
    discountPercentage,
    setDiscountPercentage,
    isPoc,
    setIsPoc,
    showCnpjError,
    setShowCnpjError,
  } = useZMspRegisterPage();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [cnpjError, setCnpjError] = useState<string | null>(null);
  const [companyNameError, setCompanyNameError] = useState<string | null>(null);
  const [localityError, setLocalityError] = useState<string | null>(null);
  const [sectorError, setSectorError] = useState<string | null>(null);

  const handleCnpjChange = (value: string) => {
    const masked = maskCNPJ(value);
    setCnpj(masked);
    setCnpjError(null);
    setShowCnpjError(false);
    
    // Validar CNPJ quando tiver 18 caracteres (14 dígitos + máscara)
    const cleanCnpj = onlyDigits(value);
    if (cleanCnpj.length === 14) {
      if (!isValidCNPJ(masked)) {
        setCnpjError(t("mspRegister.cnpjAlertMessage"));
        setShowCnpjError(true);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t("mspRegister.emailAlertMessage"));
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleNext = () => {
    // Limpar erros anteriores
    setCompanyNameError(null);
    setLocalityError(null);
    setSectorError(null);
    setEmailError(null);
    setCnpjError(null);
    setShowCnpjError(false);

    let hasError = false;

    if (!companyName || companyName.trim() === "") {
      setCompanyNameError(t("mspRegister.fillField") || t("mspRegister.alertMessage"));
      hasError = true;
    }

    if (!locality || locality.trim() === "") {
      setLocalityError(t("mspRegister.fillField") || t("mspRegister.alertMessage"));
      hasError = true;
    }

    const cleanCnpj = onlyDigits(cnpj);
    if (cleanCnpj.length !== 14 || !isValidCNPJ(cnpj)) {
      setCnpjError(t("mspRegister.cnpjAlertMessage"));
      setShowCnpjError(true);
      hasError = true;
    }

    if (!sector || sector.trim() === "") {
      setSectorError(t("mspRegister.fillField") || t("mspRegister.alertMessage"));
      hasError = true;
    }

    if (!contactEmail || !validateEmail(contactEmail)) {
      if (!contactEmail || contactEmail.trim() === "") {
        setEmailError(t("mspRegister.fillField") || t("mspRegister.alertMessage"));
      } else {
        setEmailError(t("mspRegister.emailAlertMessage"));
      }
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onNext();
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
        {t("mspRegister.companyInfos")}
      </TextRob16Font1S>

      <Divider sx={{ borderColor: theme[mode].grayLight }} />

      {/* Primeira linha: Nome da empresa, Localização, CNPJ */}
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
            label={`${t("mspRegister.companyName")} ${t("mspRegister.required")}`}
            value={companyName}
            onChange={(value) => {
              setCompanyName(value);
              if (value && companyNameError) {
                setCompanyNameError(null);
              }
            }}
            placeholder={t("mspRegister.companyName")}
          />
          {companyNameError && (
            <TextRob16Font1S
              sx={{
                color: theme[mode].danger,
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {companyNameError}
            </TextRob16Font1S>
          )}
        </Stack>
        <Stack sx={{ flex: 1, flexDirection: "column", gap: "4px" }}>
          <LabelInputVM
            label={`${t("mspRegister.location")} ${t("mspRegister.required")}`}
            value={locality}
            onChange={(value) => {
              setLocality(value);
              if (value && localityError) {
                setLocalityError(null);
              }
            }}
            placeholder={t("mspRegister.locationPlaceholder")}
          />
          {localityError && (
            <TextRob16Font1S
              sx={{
                color: theme[mode].danger,
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {localityError}
            </TextRob16Font1S>
          )}
        </Stack>
        <Stack sx={{ flex: 1, flexDirection: "column", gap: "4px" }}>
          <LabelInputVM
            label={`${t("mspRegister.cnpjLabel") || t("mspRegister.cnpj")} ${t("mspRegister.required")}`}
            value={cnpj}
            onChange={handleCnpjChange}
            placeholder={t("mspRegister.cnpjPlaceholder") || "00.000.000/0000-00"}
          />
          {(showCnpjError || cnpjError) && (
            <TextRob16Font1S
              sx={{
                color: theme[mode].danger,
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {cnpjError || t("mspRegister.cnpjAlertMessage")}
            </TextRob16Font1S>
          )}
        </Stack>
      </Stack>

      {/* Segunda linha: Telefone, Setor, Email */}
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
          value={phone}
          onChange={setPhone}
          placeholder="(00) 00000-0000"
          containerSx={{
            flex: 1,
          }}
        />
        <Stack sx={{ flex: 1, flexDirection: "column", gap: "4px" }}>
          <LabelInputVM
            label={`${t("mspRegister.sector")} ${t("mspRegister.required")}`}
            value={sector}
            onChange={(value) => {
              setSector(value);
              if (value && sectorError) {
                setSectorError(null);
              }
            }}
            placeholder={t("mspRegister.sectorPlaceholder")}
          />
          {sectorError && (
            <TextRob16Font1S
              sx={{
                color: theme[mode].danger,
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {sectorError}
            </TextRob16Font1S>
          )}
        </Stack>
        <Stack sx={{ flex: 1, flexDirection: "column", gap: "4px" }}>
          <LabelInputVM
            label={`${t("mspRegister.contactEmail")} ${t("mspRegister.required")}`}
            value={contactEmail}
            onChange={(value) => {
              setContactEmail(value);
              if (value && emailError) {
                validateEmail(value);
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

      {/* Terceira linha: Consumo mínimo, Porcentagem de desconto */}
      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 660px)": {
            flexDirection: "row",
          },
        }}
      >
        <LabelInputVM
          label={t("mspRegister.minConsumption")}
          value={minConsumption}
          onChange={setMinConsumption}
          placeholder="0"
          containerSx={{
            flex: 1,
          }}
        />
        <Stack sx={{ flex: 1, position: "relative" }}>
          <LabelInputVM
            label={t("mspRegister.discountPercentage")}
            value={discountPercentage}
            onChange={setDiscountPercentage}
            placeholder="0"
          />
          <TextRob16Font1S
            sx={{
              position: "absolute",
              right: "16px",
              top: "36px",
              color: theme[mode].primary,
            }}
          >
            %
          </TextRob16Font1S>
        </Stack>
      </Stack>

      {/* Flag POC */}
      <CheckboxLabel
        label={t("mspRegister.isPoc")}
        value={isPoc}
        onChange={setIsPoc}
      />

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
          onClick={onCancel}
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
            {t("mspRegister.cancel")}
          </TextRob16Font1S>
        </Btn>
        <Btn
          onClick={handleNext}
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
            {t("mspRegister.next")}
          </TextRob16Font1S>
        </Btn>
      </Stack>
    </Stack>
  );
};
