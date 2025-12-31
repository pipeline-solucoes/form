'use client';

import React, { useState } from 'react';
import { styled, TypographyVariant, useTheme } from '@mui/material/styles';
import { Box, Divider, SvgIconProps, Typography } from '@mui/material';
import { ButtonProps } from '../../types/ButtonProps';
import { ButtonFormStyled } from '../style/ButtonFormStyled';
import { FieldProps } from '@/types/FieldProps';
import { validateEmailMessage } from '../../utils/validateEmail';
import TextFieldValidate from '../TextFieldValidate';
import TextFieldPassword from '../TextFieldPassword';
import { LinkFormStyled } from '../style/LinkFormStyled';
import { BorderProps, ColorProps } from '@pipelinesolucoes/theme';
import { ClickResult } from './ClickResult';
import { DivCampos, DivLink, DivTitulo, FormContainer } from './StyleLogin';


const DivPassword = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  margin: '0',
  padding: '0',
}));


export interface FormLoginProps extends ColorProps, BorderProps, ButtonProps, FieldProps {
  
  urlRecuperarConta: string;
  urlCriarConta: string;

  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;
  googleButton: () => React.ReactElement;

  textButton?: string;
  variantButton?: TypographyVariant;

  color_message_sucess: string;
  color_message_erro: string;

  colorLink: string;
  divider: string;
  
  children?: React.ReactNode;

  onClick?: (data: { email: string; password: string }) => Promise<ClickResult> | ClickResult;
}


const FormLogin: React.FC<FormLoginProps> = ({
  
  urlCriarConta,
  urlRecuperarConta,
    
  Icon,
  titulo,
  googleButton,

  background,
  borderRadius,
  border,
  boxShadow,

  backgroundField,
  colorField,
  borderRadiusField,
  boxShadowField,
  borderColorField,
  paddingField,
  marginField,

  textButton = 'Enviar',
  variantButton = 'body1',

  backgroundButton,
  backgroundHoverButton,
  colorButton,
  colorHoverButton,
  borderRadiusButton,
  borderButton = 'none',
  boxShadowButton,
  widthButton = 'auto',
  heightButton = 'auto',
  paddingButton,
  marginButton = '0',

  color_message_sucess,
  color_message_erro,

  colorLink,
  
  divider,

  onClick,
  children,
}) => {

  const theme = useTheme();

  const [mensagemApi, setMensagemApi] = useState('');
  const [corMensagemApi, setCorMensagemApi] = useState(color_message_erro);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // validação local básica (mantém o comportamento atual)
    const newErrors: { [key: string]: boolean } = {
      email: !validateEmail(email),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi(
        'Alguns dos dados fornecidos estão inválidos. Por favor, revise as informações preenchidas e corrija os campos destacados.'
      );
      return;
    }

    setIsLoading(true);
    setMensagemApi('');

    try {
      if (!onClick) {
        // Se o pai não passou handler, mantém feedback amigável
        setCorMensagemApi(color_message_erro);
        setMensagemApi('Nenhuma ação foi configurada para o botão.');
        return;
      }

      const result = await onClick({ email, password });

      if (result?.success) {
        setCorMensagemApi(result.color ?? color_message_sucess);
        setMensagemApi(result.message);
      } else {
        setCorMensagemApi(result.color ?? color_message_erro);
        setMensagemApi(result?.message ?? 'Falha ao realizar a operação.');
      }
    } catch (err) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi('Erro inesperado ao processar a solicitação.');
    } finally {
      setIsLoading(false);
    }
  };

  const bContainer = background ?? theme?.pipelinesolucoes?.forms?.login?.background ?? 'transparent';
  const brContainer = borderRadius ?? theme?.pipelinesolucoes?.forms?.login?.borderRadius ?? '0';
  const bdContainer= border ?? theme?.pipelinesolucoes?.forms?.login?.border ?? '0';
  const bsContainer= boxShadow ?? theme?.pipelinesolucoes?.forms?.login?.boxShadow ?? 'none';

  const bField = backgroundField ?? theme?.pipelinesolucoes?.forms?.login?.field?.background ?? undefined;
  const cField = colorField ?? theme?.pipelinesolucoes?.forms?.login?.field?.color ?? undefined;
  const brField = borderRadiusField ?? theme?.pipelinesolucoes?.forms?.login?.field?.borderRadius ?? undefined;
  const bsField = boxShadowField ?? theme?.pipelinesolucoes?.forms?.login?.field?.boxShadow ?? undefined;
  const bcField = borderColorField ?? theme?.pipelinesolucoes?.forms?.login?.field?.borderColor ?? undefined;
  const pField = paddingField ?? theme?.pipelinesolucoes?.forms?.login?.field?.padding ?? undefined;
  const mgField = marginField ?? theme?.pipelinesolucoes?.forms?.login?.field?.margin ?? undefined;

  const bgButton = backgroundButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.background ?? undefined;
  const bgHoverButton = backgroundHoverButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.backgroundHover ?? undefined;
  const cButton = colorButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.color ?? undefined;
  const cHoverButton = colorHoverButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.colorHover ?? undefined;
  const brButton = borderRadiusButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.borderRadius ?? undefined;
  const bsButton = boxShadowButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.boxShadow ?? undefined;  
  const pButton = paddingButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.padding ?? undefined; 

  const cdivider =  divider ?? theme?.pipelinesolucoes?.forms?.login?.divider ?? undefined;
  const cLink = colorLink ?? theme?.pipelinesolucoes?.forms?.login?.link?.color ?? undefined;
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="24px"
      flex={1}
      sx={{ padding: '24px', borderRadius: brContainer, 
            background: bContainer, border: bdContainer, 
            boxShadow: bsContainer }}
    >
      {(Icon || titulo) && (
        <DivTitulo>
          {Icon && <Icon />}
          {titulo && titulo()}
        </DivTitulo>
      )}

      <FormContainer>
        {googleButton && googleButton()}

        <Divider sx={{ borderColor: cdivider }}>ou</Divider>

        <DivCampos>
          <TextFieldValidate
            id="email"
            label="Email"
            placeholder="Email"
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            margin={mgField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            requiredMessage="Campo obrigatório"
            validate={validateEmailMessage}
            showErrorOn="blur"
          />
          <DivPassword>
            <TextFieldPassword
              id="password"
              label="Senha"
              placeholder="Senha"
              required={true}
              background={bField}
              color={cField}
              borderRadius={brField}
              borderColor={bcField}
              boxShadow={bsField}
              padding={pField}
              margin={mgField}
              value={password}
              onPasswordChange={(p) => setPassword(p)}
            />

            <DivLink align="flex-start">
              <LinkFormStyled href={urlRecuperarConta} text_color={cLink}>
                <Typography variant={variantButton} component='span' sx={{fontSize: "0.8rem"}}>Esqueceu sua senha?</Typography>                 
              </LinkFormStyled>
            </DivLink>
          </DivPassword>
        </DivCampos>

        <ButtonFormStyled
          backgroundButton={bgButton}
          backgroundHoverButton={bgHoverButton}
          colorButton={cButton}
          colorHoverButton={cHoverButton}
          borderRadiusButton={brButton}
          borderButton={borderButton}
          boxShadowButton={bsButton}
          widthButton={widthButton}
          heightButton={heightButton}
          paddingButton={pButton}
          marginButton={marginButton}
          disabled={isLoading}
          onClick={handleClick}
        >
          {isLoading ? (
            'Enviando...'
          ) : (
            <Typography variant={variantButton} component="span">
              {textButton}
            </Typography>
          )}
        </ButtonFormStyled>

        <DivLink>
          <LinkFormStyled href={urlCriarConta} text_color={cLink}>
            <Typography variant={variantButton} component='span'>Criar conta</Typography>            
          </LinkFormStyled>
        </DivLink>

      </FormContainer>

      {/* Mensagem retornada do onClick do pai */}
      {mensagemApi && (
        <Typography variant="body2" sx={{ color: corMensagemApi }}>
          {mensagemApi}
        </Typography>
      )}

      {children}
    </Box>
  );
};

export default FormLogin;
