import { useZTheme } from "../../../../stores/useZTheme";
import { IconButton, Modal, SxProps, Stack } from "@mui/material";
import { TextRob12Font2Xs } from "../../../../components/Text2Xs";
import { ShrinkIcon } from "../../../../icons/ZoomIcons";

interface IProps {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
  title?: string;
  children?: React.ReactNode;
}
export const ModalChart = ({
  title,
  open,
  onClose,
  children,
  ...props
}: IProps) => {
  const { mode, theme } = useZTheme();

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
          height: "90vh",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "16px",
          padding: "40px",
          ...props.sx,
        }}
      >
        {/* Header */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack>
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].primary,
              }}
            >
              {title}
            </TextRob12Font2Xs>
          </Stack>
          <IconButton
            onClick={onClose}
            sx={{
              padding: "0px",
            }}
          >
            <ShrinkIcon
              fill={theme[mode].gray}
              width={"20px"}
              height={"20px"}
            />
          </IconButton>
        </Stack>
        {/* Main */}
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {children}
        </Stack>
      </Stack>
    </Modal>
  );
};
