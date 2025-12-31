'use client';

import React, { useState } from 'react';
import { styled, TypographyVariant, useTheme } from '@mui/material/styles';
import { Box, SvgIconProps, Typography } from '@mui/material';
import TextFieldValidate from '../TextFieldValidate';
import { validateEmail, validateEmailMessage } from '../../utils/validateEmail';
import { ButtonProps } from '../../types/ButtonProps';
import { ButtonFormStyled } from '../style/ButtonFormStyled';
import { FieldProps } from '../../types/FieldProps';
import { BorderProps, ColorProps } from '@pipelinesolucoes/theme';
import { DivTitulo, StyledRoot } from './StyleLogin';

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


interface RecuperarSenhaSubmitResult {
  success: boolean;
  message: string;
}

interface FormPasswordRecoveryProps extends ButtonProps, ColorProps, BorderProps, FieldProps {
  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;
  subTitulo?: () => React.ReactElement;

  textButton?: string;
  variantButton?: TypographyVariant;

  color_message_sucess: string;
  color_message_erro: string;

  /**
   * Callback assíncrono obrigatório: deve retornar sempre { success, message }.
   * A mensagem exibida no componente virá SEMPRE daqui.
   */
  onSubmit: (email: string) => Promise<RecuperarSenhaSubmitResult>;

  /**
   * Callback opcional com o resultado final do submit.
   */
  onResult?: (success: boolean) => void;
  children?: React.ReactNode;
}


const FormPasswordRecovery: React.FC<FormPasswordRecoveryProps> = ({
  Icon,
  titulo,
  subTitulo,  
  
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
  
  onSubmit,
  onResult,
  children,
}) => {

  const theme = useTheme();

  const [mensagemApi, setMensagemApi] = useState('');
  const [corMensagemApi, setCorMensagemApi] = useState(color_message_erro);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi(
        'Alguns dos dados fornecidos estão inválidos. Por favor, revise as informações preenchidas e corrija os campos destacados.'
      );
      onResult?.(false);
      return;
    }

    setIsLoading(true);
    setMensagemApi('');

    try {
      const result = await onSubmit(email);

      setMensagemApi(result.message);
      setCorMensagemApi(result.success ? color_message_sucess : color_message_erro);
      onResult?.(result.success);
    } catch {
      // Mesmo obrigando a mensagem vir do onSubmit, exceções podem acontecer (rede, throw etc.)
      // Aqui escolhi exibir uma mensagem mínima interna para não deixar a UI muda.
      setCorMensagemApi(color_message_erro);
      setMensagemApi('Ocorreu um erro inesperado. Tente novamente.');
      onResult?.(false);
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

  return (

    <StyledRoot background={bContainer} border_radius={brContainer} box_shadow={bsContainer} border={bdContainer}>
      {(Icon || titulo) && (
        <DivTitulo>
          {Icon && <Icon />}
          {titulo && titulo()}
          {subTitulo && subTitulo()}
        </DivTitulo>
      )}

      <FormContainer>
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
          {isLoading 
            ? 'Enviando...' 
            : <Typography variant={variantButton} component="span">{textButton}</Typography>
          }
        </ButtonFormStyled>

        {mensagemApi && (
          <Typography variant="body1" component="span" color={corMensagemApi}>
            {mensagemApi}
          </Typography>
        )}
        
      </FormContainer>

      {children}
    </StyledRoot>
  );
};

FormPasswordRecovery.displayName = 'FormPasswordRecovery';
export default FormPasswordRecovery;
