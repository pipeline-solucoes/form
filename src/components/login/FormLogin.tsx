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
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { ClickResult } from './ClickResult';
import { DivCampos, DivLink, DivTitulo, FormContainer, StyledRoot } from './StyleLogin';

/**
 * Componente de formulário de login completo, com suporte a:
 * autenticação por email/senha, botão de login social (ex: Google),
 * validação básica de campos, exibição de mensagens de sucesso/erro
 * e customização visual via props ou tema.
 *
 * @param {string} urlRecuperarConta URL para a página de recuperação de senha.
 * 
 * @param {string} urlCriarConta URL para a página de criação de conta.
 * 
 * @param {React.ElementType<SvgIconProps>} [Icon] Ícone exibido no topo do formulário.
 * 
 * @param {() => React.ReactElement} [titulo] Função que retorna o título do formulário.
 * 
 * @param {() => React.ReactElement} googleButton Função que renderiza o botão de login social.
 * 
 * @param {string} [textButton='Enviar'] Texto exibido no botão principal de submit.
 * @param {TypographyVariant} [variantButton='body1'] Variante tipográfica usada nos textos do botão e links.
 * 
 * @param {(data: { email: string; password: string }) => Promise<ClickResult> | ClickResult} [onClick]
 * Callback executado ao submeter o formulário. Deve retornar um objeto com sucesso, mensagem e cor opcional.
 * 
 * @param {React.ReactNode} [children] Conteúdo adicional renderizado abaixo do formulário.
 * 
 * @param {string} [colorLink] Cor dos links de ação (criar conta / recuperar senha).
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 *
 * @param {string} [divider] Cor do divisor visual entre login social e formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 * 
 * @param {string} [background] Cor de fundo do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 *
 * @param {string | number} [borderRadius] Raio da borda do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 *
 * @param {string} [border] Borda do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 *
 * @param {string} [boxShadow] Sombra do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 * 
 * @param {string} [maxWidth] Largura Máxima do container principal do formulário.
 *
 * @param {string} [backgroundField] Cor de fundo dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [colorField] Cor do texto dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string | number} [borderRadiusField] Raio da borda dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [boxShadowField] Sombra aplicada aos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [borderColorField] Cor da borda dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string | number} [paddingField] Espaçamento interno dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string | number} [marginField] Margem externa dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 * 
 * @param {string} [textButton='Enviar'] Texto exibido no botão principal do formulário.
 *
 * @param {TypographyVariant} [variantButton='body1'] Variante tipográfica utilizada no texto do botão e links.
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


 * @example
 * ```tsx
 * import { FormLogin } from '@/components/FormLogin';
 * import GoogleIcon from '@mui/icons-material/Google';
 *
 * const Example = () => {
 *   return (
 *     <FormLogin
 *       urlCriarConta="/criar-conta"
 *       urlRecuperarConta="/recuperar-senha"
 *       googleButton={() => <button>Entrar com Google</button>}
 *       onClick={async ({ email, password }) => {
 *         if (email === 'teste@teste.com' && password === '123') {
 *           return { success: true, message: 'Login realizado com sucesso!' };
 *         }
 *         return { success: false, message: 'Credenciais inválidas.' };
 *       }}
 *     />
 *   );
 * };
 * ```
 */

const DivPassword = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  margin: '0',
  padding: '0',
}));


export interface FormLoginProps extends ColorProps, BorderProps, ButtonProps, FieldProps, LayoutProps {  
  urlRecuperarConta: string;
  urlCriarConta: string;

  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;
  googleButton: () => React.ReactElement;

  textButton?: string;
  variantButton?: TypographyVariant;  

  colorLink?: string;
  divider?: string;
  
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
  maxWidth,

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

  colorLink,  
  divider,

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

  const bgButton = backgroundButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.background ?? undefined;
  const bgHoverButton = backgroundHoverButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.backgroundHover ?? undefined;
  const cButton = colorButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.color ?? undefined;
  const cHoverButton = colorHoverButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.colorHover ?? undefined;
  const brButton = borderRadiusButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.borderRadius ?? undefined;
  const bsButton = boxShadowButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.boxShadow ?? undefined;  
  const pButton = paddingButton ?? theme?.pipelinesolucoes?.forms?.login?.button?.padding ?? undefined; 

  const cdivider =  divider ?? theme?.pipelinesolucoes?.forms?.login?.divider ?? undefined;
  const cLink = colorLink ?? theme?.pipelinesolucoes?.forms?.login?.link?.color ?? undefined;

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
    <StyledRoot background={bContainer} border_radius={brContainer} box_shadow={bsContainer} border={bdContainer} maxWidth={maxWidth}>
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
            requiredMessage="email obrigatório"
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
    </StyledRoot>
  );
};

export default FormLogin;
