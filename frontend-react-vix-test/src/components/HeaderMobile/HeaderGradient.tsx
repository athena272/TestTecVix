import { SxProps, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";

interface Props {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const HeaderGradient = ({ sx = {}, children }: Props = {}) => {
  const { mode, theme } = useZTheme();
  return (
    <Stack
      sx={{
        height: "224px",
        minHeight: "224px",
        width: "100%",
        background: theme[mode].blueLight,
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
        marginBottom: "-75px",
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};
