import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

interface TextFieldStyledProps {
  background_color: string;
  text_color: string;
  text_color_error: string;
  border_radius: string;
  width?: string;
}

export const TextFieldStyled = styled(TextField, {
  shouldForwardProp: (prop) =>
    !['background_color', 'text_color', 'text_color_error', 'border_radius', 'width'].includes(prop as string),
})<TextFieldStyledProps>(({ theme, background_color, text_color, text_color_error, border_radius, error, width='100%' }) => ({

  '& .MuiInputLabel-root': {
    color: error ? text_color_error : text_color, // Label em vermelho em caso de erro
  },
  '& .MuiInputBase-input::placeholder': {
    color: error ? text_color_error : text_color, // Placeholder também em vermelho, opcional
  },
  '& .MuiInputBase-root': {
    backgroundColor: background_color,
    borderRadius: border_radius,
    color: text_color,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: error ? text_color_error : 'transparent', // Borda em vermelho em caso de erro
  },
  
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1?.fontSize,
  fontWeight: theme.typography.body1?.fontWeight,
  fontStyle: theme.typography.body1?.fontStyle,
  lineHeight: theme.typography.body1?.lineHeight,
  letterSpacing: theme.typography.body1?.letterSpacing,
  margin: theme.typography.body1?.margin,
  width: width,
}));


interface TextFieldFixedSizeStyledProps {
  background_color: string;
  text_color: string;
  text_color_error: string;
  border_radius: string;
}

export const TextFieldFixedSizeStyled = styled(TextField, {
  shouldForwardProp: (prop) =>
    !['background_color', 'text_color', 'text_color_error', 'border_radius'].includes(prop as string),
})<TextFieldFixedSizeStyledProps>(({ theme, background_color, text_color, text_color_error, border_radius, error }) => ({

'& .MuiInputLabel-root': {
    color: error ? text_color_error : text_color, // Label em vermelho em caso de erro
  },
  '& .MuiInputBase-input::placeholder': {
    color: error ? text_color_error : text_color, // Placeholder também em vermelho, opcional
  },
  '& .MuiInputBase-root': {
    transition: 'none !important',
    alignItems: 'flex-start',
    width: '100%',
    overflowY: 'auto',
    height: '150px',
    backgroundColor: background_color,
    borderRadius: border_radius,
    color: text_color,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: error ? text_color_error : 'transparent', // Borda em vermelho em caso de erro
  },

  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1?.fontSize,
  fontWeight: theme.typography.body1?.fontWeight,
  fontStyle: theme.typography.body1?.fontStyle,
  lineHeight: theme.typography.body1?.lineHeight,
  letterSpacing: theme.typography.body1?.letterSpacing,
  margin: theme.typography.body1?.margin,
}));


interface ButtonFormStyledProps {
  width: string;
  height: string;
  background_color: string;
  text_color: string;
  border_radius: string;
  border_color?: string;
  margin?: string;
}

export const ButtonFormStyled = styled(Button, {
  shouldForwardProp: (prop) =>
    !['width', 'height', 'background_color', 'text_color', 
      'border_radius', 'border_color', 'margin'].includes(prop as string),
})<ButtonFormStyledProps>(
  ({ theme, width, height, background_color, text_color,
     border_radius, border_color='transparent', margin = '0' }) => ({
  
  color: text_color,
  backgroundColor: background_color,
  borderRadius: border_radius,
  textTransform: 'none',  
  cursor: 'pointer',
  padding: '8px 24px',
  boxShadow: 'none',
  width: width,
  height: height,
  border: (border_color == "transparent" ? "none" : `1px solid ${border_color}`),
  margin: margin,
  
  // Tipografia
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.body1?.fontWeight,
  fontStyle: theme.typography.body1?.fontStyle,
  lineHeight: theme.typography.body1?.lineHeight,
  letterSpacing: theme.typography.body1?.letterSpacing,
  fontSize: theme.typography.body1?.fontSize,  

  // Hover state (opcional)
  '&:hover': {
    backgroundColor: background_color,
    opacity: 0.9,
  },
}));

export const LinkFormStyled = styled(Button, {
  shouldForwardProp: (prop) =>
    !['width', 'height', 'text_color', 'margin', 'font_size'].includes(prop as string),
})<{ width: string; height: string; text_color: string; margin?: string; font_size?: string}>
(({ theme, width, height, text_color, margin = 0, font_size}) => ({
  
  color: text_color, 
  width: width,
  height: height, 
  textTransform: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
  boxShadow: 'none',
  margin: margin,
    
  // Tipografia
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.body1?.fontWeight,
  fontStyle: theme.typography.body1?.fontStyle,
  lineHeight: theme.typography.body1?.lineHeight,
  letterSpacing: theme.typography.body1?.letterSpacing,
  fontSize: (font_size ? font_size : theme.typography.body1?.fontSize),  
}));
