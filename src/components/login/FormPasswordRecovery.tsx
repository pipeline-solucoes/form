'use client';

import React, { useState } from 'react';
import { styled, TypographyVariant, useTheme } from '@mui/material/styles';
import { Box, SvgIconProps, Typography } from '@mui/material';
import TextFieldValidate from '../TextFieldValidate';
import { validateEmail, validateEmailMessage } from '../../utils/validateEmail';
import { ButtonProps } from '../../types/ButtonProps';
import { ButtonFormStyled } from '../../style/ButtonFormStyled';
import { FieldProps } from '../../types/FieldProps';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { DivTitulo, StyledRoot } from './StyleLogin';
import { ClickResult } from './ClickResult';

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


interface FormPasswordRecoveryProps extends ButtonProps, ColorProps, BorderProps, FieldProps, LayoutProps {
  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;
  subTitulo?: () => React.ReactElement;

  textButton?: string;
  variantButton?: TypographyVariant;

  onClick: (email: string) => Promise<ClickResult>;
  children?: React.ReactNode;
}


/**
 * Componente de formulário de recuperação de senha, com suporte a:
 * validação básica de email, exibição de mensagens de sucesso/erro,
 * estado de carregamento no botão e customização visual via props ou tema.
 *
 * @param {React.ElementType<SvgIconProps>} [Icon] Ícone exibido no topo do formulário.
 *
 * @param {() => React.ReactElement} [titulo] Função que retorna o título do formulário.
 *
 * @param {() => React.ReactElement} [subTitulo] Função que retorna o subtítulo do formulário.
 *
 * @param {string} [textButton='Enviar'] Texto exibido no botão principal do formulário.
 *
 * @param {TypographyVariant} [variantButton='body1'] Variante tipográfica utilizada no texto do botão.
 *
 * @param {(email: string) => Promise<ClickResult>} onClick Callback executado ao submeter o formulário.
 * Recebe o email digitado e deve retornar um objeto com sucesso e mensagem (e cor opcional).
 *
 * @param {React.ReactNode} [children] Conteúdo adicional renderizado abaixo do formulário.
 *
 * @param {string} [background] Cor de fundo do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 *
 * @param {string | number} [borderRadius] Raio da borda do container principal.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.
 *
 * @param {string} [border] Borda do container principal.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.
 *
 * @param {string} [boxShadow] Sombra do container principal.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.
 * 
 * @param {string} [maxWidth] Largura Máxima do container principal do formulário.
 *
 * @param {string} [backgroundField] Cor de fundo do campo de email.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [colorField] Cor do texto do campo de email.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string | number} [borderRadiusField] Raio da borda do campo de email.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [boxShadowField] Sombra aplicada ao campo de email.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [borderColorField] Cor da borda do campo de email.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string | number} [paddingField] Espaçamento interno do campo de email.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string | number} [marginField] Margem externa do campo de email.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [backgroundButton] Cor de fundo do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string} [backgroundHoverButton] Cor de fundo do botão ao passar o mouse.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string} [colorButton] Cor do texto do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string} [colorHoverButton] Cor do texto do botão ao passar o mouse.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string | number} [borderRadiusButton] Raio da borda do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string} [borderButton='none'] Borda do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string} [boxShadowButton] Sombra aplicada ao botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string | number} [widthButton='auto'] Largura do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string | number} [heightButton='auto'] Altura do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string | number} [paddingButton] Espaçamento interno do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string | number} [marginButton='0'] Margem externa do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @example
 * ```tsx
 * import { FormPasswordRecovery } from '@/components/FormPasswordRecovery';
 * import LockResetIcon from '@mui/icons-material/LockReset';
 *
 * const Example = () => {
 *   return (
 *     <FormPasswordRecovery
 *       Icon={LockResetIcon}
 *       titulo={() => <h2>Recuperar senha</h2>}
 *       subTitulo={() => <p>Informe seu email para receber as instruções.</p>}
 *       textButton="Enviar link"
 *       onClick={async (email) => {
 *         if (email === 'teste@teste.com') {
 *           return { success: true, message: 'Enviamos um link para seu email!' };
 *         }
 *         return { success: false, message: 'Email não encontrado.' };
 *       }}
 *     />
 *   );
 * };
 * ```
 */

const FormPasswordRecovery: React.FC<FormPasswordRecoveryProps> = ({
  Icon,
  titulo,
  subTitulo,  
  
  background,
  borderRadius,
  border,
  boxShadow,
  maxWidth,

  backgroundField,
  colorField,
  borderRadiusField,
  boxShadowField,
  borderColorField,
  paddingField,
  marginField,
  heightField,

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
  
  onClick,  
  children,
}) => {

  const theme = useTheme();
  const color_message_sucess = theme.palette.success.main;
  const color_message_erro = theme.palette.error.main;

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
  const hgField = heightField ?? theme?.pipelinesolucoes?.forms?.login?.field?.height ?? undefined; 

  const bgButton = backgroundButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.background ?? undefined;
  const bgHoverButton = backgroundHoverButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.backgroundHover ?? undefined;
  const cButton = colorButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.color ?? undefined;
  const cHoverButton = colorHoverButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.colorHover ?? undefined;
  const brButton = borderRadiusButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.borderRadius ?? undefined;
  const bsButton = boxShadowButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.boxShadow ?? undefined;  
  const pButton = paddingButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.padding ?? undefined; 

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
      return;
    }

    setIsLoading(true);
    setMensagemApi('');

    try {
      const result = await onClick(email);

      setMensagemApi(result.message);
      if (result?.success) {
        setCorMensagemApi(result.color ?? color_message_sucess);
        setMensagemApi(result.message);
      } else {
        setCorMensagemApi(result.color ?? color_message_erro);
        setMensagemApi(result?.message ?? 'Falha ao realizar a operação.');
      }      

    } catch {
      // Mesmo obrigando a mensagem vir do onSubmit, exceções podem acontecer (rede, throw etc.)
      // Aqui escolhi exibir uma mensagem mínima interna para não deixar a UI muda.
      setCorMensagemApi(color_message_erro);
      setMensagemApi('Ocorreu um erro inesperado. Tente novamente.');      
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <StyledRoot background={bContainer} border_radius={brContainer} box_shadow={bsContainer} border={bdContainer} maxWidth={maxWidth}>
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
          height={hgField}
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
          requiredMessage="email obrigatório"
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
