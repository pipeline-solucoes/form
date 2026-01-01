
import React from 'react';
import { TypographyVariant, useTheme } from '@mui/material/styles';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { TextFieldStyled } from '../style/TextFieldStyle';
import { fbbackground, fbbackgroundDisabled, fbborderColor, fbborderRadius, fbboxShadow, fbcolor, fbcolorDisabled, fbcolorFocused, fbpadding } from '../constant';

interface TextFieldValidateProps 
  extends BorderProps, ColorProps, LayoutProps {
  
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  textVariant?: TypographyVariant;

  disabled?: boolean;

  // Validação
  required?: boolean;
  requiredMessage?: string;  
  pattern?: RegExp | string;
  patternMessage?: string;
  showErrorOn?: 'change' | 'blur';

  // Length
  minLength?: number;
  maxLength?: number;

  // Multiline
  multiline?: boolean;
  rows?: number;

  validate?: (value: string) => string | null | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const computeError = (
  value: string,
  {
    required,
    requiredMessage,
    minLength,
    pattern,
    patternMessage,
    validate,
  }: Pick<
    TextFieldValidateProps,
    'required' | 'requiredMessage' | 'minLength' | 'pattern' | 'patternMessage' | 'validate'
  >,
): string | null => {
  const v = value ?? '';
  if (required && v.trim().length === 0) return requiredMessage || 'Campo obrigatório';
  if (typeof minLength === 'number' && v.length < minLength) return `Mínimo de ${minLength} caracteres`;

  if (pattern) {
    const re = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    if (!re.test(v)) return patternMessage || 'Formato inválido';
  }

  if (validate) {
    const customMsg = validate(v);
    if (typeof customMsg === 'string' && customMsg) return customMsg;
  }

  return null;
};


/**
 * Campo de texto com suporte a validações comuns e customizadas, construído
 * sobre o TextField do Material UI e estilizado via Design System da Pipeline.
 *
 * Funcionalidades principais:
 * - Suporte a modo controlado (`value`)
 * - Validações nativas (obrigatório, tamanho mínimo, regex)
 * - Validação customizada via função
 * - Controle de momento de exibição do erro (`change` ou `blur`)
 * - Suporte a campo multilinha
 * - Customização visual via props e tokens de theme
 *
 * Tokens de estilo (ordem de prioridade):
 * - `prop` do componente
 * - `theme.pipelinesolucoes.forms.field`
 * - Fallback interno (constantes `fb*`)
 *
 * Tipografia:
 * - Suporte à tipografia do Material UI via `textVariant`
 * - Fallback para `theme.pipelinesolucoes.forms.field.typography`
 * - Fallback final para `theme.typography.body1`
 *
 * @param {string} [id] Identificador do campo, repassado ao input do Material UI.
 * @param {string} [label] Texto do rótulo exibido acima do campo.
 * @param {string} [placeholder] Texto exibido quando o campo está vazio.
 * @param {string} [value] Valor atual do campo (modo controlado).
 *
 * @param {boolean} [disabled=false] Define se o campo está desabilitado.
 *
 * @param {number} [minLength] Número mínimo de caracteres permitidos.
 * @param {number} [maxLength] Número máximo de caracteres permitidos.
 *
 * @param {boolean} [multiline=false] Define se o campo aceita múltiplas linhas.
 * @param {number} [rows=3] Quantidade de linhas visíveis quando `multiline` está ativo.
 *
 *
 * ### Estilo / Aparência
 * 
 * @param {import('@mui/material/styles').TypographyVariant} [textVariant] Variante tipográfica do Material UI aplicada ao texto e placeholder.
 *
 * @param {string} [background]
 * Cor de fundo do campo.
 * Ordem: `background` → `theme.pipelinesolucoes.forms.field.background` → `#fff`.
 *
 * @param {string} [backgroundDisabled]
 * Cor de fundo do campo quando desabilitado.
 * Ordem: `backgroundDisabled` → `theme.pipelinesolucoes.forms.field.backgroundDisabled` → `#E5E7EB`.
 *
 * @param {string} [color]
 * Cor do texto do campo (texto digitado e label).
 * Ordem: `color` → `theme.pipelinesolucoes.forms.field.color` → `#000`.
 *
 * @param {string} [colorFocused]
 * Cor aplicada ao estado focado (usada como cor de borda no focus).
 * Ordem: `colorFocused` → `theme.pipelinesolucoes.forms.field.colorFocused` → `#1976d2`.
 *
 * @param {string} [colorDisabled]
 * Cor do texto do campo quando desabilitado.
 * Ordem: `colorDisabled` → `theme.pipelinesolucoes.forms.field.colorDisabled` → `#9CA3AF`.
 *
 * @param {string} [borderRadius]
 * Raio da borda do campo.
 * Ordem: `borderRadius` → `theme.pipelinesolucoes.forms.field.borderRadius` → `"0"`.
 *
 * @param {string} [boxShadow]
 * Sombra do campo.
 * Ordem: `boxShadow` → `theme.pipelinesolucoes.forms.field.boxShadow` → `"none"`.
 *
 * @param {string} [borderColor]
 * Cor da borda do campo (estado padrão/hover).
 * Ordem: `borderColor` → `theme.pipelinesolucoes.forms.field.borderColor` → `#ccc`.
 *
 * @param {string} [padding]
 * Espaçamento interno do input (aplicado no texto e textarea).
 * Ordem: `padding` → `theme.pipelinesolucoes.forms.field.padding` → `"4px 8px"`.
 * 
 * ---
 * ### Validação
 * 
 * @param {boolean} [required=false] Indica se o campo é obrigatório.
 * @param {string} [requiredMessage] Mensagem exibida quando o campo obrigatório está vazio.
 * @param {RegExp | string} [pattern] Expressão regular utilizada para validação do valor.
 * @param {string} [patternMessage] Mensagem exibida quando o valor não atende ao pattern.
 * @param {'change' | 'blur'} [showErrorOn='blur'] Define quando o erro será exibido.
 * @param {(value: string) => string | null | undefined} [validate] Função de validação customizada.
 * 
 * ---
 * ### Eventos
 * 
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] Callback disparado ao alterar o valor.
 * @param {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur] Callback disparado ao perder o foco.
 * 
 * ---
 * 
 * @example
 * ```tsx
 * const Example = () => {
 *   const [email, setEmail] = React.useState('');
 *
 *   return (
 *     <TextFieldValidate
 *       label="E-mail"
 *       placeholder="Digite seu e-mail"
 *       value={email}
 *       onChange={(e) => setEmail(e.target.value)}
 *       required
 *       pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
 *       patternMessage="E-mail inválido"
 *       showErrorOn="blur"
 *       maxLength={120}
 *       borderRadius="6px"
 *       textVariant="subtitle2"
 *     />
 *   );
 * };
 * ```
 */ 
const TextFieldValidate: React.FC<TextFieldValidateProps> = ({
  id,
  label,
  background,
  backgroundDisabled,
  color,
  colorFocused,
  colorDisabled,
  borderRadius,
  boxShadow,
  borderColor,
  placeholder,
  disabled = false,
  value = '',
  onChange,
  onBlur,
  multiline = false,
  rows = 3,
  required = false,
  requiredMessage = 'campo obrigatório',
  minLength,
  pattern,
  patternMessage = 'formato inválido',
  validate,
  showErrorOn = 'blur',
  maxLength,
  padding,
  textVariant,
}) => {
  const [touched, setTouched] = React.useState(false);

  const errorMessage = React.useMemo(() => {
    if (showErrorOn === 'change') {
      return computeError(value, {
        required,
        requiredMessage,
        minLength,
        pattern,
        patternMessage,
        validate,
      });
    }

    if (showErrorOn === 'blur' && touched) {
      return computeError(value, {
        required,
        requiredMessage,
        minLength,
        pattern,
        patternMessage,
        validate,
      });
    }

    return null;
  }, [
    value,
    required,
    requiredMessage,
    minLength,
    pattern,
    patternMessage,
    validate,
    showErrorOn,
    touched,
  ]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!touched) setTouched(true);
    if (onBlur) {
      onBlur(event);
    }
  };

  const theme = useTheme();
  const field = theme.pipelinesolucoes?.forms?.field;

  const bg = background ?? field?.background ?? fbbackground;
  const bgDisabled = backgroundDisabled ?? field?.backgroundDisabled ?? fbbackgroundDisabled;
  const txt = color ?? field?.color ?? fbcolor;
  const txtDisabled = colorDisabled ?? field?.colorDisabled ?? fbcolorDisabled;
  const br = borderRadius ?? field?.borderRadius ?? fbborderRadius;
  const sh = boxShadow ?? field?.boxShadow ?? fbboxShadow;
  const bd = borderColor ?? field?.borderColor ?? fbborderColor;
  const bdFocused = colorFocused ?? field?.colorFocused ?? fbcolorFocused;
  const pad = padding ?? field?.padding ?? fbpadding;
    
  const typo =
    (textVariant && theme.typography[textVariant]) ??
    field?.typography ??
    theme.typography.body1;

  return (
    <TextFieldStyled
      id={id}
      label={label}
      placeholder={placeholder}
      value={value}
      typo={typo}
      onChange={onChange}
      onBlur={handleBlur}
      background={bg}
      backgroundDisabled={bgDisabled}
      colorText={txt}
      colorFocused={bdFocused}
      colorDisabled={txtDisabled}
      borderRadius={br}
      boxShadow={sh}
      borderColor={bd}
      padding={pad}
      disabled={disabled}
      multiline={multiline}
      required={required}
      rows={multiline ? rows : undefined}
      fullWidth
      error={Boolean(errorMessage)}
      helperText={errorMessage || ' '}
      slotProps={{
        input: {
          inputProps: typeof maxLength === 'number' ? { maxLength } : undefined,
        },
      }}
    />
  );
};

TextFieldValidate.displayName = 'TextFieldValidate';

export default TextFieldValidate;
