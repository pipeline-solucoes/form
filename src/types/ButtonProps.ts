
import { TypographyVariant } from "@mui/material/styles";

export interface ButtonProps {
  textButton?: string;
  variantButton?: TypographyVariant;

  backgroundButton?: string;
  backgroundHoverButton?: string;
  colorTextButton?: string;
  colorTextHoverButton?: string;  

  borderRadiusButton?: string;
  borderButton?: string;  
  boxShadowButton?: string;

  widthButton?: string;  
  heightButton?: string;
  paddingButton?: string;
  marginButton?: string;
}

export const BUTTON_STYLE_FORWARD_PROPS = [
  "textButton",
  "variantButton",
  "backgroundButton",
  "backgroundHoverButton",
  "colorTextButton",
  "colorTextHoverButton", 
  "borderRadiusButton",
  "borderButton",
  "boxShadowButton",
  "widthButton", 
  "heightButton",
  "paddingButton",
  "marginButton",
] as const;