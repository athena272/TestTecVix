import { IconButton, Modal, SxProps, Stack } from "@mui/material";
import React from "react";
import { useZTheme } from "../../stores/useZTheme";
import { CloseXIcon } from "../../icons/CloseXIcon";

interface IProps {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
  sxModal?: SxProps;
  sxHeader?: SxProps;
  sxCloseButton?: SxProps;
  title?: React.ReactNode;
  content?: React.ReactNode;
}
export const ModalSimple = ({
  open,
  onClose,
  sx,
  sxModal,
  sxHeader,
  sxCloseButton,
  title,
  content,
}: IProps) => {
  const { theme, mode } = useZTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sxModal,
      }}
    >
      <Stack
        sx={{
          width: "80%",
          height: "fit-content",
          maxHeight: "85vh",
          overflowY: "auto",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "12px",
          padding: "24px",
          gap: "12px",
          ...sx,
        }}
      >
        {/* Header - Title - close */}
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            ...sxHeader,
          }}
        >
          {title}
          <IconButton onClick={() => onClose()} sx={{ ...sxCloseButton }}>
            <CloseXIcon fill={theme[mode].gray} />
          </IconButton>
        </Stack>
        {/* Content */}
        {content}
      </Stack>
    </Modal>
  );
};
