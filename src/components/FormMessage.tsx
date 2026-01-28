'use client';
import React, { useState } from 'react';
import { TypographyVariant, useTheme } from '@mui/material/styles';
import { SvgIconProps, Typography } from '@mui/material';
import { ButtonProps } from '../types/ButtonProps';
import { ButtonFormStyled } from '../style/ButtonFormStyled';
import { FieldProps } from '@/types/FieldProps';
import { validateEmailMessage } from '../utils/validateEmail';
import TextFieldValidate from './TextFieldValidate';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { DivTitulo, FormContainer, StyledRoot } from './StyleForm';
import { validateTelefoneMessage } from '../utils/validateTelefone';
import { ClickResult } from '../types/ClickResult';


export interface FormMessageProps extends 
  ColorProps, 
  BorderProps, 
  ButtonProps, 
  FieldProps, 
  LayoutProps 
{  
 
  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;

  textButton?: string;
  variantButton?: TypographyVariant;  
  rowsMessage?: number,
  
  children?: React.ReactNode;
  onClick?: (data: { nome: string; email: string; telefone: string; mensagem: string; }) => Promise<ClickResult> | ClickResult;
}

/**
 * Componente de formulário para envio de mensagem (contato), com campos controlados internamente
 * (**nome**, **email**, **telefone** e **mensagem**) e submissão via callback assíncrono (`onClick`).
 *
 * Funcionalidades principais:
 * - Renderiza campos de texto com validação (via `TextFieldValidate`) e feedback de erro ao usuário.
 * - Validação local mínima para **email** antes de disparar o `onClick`.
 * - Exibe mensagem de retorno (sucesso/erro) após execução do `onClick`, com cor configurável.
 * - Suporta cabeçalho opcional com ícone (`Icon`) e título customizado (`titulo`).
 * - Permite conteúdo adicional via `children` abaixo do feedback do formulário.
 *
 * Tokens de estilo (ordem de prioridade):
 * - Container do formulário (`StyledRoot`):
 *   - `background` → `theme.pipelinesolucoes.forms.background` → `'transparent'`
 *   - `borderRadius` → `theme.pipelinesolucoes.forms.borderRadius` → `'0'`
 *   - `border` → `theme.pipelinesolucoes.forms.border` → `'0'`
 *   - `boxShadow` → `theme.pipelinesolucoes.forms.boxShadow` → `'none'`
 *   - `maxWidth` → *(sem token de theme neste componente)* → *(comportamento do styled component)*
 * - Campos (`TextFieldValidate`), aplicados igualmente a todos os campos:
 *   - `backgroundField` → `theme.pipelinesolucoes.forms.field.background` → `undefined`
 *   - `colorField` → `theme.pipelinesolucoes.forms.field.color` → `undefined`
 *   - `borderRadiusField` → `theme.pipelinesolucoes.forms.field.borderRadius` → `undefined`
 *   - `boxShadowField` → `theme.pipelinesolucoes.forms.field.boxShadow` → `undefined`
 *   - `borderColorField` → `theme.pipelinesolucoes.forms.field.borderColor` → `undefined`
 *   - `paddingField` → `theme.pipelinesolucoes.forms.field.padding` → `undefined`
 *   - `marginField` → `theme.pipelinesolucoes.forms.field.margin` → `undefined`
 *   - `heightField` → `theme.pipelinesolucoes.forms.field.height` → `undefined`
 * - Botão (`ButtonFormStyled`):
 *   - `backgroundButton` → `theme.pipelinesolucoes.forms.button.background` → `undefined`
 *   - `backgroundHoverButton` → `theme.pipelinesolucoes.forms.button.backgroundHover` → `undefined`
 *   - `colorButton` → `theme.pipelinesolucoes.forms.button.color` → `undefined`
 *   - `colorHoverButton` → `theme.pipelinesolucoes.forms.button.colorHover` → `undefined`
 *   - `borderRadiusButton` → `theme.pipelinesolucoes.forms.button.borderRadius` → `undefined`
 *   - `boxShadowButton` → `theme.pipelinesolucoes.forms.button.boxShadow` → `undefined`
 *   - `paddingButton` → `theme.pipelinesolucoes.forms.button.padding` → `undefined`
 *   - `borderButton` → *(prop do componente)* → `'none'`
 *   - `widthButton` → *(prop do componente)* → `'auto'`
 *   - `heightButton` → *(prop do componente)* → `'auto'`
 *   - `marginButton` → *(prop do componente)* → `'0'`
 *
 * Tipografia:
 * - O texto do botão é renderizado com `Typography` do Material UI.
 * - Ordem de prioridade:
 *   - `variantButton` → *(fallback interno)* `'body1'`
 * - Observação: `variantButton` aceita qualquer `TypographyVariant` compatível com o theme do Material UI.
 *
 * @param {import('@mui/material/styles').TypographyVariant} [variantButton]
 * Variante tipográfica do texto do botão (`Typography variant`).  
 * Ordem: `variantButton` → `'body1'`.
 *
 * @param {string} [textButton]
 * Texto exibido no botão quando não está carregando.  
 * Padrão: `'Enviar'`.
 *
 * @param {number} [rowsMessage]
 * Número de linhas do campo **Mensagem** quando `multiline` está ativo.  
 * Padrão: `5`.
 *
 * @param {React.ElementType<import('@mui/material').SvgIconProps>} [Icon]
 * Componente de ícone (ex.: `EmailOutlined`, `ChatOutlined`) renderizado no cabeçalho do formulário.
 * Renderizado apenas quando fornecido.
 *
 * @param {() => React.ReactElement} [titulo]
 * Função que retorna o elemento React usado como título no cabeçalho do formulário.
 * Renderizado apenas quando fornecido.
 *
 * @param {React.ReactNode} [children]
 * Conteúdo adicional renderizado ao final do componente (abaixo da mensagem de feedback da API).
 *
 * @param {(data: { nome: string; email: string; telefone: string; mensagem: string; }) => (Promise<import('../types/ClickResult').ClickResult> | import('../types/ClickResult').ClickResult)} [onClick]
 * Callback acionado ao clicar no botão (submissão). Recebe os valores atuais dos campos do formulário.
 * - Se ausente, o componente exibe a mensagem: **"Nenhuma ação foi configurada para o botão."**
 * - Se retornar `{ success: true }`, exibe `message` com cor `color` (ou `theme.palette.success.main` como fallback).
 * - Se retornar `{ success: false }`, exibe `message` com cor `color` (ou `theme.palette.error.main` como fallback).
 * - Em exceção (`throw`), exibe: **"Erro inesperado ao processar a solicitação."** com `theme.palette.error.main`.
 *
 * Estilo / Aparência:
 * @param {import('@pipelinesolucoes/theme').ColorProps['background']} [background]
 * Background do container do formulário.  
 * Ordem: `background` → `theme.pipelinesolucoes.forms.background` → `'transparent'`.
 *
 * @param {import('@pipelinesolucoes/theme').BorderProps['borderRadius']} [borderRadius]
 * Raio de borda do container do formulário.  
 * Ordem: `borderRadius` → `theme.pipelinesolucoes.forms.borderRadius` → `'0'`.
 *
 * @param {import('@pipelinesolucoes/theme').BorderProps['border']} [border]
 * Borda do container do formulário.  
 * Ordem: `border` → `theme.pipelinesolucoes.forms.border` → `'0'`.
 *
 * @param {import('@pipelinesolucoes/theme').LayoutProps['boxShadow']} [boxShadow]
 * Sombra do container do formulário.  
 * Ordem: `boxShadow` → `theme.pipelinesolucoes.forms.boxShadow` → `'none'`.
 *
 * @param {import('@pipelinesolucoes/theme').LayoutProps['maxWidth']} [maxWidth]
 * Largura máxima do container do formulário. *(Sem token de theme aplicado diretamente neste componente.)*
 *
 * @param {import('@/types/FieldProps').FieldProps['backgroundField']} [backgroundField]
 * Background aplicado aos campos (`TextFieldValidate`).  
 * Ordem: `backgroundField` → `theme.pipelinesolucoes.forms.field.background` → `undefined`.
 *
 * @param {import('@/types/FieldProps').FieldProps['colorField']} [colorField]
 * Cor do texto aplicada aos campos (`TextFieldValidate`).  
 * Ordem: `colorField` → `theme.pipelinesolucoes.forms.field.color` → `undefined`.
 *
 * @param {import('@/types/FieldProps').FieldProps['borderRadiusField']} [borderRadiusField]
 * Raio de borda aplicado aos campos (`TextFieldValidate`).  
 * Ordem: `borderRadiusField` → `theme.pipelinesolucoes.forms.field.borderRadius` → `undefined`.
 *
 * @param {import('@/types/FieldProps').FieldProps['boxShadowField']} [boxShadowField]
 * Sombra aplicada aos campos (`TextFieldValidate`).  
 * Ordem: `boxShadowField` → `theme.pipelinesolucoes.forms.field.boxShadow` → `undefined`.
 *
 * @param {import('@/types/FieldProps').FieldProps['borderColorField']} [borderColorField]
 * Cor da borda aplicada aos campos (`TextFieldValidate`).  
 * Ordem: `borderColorField` → `theme.pipelinesolucoes.forms.field.borderColor` → `undefined`.
 *
 * @param {import('@/types/FieldProps').FieldProps['paddingField']} [paddingField]
 * Padding aplicado aos campos (`TextFieldValidate`).  
 * Ordem: `paddingField` → `theme.pipelinesolucoes.forms.field.padding` → `undefined`.
 *
 * @param {import('@/types/FieldProps').FieldProps['marginField']} [marginField]
 * Margem aplicada aos campos (`TextFieldValidate`).  
 * Ordem: `marginField` → `theme.pipelinesolucoes.forms.field.margin` → `undefined`.
 *
 * @param {import('@/types/FieldProps').FieldProps['heightField']} [heightField]
 * Altura aplicada aos campos (`TextFieldValidate`).  
 * Ordem: `heightField` → `theme.pipelinesolucoes.forms.field.height` → `undefined`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['backgroundButton']} [backgroundButton]
 * Background do botão.  
 * Ordem: `backgroundButton` → `theme.pipelinesolucoes.forms.button.background` → `undefined`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['backgroundHoverButton']} [backgroundHoverButton]
 * Background do botão em hover.  
 * Ordem: `backgroundHoverButton` → `theme.pipelinesolucoes.forms.button.backgroundHover` → `undefined`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['colorButton']} [colorButton]
 * Cor do texto do botão.  
 * Ordem: `colorButton` → `theme.pipelinesolucoes.forms.button.color` → `undefined`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['colorHoverButton']} [colorHoverButton]
 * Cor do texto do botão em hover.  
 * Ordem: `colorHoverButton` → `theme.pipelinesolucoes.forms.button.colorHover` → `undefined`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['borderRadiusButton']} [borderRadiusButton]
 * Raio de borda do botão.  
 * Ordem: `borderRadiusButton` → `theme.pipelinesolucoes.forms.button.borderRadius` → `undefined`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['borderButton']} [borderButton]
 * Borda do botão.  
 * Ordem: `borderButton` → `'none'`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['boxShadowButton']} [boxShadowButton]
 * Sombra do botão.  
 * Ordem: `boxShadowButton` → `theme.pipelinesolucoes.forms.button.boxShadow` → `undefined`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['widthButton']} [widthButton]
 * Largura do botão.  
 * Ordem: `widthButton` → `'auto'`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['heightButton']} [heightButton]
 * Altura do botão.  
 * Ordem: `heightButton` → `'auto'`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['paddingButton']} [paddingButton]
 * Padding do botão.  
 * Ordem: `paddingButton` → `theme.pipelinesolucoes.forms.button.padding` → `undefined`.
 *
 * @param {import('../types/ButtonProps').ButtonProps['marginButton']} [marginButton]
 * Margem do botão.  
 * Ordem: `marginButton` → `'0'`.
 *
 * Validação:
 * - Email: validação local por regex simples (`/\S+@\S+\.\S+/`) antes de executar `onClick`.
 * - Campos: cada `TextFieldValidate` recebe `required` e `showErrorOn="blur"`, além de validações específicas:
 *   - `validateEmailMessage` para email.
 *   - `validateTelefoneMessage` para telefone.
 *
 * Eventos:
 * - Clique no botão: dispara `handleClick`, que:
 *   - Prevê `preventDefault()` no evento de formulário.
 *   - Bloqueia envio se email inválido e exibe mensagem padrão de erro.
 *   - Desabilita o botão enquanto `isLoading` estiver `true`, exibindo "Enviando...".
 *
 * @example
 * ```tsx
 * import FormMessage from './FormMessage';
 * import EmailOutlined from '@mui/icons-material/EmailOutlined';
 *
 * export function Contato() {
 *   return (
 *     <FormMessage
 *       Icon={EmailOutlined}
 *       titulo={() => <strong>Fale conosco</strong>}
 *       textButton="Enviar mensagem"
 *       variantButton="body2"
 *       rowsMessage={6}
 *       onClick={async ({ nome, email, telefone, mensagem }) => {
 *         // Exemplo: chamada de API
 *         const ok = Boolean(nome && email && telefone && mensagem);
 *         return ok
 *           ? { success: true, message: 'Mensagem enviada com sucesso!' }
 *           : { success: false, message: 'Não foi possível enviar a mensagem.' };
 *       }}
 *     >
 *       <small>Responderemos em até 1 dia útil.</small>
 *     </FormMessage>
 *   );
 * }
 * ```
 *
 * @example
 * ```ts
 * // Exemplo de configuração no theme (Pipeline)
 * const theme = {
 *   pipelinesolucoes: {
 *     forms: {
 *       background: 'transparent',
 *       borderRadius: '8px',
 *       border: '1px solid rgba(0,0,0,0.12)',
 *       boxShadow: 'none',
 *       field: {
 *         background: '#fff',
 *         color: '#111',
 *         borderRadius: '8px',
 *         borderColor: 'rgba(0,0,0,0.23)',
 *         boxShadow: 'none',
 *         padding: '12px',
 *         margin: '0 0 12px 0',
 *         height: '48px',
 *       },
 *       button: {
 *         background: '#111',
 *         backgroundHover: '#222',
 *         color: '#fff',
 *         colorHover: '#fff',
 *         borderRadius: '8px',
 *         boxShadow: 'none',
 *         padding: '12px 16px',
 *       },
 *     },
 *   },
 * };
 * ```
 */


const FormMessage: React.FC<FormMessageProps> = ({
    
  Icon,
  titulo,

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

  rowsMessage = 5,
  
  children,
  onClick,
}) => {

  const theme = useTheme();
  const color_message_sucess = theme.palette.success.main;
  const color_message_erro = theme.palette.error.main;

  const bContainer = background ?? theme?.pipelinesolucoes?.forms?.background ?? 'transparent';
  const brContainer = borderRadius ?? theme?.pipelinesolucoes?.forms?.borderRadius ?? '0';
  const bdContainer= border ?? theme?.pipelinesolucoes?.forms?.border ?? '0';
  const bsContainer= boxShadow ?? theme?.pipelinesolucoes?.forms?.boxShadow ?? 'none';

  const bField = backgroundField ?? theme?.pipelinesolucoes?.forms?.field?.background ?? undefined;
  const cField = colorField ?? theme?.pipelinesolucoes?.forms?.field?.color ?? undefined;
  const brField = borderRadiusField ?? theme?.pipelinesolucoes?.forms?.field?.borderRadius ?? undefined;
  const bsField = boxShadowField ?? theme?.pipelinesolucoes?.forms?.field?.boxShadow ?? undefined;
  const bcField = borderColorField ?? theme?.pipelinesolucoes?.forms?.field?.borderColor ?? undefined;
  const pField = paddingField ?? theme?.pipelinesolucoes?.forms?.field?.padding ?? undefined;
  const mgField = marginField ?? theme?.pipelinesolucoes?.forms?.field?.margin ?? undefined;
  const hgField = heightField ?? theme?.pipelinesolucoes?.forms?.field?.height ?? undefined;   
    
  const bgButton = backgroundButton ?? theme?.pipelinesolucoes?.forms?.button?.background ?? undefined;
  const bgHoverButton = backgroundHoverButton ?? theme?.pipelinesolucoes?.forms?.button?.backgroundHover ?? undefined;
  const cButton = colorButton ?? theme?.pipelinesolucoes?.forms?.button?.color ?? undefined;
  const cHoverButton = colorHoverButton ?? theme?.pipelinesolucoes?.forms?.button?.colorHover ?? undefined;
  const brButton = borderRadiusButton ?? theme?.pipelinesolucoes?.forms?.button?.borderRadius ?? undefined;
  const bsButton = boxShadowButton ?? theme?.pipelinesolucoes?.forms?.button?.boxShadow ?? undefined;  
  const pButton = paddingButton ?? theme?.pipelinesolucoes?.forms?.button?.padding ?? undefined;
      
  const [mensagemApi, setMensagemApi] = useState('');
  const [corMensagemApi, setCorMensagemApi] = useState(color_message_erro);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

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

      const result = await onClick({ nome, email, telefone, mensagem });

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
        
        <TextFieldValidate
            id="nome"
            label="Nome"
            placeholder="Nome"  
            value={nome}
            onChange={(e) => setNome(e.target.value)}                              
            required     
            requiredMessage="nome obrigatório"             
            showErrorOn="blur"
            height={hgField}            
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            margin={mgField}
        />
        
        <TextFieldValidate
            id="email"
            label="Email"
            placeholder="Email"            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            requiredMessage="email obrigatório"
            validate={validateEmailMessage}
            showErrorOn="blur"
            height={hgField}            
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            margin={mgField}
        />
        
        <TextFieldValidate
            id="telefone"
            label="Telefone"
            placeholder="Telefone"    
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}                  
            required={true}
            requiredMessage="telefone obrigatório"
            validate={validateTelefoneMessage}
            showErrorOn="blur"
            height={hgField}            
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            margin={mgField}            
        />
    
        <TextFieldValidate
            id="mensagem"
            label="Mensagem"
            placeholder="Mensagem"  
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}             
            required
            requiredMessage="mensagem obrigatória"
            multiline 
            rows={rowsMessage}                  
            showErrorOn="blur"
            height={hgField}            
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            margin={mgField}
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
          {isLoading ? (
            'Enviando...'
          ) : (
            <Typography variant={variantButton} component="span">
              {textButton}
            </Typography>
          )}
        </ButtonFormStyled>

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

export default FormMessage;
