import { Autocomplete, Divider, SxProps, TextField, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { Popper, PopperProps } from "@mui/material";

import React from "react";
import { shadow } from "../../utils/shadow";
import { useTranslation } from "react-i18next";
import { TextRob14Font1Xs } from "../Text1Xs";
import { makeEllipsis } from "../../utils/makeEllipsis";

interface IOption {
  id?: number;
  label: string;
  value: unknown;
  tag?: React.ReactNode;
}
interface Props {
  data: IOption[];
  sx?: SxProps;
  value?: IOption | null;
  onChange: (value: IOption | null) => void;
  sxContainer?: SxProps;
  placeholder?: string;
  placeholderIcon?: React.ReactNode;
  sxItemList?: SxProps;
  divider?: boolean;
  disabled?: boolean;
}

const CustomPopper = (props: PopperProps) => {
  const { theme, mode } = useZTheme();
  return (
    <Popper
      {...props}
      sx={{
        backgroundColor: theme[mode].mainBackground,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: `0px 4px 4px 2px ${shadow(mode)}`,
        "& .MuiPaper-root": {
          backgroundColor: theme[mode].mainBackground,
          overflow: "hidden",
          borderRadius: "12px",
        },
      }}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
    />
  );
};

export const DropDown = ({
  data,
  sx = {},
  value,
  onChange,
  sxContainer,
  placeholder,
  placeholderIcon,
  sxItemList,
  divider = true,
  disabled = false,
}: Props) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        ...sxContainer,
      }}
    >
      <Autocomplete
        disabled={disabled}
        disablePortal
        options={data}
        noOptionsText={
          <TextRob14Font1Xs
            sx={{
              color: theme[mode].primary,
              fontWeight: "400",
              lineHeight: "16px",
            }}
          >
            {t("myVMs.noOptions")}
          </TextRob14Font1Xs>
        }
        slots={{ popper: CustomPopper }}
        renderInput={(params) => {
          const inputProps = {
            ...params.inputProps,
            autoComplete: "off",
          };
          return (
            <TextField
              {...params}
              disabled={disabled}
              autoComplete="off"
              placeholder={placeholder}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: theme[mode].gray,
                  opacity: 1,
                },
                "& .MuiAutocomplete-input": {
                  color: theme[mode].primary,
                  fontSize: "14px",
                  "&.Mui-disabled": {
                    cursor: "not-allowed",
                  },
                },
              }}
              slotProps={{
                htmlInput: {
                  ...inputProps,
                },
                input: {
                  ...params.InputProps,
                  startAdornment: <>{placeholderIcon}</>,
                },
              }}
            />
          );
        }}
        renderOption={(propsWithKey, option, { index }) => {
          const { key, ...props } = propsWithKey;
          return (
            <div key={`${key}-${index}`}>
              <li
                {...props}
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: 0, // Isso garante que os filhos respeitem o tamanho máximo
                }}
              >
                {option.tag && (
                  <span style={{ marginLeft: "12px", marginRight: "-20px" }}>
                    {option.tag}
                  </span>
                )}
                <TextRob14Font1Xs
                  sx={{
                    color: theme[mode].primary,
                    fontWeight: "400",
                    lineHeight: "16px",
                    padding: "12px 20px",
                    alignItems: "center",
                    maxWidth: "100%", // Garante que o texto não ultrapasse
                    flexGrow: 1, // Faz com que o texto ocupe o espaço disponível
                    display: "flex",
                    ...makeEllipsis(), // Aplica o ellipsis
                    ...sxItemList,
                  }}
                >
                  {option.label}
                </TextRob14Font1Xs>
              </li>
              {divider && index < data.length - 1 && (
                <Divider
                  sx={{ marginX: "12px", borderColor: theme[mode].grayLight }}
                />
              )}
            </div>
          );
        }}
        value={value}
        onChange={(_, value) => onChange(value)}
        slotProps={{
          listbox: {
            sx: {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
              fontSize: "14px",
              gap: "8px",
              "& .MuiAutocomplete-option": {
                padding: "4px 12px",
                "&:hover": {
                  backgroundColor: theme[mode].grayLight,
                },
              },
            },
          },
        }}
        sx={{
          backgroundColor: "transparent",
          boxShadow: `0px 4px 4px 2px ${shadow(mode)}`,
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            height: "40px",
            backgroundColor: theme[mode].mainBackground,
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
                borderWidth: "1px",
              },
            },
            "& .MuiAutocomplete-popupIndicator": {
              color: theme[mode].gray,
            },
            "& .MuiAutocomplete-clearIndicator": {
              color: theme[mode].blue,
              "&:hover": {
                color: theme[mode].blueDark,
              },
            },
            "& .Mui-disabled": {
              cursor: "not-allowed",
              WebkitTextFillColor: theme[mode].primary + " !important",
              opacity: 0.5,
              "& fieldset": {
                cursor: "not-allowed",
              },
            },
          },
          ...sx,
        }}
      />
    </Stack>
  );
};
