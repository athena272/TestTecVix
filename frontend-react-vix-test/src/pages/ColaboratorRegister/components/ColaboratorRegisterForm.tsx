import { Stack, Divider, Box } from "@mui/material";
import { LabelInputVM } from "../../VirtualMachine/components/LabelInputVM";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../components/Text1S";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZColaboratorRegister } from "../../../stores/useZColaboratorRegister";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { DropDown } from "../../../components/Inputs/DropDown";
import { FilterIcon } from "../../../icons/FilterIcon";
import { useState, useEffect, useMemo } from "react";
import { useColaboratorResources } from "../../../hooks/useColaboratorResources";
import type { ICreateUserPayload } from "../../../types/userTypes";
import { api } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { IListAll } from "../../../types/ListAllTypes";
import { formatToIOptionMPS } from "../../../utils/formatOptions";

const POSITION_OPTIONS = [
  { id: 1, label: "Analyst", value: "Analyst" },
  { id: 2, label: "Manager", value: "Manager" },
  { id: 3, label: "Support", value: "Support" },
  { id: 4, label: "Developer", value: "Developer" },
  { id: 5, label: "Administrator", value: "Administrator" },
];

const DEPARTMENT_OPTIONS = [
  { id: 1, label: "Support", value: "Support" },
  { id: 2, label: "Sales", value: "Sales" },
  { id: 3, label: "Engineering", value: "Engineering" },
  { id: 4, label: "Operations", value: "Operations" },
  { id: 5, label: "Administration", value: "Administration" },
];

export const ColaboratorRegisterForm = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { role } = useZUserProfile();
  const { createUser, updateUser, isLoading, listUsers } = useColaboratorResources();
  const { getAuth } = useAuth();
  const {
    colaboratorName,
    setColaboratorName,
    email,
    setEmail,
    phone,
    setPhone,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    position,
    setPosition,
    department,
    setDepartment,
    permission,
    setPermission,
    hiringDate,
    setHiringDate,
    status,
    setStatus,
    idBrandMaster,
    setIdBrandMaster,
    idUser,
    resetInputs,
    setUsers,
    setIsEditing,
  } = useZColaboratorRegister();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [positionError, setPositionError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [companyOptions, setCompanyOptions] = useState<
    { id: number; label: string; value: number }[]
  >([]);

  const clearAllErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setFullNameError(null);
    setUsernameError(null);
    setConfirmPasswordError(null);
    setPositionError(null);
    setPermissionError(null);
    setStatusError(null);
  };

  const isEditingMode = Boolean(idUser);
  const canEdit = role === "admin" || role === "manager";

  useEffect(() => {
    const fetchCompanies = async () => {
      const auth = await getAuth();
      const response = await api.get<
        IListAll<{ idBrandMaster: number; brandName: string; deletedAt: Date | string | null }>
      >({
        url: "/brand-master",
        auth,
        params: { orderBy: "deletedAt:asc,brandName:asc" },
      });
      if (response.error || !response.data?.result) return;
      const opts = formatToIOptionMPS(response.data.result).map((m) => ({
        id: m.id,
        label: m.label,
        value: m.value,
      }));
      setCompanyOptions(opts);
    };
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const permissionOptions = [
    { id: 1, label: t("colaboratorRegister.admin"), value: "admin" as const },
    { id: 2, label: t("colaboratorRegister.manager"), value: "manager" as const },
    { id: 3, label: t("colaboratorRegister.member"), value: "member" as const },
  ];

  const statusOptions = [
    { id: 1, label: t("colaboratorRegister.active"), value: "active" as const },
    { id: 2, label: t("colaboratorRegister.inactive"), value: "inactive" as const },
  ];

  const companyData = useMemo(
    () => [
      {
        id: 0,
        label: t("colaboratorRegister.companyFilterPlaceholder"),
        value: 0 as number,
      },
      ...companyOptions.map((o) => ({ ...o, value: o.value as unknown })),
    ],
    [t, companyOptions],
  );
  const companyValue = companyData.find(
    (c) => (c.value as number) === (idBrandMaster ?? 0),
  ) ?? null;

  const validateEmail = (v: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(v);
  };

  const handleSave = async () => {
    clearAllErrors();

    let hasError = false;
    if (!colaboratorName?.trim()) {
      setFullNameError(t("colaboratorRegister.fillFields"));
      hasError = true;
    }
    if (!email?.trim()) {
      setEmailError(t("colaboratorRegister.fillFields"));
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError(t("colaboratorRegister.emailAlertMessage"));
      hasError = true;
    }
    if (!username?.trim()) {
      setUsernameError(t("colaboratorRegister.fillFields"));
      hasError = true;
    }
    if (!position?.trim()) {
      setPositionError(t("colaboratorRegister.fillFields"));
      hasError = true;
    }
    if (!permission) {
      setPermissionError(t("colaboratorRegister.fillFields"));
      hasError = true;
    }
    if (!status) {
      setStatusError(t("colaboratorRegister.fillFields"));
      hasError = true;
    }

    if (!isEditingMode) {
      if (!password || password.length < 8) {
        setPasswordError(t("colaboratorRegister.fillFields"));
        hasError = true;
      }
      if (!confirmPassword?.trim()) {
        setConfirmPasswordError(t("colaboratorRegister.fillFields"));
        hasError = true;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError(t("colaboratorRegister.dontMatch"));
        setPasswordError(t("colaboratorRegister.dontMatch"));
        hasError = true;
      }
    } else {
      if (password && (password.length < 8 || password !== confirmPassword)) {
        setPasswordError(t("colaboratorRegister.dontMatch"));
        setConfirmPasswordError(t("colaboratorRegister.dontMatch"));
        hasError = true;
      }
    }

    if (hasError) return;

    if (isEditingMode && idUser) {
      const payload: Parameters<typeof updateUser>[1] = {
        fullName: colaboratorName || null,
        email: email || undefined,
        phone: phone || null,
        username: username || undefined,
        position: position || null,
        department: department || null,
        role: permission as "admin" | "manager" | "member",
        isActive: status === "active",
        idBrandMaster: idBrandMaster && idBrandMaster > 0 ? idBrandMaster : null,
        hiringDate: hiringDate ? new Date(hiringDate) : null,
      };
      if (password?.trim()) payload.password = password;
      const updated = await updateUser(idUser, payload);
      if (updated) {
        resetInputs();
        setIsEditing([]);
        const list = await listUsers();
        setUsers(list);
      }
    } else {
      const payload: ICreateUserPayload & { password: string } = {
        username: username!,
        password: password!,
        email: email!,
        fullName: colaboratorName || null,
        phone: phone || null,
        position: position || null,
        department: department || null,
        role: (permission as "admin" | "manager" | "member") || undefined,
        isActive: status === "active",
        idBrandMaster: idBrandMaster && idBrandMaster > 0 ? idBrandMaster : null,
        hiringDate: hiringDate ? new Date(hiringDate) : null,
      };
      const created = await createUser(payload);
      if (created) {
        resetInputs();
        const list = await listUsers();
        setUsers(list);
      }
    }
  };

  const handleClear = () => {
    clearAllErrors();
    resetInputs();
    setIsEditing([]);
  };

  if (!canEdit) return null;

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
        {t("colaboratorRegister.subtitle")}
      </TextRob16Font1S>

      <Divider sx={{ borderColor: theme[mode].grayLight }} />

      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" },
          gap: "24px",
        }}
      >
        <Stack sx={{ gap: "4px" }}>
          <LabelInputVM
            label={`${t("colaboratorRegister.completeName")} ${t("colaboratorRegister.required")}`}
            value={colaboratorName}
            onChange={(v) => {
              setColaboratorName(v);
              if (fullNameError) setFullNameError(null);
            }}
            placeholder={t("colaboratorRegister.completeNamePlaceholder")}
          />
          {fullNameError && (
            <TextRob16Font1S sx={{ color: theme[mode].danger, fontSize: "12px" }}>
              {fullNameError}
            </TextRob16Font1S>
          )}
        </Stack>
        <Stack sx={{ gap: "4px" }}>
          <LabelInputVM
            label={`${t("colaboratorRegister.email")} ${t("colaboratorRegister.required")}`}
            value={email}
            onChange={(v) => {
              setEmail(v);
              if (emailError) setEmailError(null);
            }}
            placeholder={t("colaboratorRegister.emailPlaceholder")}
            type="email"
          />
          {emailError && (
            <TextRob16Font1S sx={{ color: theme[mode].danger, fontSize: "12px" }}>
              {emailError}
            </TextRob16Font1S>
          )}
        </Stack>
        <Stack sx={{ gap: "4px" }}>
          <LabelInputVM
            label={t("colaboratorRegister.phone")}
            value={phone}
            onChange={setPhone}
            placeholder="(00) 00000-0000"
          />
        </Stack>
        <Stack sx={{ gap: "4px" }}>
          <LabelInputVM
            label={`${t("colaboratorRegister.username")} ${t("colaboratorRegister.required")}`}
            value={username}
            onChange={(v) => {
              setUsername(v);
              if (usernameError) setUsernameError(null);
            }}
            placeholder={t("colaboratorRegister.username")}
          />
          {usernameError && (
            <TextRob16Font1S sx={{ color: theme[mode].danger, fontSize: "12px" }}>
              {usernameError}
            </TextRob16Font1S>
          )}
        </Stack>
        <Stack sx={{ gap: "4px" }}>
          <LabelInputVM
            label={
              isEditingMode
                ? t("colaboratorRegister.password")
                : `${t("colaboratorRegister.password")} ${t("colaboratorRegister.required")}`
            }
            value={password}
            onChange={(v) => {
              setPassword(v);
              if (passwordError) setPasswordError(null);
              if (confirmPasswordError) setConfirmPasswordError(null);
            }}
            placeholder={t("colaboratorRegister.password")}
            type="password"
          />
          {passwordError && (
            <TextRob16Font1S sx={{ color: theme[mode].danger, fontSize: "12px" }}>
              {passwordError}
            </TextRob16Font1S>
          )}
        </Stack>
        <Stack sx={{ gap: "4px" }}>
          <LabelInputVM
            label={
              isEditingMode
                ? t("colaboratorRegister.confirmPassword")
                : `${t("colaboratorRegister.confirmPassword")} ${t("colaboratorRegister.required")}`
            }
            value={confirmPassword}
            onChange={(v) => {
              setConfirmPassword(v);
              if (confirmPasswordError) setConfirmPasswordError(null);
              if (passwordError) setPasswordError(null);
            }}
            placeholder={t("colaboratorRegister.confirmPassword")}
            type="password"
          />
          {confirmPasswordError && (
            <TextRob16Font1S sx={{ color: theme[mode].danger, fontSize: "12px" }}>
              {confirmPasswordError}
            </TextRob16Font1S>
          )}
        </Stack>
        <Box>
          <TextRob16Font1S
            sx={{
              fontWeight: 400,
              lineHeight: "16px",
              color: theme[mode].primary,
              marginBottom: "12px",
              display: "block",
            }}
          >
            {`${t("colaboratorRegister.position")} ${t("colaboratorRegister.required")}`}
          </TextRob16Font1S>
          <DropDown
            data={POSITION_OPTIONS.map((o) => ({ ...o, value: o.value as unknown }))}
            value={position ? { id: 0, label: position, value: position } : null}
            onChange={(v) => {
              setPosition((v?.label as string) || "");
              if (positionError) setPositionError(null);
            }}
            placeholder={t("colaboratorRegister.positionPlaceholder")}
            placeholderIcon={<FilterIcon fill={theme[mode].gray} />}
            sxContainer={{ width: "100%" }}
          />
          {positionError && (
            <TextRob16Font1S sx={{ color: theme[mode].danger, fontSize: "12px", marginTop: "4px" }}>
              {positionError}
            </TextRob16Font1S>
          )}
        </Box>
        <Box>
          <TextRob16Font1S
            sx={{
              fontWeight: 400,
              lineHeight: "16px",
              color: theme[mode].primary,
              marginBottom: "12px",
              display: "block",
            }}
          >
            {t("colaboratorRegister.department")}
          </TextRob16Font1S>
          <DropDown
            data={DEPARTMENT_OPTIONS.map((o) => ({ ...o, value: o.value as unknown }))}
            value={department ? { id: 0, label: department, value: department } : null}
            onChange={(v) => setDepartment((v?.label as string) || "")}
            placeholder={t("colaboratorRegister.departmentPlaceholder")}
            placeholderIcon={<FilterIcon fill={theme[mode].gray} />}
            sxContainer={{ width: "100%" }}
          />
        </Box>
        <Box>
          <TextRob16Font1S
            sx={{
              fontWeight: 400,
              lineHeight: "16px",
              color: theme[mode].primary,
              marginBottom: "12px",
              display: "block",
            }}
          >
            {`${t("colaboratorRegister.permission")} ${t("colaboratorRegister.required")}`}
          </TextRob16Font1S>
          <DropDown
            data={permissionOptions.map((o) => ({ ...o, value: o.value as unknown }))}
            value={
              permission
                ? permissionOptions.find((o) => o.value === permission) || null
                : null
            }
            onChange={(v) => {
              setPermission((v?.value as string) || "");
              if (permissionError) setPermissionError(null);
            }}
            placeholder={t("colaboratorRegister.permission")}
            placeholderIcon={<FilterIcon fill={theme[mode].gray} />}
            sxContainer={{ width: "100%" }}
          />
          {permissionError && (
            <TextRob16Font1S sx={{ color: theme[mode].danger, fontSize: "12px", marginTop: "4px" }}>
              {permissionError}
            </TextRob16Font1S>
          )}
        </Box>
        <Stack sx={{ gap: "4px" }}>
          <LabelInputVM
            label={t("colaboratorRegister.hiringDate")}
            value={hiringDate}
            onChange={setHiringDate}
            placeholder="YYYY-MM-DD"
            type="date"
          />
        </Stack>
        <Box>
          <TextRob16Font1S
            sx={{
              fontWeight: 400,
              lineHeight: "16px",
              color: theme[mode].primary,
              marginBottom: "12px",
              display: "block",
            }}
          >
            {`${t("colaboratorRegister.status")} ${t("colaboratorRegister.required")}`}
          </TextRob16Font1S>
          <DropDown
            data={statusOptions.map((o) => ({ ...o, value: o.value as unknown }))}
            value={
              status
                ? statusOptions.find((o) => o.value === status) || null
                : null
            }
            onChange={(v) => {
              setStatus((v?.value as string) || "");
              if (statusError) setStatusError(null);
            }}
            placeholder={t("colaboratorRegister.status")}
            placeholderIcon={<FilterIcon fill={theme[mode].gray} />}
            sxContainer={{ width: "100%" }}
          />
          {statusError && (
            <TextRob16Font1S sx={{ color: theme[mode].danger, fontSize: "12px", marginTop: "4px" }}>
              {statusError}
            </TextRob16Font1S>
          )}
        </Box>
        <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
          <TextRob16Font1S
            sx={{
              fontWeight: 400,
              lineHeight: "16px",
              color: theme[mode].primary,
              marginBottom: "12px",
              display: "block",
            }}
          >
            {t("colaboratorRegister.companyName")}
          </TextRob16Font1S>
          <DropDown
            data={companyData}
            value={companyValue}
            onChange={(v) => setIdBrandMaster((v?.value as number) ?? 0)}
            placeholder={t("colaboratorRegister.companyFilterPlaceholder")}
            placeholderIcon={<FilterIcon fill={theme[mode].gray} />}
            sxContainer={{ width: "100%", maxWidth: "400px" }}
          />
        </Box>
      </Stack>

      <Stack flexDirection="row" gap="16px" marginTop="8px">
        <Btn
          onClick={handleSave}
          disabled={isLoading}
          sx={{
            background: theme[mode].blue,
            color: theme[mode].btnText,
            padding: "12px 24px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "400",
            "&:hover": { background: theme[mode].blueDark },
          }}
        >
          <TextRob16Font1S sx={{ color: theme[mode].btnText }}>
            {t("colaboratorRegister.save")}
          </TextRob16Font1S>
        </Btn>
        <Btn
          onClick={handleClear}
          sx={{
            background: theme[mode].grayLight,
            color: theme[mode].primary,
            padding: "12px 24px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "400",
            "&:hover": { background: theme[mode].gray },
          }}
        >
          <TextRob16Font1S sx={{ color: theme[mode].primary }}>
            {t("colaboratorRegister.clear")}
          </TextRob16Font1S>
        </Btn>
      </Stack>
    </Stack>
  );
};
