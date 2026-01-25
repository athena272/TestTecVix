import { Stack, Box, Chip, IconButton } from "@mui/material";
import { TextRob16Font1S } from "../../../components/Text1S";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZColaboratorRegister } from "../../../stores/useZColaboratorRegister";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { useColaboratorResources } from "../../../hooks/useColaboratorResources";
import { DropDown } from "../../../components/Inputs/DropDown";
import { FilterIcon } from "../../../icons/FilterIcon";
import { useEffect, useMemo, useState } from "react";
import type { Colaborator } from "../../../stores/useZColaboratorRegister";
import { api } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { IListAll } from "../../../types/ListAllTypes";
import { formatToIOptionMPS } from "../../../utils/formatOptions";
import { TrashIcon } from "../../../icons/TrashIcon";
import { EditCirclePencilIcon } from "../../../icons/EditCirclePencilIcon";
import { Modal } from "@mui/material";
import { Btn } from "../../../components/Buttons/Btn";

const formatDate = (d: string | Date | null) => {
  if (!d) return null;
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const ColaboratorRegisterList = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { role } = useZUserProfile();
  const { listUsers, deleteUser, isLoading } = useColaboratorResources();
  const { getAuth } = useAuth();
  const {
    users,
    setUsers,
    permissionFilter,
    setPermissionFilter,
    selectedMSP,
    setSelectedMSP,
    setIdUser,
    setColaboratorName,
    setEmail,
    setPhone,
    setUsername,
    setPosition,
    setDepartment,
    setPermission,
    setHiringDate,
    setStatus,
    setIdBrandMaster,
    resetInputs,
  } = useZColaboratorRegister();

  const [companyOptions, setCompanyOptions] = useState<
    { id: number; label: string; value: number }[]
  >([]);
  const [deleteModal, setDeleteModal] = useState<Colaborator | null>(null);

  const canEdit = role === "admin" || role === "manager";
  const canDelete = role === "admin";

  useEffect(() => {
    const load = async () => {
      const list = await listUsers();
      setUsers(list);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      const auth = await getAuth();
      const response = await api.get<
        IListAll<{
          idBrandMaster: number;
          brandName: string;
          deletedAt: Date | string | null;
        }>
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
  const companyValue = useMemo(
    () =>
      companyData.find(
        (c) =>
          (c.value as number) === (selectedMSP?.idBrandMaster ?? 0),
      ) ?? (companyData[0] ?? null),
    [companyData, selectedMSP],
  );

  const permissionOptions = [
    { id: 1, label: t("colaboratorRegister.UserFilterPlaceholder"), value: "all" as const },
    { id: 2, label: t("colaboratorRegister.admin"), value: "admin" as const },
    { id: 3, label: t("colaboratorRegister.manager"), value: "manager" as const },
    { id: 4, label: t("colaboratorRegister.member"), value: "member" as const },
  ];
  const permissionValue =
    permissionOptions.find((o) => o.value === permissionFilter) ?? permissionOptions[0];

  const filtered = useMemo(() => {
    let list = users;
    if (permissionFilter !== "all") {
      list = list.filter((u) => u.permission === permissionFilter);
    }
    if (selectedMSP?.idBrandMaster) {
      list = list.filter(
        (u) => u.idBrandMaster === selectedMSP.idBrandMaster,
      );
    }
    return list;
  }, [users, permissionFilter, selectedMSP]);

  const handleEdit = (u: Colaborator) => {
    resetInputs();
    setIdUser(u.idUser);
    setColaboratorName(u.name || "");
    setEmail(u.email || "");
    setPhone(u.phone || "");
    setUsername(u.username || "");
    setPosition(u.position || "");
    setDepartment("");
    setPermission(u.permission);
    setStatus(u.status);
    setHiringDate(
      u.hiringDate
        ? (typeof u.hiringDate === "string"
            ? u.hiringDate
            : (u.hiringDate as Date).toISOString().slice(0, 10))
        : "",
    );
    setIdBrandMaster(u.idBrandMaster ?? 0);
    document
      .getElementById("colaborator-register-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteClick = (u: Colaborator) => setDeleteModal(u);
  const handleDeleteClose = () => setDeleteModal(null);
  const handleDeleteConfirm = async () => {
    if (!deleteModal) return;
    const ok = await deleteUser(deleteModal.idUser);
    if (ok) {
      setDeleteModal(null);
      const list = await listUsers();
      setUsers(list);
    }
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
        {t("colaboratorRegister.tableTitle")}
      </TextRob16Font1S>

      <Stack
        flexDirection="row"
        flexWrap="wrap"
        gap="16px"
        alignItems="center"
        sx={{
          "@media (max-width: 659px)": { flexDirection: "column", alignItems: "stretch" },
        }}
      >
        <DropDown
          data={companyData}
          value={companyValue}
          onChange={(v) => {
            const id = (v?.value as number) ?? 0;
            setSelectedMSP(
              id > 0
                ? { idBrandMaster: id, brandName: (v?.label as string) || "" }
                : null,
            );
          }}
          placeholder={t("colaboratorRegister.companyFilterPlaceholder")}
          placeholderIcon={<FilterIcon fill={theme[mode].gray} />}
          sxContainer={{ width: "216px", "@media (max-width: 659px)": { width: "100%" } }}
        />
        <DropDown
          data={permissionOptions.map((o) => ({ ...o, value: o.value as unknown }))}
          value={permissionValue}
          onChange={(v) =>
            setPermissionFilter((v?.value as "all" | "admin" | "manager" | "member") ?? "all")
          }
          placeholder={t("colaboratorRegister.UserFilterPlaceholder")}
          placeholderIcon={<FilterIcon fill={theme[mode].gray} />}
          sxContainer={{ width: "216px", "@media (max-width: 659px)": { width: "100%" } }}
        />
      </Stack>

      <Stack gap="16px" sx={{ overflowX: "auto" }}>
        {filtered.length === 0 && (
          <TextRob16Font1S sx={{ color: theme[mode].gray }}>
            {t("colaboratorRegister.noActivity")}
          </TextRob16Font1S>
        )}
        {filtered.map((u) => (
          <Stack
            key={u.idUser}
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            gap="16px"
            sx={{
              padding: "16px",
              borderRadius: "12px",
              border: `1px solid ${theme[mode].grayLight}`,
              "@media (max-width: 659px)": { flexDirection: "column", alignItems: "flex-start" },
            }}
          >
            <Stack
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: theme[mode].grayLight,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextRob16Font1S sx={{ color: theme[mode].primary, fontWeight: 600 }}>
                {(u.name || u.username || "?").slice(0, 1).toUpperCase()}
              </TextRob16Font1S>
            </Stack>
            <Stack flex={1} minWidth={0}>
              <TextRob16Font1S
                sx={{
                  color: theme[mode].primary,
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {u.name || u.username}
              </TextRob16Font1S>
              <TextRob16Font1S
                sx={{ color: theme[mode].gray, fontSize: "12px" }}
              >
                {u.email}
              </TextRob16Font1S>
              <TextRob16Font1S
                sx={{ color: theme[mode].gray, fontSize: "12px", marginTop: "4px" }}
              >
                {t("colaboratorRegister.lastActivity")}{" "}
                {formatDate(u.lastActivity) ?? t("colaboratorRegister.noActivity")}
              </TextRob16Font1S>
            </Stack>
            <Stack flexDirection="row" gap="8px" flexWrap="wrap">
              <Chip
                label={t(`colaboratorRegister.${u.permission}`)}
                size="small"
                sx={{
                  backgroundColor: theme[mode].grayLight,
                  color: theme[mode].primary,
                  fontWeight: 500,
                }}
              />
              <Chip
                label={u.status === "active" ? t("colaboratorRegister.active") : t("colaboratorRegister.inactive")}
                size="small"
                sx={{
                  backgroundColor:
                    u.status === "active"
                      ? theme[mode].greenLight ?? theme[mode].grayLight
                      : theme[mode].grayLight,
                  color: theme[mode].primary,
                  fontWeight: 500,
                }}
              />
            </Stack>
            {(canEdit || canDelete) && (
              <Stack flexDirection="row" gap="8px">
                {canEdit && (
                  <IconButton
                    onClick={() => handleEdit(u)}
                    size="small"
                    sx={{ color: theme[mode].blue }}
                    aria-label="edit"
                  >
                    <EditCirclePencilIcon
                      width={20}
                      height={20}
                      fill={theme[mode].blue}
                    />
                  </IconButton>
                )}
                {canDelete && (
                  <IconButton
                    onClick={() => handleDeleteClick(u)}
                    size="small"
                    sx={{ color: theme[mode].danger }}
                    aria-label="delete"
                  >
                    <TrashIcon width={20} height={20} fill={theme[mode].danger} />
                  </IconButton>
                )}
              </Stack>
            )}
          </Stack>
        ))}
      </Stack>

      <Modal
        open={Boolean(deleteModal)}
        onClose={handleDeleteClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            padding: "24px",
            maxWidth: "400px",
            boxShadow: 24,
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              marginBottom: "16px",
            }}
          >
            {deleteModal
              ? t("colaboratorRegister.areYouSure", {
                  username: deleteModal.name || deleteModal.username,
                })
              : ""}
          </TextRob16Font1S>
          <Stack flexDirection="row" gap="16px" justifyContent="flex-end">
            <Btn
              onClick={handleDeleteClose}
              sx={{
                background: theme[mode].grayLight,
                color: theme[mode].primary,
                padding: "8px 16px",
                borderRadius: "12px",
              }}
            >
              <TextRob16Font1S>{t("generic.cancel")}</TextRob16Font1S>
            </Btn>
            <Btn
              onClick={handleDeleteConfirm}
              disabled={isLoading}
              sx={{
                background: theme[mode].danger,
                color: theme[mode].btnText,
                padding: "8px 16px",
                borderRadius: "12px",
              }}
            >
              <TextRob16Font1S>{t("colaboratorRegister.ok")}</TextRob16Font1S>
            </Btn>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};
