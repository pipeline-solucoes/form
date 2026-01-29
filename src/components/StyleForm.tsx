import { Box, styled } from "@mui/material";

export const FormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  margin: 'auto',
  padding: '0px',
}));

export const DivTitulo = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  margin: '0',
  padding: '0',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DivCampos = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
  margin: '0',
  padding: '0',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DivLink = styled('div', {
  shouldForwardProp: (prop) => !['text_color', 'align'].includes(prop as string),
})<{ text_color?: string; align?: string }>(({ text_color, align='center' }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: align,
  width: '100%',
  padding: '0',
  flex: '1',
  color: text_color ?? "#000",
}));

export const StyledRoot = styled(Box, {
  shouldForwardProp: (prop) => 
    !['background', 'border_radius', 'box_shadow', 'border', 'maxWidth'].includes(prop as string),
})<{
  background: string;
  border_radius: string;
  box_shadow: string;
  border: string;
  maxWidth?: string;
}>(({ background, border_radius, box_shadow, border, maxWidth="100%" }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '24px',
  flex: 1,
  padding: '24px',
  borderRadius: border_radius ?? '0px',
  boxShadow: box_shadow,
  background: background,
  border: border,
  maxWidth: maxWidth
}));
