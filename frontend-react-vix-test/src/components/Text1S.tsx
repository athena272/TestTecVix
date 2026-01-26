import { SxProps, Typography, TypographyProps } from "@mui/material";

interface IProps extends Omit<TypographyProps, "sx"> {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const TextRob16Font1S = ({ sx = {}, children, ...rest }: IProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px",
        letterSpacing: "2%",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};
