'use client';

import React from 'react';
import { Box } from '@mui/material';
import { CSSObject, styled, TypographyVariant, useTheme } from '@mui/material/styles';
import { BorderProps, ColorProps, LayoutProps, PipelineSolucoesTypographyTokens } from '@pipelinesolucoes/theme';
import { fbbackground, fbborderColor, fbborderRadius, fbboxShadow, fbcolor, fbheigth, fbmargin, fbpadding } from '../constant';

export interface FieldProps extends 
      Omit<ColorProps, 'backgroundHover' | 'backgroundFocused' | 'backgroundDisabled'  | 'colorHover' | 'colorDisabled' | 'colorFocused'>, 
      Omit<BorderProps, 'border' >, 
      Pick<LayoutProps, 'width' | 'height' | 'padding' | 'margin' | "maxWidth"> {

  label: string;
  textVariantLabel?: TypographyVariant;
  colorLabel?: string;

  value?: string | number | null;
  textVariantField?: TypographyVariant;
  width?: string;
}

const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      'maxWidth', 'background', 'backgroundFocused', 'backgroundDisabled', 'color',
      'borderRadius', 'boxShadow', 'borderColor', 'padding',
      'height', 'width', 'margin',      
    ].includes(prop as string),
})<{maxWidth?: string; background?: string; color?: string; 
  borderRadius?: string | number; boxShadow?: string; borderColor?: string;
  padding?: string | number; margin?: string | number; 
  height?: string | number; width?: string | number;
  typo?: CSSObject | PipelineSolucoesTypographyTokens;
}>(
  ({maxWidth, background, color, borderRadius, boxShadow, borderColor,
    padding, height, width, margin, typo, theme, }) => ({

    display: 'flex',
    flexDirection: 'column',  
    width: width,  
    minWidth: 150,
    maxWidth: maxWidth || '100%',
    background: background || 'transparent',
    color: color || theme.palette.text.primary,
    borderRadius: borderRadius ?? theme.shape.borderRadius,
    boxShadow: boxShadow ?? 'none',
    border: borderColor ? `1px solid ${borderColor}` : 'none',
    padding: padding ?? theme.spacing(1),
    height: height ?? 'auto',
    margin: margin ?? 0,
    ...(typo ?? {}),
  })
);

const LabelStyle = styled(Box, {
  shouldForwardProp: (prop) =>
    !['color','typo',].includes(prop as string),
})<{color?: string; 
  typo?: CSSObject | PipelineSolucoesTypographyTokens;
}>(
  ({color, typo, theme, }) => ({
    color: color || theme.palette.text.primary,
    ...(typo ?? {}),
  })
);


const Field: React.FC<FieldProps> = ({ 
  label, 
  textVariantLabel = 'caption',
  colorLabel,

  value, 
  background,
  color,
  borderRadius,
  boxShadow,
  borderColor,    
  textVariantField = 'body1',

  padding,
  height,
  margin,
  width='auto',
  maxWidth = '100%' }) => {


  const theme = useTheme();

  // props -> tokens -> fallback
  const field = theme.pipelinesolucoes?.forms?.field;
  const bg = background ?? field?.background ?? fbbackground;
  const txt = color ?? field?.color ?? fbcolor;
  const br = borderRadius ?? field?.borderRadius ?? fbborderRadius;
  const sh = boxShadow ?? field?.boxShadow ?? fbboxShadow;
  const bd = borderColor ?? field?.borderColor ?? fbborderColor;
  const pad = padding ?? field?.padding ?? fbpadding;
  const mg = margin ?? field?.margin ?? fbmargin;  
  const hg = height ?? field?.height ?? fbheigth; 
  
  const typoField =
    (textVariantField && theme.typography[textVariantField]) ??
    field?.typography ??
    theme.typography.body1;
    
  const labelTheme = theme.pipelinesolucoes?.forms?.label;  
  const typoLabel =
    (textVariantLabel && theme.typography[textVariantLabel]) ??
    labelTheme?.typography ??
    theme.typography.caption;
  const color_label = colorLabel ?? labelTheme?.color ?? fbcolor;
    
  return (
    <StyledContainer maxWidth={maxWidth} background={bg} 
    color={txt} borderRadius={br} boxShadow={sh} borderColor={bd}
    padding={pad} height={hg} margin={mg} typo={typoField} width={width}>
    
      <LabelStyle typo={typoLabel} color={color_label}>{label}</LabelStyle>
      <div>{value ?? '-'}</div>

    </StyledContainer>
  );
};


Field.displayName = 'Field';
export default Field;