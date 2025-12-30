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
  justifyContent: 'center',
}));

const DivLink = styled('div', {
  shouldForwardProp: (prop) => !['text_color', 'align'].includes(prop as string),
})<{ text_color?: string; align: string }>(({ text_color, align }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: align,
  width: '100%',
  padding: '0',
  flex: '1',
  color: text_color,
}));

const DivCampos = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
  margin: '0',
  padding: '0',
  alignItems: 'center',
  justifyContent: 'center',
}));

/**
 * Retorno do onClick/onSubmit do componente pai.
 * - success: define se a ação foi bem sucedida
 * - message: mensagem para exibir no próprio FormLogin
 * - color: cor opcional para a mensagem (caso queira sobrescrever as cores padrão)
 */
export interface ClickResult {
  success: boolean;
  message: string;
  color?: string;
}

export interface FormSignUpProps extends ColorProps, BorderProps, ButtonProps, FieldProps {
  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;
  googleButton: () => React.ReactElement;

  /** Cores padrão para mensagem (caso o pai não retorne color no ClickResult) */
  color_message_sucess: string;
  color_message_erro: string;

  color_link: string;
  color_separador: string;

  urlLogin: string;
  children?: React.ReactNode;

  /**
   * Evento disparado ao clicar no botão principal.
   * O componente pai devolve a mensagem e o sucesso/erro.
   */
  onClick?: (data: { email: string; password: string }) => Promise<ClickResult> | ClickResult;
}

/**
 * Componente de formulário de login com suporte a autenticação via Google e login por email/senha.
 * Inclui validação básica de email, exibição de mensagens de erro/sucesso retornadas pelo handler `onClick`
 * e customização visual via props (container, campos, botão e links).
 *
 * @param {string} urlRecuperarConta URL para a página de recuperação de conta/senha. Obrigatório.
 * @param {string} urlCriarConta URL para a página de criação de conta. Obrigatório.
 * @param {React.ElementType<SvgIconProps>} [Icon] Ícone opcional (MUI SvgIcon) exibido no topo do formulário.
 * @param {() => React.ReactElement} [titulo] Função que retorna o conteúdo do título exibido no topo do formulário.
 * @param {() => React.ReactElement} googleButton Função que retorna o botão de login com Google. Obrigatório.
 *
 * @param {string} color Cor usada em alguns textos/containers auxiliares (ex.: wrapper dos links). Obrigatório.
 * @param {string} [background='transparent'] Cor de fundo do container principal.
 * @param {string} [borderRadius='0'] Raio da borda do container principal.
 * @param {string} [border='none'] Borda do container principal.
 * @param {string} [boxShadow='none'] Sombra do container principal.
 *
 * @param {string} [backgroundField='transparent'] Fundo dos campos (email/senha).
 * @param {string} [colorField='#000'] Cor do texto dos campos (email/senha).
 * @param {string} [colorFocusedField] Cor do estado focado do campo (se suportado pelos campos internos).
 * @param {string} [borderRadiusField='0px'] Raio da borda dos campos.
 * @param {string} [boxShadowField='none'] Sombra dos campos.
 * @param {string} [borderColorField='#ccc'] Cor da borda dos campos.
 * @param {string} [paddingField='4px 8px'] Espaçamento interno dos campos.
 *
 * @param {string} [textButton='Enviar'] Texto do botão principal.
 * @param {TypographyVariant} [variantButton='body1'] Variante do Typography usada no texto do botão.
 * @param {string} [backgroundButton='transparent'] Fundo do botão principal.
 * @param {string} [backgroundHoverButton='transparent'] Fundo do botão no hover.
 * @param {string} [colorButton='#000'] Cor do texto do botão.
 * @param {string} [colorHoverButton='#000'] Cor do texto do botão no hover.
 * @param {string} [borderRadiusButton='0'] Raio da borda do botão.
 * @param {string} [borderButton='none'] Borda do botão.
 * @param {string} [boxShadowButton='none'] Sombra do botão.
 * @param {string} [widthButton='auto'] Largura do botão.
 * @param {string} [heightButton='auto'] Altura do botão.
 * @param {string} [paddingButton='4px 24px'] Padding do botão.
 * @param {string} [marginButton='0'] Margem do botão.
 *
 * @param {string} color_message_sucess Cor padrão para mensagem de sucesso (caso `onClick` não retorne `color`). Obrigatório.
 * @param {string} color_message_erro Cor padrão para mensagem de erro (caso `onClick` não retorne `color`). Obrigatório.
 * @param {string} color_link Cor aplicada nos links "Esqueceu sua senha?" e "Criar conta". Obrigatório.
 * @param {string} color_separador Cor da linha separadora (Divider). Obrigatório.
 *
 * @param {(data: { email: string; password: string }) => Promise<ClickResult> | ClickResult} [onClick]
 * Handler chamado ao submeter o formulário. Recebe `{ email, password }` e deve retornar um `ClickResult`.
 * - Se `success` for `true`, exibe `message` com `color_message_sucess` (ou `result.color` se fornecida)
 * - Se `success` for `false`, exibe `message` com `color_message_erro` (ou `result.color` se fornecida)
 * Se não for informado, o componente exibirá a mensagem: "Nenhuma ação foi configurada para o botão.".
 *
 * @param {React.ReactNode} [children] Conteúdo extra renderizado ao final do container (abaixo da mensagem).
 *
 * @example
 * ```tsx
 * import FormLogin from '@/components/FormLogin';
 * import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
 * import { Button } from '@mui/material';
 *
 * export default function Example() {
 *   return (
 *     <FormLogin
 *       urlRecuperarConta="/recuperar"
 *       urlCriarConta="/cadastro"
 *       Icon={LockOutlinedIcon}
 *       titulo={() => <h2>Entrar</h2>}
 *       googleButton={() => <Button variant="outlined">Continuar com Google</Button>}
 *       color="#111"
 *       background="#fff"
 *       borderRadius="12px"
 *       boxShadow="0 10px 30px rgba(0,0,0,0.08)"
 *       backgroundField="#fafafa"
 *       borderColorField="#e0e0e0"
 *       paddingField="10px 12px"
 *       textButton="Acessar"
 *       backgroundButton="#111"
 *       backgroundHoverButton="#000"
 *       colorButton="#fff"
 *       colorHoverButton="#fff"
 *       borderRadiusButton="10px"
 *       paddingButton="10px 16px"
 *       color_message_sucess="#1b5e20"
 *       color_message_erro="#b71c1c"
 *       color_link="#1976d2"
 *       color_separador="#e0e0e0"
 *       onClick={async ({ email, password }) => {
 *         if (email === 'teste@exemplo.com' && password === '123') {
 *           return { success: true, message: 'Login realizado com sucesso!' };
 *         }
 *         return { success: false, message: 'Email ou senha inválidos.' };
 *       }}
 *     />
 *   );
 * }
 * ```
 */

const FormSignUp: React.FC<FormSignUpProps> = ({
  urlLogin,

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
  color_link,
  color_separador,

  onClick,
  children,
}) => {

  const theme = useTheme();

  const [mensagemApi, setMensagemApi] = useState('');
  const [corMensagemApi, setCorMensagemApi] = useState(color_message_erro);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // validação local básica (mantém o comportamento atual)
    const newErrors: { [key: string]: boolean } = {
      email: !validateEmail(email),
      password: !password.trim(),
      confirmPassword: confirmPassword !== password,
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

        <Divider sx={{ borderColor: color_separador }}>ou</Divider>        

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
              value={password}
              onPasswordChange={(p) => setPassword(p)}
            />
          </DivPassword>

          <DivPassword>
            <TextFieldPassword
              id="passwordconfirmada"
              label="Confirmar Senha"
              placeholder="Confirmar Senha"
              required={true}
              background={backgroundField}
              color={colorField}
              borderRadius={borderRadiusField}
              borderColor={borderColorField}
              boxShadow={boxShadowField}
              padding={paddingField}
              value={confirmPassword}
              onPasswordChange={(p) => setConfirmPassword(p)}
            />
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

        <DivLink align="center">
          <LinkFormStyled href={urlLogin} width="auto" height="100%" text_color={color_link} margin="0">
            Entrar
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

export default FormSignUp;
