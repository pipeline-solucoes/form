'use client';

import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Divider, IconButton, InputAdornment, SvgIconProps, Typography } from '@mui/material';
import { ButtonFormStyled, LinkFormStyled, TextFieldStyled } from './FormStyled';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';

const FormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  margin: 'auto',
  padding: '0px',
}));

const DivPassword = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  margin: '0',
  padding: '0',
}));

const DivTitulo = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  margin: '0',
  padding: '0',
  alignItems: 'center',
  justifyContent: 'center'
}));

const GoogleIconStyle = styled(GoogleIcon, {
  shouldForwardProp: (prop) =>
    !['color_icon'].includes(prop as string),
})<{ color_icon: string;}>
(({ color_icon }) => ({
   
  color: color_icon, 
  marginRight: '16px'
}));  

const DivLink = styled("div", {
  shouldForwardProp: (prop) =>
    !['text_color', 'align'].includes(prop as string),
})<{ text_color: string; align: string;}>
(({ theme, text_color, align }) => ({
  
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: align,  
  width: '100%',  
  padding: '0',
  flex: '1',
  color: text_color,

  // Tipografia
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.body1?.fontWeight,
  fontStyle: theme.typography.body1?.fontStyle,
  lineHeight: theme.typography.body1?.lineHeight,
  letterSpacing: theme.typography.body1?.letterSpacing,
  fontSize: theme.typography.body1?.fontSize,
  margin: theme.typography.body1?.margin,
}));


interface LoginFormProps {
  Icon?: React.ElementType<SvgIconProps>; 
  titulo?: () => React.ReactElement;
  googleButton: () => React.ReactElement;
  color: string;
  background?: string;
  border_radius?: string;
  background_color_field?: string;
  border_radius_field?: string;    
  color_button: string;
  background_color_button?: string;
  border_radius_button?: string;
  text_button: string;  
  message_sucess: string;
  color_message_sucess: string;
  message_erro?: string;
  color_message_erro: string;  
  color_link: string; 
  color_separador: string; 
  background_color_button_google?: string; 
  color_button_google: string;    
  urlRecuperarConta: string;
  urlCriarConta: string;  
  children?: React.ReactNode;
}

const LoginForm: React.FC<LoginFormProps> = ({
  Icon,
  titulo,
  googleButton,
  color,
  background = 'transparent',
  border_radius = '0px',  
  background_color_field = 'transparent',
  border_radius_field = '0px',
  color_button,
  background_color_button = 'transparent',
  border_radius_button = '0px',
  text_button,
  message_sucess,
  color_message_sucess,
  message_erro,
  color_message_erro, 
  color_link,
  color_separador,
  background_color_button_google = 'transparent',
  color_button_google,  
  urlRecuperarConta, 
  urlCriarConta,
  children
}) => {  
  
  const [mensagemApi, setMensagemApi] = useState('');
  const [corMensagemApi, setCorMensagemApi] = useState(color_message_erro); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);  
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);  

  const handleBlur = (field: string) => {
    switch (field) {
      case 'email':
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: !validateEmail(email),
        }));
        break;             
      default:        
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: !password.trim(),
        }));        
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos campos
    const newErrors: { [key: string]: boolean } = {      
      email: !validateEmail(email),      
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi(
        `Alguns dos dados fornecidos estão inválidos. Por favor, revise as informações preenchidas e corrija os campos destacados.`
      );
      return;
    }

    setIsLoading(true);
    setMensagemApi('');

    //try {
      const formData = new FormData();      
      formData.append('email', email);
      formData.append('password', password);
      

      // const response = await fetch('https://backend-sites-pipelinesolucoes.onrender.com/send-email-gmail', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${token_bearer}`,
      //   },
      //   body: formData,
      // });

      // if (response.status === 200) {
        //setCorMensagemApi(color_message_sucess);
        //setMensagemApi(message_sucess);        
        setEmail('');
        setPassword('');        
      //  setErrors({});
      // } else {
      //   setCorMensagemApi(color_message_erro);
      //   setMensagemApi(
      //     message_erro ??
      //       `Houve um problema ao enviar sua mensagem. Por favor, verifique sua conexão e tente novamente mais tarde.`
      //   );
      //   console.error('Erro ao enviar dados:', response.statusText);
      // }
    // } catch (error) {
    //   setCorMensagemApi(color_message_erro);
    //   setMensagemApi(
    //     message_erro ??
    //       `Houve um problema ao enviar sua mensagem. Por favor, verifique sua conexão e tente novamente mais tarde.`
    //   );
    //   console.error('Erro na solicitação:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Box display="flex" flexDirection='column' justifyContent="center" gap="24px" flex={1} 
      sx={{ padding: "24px", borderRadius: border_radius, background: background }}>
      
      { (Icon || titulo) && 
        <DivTitulo>
          {Icon && <Icon/>}
          {titulo && titulo()}
        </DivTitulo>
      }

      <FormContainer>
        {googleButton && googleButton()}

        <Divider sx={{ borderColor: color_separador }}>ou</Divider>

        <TextFieldStyled
          id="email"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          error={errors.email}
          helperText={errors.email && <span style={{ color: color_message_erro }}>Email inválido</span>}
          required
          background_color={background_color_field}
          text_color={color}
          text_color_error={color_message_erro}
          border_radius={border_radius_field}
        />

        <DivPassword> 

          <TextFieldStyled
            id="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
            error={errors.password}
            helperText={errors.password && (
              <span style={{ color: color_message_erro }}>Senha inválida</span>
            )}
            required
            background_color={background_color_field}
            text_color={color}
            text_color_error={color_message_erro}
            border_radius={border_radius_field}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          /> 
        
          <DivLink text_color={color} align="flex-start">
            <LinkFormStyled href={urlRecuperarConta} 
              width="auto" height="auto" text_color={color_link} font_size='0.8rem'>
              Esqueceu sua senha?
            </LinkFormStyled>
          </DivLink>

        </DivPassword>


        <ButtonFormStyled width="100%" height="100%"
          onClick={handleSubmit}
          background_color={background_color_button}
          text_color={color_button}
          border_radius={border_radius_button}
          disabled={isLoading}
          margin='16px 0 0 0'
        >          
          {isLoading ? 'Enviando...' : text_button}
        </ButtonFormStyled>
        {mensagemApi && (
          <Typography variant="body1" component="span" color={corMensagemApi}>
            {mensagemApi}
          </Typography>
        )}

        <DivLink text_color={color} align="center">        
          <LinkFormStyled href={urlCriarConta} 
            width="auto" height="100%" text_color={color_link} margin='0'>
            Criar conta
          </LinkFormStyled>
        </DivLink>

      </FormContainer>      

      {children}

    </Box> 
  );
};

export default LoginForm;
