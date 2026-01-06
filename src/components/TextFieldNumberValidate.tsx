import React from 'react';
import { TypographyVariant, useTheme } from '@mui/material/styles';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { TextFieldStyled } from '../style/TextFieldStyle';
import {
  fbbackground,
  fbbackgroundDisabled,
  fbborderColor,
  fbborderRadius,
  fbboxShadow,
  fbcolor,
  fbcolorDisabled,
  fbcolorFocused,
  fbheigth,
  fbpadding,
} from '../constant';

interface TextFieldNumberValidateProps 
    extends 
        Omit<ColorProps, 'backgroundHover' | 'colorHover'>, 
        Omit<BorderProps, 'border' >, 
        Pick<LayoutProps, 'height' | 'padding'> {

  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  textVariant?: TypographyVariant;

  disabled?: boolean;

  // Length
  minLength?: number;
  maxLength?: number;

  // Validação
  required?: boolean;
  requiredMessage?: string;
  pattern?: RegExp | string;
  patternMessage?: string;
  showErrorOn?: 'change' | 'blur';

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
    TextFieldNumberValidateProps,
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

const sanitizeNumeric = (raw: string) => (raw ?? '').replace(/[^\d]/g, '');

/**
 * Campo de texto numérico com suporte a validações comuns e customizadas, construído
 * sobre o TextField do Material UI e estilizado via Design System da Pipeline.
 *
 * Diferença principal:
 * - Este componente **aceita apenas números (0–9)**, removendo automaticamente qualquer caractere não numérico.
 *
 * Funcionalidades principais:
 * - Suporte a modo controlado (`value`)
 * - Validações nativas (obrigatório, tamanho mínimo, regex)
 * - Validação customizada via função
 * - Controle de momento de exibição do erro (`change` ou `blur`)
 * - Suporte a campo multilinha (mantido por compatibilidade)
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
 * @param {string} [value] Valor atual do campo (modo controlado). Somente dígitos serão mantidos.
 *
 * @param {boolean} [disabled=false] Define se o campo está desabilitado.
 *
 * @param {number} [minLength] Número mínimo de caracteres permitidos.
 * @param {number} [maxLength] Número máximo de caracteres permitidos.
 *
 * @param {boolean} [multiline=false] Define se o campo aceita múltiplas linhas (mantido por compatibilidade).
 * @param {number} [rows=3] Quantidade de linhas visíveis quando `multiline` está ativo.
 *
 * ### Estilo / Aparência
 * @param {import('@mui/material/styles').TypographyVariant} [textVariant] Variante tipográfica do Material UI aplicada ao texto e placeholder.
 * @param {string} [background] Cor de fundo do campo.
 * @param {string} [backgroundDisabled] Cor de fundo do campo quando desabilitado.
 * @param {string} [backgroundFocused] Cor de fundo do campo quando focado.
 * @param {string} [color] Cor do texto do campo (texto digitado e label).
 * @param {string} [colorFocused] Cor aplicada ao estado focado (usada como cor de borda no focus).
 * @param {string} [colorDisabled] Cor do texto do campo quando desabilitado.
 * @param {string} [borderRadius] Raio da borda do campo.
 * @param {string} [boxShadow] Sombra do campo.
 * @param {string} [borderColor] Cor da borda do campo (estado padrão/hover).
 * @param {string} [padding] Espaçamento interno do input (aplicado no texto e textarea).
 *
 * ---
 * ### Validação
 * @param {boolean} [required=false] Indica se o campo é obrigatório.
 * @param {string} [requiredMessage] Mensagem exibida quando o campo obrigatório está vazio.
 * @param {RegExp | string} [pattern] Expressão regular utilizada para validação do valor (aplicada após sanitização numérica).
 * @param {string} [patternMessage] Mensagem exibida quando o valor não atende ao pattern.
 * @param {'change' | 'blur'} [showErrorOn='blur'] Define quando o erro será exibido.
 * @param {(value: string) => string | null | undefined} [validate] Função de validação customizada (recebe o valor sanitizado).
 *
 * ---
 * ### Eventos
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] Callback disparado ao alterar o valor (com `event.target.value` já sanitizado).
 * @param {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur] Callback disparado ao perder o foco.
 *
 * @example
 * ```tsx
 * const Example = () => {
 *   const [age, setAge] = React.useState('');
 *
 *   return (
 *     <TextFieldNumberValidate
 *       label="Idade"
 *       placeholder="Somente números"
 *       value={age}
 *       onChange={(e) => setAge(e.target.value)}
 *       required
 *       minLength={1}
 *       maxLength={3}
 *       showErrorOn="blur"
 *       borderRadius="6px"
 *       textVariant="subtitle2"
 *     />
 *   );
 * };
 * ```
 */
const TextFieldNumberValidate: React.FC<TextFieldNumberValidateProps> = ({
  id,
  label,
  placeholder,
  value = '',
  textVariant,

  background,
  backgroundFocused,
  backgroundDisabled,
  color,
  colorFocused,
  colorDisabled,

  borderRadius,
  boxShadow,
  borderColor,

  padding,
  height,

  disabled = false,
  maxLength,
  minLength,
  
  required = false,
  requiredMessage = 'campo obrigatório',
  pattern,
  patternMessage = 'formato inválido',
  validate,
  showErrorOn = 'blur',
  
  onChange,
  onBlur,
}) => {
  const [touched, setTouched] = React.useState(false);

  const sanitizedValue = React.useMemo(() => sanitizeNumeric(value), [value]);

  const errorMessage = React.useMemo(() => {
    const v = sanitizedValue;

    if (showErrorOn === 'change') {
      return computeError(v, { required, requiredMessage, minLength, pattern, patternMessage, validate });
    }

    if (showErrorOn === 'blur' && touched) {
      return computeError(v, { required, requiredMessage, minLength, pattern, patternMessage, validate });
    }

    return null;
  }, [
    sanitizedValue,
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
    onBlur?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const next = sanitizeNumeric(event.target.value);

    // Cria um "evento" compatível com o callback, garantindo value sanitizado
    const syntheticEvent = {
      ...event,
      target: { ...event.target, value: next },
      currentTarget: { ...event.currentTarget, value: next },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite teclas de navegação/edição
    const allowed = [
      'Backspace',
      'Delete',
      'Tab',
      'Enter',
      'Escape',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
    ];

    if (allowed.includes(event.key)) return;

    // Permite Ctrl/Cmd + atalhos (A, C, V, X)
    if (event.ctrlKey || event.metaKey) return;

    // Bloqueia qualquer tecla que não seja dígito
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const theme = useTheme();
  const field = theme.pipelinesolucoes?.forms?.field;

  const bg = background ?? field?.background ?? fbbackground;
  const bgFocused = backgroundFocused ?? field?.backgroundFocused ?? bg;
  const bgDisabled = backgroundDisabled ?? field?.backgroundDisabled ?? fbbackgroundDisabled;
  const txt = color ?? field?.color ?? fbcolor;
  const txtDisabled = colorDisabled ?? field?.colorDisabled ?? fbcolorDisabled;
  const br = borderRadius ?? field?.borderRadius ?? fbborderRadius;
  const sh = boxShadow ?? field?.boxShadow ?? fbboxShadow;
  const bd = borderColor ?? field?.borderColor ?? fbborderColor;
  const bdFocused = colorFocused ?? field?.colorFocused ?? fbcolorFocused;
  const pad = padding ?? field?.padding ?? fbpadding;
  const hg = height ?? field?.height ?? fbheigth;

  const typo =
    (textVariant && theme.typography[textVariant]) ??
    field?.typography ??
    theme.typography.body1;

  return (
    <TextFieldStyled
      id={id}
      label={label}
      placeholder={placeholder}
      value={sanitizedValue}
      typo={typo}
      onChange={handleChange}
      onBlur={handleBlur}
      background={bg}
      backgroundFocused={bgFocused}
      backgroundDisabled={bgDisabled}
      colorText={txt}
      colorFocused={bdFocused}
      colorDisabled={txtDisabled}
      borderRadius={br}
      boxShadow={sh}
      borderColor={bd}
      padding={pad}
      disabled={disabled}
      required={required}      
      fullWidth
      height={hg}
      error={Boolean(errorMessage)}
      helperText={errorMessage || ' '}
      onKeyDown={handleKeyDown}
      slotProps={{
        input: {
          inputProps: {
            inputMode: 'numeric',
            pattern: '[0-9]*',
            ...(typeof maxLength === 'number' ? { maxLength } : {}),
          },
        },
      }}
    />
  );
};

TextFieldNumberValidate.displayName = 'TextFieldNumberValidate';

export default TextFieldNumberValidate;
