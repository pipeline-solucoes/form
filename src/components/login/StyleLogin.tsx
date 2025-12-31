import { styled } from "@mui/material";

export const FormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
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
