import { Backdrop, CircularProgress, SxProps, Stack } from "@mui/material";
import { useZTheme } from "../stores/useZTheme";

interface IScreenProps {
  sx?: SxProps;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}
export const Screen = ({
  sx,
  children,
  className,
  isLoading,
  ...props
}: IScreenProps) => {
  const { mode, theme, maxZindex } = useZTheme();
  return (
    <>
      {isLoading && (
        <Backdrop
          open={isLoading}
          sx={{
            zIndex: maxZindex,
          }}
        >
          <CircularProgress
            color="inherit"
            sx={{
              color: theme[mode].blue,
            }}
          />
        </Backdrop>
      )}
      <Stack
        sx={{
          backgroundColor: theme[mode].mainBackground,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          maxHeight: window.innerHeight,
          maxWidth: window.innerWidth,
          ...sx,
        }}
        className={className}
        {...props}
      >
        {children}
      </Stack>
    </>
  );
};
