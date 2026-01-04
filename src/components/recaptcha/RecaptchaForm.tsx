'use client';

import React, { useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import RecaptchaInvisible, { RecaptchaInvisibleRef } from './RecaptchaInvisible';
import RecaptchaMessage from './RecaptchaMessage';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { FieldProps } from '../../types/FieldProps';
import { ButtonProps } from '../../types/ButtonProps';
import TextFieldValidate from '../TextFieldValidate';
import { validateEmailMessage } from '../../utils/validateEmail';
import { ButtonFormStyled } from '../../style/ButtonFormStyled';
import { validateTelefoneMessage } from '../../utils/validateTelefone';
import { fbborderColor, fbborderRadius, fbboxShadow, fbcolor, fbcolorFocused, fbheigth, fbmargin, fbpadding } from '../../constant';


const FormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  margin: 'auto',
  padding: '0px',
}));


export interface RecaptchaFormProps extends 
 Pick<ColorProps, 'background' | 'color'>, 
 Pick<BorderProps, 'borderRadius' | 'border' | 'boxShadow'>,
 Omit<FieldProps, 'backgroundDisabledField' | 'colorDisabledField'>,
 LayoutProps, 
 ButtonProps {  
  url: string;

  rowsMessage: number, 
  
  message_sucess: string;
  message_erro?: string;
  token_bearer: string;
  site_key_recaptcha: string;
  children?: React.ReactNode;
}

const RecaptchaForm: React.FC<RecaptchaFormProps> = ({
  
  url = "https://backend-sites-production.up.railway.app/send-email-gmail",

  background,
  color,
  borderRadius,
  border,  
  boxShadow,
  width,
  maxWidth,
  height,
  maxHeight,
  padding,
  margin,

  textButton,
  variantButton,
  backgroundButton,
  backgroundHoverButton,
  colorButton,
  colorHoverButton,  
  borderRadiusButton,
  borderButton,  
  boxShadowButton,
  widthButton,  
  heightButton,
  paddingButton,
  marginButton,

  backgroundField,
  backgroundFocusedField,
  colorField,  
  colorFocusedField,
  borderRadiusField,
  boxShadowField,
  borderColorField,
  paddingField,     
  marginField, 
  heightField,  
  
  rowsMessage = 5,
  message_sucess,
  message_erro,
  token_bearer,
  site_key_recaptcha,
  children
}) => {  

  const theme = useTheme();
  const color_message_sucess = theme.palette.success.main;
  const color_message_erro = theme.palette.error.main;
  
  const [mensagemApi, setMensagemApi] = useState('');
  const [corMensagemApi, setCorMensagemApi] = useState(color_message_erro);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Ref para o recaptcha
  const recaptchaRef = useRef<RecaptchaInvisibleRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos campos
    const newErrors: { [key: string]: boolean } = {
      nome: !nome.trim(),
      email: !validateEmailMessage(email),
      telefone: !validateTelefoneMessage(telefone),
      mensagem: !mensagem.trim(),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi(
        `Alguns dos dados fornecidos estão inválidos. Por favor, revise as informações preenchidas e corrija os campos destacados antes de tentar enviar o formulário novamente.`
      );
      return;
    }

    setIsLoading(true);
    setMensagemApi('');

    if (!recaptchaRef.current) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi('Erro interno: reCAPTCHA não disponível.');
      setIsLoading(false);
      return;
    }

    // Executa o recaptcha e pega o token
    const token = await recaptchaRef.current.execute();

    if (!token) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi(message_erro ?? 'Falha na validação do reCAPTCHA. Por favor, tente novamente.');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('telefone', telefone);
      formData.append('mensagem', mensagem);
      formData.append('captcha_token', token); // Enviar token para backend validar

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token_bearer}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        setCorMensagemApi(color_message_sucess);
        setMensagemApi(message_sucess);
        setNome('');
        setEmail('');
        setTelefone('');
        setMensagem('');
        setErrors({});
      } else {
        setCorMensagemApi(color_message_erro);
        setMensagemApi(
          message_erro ??
            `Houve um problema ao enviar sua mensagem. Por favor, verifique sua conexão e tente novamente mais tarde.`
        );
        console.error('Erro ao enviar dados:', response.statusText);
      }
    } catch (error) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi(
        message_erro ??
          `Houve um problema ao enviar sua mensagem. Por favor, verifique sua conexão e tente novamente mais tarde.`
      );
      console.error('Erro na solicitação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const bgFocused = backgroundFocusedField ?? backgroundField;
  const txt = colorField ?? fbcolor;
  const br = borderRadiusField ?? fbborderRadius;
  const sh = boxShadowField ?? fbboxShadow;
  const bd = borderColorField ?? fbborderColor;
  const bdFocused = colorFocusedField ?? fbcolorFocused;
  const pad = paddingField ?? fbpadding;
  const mg = marginField ?? fbmargin;
  const hg = heightField ?? fbheigth;

  return (
    <Box display="flex" flexDirection='column' justifyContent="center" gap="24px" flex={1}     
      sx={{ background: background, padding: padding, margin: margin, 
      borderRadius: borderRadius, boxShadow: boxShadow, border: border,
      width: width, height: height, maxWidth: maxWidth, maxHeight: maxHeight }}>

      <FormContainer>
        
        <TextFieldValidate
          id="nome"
          label="Nome"
          placeholder="Nome"  
          value={nome}
          onChange={(e) => setNome(e.target.value)}                  
          height={hg}            
          background={backgroundField}
          backgroundFocused={bgFocused}
          colorFocused={bdFocused}
          color={txt}
          borderRadius={br}
          borderColor={bd}
          boxShadow={sh}
          padding={pad}
          margin={mg}          
          required     
          requiredMessage="nome obrigatório"             
          showErrorOn="blur"
        />

        <TextFieldValidate
          id="email"
          label="Email"
          placeholder="Email"          
          height={hg}            
          background={backgroundField}
          backgroundFocused={bgFocused}
          colorFocused={bdFocused}
          color={txt}
          borderRadius={br}
          borderColor={bd}
          boxShadow={sh}
          padding={pad}
          margin={mg}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          requiredMessage="email obrigatório"
          validate={validateEmailMessage}
          showErrorOn="blur"
        />

        <TextFieldValidate
          id="telefone"
          label="Telefone"
          placeholder="Telefone"    
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}      
          height={hg}            
          background={backgroundField}
          backgroundFocused={bgFocused}
          colorFocused={bdFocused}
          color={txt}
          borderRadius={br}
          borderColor={bd}
          boxShadow={sh}
          padding={pad}
          margin={mg}
          required={true}
          requiredMessage="telefone obrigatório"
          validate={validateTelefoneMessage}
          showErrorOn="blur"
        />

        <TextFieldValidate
          id="mensagem"
          label="Mensagem"
          placeholder="Mensagem"  
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          background={backgroundField}
          backgroundFocused={bgFocused}
          colorFocused={bdFocused}
          color={txt}
          borderRadius={br}
          borderColor={bd}
          boxShadow={sh}
          padding={pad}
          margin={mg}          
          required
          requiredMessage="mensagem obrigatório"
          multiline 
          rows={rowsMessage}                  
          showErrorOn="blur"
        />

        <ButtonFormStyled
          backgroundButton={backgroundButton}
          backgroundHoverButton={backgroundHoverButton}
          colorButton={colorButton}
          colorHoverButton={colorHoverButton}
          borderRadiusButton={borderRadiusButton}
          borderButton={borderButton}
          boxShadowButton={boxShadowButton}
          widthButton={widthButton}
          heightButton={heightButton}
          paddingButton={paddingButton}
          marginButton={marginButton}
          disabled={isLoading}
          onClick={handleSubmit}
          variantButton={variantButton}
        >
          {isLoading ? 'Enviando...' : textButton }
        </ButtonFormStyled>

        {mensagemApi && (
          <Typography variant="body1" component="span" color={corMensagemApi}>
            {mensagemApi}
          </Typography>
        )}
      </FormContainer>

      <Box flex={1}>
        {children}
      </Box>

      <RecaptchaMessage color={color ?? 'black'}/>

      {/* reCAPTCHA invisível */}
      <RecaptchaInvisible siteKey={site_key_recaptcha} ref={recaptchaRef} />
    </Box> 
  );
};

export default RecaptchaForm;
