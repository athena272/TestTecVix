import { SxProps, Stack } from "@mui/material";
import { useZTheme } from "../stores/useZTheme";
import { useWindowSize } from "../hooks/useWindowSize";
import { useCloseMenuTimed } from "../hooks/useCloseMenuTimed";
import { Screen } from "./Screen";
import { HeaderMobile } from "./HeaderMobile/HeaderMobile";
import { Header } from "../pages/Home/components/Header";
import { Sidebar } from "./Sidebar";

interface IProps {
  sx?: SxProps;
  sxContainer?: SxProps;
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  keepSubtitle?: boolean;
  sxTitleSubTitle?: SxProps;
}

export const ScreenFullPage = ({
  sx,
  children,
  className,
  isLoading,
  title,
  subtitle,
  keepSubtitle = false,
  sxContainer,
  sxTitleSubTitle,
  ...props
}: IProps) => {
  const { theme, mode } = useZTheme();
  const { width } = useWindowSize();
  useCloseMenuTimed();

  return (
    <Screen
      className={className}
      isLoading={isLoading}
      sx={{
        background:
          mode === "light"
            ? `linear-gradient(168deg, ${theme[mode].mainBackground} 0%, ${theme[mode].grayLight} 100%)`
            : `linear-gradient(168deg, ${theme[mode].grayLight} 50%, ${theme[mode].mainBackground} 100%)`,
        ...sx,
      }}
      {...props}
    >
      {/* Main */}
      <Stack
        flexDirection={"row"}
        className="h-full"
        sx={{
          width: "100%",
        }}
      >
        {/* Sidebar */}
        <Sidebar />
        {/* main */}
        <Stack
          width={"100%"}
          sx={{
            alignItems: "center",
            overflowY: "auto",
          }}
        >
          {/* Header  */}
          {width < 1000 ? (
            <HeaderMobile
              title={title}
              subtitle={subtitle}
              keepSubtitle={keepSubtitle}
            />
          ) : (
            <>
              <Header />
              {/* Title and subtitle */}
              <Stack
                sx={{
                  gap: "12px",
                  paddingTop: "40px",
                  paddingBottom: "24px",
                  width: "100%",
                  ...sxTitleSubTitle,
                }}
              >
                {title}
                {subtitle && subtitle}
              </Stack>
            </>
          )}

          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              flexDirection: "column",
              flex: 1,
              "@media (min-width: 1431px)": {
                paddingBottom: "40px",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "24px",
                paddingLeft: "40px",
                paddingRight: "40px",
                justifyContent: "center",
              },
              ...sxContainer,
            }}
          >
            {children}
          </Stack>
        </Stack>
      </Stack>
    </Screen>
  );
};
