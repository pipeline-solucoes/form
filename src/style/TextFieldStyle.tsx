import { TextField } from "@mui/material";
import { styled, type CSSObject } from "@mui/material/styles";
import { PipelineSolucoesTypographyTokens } from "@pipelinesolucoes/theme";

export const TextFieldStyled = styled(TextField, {
  shouldForwardProp: (prop) =>
    ![
      "background",      
      "backgroundDisabled",
      "colorText",
      "backgroundFocused",
      "colorFocused",
      "colorDisabled",
      "borderRadius",
      "boxShadow",
      "borderColor",
      "padding",
      "typo",
      "heigth",
      "marginField",
    ].includes(prop as string),
})<{
  background?: string;
  backgroundFocused?: string;
  backgroundDisabled?: string;
  colorText?: string;
  colorFocused?: string;
  colorDisabled?: string;
  borderRadius?: string;
  boxShadow?: string;
  borderColor?: string;
  padding?: string;
  marginField?: string;
  typo?: CSSObject | PipelineSolucoesTypographyTokens;
  height?: string;
}>(
  ({
    background,
    backgroundFocused,
    backgroundDisabled,
    colorText,
    colorFocused,
    colorDisabled,
    borderRadius,
    boxShadow,
    borderColor,
    padding,
    typo,
    height,
    marginField
  }) => ({
    borderRadius,
    boxShadow,

    "& .MuiInputBase-root": {
      color: colorText,
    },

    "& .MuiOutlinedInput-root": {
      background,
      borderRadius,
      boxShadow,
      height,      

      "& .MuiInputBase-input": { 
        margin: marginField, 
        ...(padding ? { padding } : {}),           
        ...(typo ?? {}),
      },

      "& textarea.MuiInputBase-input": {
        margin: marginField, 
        ...(padding ? { padding } : {}),        
        ...(typo ?? {}),
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor,
      },

      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor,
      },

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: colorFocused,
      },

      "&.Mui-disabled": {
        background: backgroundDisabled,
        color: colorDisabled,
      },

      "& input.Mui-disabled": {
        WebkitTextFillColor: colorDisabled,
      },

      "& input::placeholder": {
        ...(typo ?? {}),
        opacity: 0.7,
      },

      "& textarea::placeholder": {
        ...(typo ?? {}),
        opacity: 0.7,
      },
    },

    "& .MuiInputLabel-root": {
      color: colorText,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorFocused,
    },

    "& .MuiInputLabel-root.Mui-disabled": {
      color: colorDisabled,
    },
  })
);
