'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { CSSObject, styled, TypographyVariant, useTheme } from '@mui/material/styles';
import { BorderProps, ColorProps, LayoutProps, PipelineSolucoesTypographyTokens } from '@pipelinesolucoes/theme';


export interface ChipListProps 
  extends Pick<ColorProps, 'background' | 'color' | 'backgroundHover' | 'colorHover'>,
  Pick<LayoutProps, 'width' | 'height' | 'padding' | 'margin'>,
  BorderProps {
  items: string[];
  variant?: TypographyVariant;
}

const StyledChipArea = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
});

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) =>
    ![
      'width',
      'height',
      'padding',
      'margin',
      'background',
      'colorText',
      'borderRadius',
      'boxShadow',
      'border',
      'backgroundHover',
      'colorHover',
      'typo',
    ].includes(prop as string),
})<{
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  background?: string;
  colorText?: string;
  borderRadius?: string;
  boxShadow?: string;
  border?: string;
  backgroundHover?: string;
  colorHover?: string;
  typo?: CSSObject | PipelineSolucoesTypographyTokens
}>(
  ({
    width,
    height,
    padding,
    margin,
    background,
    colorText,
    borderRadius,
    boxShadow,
    border,
    backgroundHover,
    colorHover,
    typo
  }) => ({
    width,
    height,
    padding,
    margin,
    borderRadius,
    boxShadow,
    backgroundColor: background,
    color: colorText,
    border,

    ...(typo ?? {}),

    '&:hover': {
      backgroundColor: backgroundHover ?? background,
      color: colorHover ?? colorText,
    },

    '&.MuiChip-outlined': {
      backgroundColor: 'transparent',
    },

    '&.MuiChip-outlined:hover': {
      backgroundColor: backgroundHover ?? 'transparent',
      color: colorHover ?? colorText,
    },
  })
);


const ChipList: React.FC<ChipListProps> = ({
  items,
  variant,

  width,
  height,
  padding,
  margin,
  background,
  color,
  borderRadius,
  boxShadow,
  border,
  backgroundHover,
  colorHover,

}) => {

  const theme = useTheme();
  const themechip = theme.pipelinesolucoes?.forms?.chip;

  const wchip = themechip?.width ?? width ?? '100%';
  const hchip = themechip?.height ?? height ?? 'auto';
  const pchip = themechip?.padding ?? padding ?? '16px';
  const mchip = themechip?.margin ?? margin ?? '0';
  const bchip = themechip?.background ?? background ?? '#ffffff';
  const clchip = themechip?.color ?? color ?? 'inherit';
  const brchip = themechip?.borderRadius ?? borderRadius ?? 'inherit';
  const bschip = themechip?.boxShadow ?? boxShadow ?? 'none';

  const bdchip = themechip?.border ?? border ?? 'inherit';
  const bHoverchip = themechip?.backgroundHover ?? backgroundHover ?? bchip;
  const clHoverchip = themechip?.colorHover ?? colorHover ?? clchip;

  const typo =
    (variant && theme.typography[variant]) ??
    themechip?.typography ??
    theme.typography.body1;

  return (
    <StyledChipArea>
      {items.map((item, idx) => (
        <StyledChip
          key={`${item}-${idx}`}
          label={item}          
          width={wchip}
          height={hchip}
          padding={pchip}
          margin={mchip}
          background={bchip}
          colorText={clchip}
          borderRadius={brchip}
          boxShadow={bschip}
          border={bdchip}
          backgroundHover={bHoverchip}
          colorHover={clHoverchip}
          typo={typo}
        />
      ))}
    </StyledChipArea>
  );
};

ChipList.displayName = 'ChipList';
export default ChipList;
