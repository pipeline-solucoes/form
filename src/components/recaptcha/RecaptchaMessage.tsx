'use client';
import { styled } from "@mui/material";

const Text = styled('div', {
  shouldForwardProp: (prop) =>
    !['text_color'].includes(prop as string),
})<{text_color: string}>(({ theme, text_color }) => ({

  color: text_color,  
}));

const LinkStyled = styled('a', {
  shouldForwardProp: (prop) =>
    ![      
      'text_color',      
    ].includes(prop as string),
})<{ text_color: string; }>(({ theme,text_color }) => ({
  width: 'auto',
  cursor: 'pointer',  
  textTransform: 'none',
  textAlign: 'center',
  boxShadow: 'none',  
  padding: '0',
  margin: '0',
  color: text_color,   
}));

export interface RecaptchaMessageProps {
  color: string;
}

const RecaptchaMessage: React.FC<RecaptchaMessageProps> = ({color}) => {
  
  return (
    <Text text_color={color}>
        Este site é protegido pelo Google reCAPTCHA e está sujeito à {' '}
        <LinkStyled href="https://policies.google.com/privacy" text_color={color} 
        aria-label='link termo de uso' target="_blank" rel="noopener noreferrer">Política de Privacidade</LinkStyled>                  
        {' '} e aos {' '}
        <LinkStyled href="https://policies.google.com/terms" text_color={color} 
        aria-label='link termo de uso' target="_blank" rel="noopener noreferrer">Termos de Serviço</LinkStyled> do Google.
    </Text>
  );

};

export default RecaptchaMessage;