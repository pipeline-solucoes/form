import { ButtonProps, BUTTON_STYLE_FORWARD_PROPS } from "../types/ButtonProps";
import { Button, styled } from "@mui/material";

export const ButtonFormStyled = styled(Button, {  
    shouldForwardProp: (prop) => !BUTTON_STYLE_FORWARD_PROPS.includes(prop as keyof ButtonProps),
})<ButtonProps>(
  ({
    backgroundButton,
    backgroundHoverButton,
    colorTextButton,
    colorTextHoverButton,
    borderRadiusButton,
    borderButton,
    boxShadowButton,
    widthButton,
    heightButton,
    paddingButton,
    marginButton,
  }) => ({
    color: colorTextButton,
    background: backgroundButton,
    borderRadius: borderRadiusButton,
    textTransform: "none",
    cursor: "pointer",

    padding: paddingButton,
    boxShadow: boxShadowButton,
    width: widthButton,
    height: heightButton,
    border: borderButton,
    margin: marginButton,

    "&:hover": {
      background: backgroundHoverButton,
      color: colorTextHoverButton,
    },
  })
);