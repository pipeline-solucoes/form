'use client';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Divider, SvgIconProps, Typography } from '@mui/material';
import { ButtonProps } from '../../types/ButtonProps';
import { ButtonFormStyled } from '../../style/ButtonFormStyled';
import { FieldProps } from '@/types/FieldProps';
import { validateEmailMessage } from '../../utils/validateEmail';
import TextFieldValidate from '../TextFieldValidate';
import TextFieldPassword from '../TextFieldPassword';
import { LinkFormStyled } from '../../style/LinkFormStyled';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { ClickResult } from './ClickResult';
import { DivCampos, DivLink, DivTitulo, FormContainer, StyledRoot } from './StyleLogin';


export interface FormSignUpProps extends ColorProps, BorderProps, ButtonProps, FieldProps, LayoutProps {
  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;
  googleButton: () => React.ReactElement;  

  colorLink?: string;
  divider?: string;

  urlLogin: string;
  children?: React.ReactNode;

  patternPassword?: RegExp;
  patternPasswordMessage?: string; 

  onClick?: (data: { email: string; password: string }) => Promise<ClickResult> | ClickResult;
}

/**
 * Componente de formulário de cadastro (Sign Up) completo, com suporte a:
 * criação de conta via email/senha, confirmação de senha, botão de cadastro social,
 * validação básica de campos, exibição de mensagens de sucesso/erro
 * e ampla customização visual via props ou tema.
 *
 * @param {string} urlLogin URL para a página de login (usuário já possui conta).
 *
 * @param {React.ElementType<SvgIconProps>} [Icon] Ícone exibido no topo do formulário.
 *
 * @param {() => React.ReactElement} [titulo] Função que retorna o título do formulário.
 *
 * @param {() => React.ReactElement} googleButton Função que renderiza o botão de cadastro social.
 *
 * @param {(data: { email: string; password: string }) => Promise<ClickResult> | ClickResult} [onClick]
 * Callback executado ao submeter o formulário. Deve retornar um objeto com sucesso, mensagem e cor opcional.
 *
 * @param {React.ReactNode} [children] Conteúdo adicional renderizado abaixo do formulário.
 *
 * @param {string} [background] Cor de fundo do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 *
 * @param {string | number} [borderRadius] Raio da borda do container principal.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 *
 * @param {string} [border] Borda do container principal.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.
 *
 * @param {string} [boxShadow] Sombra do container principal.
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
 * @param {string | number} [borderRadiusField] Raio da borda dos campos.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [boxShadowField] Sombra aplicada aos campos.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [borderColorField] Cor da borda dos campos.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string | number} [paddingField] Espaçamento interno dos campos.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string | number} [marginField] Margem externa dos campos.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.field.
 *
 * @param {string} [textButton='Enviar'] Texto exibido no botão principal.
 *
 * @param {TypographyVariant} [variantButton='body1'] Variante tipográfica utilizada no texto do botão.
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
 * @param {string} [colorLink] Cor do link de redirecionamento para login.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {string} [divider] Cor do divisor visual entre login social e formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.login.button.
 *
 * @param {RegExp} [passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/] Regex para validar formato da senha válida.
 * 
 * @param {RegExp} [patternPasswordMessage='A senha deve ter no mínimo 8 caracteres, com ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'] Mensagem de senha invalida.
 * 
 * @example
 * ```tsx
 * import { FormSignUp } from '@/components/FormSignUp';
 * import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 *
 * const Example = () => {
 *   return (
 *     <FormSignUp
 *       urlLogin="/login"
 *       Icon={AccountCircleIcon}
 *       titulo={() => <h2>Criar conta</h2>}
 *       googleButton={() => <button>Cadastrar com Google</button>}
 *       onClick={async ({ email, password }) => {
 *         if (email && password) {
 *           return { success: true, message: 'Conta criada com sucesso!' };
 *         }
 *         return { success: false, message: 'Erro ao criar conta.' };
 *       }}
 *     />
 *   );
 * };
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

  colorLink,
  divider,

  patternPassword,
  patternPasswordMessage,

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
  
  const cdivider =  divider ?? theme?.pipelinesolucoes?.forms?.login?.divider ?? undefined;
  const cLink = colorLink ?? theme?.pipelinesolucoes?.forms?.login?.link?.color ?? undefined;

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
            height={hgField}
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            requiredMessage="email obrigatório"
            validate={validateEmailMessage}
            showErrorOn="blur"
          />
          
          <TextFieldPassword
            id="password"
            label="Senha"
            placeholder="Senha"
            height={hgField}
            required={true}
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            value={password}
            pattern={patternPassword}
            patternMessage={patternPasswordMessage}
            onPasswordChange={(p) => setPassword(p)}
          />
                    
          <TextFieldPassword
            id="passwordconfirmada"
            label="Confirmar Senha"
            placeholder="Confirmar Senha"
            height={hgField}
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
          <Typography variant={variantButton} component='span' color={cField}>Já tem uma conta?</Typography>
          <LinkFormStyled href={urlLogin} text_color={cLink}>
            <Typography variant={variantButton} component='span' marginLeft="4px">Entrar</Typography>
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

export default FormSignUp;
