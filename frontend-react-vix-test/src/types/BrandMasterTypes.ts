import { themeColors } from "../stores/useZTheme";

export interface IBrandMasterResponse {
  idBrandMaster: number;
  brandLogo: string | null;
  brandName: string;
  domain: string;
  emailContact: null;
  fieldName: null;
  location: string | null;
  setorName: string | null;
  smsContact: string | null;
  timezone: string | null;
  city: string | null;
  brandTheme: {
    themeName: string;
    mode: "light" | "dark";
    themeDark: themeColors;
    themeLight: themeColors;
    version: number;
  } | null;

  manual?: string | null;
  termsOfUse?: string | null;
  privacyPolicy?: string | null;
  allowLogoChange?: boolean | null;
  allowEditContactInfo?: boolean | null;
  allowEditPassword?: boolean | null;
  allowEditProfileImage?: boolean | null;
}

export interface IBrandMasterBasicInfo {
  idBrandMaster: number;
  brandName: string;
}
