'use client';

import React, { useState } from 'react';
import { styled, TypographyVariant } from '@mui/material/styles';
import { Box, Divider, SvgIconProps, Typography } from '@mui/material';
import { LinkFormStyled } from '../FormStyled';
import { ButtonProps } from '../../types/ButtonProps';
import { ButtonFormStyled } from '../ButtonFormStyled';
import { FieldProps } from '@/types/FieldProps';
import { validateEmailMessage } from '../../utils/validateEmail';
import TextFieldValidate from '../TextFieldValidate';
import TextFieldPassword from '../TextFieldPassword';
import { ColorProps } from '../../types/ColorProps';
import { BorderProps } from '../../types/BorderProps';

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
})<{ text_color: string; align: string }>(({ text_color, align }) => ({
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

export interface FormLoginProps extends ColorProps, BorderProps, ButtonProps, FieldProps {
  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;
  googleButton: () => React.ReactElement;

  color: string;
  background?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;

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

  /** Cores padrão para mensagem (caso o pai não retorne color no ClickResult) */
  color_message_sucess: string;
  color_message_erro: string;

  color_link: string;
  color_separador: string;

  urlRecuperarConta: string;
  urlCriarConta: string;
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

const FormLogin: React.FC<FormLoginProps> = ({
  urlRecuperarConta,
  urlCriarConta,

  Icon,
  titulo,
  googleButton,

  color,
  background = 'transparent',
  borderRadius = '0',
  border='none',
  boxShadow='none',

  backgroundField = 'transparent',
  colorField = '#000',
  borderRadiusField = '0px',
  boxShadowField = 'none',
  borderColorField = '#ccc',
  paddingField = '4px 8px',

  textButton = 'Enviar',
  variantButton = 'body1',
  backgroundButton = 'transparent',
  backgroundHoverButton = 'transparent',
  colorButton = '#000',
  colorHoverButton = '#000',
  borderRadiusButton = '0',
  borderButton = 'none',
  boxShadowButton = 'none',
  widthButton = 'auto',
  heightButton = 'auto',
  paddingButton = '4px 24px',
  marginButton = '0',

  color_message_sucess,
  color_message_erro,
  color_link,
  color_separador,

  onClick,
  children,
}) => {
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="24px"
      flex={1}
      sx={{ padding: '24px', borderRadius: borderRadius, 
            background: background, border: border, 
            boxShadow: boxShadow }}
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
          <DivPassword>
            <TextFieldPassword
              id="password"
              label="Senha"
              placeholder="Senha"
              required={true}
              background={backgroundField}
              color={colorField}
              borderRadius={borderRadiusField}
              borderColor={borderColorField}
              boxShadow={boxShadowField}
              padding={paddingField}
              value={password}
              onPasswordChange={(p) => setPassword(p)}
            />

            <DivLink text_color={color} align="flex-start">
              <LinkFormStyled
                href={urlRecuperarConta}
                width="auto"
                height="auto"
                text_color={color_link}
                font_size="0.8rem"
              >
                Esqueceu sua senha?
              </LinkFormStyled>
            </DivLink>
          </DivPassword>
        </DivCampos>

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
          {isLoading ? (
            'Enviando...'
          ) : (
            <Typography variant={variantButton} component="span">
              {textButton}
            </Typography>
          )}
        </ButtonFormStyled>

        <DivLink text_color={color} align="center">
          <LinkFormStyled href={urlCriarConta} width="auto" height="100%" text_color={color_link} margin="0">
            Criar conta
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
