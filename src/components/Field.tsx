'use client';

import React from 'react';
import { Box } from '@mui/material';
import { CSSObject, styled, TypographyVariant, useTheme } from '@mui/material/styles';
import { ColorProps, LayoutProps, PipelineSolucoesTypographyTokens } from '@pipelinesolucoes/theme';
import { fbbackground, fbcolor } from '../constant';

export interface FieldProps extends 
      Pick<ColorProps, 'background' | 'color'>, 
      Pick<LayoutProps, 'width' | "maxWidth"> {

  label: string;
  textVariantLabel?: TypographyVariant;
  colorLabel?: string;

  value?: string | number | null;
  textVariantField?: TypographyVariant;
  width?: string;
}

const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['maxWidth', 'background', 'color', 'width'].includes(prop as string),
})<{background?: string; color?: string; 
  maxWidth?: string; width?: string | number;
  typo?: CSSObject | PipelineSolucoesTypographyTokens;
}>(
  ({maxWidth, background, color, width, typo, theme, }) => ({

    display: 'flex',
    flexDirection: 'column',  
    width: width,  
    minWidth: 150,
    maxWidth: maxWidth || '100%',
    background: background || 'transparent',
    color: color || theme.palette.text.primary,
    height:'auto',
    margin: 0,
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
  textVariantField = 'body1',

  width='auto',
  maxWidth = '100%' }) => {


  const theme = useTheme();

  // props -> tokens -> fallback
  const field = theme.pipelinesolucoes?.forms?.field;
  const bg = background ?? field?.background ?? fbbackground;
  const txt = color ?? field?.color ?? fbcolor;
  
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
      color={txt} typo={typoField} width={width}>
      <LabelStyle typo={typoLabel} color={color_label}>{label}</LabelStyle>
      <div>{value ?? '-'}</div>
    </StyledContainer>
  );
};


Field.displayName = 'Field';
export default Field;