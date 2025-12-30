'use client';

import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import RecaptchaInvisible, { RecaptchaInvisibleRef } from './RecaptchaInvisible';
import { ButtonFormStyled, TextFieldFixedSizeStyled, TextFieldStyled } from './FormStyled';
import RecaptchaMessage from './RecaptchaMessage';


const FormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  margin: 'auto',
  padding: '0px',
}));

interface RecaptchaFormProps {
  color: string;
  background?: string;
  border_radius: string;
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
  token_bearer: string;
  site_key_recaptcha: string;
  children: React.ReactNode;
}

const RecaptchaForm: React.FC<RecaptchaFormProps> = ({
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
  token_bearer,
  site_key_recaptcha,
  children
}) => {  
  

  const [mensagemApi, setMensagemApi] = useState('');
  const [corMensagemApi, setCorMensagemApi] = useState(color_message_erro);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const telefoneRef = React.useRef<HTMLInputElement>(null);

  // Ref para o recaptcha
  const recaptchaRef = useRef<RecaptchaInvisibleRef>(null);
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validateTelefone = (telefone: string) => /^\d{2}\d{9}$/.test(telefone);

  const handleBlur = (field: string) => {
    switch (field) {
      case 'email':
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: !validateEmail(email),
        }));
        break;
      case 'telefone':
        setErrors((prevErrors) => ({
          ...prevErrors,
          telefone: !validateTelefone(telefone),
        }));
        break;
      default:
        // Para campos nome e mensagem
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: !Boolean(field === 'nome' ? nome.trim() : mensagem.trim()),
        }));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos campos
    const newErrors: { [key: string]: boolean } = {
      nome: !nome.trim(),
      email: !validateEmail(email),
      telefone: !validateTelefone(telefone),
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

      const response = await fetch('https://backend-sites-production.up.railway.app/send-email-gmail', {
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

  return (
    <Box display="flex" flexDirection='column' justifyContent="center" gap="24px" flex={1} 
      sx={{ padding: "24px", borderRadius: border_radius, background: background }}>
      <FormContainer>
        <TextFieldStyled
          id="nome"
          label="Nome"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onBlur={() => handleBlur('nome')}
          error={errors.nome}
          helperText={errors.nome && <span style={{ color: color_message_erro }}>Nome é obrigatório</span>}
          required
          background_color={background_color_field}
          text_color={color}
          text_color_error={color_message_erro}
          border_radius={border_radius_field}
        />
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
        <TextFieldStyled
          id="telefone"
          label="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          onBlur={() => handleBlur('telefone')}
          error={errors.telefone}
          helperText={errors.telefone && <span style={{ color: color_message_erro }}>Telefone inválido</span>}
          required
          placeholder="21999999999"
          background_color={background_color_field}
          text_color={color}
          text_color_error={color_message_erro}
          border_radius={border_radius_field}
          inputRef={telefoneRef}
        />
        <TextFieldFixedSizeStyled
          id="mensagem"
          label="Mensagem"
          placeholder="Mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onBlur={() => handleBlur('mensagem')}
          error={errors.mensagem}
          helperText={errors.mensagem && <span style={{ color: color_message_erro }}>Mensagem é obrigatória</span>}
          required
          multiline
          background_color={background_color_field}
          text_color={color}
          text_color_error={color_message_erro}
          border_radius={border_radius_field}
        />
        <ButtonFormStyled
          width="100%"
          height="100%"
          onClick={handleSubmit}
          background_color={background_color_button}
          text_color={color_button}
          border_radius={border_radius_button}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : text_button}
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

      <RecaptchaMessage color={color}/>

      {/* reCAPTCHA invisível */}
      <RecaptchaInvisible siteKey={site_key_recaptcha} ref={recaptchaRef} />
    </Box> 
  );
};

export default RecaptchaForm;
