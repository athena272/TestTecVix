import { Modal, SxProps, Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { FormEditVM } from "./FormEditVM";

interface IProps {
  open: boolean;
  onClose: (edit?: boolean) => void;
  sx?: SxProps;
}
export const ModalEditVM = ({ open, onClose, sx }: IProps) => {
  const { theme, mode } = useZTheme();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-hidden={!open}
      sx={{
        display: "flex",
        justifyContent: "center",
        overflowY: "auto",
        paddingTop: "32px",
        paddingBottom: "32px",
      }}
    >
      <Stack
        sx={{
          width: "90%",
          maxWidth: "1000px",
          height: "fit-content",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "12px",
          padding: "24px",
          ...sx,
        }}
      >
        <FormEditVM onClose={onClose} />
      </Stack>
    </Modal>
  );
};
