'use client';

import React, { useState } from 'react';
import { styled, TypographyVariant } from '@mui/material/styles';
import { Box, SvgIconProps, Typography } from '@mui/material';
import TextFieldValidate from '../TextFieldValidate';
import { validateEmail, validateEmailMessage } from '../../utils/validateEmail';
import { ButtonProps } from '../../types/ButtonProps';
import { ButtonFormStyled } from '../ButtonFormStyled';
import { ColorProps } from '../../types/ColorProps';
import { BorderProps } from '../../types/BorderProps';
import { FieldProps } from '../../types/FieldProps';

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
  justifyContent: 'center',
}));

const StyledRoot = styled(Box, {
  shouldForwardProp: (prop) => !['background', 'border_radius'].includes(prop as string),
})<{
  background?: string;
  border_radius?: string;
}>(({ background, border_radius }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '24px',
  flex: 1,
  padding: '24px',
  borderRadius: border_radius ?? '0px',
  background: background ?? 'transparent',
}));

interface RecuperarSenhaSubmitResult {
  success: boolean;
  message: string;
}

interface FormPasswordRecoveryProps extends ButtonProps, ColorProps, BorderProps, FieldProps {
  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;
  subTitulo?: () => React.ReactElement;
  
  background?: string;
  borderRadius?: string;

  backgroundField?: string;
  colorField?: string;
  colorFocusedField?: string;
  borderRadiusField?: string;
  boxShadowField?: string;
  borderColorField?: string;
  paddingField?: string; 

  textButton?: string;
  variantButton?: TypographyVariant;
  backgroundButton?: string;
  backgroundHoverButton?: string;
  colorButton?: string;
  colorHoverButton?: string;  
  borderRadiusButton?: string;
  borderButton?: string;  
  boxShadowButton?: string;
  widthButton?: string;  
  heightButton?: string;
  paddingButton?: string;
  marginButton?: string;

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

/**
 * Componente de formulário para recuperação de senha via e-mail.
 * Faz a validação do e-mail, dispara um `onSubmit` assíncrono (obrigatório) e exibe a mensagem retornada.
 *
 * @param {React.ElementType<SvgIconProps>} [Icon] Ícone do Material UI exibido no topo do formulário.
 * @param {() => React.ReactElement} [titulo] Função que renderiza o título (ex.: <Typography />).
 * @param {() => React.ReactElement} [subTitulo] Função que renderiza o subtítulo (ex.: <Typography />).
 *
 * @param {string} [background='transparent'] Cor/estilo de fundo do container externo.
 * @param {string} [borderRadius='0px'] Borda arredondada do container externo.
 *
 * @param {string} [backgroundField='transparent'] Cor/estilo de fundo do campo de e-mail.
 * @param {string} [colorField='#000'] Cor do texto do campo de e-mail.
 * @param {string} [borderRadiusField='0px'] Borda arredondada do campo de e-mail.
 * @param {string} [boxShadowField='none'] Sombra do campo de e-mail.
 * @param {string} [borderColorField='#ccc'] Cor da borda do campo de e-mail.
 * @param {string} [paddingField='4px 8px'] Espaçamento interno do campo de e-mail.
 *
 * @param {string} [textButton='Enviar'] Texto exibido no botão quando não está carregando.
 * @param {TypographyVariant} [variantButton='body1'] Variant do Typography usado dentro do botão.
 * @param {string} [backgroundButton='transparent'] Cor/estilo de fundo do botão.
 * @param {string} [backgroundHoverButton='transparent'] Cor/estilo de fundo do botão no hover.
 * @param {string} [colorButton='#000'] Cor do texto do botão.
 * @param {string} [colorHoverButton='#000'] Cor do texto do botão no hover.
 * @param {string} [borderRadiusButton='0'] Borda arredondada do botão.
 * @param {string} [borderButton='none'] Borda do botão.
 * @param {string} [boxShadowButton='none'] Sombra do botão.
 * @param {string} [widthButton='auto'] Largura do botão.
 * @param {string} [heightButton='auto'] Altura do botão.
 * @param {string} [paddingButton='4px 24px'] Espaçamento interno do botão.
 * @param {string} [marginButton='0'] Margem externa do botão.
 *
 * @param {string} color_message_sucess Cor aplicada na mensagem quando o submit retorna sucesso.
 * @param {string} color_message_erro Cor aplicada na mensagem quando o submit retorna erro ou validação falha.
 *
 * @param {(email: string) => Promise<{ success: boolean; message: string }>} onSubmit
 * Callback assíncrono obrigatório chamado após validação do e-mail. Deve retornar `{ success, message }`.
 *
 * @param {(success: boolean) => void} [onResult]
 * Callback opcional disparado com o resultado final (true/false) após o submit (ou validação falhar).
 *
 * @param {React.ReactNode} [children] Conteúdo extra renderizado abaixo do formulário (ex.: links, textos auxiliares).
 *
 * @example
 * ```tsx
 * import RecuperarSenhaForm from '@/components/RecuperarSenhaForm';
 * import { Typography } from '@mui/material';
 *
 * const Page = () => {
 *   return (
 *     <RecuperarSenhaForm
 *       titulo={() => <Typography variant="h5">Recuperar senha</Typography>}
 *       subTitulo={() => <Typography variant="body2">Digite seu e-mail para receber o link.</Typography>}
 *       background="#fff"
 *       borderRadius="12px"
 *       backgroundField="#fafafa"
 *       borderRadiusField="8px"
 *       borderColorField="#e0e0e0"
 *       paddingField="10px 12px"
 *       textButton="Enviar link"
 *       variantButton="button"
 *       backgroundButton="#1976d2"
 *       backgroundHoverButton="#1565c0"
 *       colorButton="#fff"
 *       colorHoverButton="#fff"
 *       borderRadiusButton="10px"
 *       widthButton="100%"
 *       color_message_sucess="green"
 *       color_message_erro="red"
 *       onSubmit={async (email) => {
 *         const response = await fetch('/api/recover', {
 *           method: 'POST',
 *           headers: { 'Content-Type': 'application/json' },
 *           body: JSON.stringify({ email }),
 *         });
 *
 *         if (!response.ok) {
 *           return { success: false, message: 'Falha ao enviar o e-mail. Tente novamente.' };
 *         }
 *
 *         return { success: true, message: 'Se o e-mail existir, enviaremos um link de recuperação.' };
 *       }}
 *       onResult={(success) => console.log('Resultado:', success)}
 *     >
 *       <Typography variant="caption">Verifique também sua caixa de spam.</Typography>
 *     </RecuperarSenhaForm>
 *   );
 * };
 * ```
 */
const FormPasswordRecovery: React.FC<FormPasswordRecoveryProps> = ({
  Icon,
  titulo,
  subTitulo,  
  background = 'transparent',
  borderRadius = '0px',
 
  backgroundField='transparent',
  colorField='#000',  
  borderRadiusField='0px',
  boxShadowField='none',
  borderColorField="#ccc",
  paddingField='4px 8px',

  textButton = "Enviar",
  variantButton = "body1",
  backgroundButton = 'transparent',
  backgroundHoverButton= 'transparent',
  colorButton= '#000',
  colorHoverButton= '#000',
  borderRadiusButton='0',
  borderButton='none',
  boxShadowButton='none',
  widthButton='auto',
  heightButton='auto',
  paddingButton='4px 24px',
  marginButton='0',

  color_message_sucess,
  color_message_erro,
  onSubmit,
  onResult,
  children,
}) => {
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

  return (
    <StyledRoot background={background} border_radius={borderRadius}>
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
          background={backgroundField}
          color={colorField}
          borderRadius={borderRadiusField}
          borderColor={borderColorField}
          boxShadow={boxShadowField}
          padding={paddingField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          requiredMessage="Campo obrigatório"
          validate={validateEmailMessage}
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
