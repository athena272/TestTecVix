import { Modal, Stack, IconButton, TextField, InputAdornment } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { CloseXIcon } from "../../../icons/CloseXIcon";
import { TextRob18Font2M } from "../../../components/Text2M";
import { TextRob16FontL } from "../../../components/TextL";
import { useTranslation } from "react-i18next";
import { EOS } from "../../../stores/useZVMSugestion";
import { useZVM } from "../../../stores/useZVM";
import { TOptions } from "../../../types/FormType";
import { useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { getOSLabel } from "../../../utils/getOSLabel";

interface IProps {
  open: boolean;
  onClose: () => void;
}

// Lista de SOs disponíveis (excluindo notFound)
const availableOSs: EOS[] = [
  EOS.ubuntu2404,
  EOS.ubuntu2204,
  EOS.ubuntu2004,
  EOS.debian12,
  EOS.debian11,
  EOS.opensuse,
  EOS.archlinux,
  EOS.fedora40,
  EOS.centos9,
  EOS.centos10,
  EOS.win10,
  EOS.win2019std,
  EOS.win2022std,
  EOS.edgeprotectv1,
  EOS.os3cx,
  EOS.yeastar,
  EOS.mikrotik,
  EOS.pfsense,
  EOS.rockylinux10,
];

export const ModalMarketPlaceISO = ({ open, onClose }: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { setVmSO, searchMarketPlace, setSearchMarketPlace } = useZVM();
  const [localSearch, setLocalSearch] = useState("");

  // Filtrar SOs baseado na busca
  const filteredOSs = useMemo(() => {
    const searchTerm = (localSearch || searchMarketPlace || "").toLowerCase();
    if (!searchTerm) return availableOSs;

    return availableOSs.filter((os) => {
      const label = getOSLabel(os, t).toLowerCase();
      return label.includes(searchTerm) || os.toLowerCase().includes(searchTerm);
    });
  }, [localSearch, searchMarketPlace, t]);

  const handleSelectOS = (os: EOS) => {
    const label = getOSLabel(os, t);
    setVmSO({
      label,
      value: os,
    } as TOptions);
    setLocalSearch("");
    setSearchMarketPlace("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "90%",
          maxWidth: "800px",
          maxHeight: "85vh",
          overflowY: "auto",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "12px",
          padding: "24px",
          gap: "24px",
        }}
      >
        {/* Header */}
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextRob18Font2M
            sx={{
              color: theme[mode].primary,
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            {t("isos.marketPlace")}
          </TextRob18Font2M>
          <IconButton onClick={onClose}>
            <CloseXIcon fill={theme[mode].gray} />
          </IconButton>
        </Stack>

        {/* Search */}
        <TextField
          placeholder={t("isos.placeholederSearchISO")}
          value={localSearch || searchMarketPlace || ""}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            setSearchMarketPlace(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme[mode].gray }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme[mode].grayLight,
              borderRadius: "12px",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: theme[mode].blue,
              },
              "&.Mui-focused": {
                backgroundColor: theme[mode].mainBackground,
                "& fieldset": {
                  borderColor: theme[mode].blue,
                  boxShadow: `0px 0px 4px ${theme[mode].blue}`,
                },
              },
            },
          }}
        />

        {/* OS List */}
        <Stack
          sx={{
            gap: "8px",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          {filteredOSs.length === 0 ? (
            <TextRob16FontL
              sx={{
                color: theme[mode].gray,
                textAlign: "center",
                padding: "24px",
              }}
            >
              {t("generic.notFound")}
            </TextRob16FontL>
          ) : (
            filteredOSs.map((os) => {
              const label = getOSLabel(os, t);
              return (
                <Stack
                  key={os}
                  onClick={() => handleSelectOS(os)}
                  sx={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    backgroundColor: theme[mode].grayLight,
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: theme[mode].light,
                    },
                  }}
                >
                  <TextRob16FontL
                    sx={{
                      color: theme[mode].primary,
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    {label}
                  </TextRob16FontL>
                </Stack>
              );
            })
          )}
        </Stack>
      </Stack>
    </Modal>
  );
};
