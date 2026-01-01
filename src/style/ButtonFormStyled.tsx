import { ButtonProps, BUTTON_STYLE_FORWARD_PROPS } from "../../types/ButtonProps";
import { Button, styled } from "@mui/material";

export const ButtonFormStyled = styled(Button, {  
    shouldForwardProp: (prop) => !BUTTON_STYLE_FORWARD_PROPS.includes(prop as keyof ButtonProps),
})<ButtonProps>(
  ({
    backgroundButton,
    backgroundHoverButton,
    colorButton,
    colorHoverButton,
    borderRadiusButton,
    borderButton,
    boxShadowButton,
    widthButton,
    heightButton,
    paddingButton,
    marginButton,
  }) => ({
    color: colorButton ?? '#000',
    background: backgroundButton ?? 'transparent',
    borderRadius: borderRadiusButton ?? '0',
    textTransform: "none",
    cursor: "pointer",

    padding: paddingButton ?? '4px 24px',
    boxShadow: boxShadowButton ?? 'none',
    width: widthButton,
    height: heightButton,
    border: borderButton,
    margin: marginButton,

    "&:hover": {
      background: backgroundHoverButton ?? 'transparent',
      color: colorHoverButton ?? '#000',
    },
  })
);