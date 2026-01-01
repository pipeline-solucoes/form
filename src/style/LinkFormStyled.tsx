import { fbcolorFocused, fbmargin } from "../constant";
import { Button, styled } from "@mui/material";

export const LinkFormStyled = styled(Button, {
  shouldForwardProp: (prop) =>
    !['width', 'height', 'text_color', 'margin', 'font_size'].includes(prop as string),
})<{ width?: string; height?: string; text_color?: string; margin?: string; font_size?: string}>
(({ width='auto', height='auto', text_color, margin = 0 }) => ({
  
  color: text_color ?? fbcolorFocused, 
  width: width ?? 'auto',
  height: height ?? 'auto', 
  textTransform: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
  boxShadow: 'none',
  margin: margin ?? fbmargin,   
}));