'use client';

import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, SvgIconProps, Typography } from '@mui/material';
import { ButtonFormStyled, TextFieldStyled } from './FormStyled';
import TextFieldValidate from './TextFieldValidate';
import { validateEmailMessage } from '../utils/validateEmail';

const FormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  margin: 'auto',
  padding: '0px',
  alignItems: 'center',
  justifyContent: 'center',
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

interface LoginFormProps {
  Icon?: React.ElementType<SvgIconProps>; 
  titulo?: () => React.ReactElement;
  subTitulo?: () => React.ReactElement;
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
  children?: React.ReactNode;
}

const RecuperarSenhaForm: React.FC<LoginFormProps> = ({
  Icon,
  titulo,
  subTitulo,
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
  children
}) => {  
  
  const [mensagemApi, setMensagemApi] = useState('');
  const [corMensagemApi, setCorMensagemApi] = useState(color_message_erro); 
  const [email, setEmail] = useState('');  
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);    

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
          {subTitulo && subTitulo()}
        </DivTitulo>
      }

      <FormContainer>
        
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

        <TextFieldValidate 
          id="email"
          label="Email"     
          placeholder ="Email"   
          background = {background_color_field}
          colorText = {color}
          borderRadius ={border_radius_field}
          value={email}
          onChange={(e) => setEmail(e.target.value)}          
          required = {true}
          requiredMessage = 'Campo obrigatório'                  
          validate={validateEmailMessage}
          showErrorOn = 'blur'
        />
       
        <ButtonFormStyled width="230px" height="100%"
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

      </FormContainer>      

      {children}

    </Box> 
  );
};

export default RecuperarSenhaForm;
