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
import { formatCpf } from '../utils/formatCpf';
import { validateCpf } from '../utils/validateCpf';

interface TextFieldCPFValidateProps
  extends
    Omit<ColorProps, 'backgroundHover' | 'colorHover'>,
    Omit<BorderProps, 'border'>,
    Pick<LayoutProps, 'height' | 'padding'> {

  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  textVariant?: TypographyVariant;

  disabled?: boolean;

  // Length (mantido para alinhamento com o componente base)
  minLength?: number;
  maxLength?: number;

  // Validação
  required?: boolean;
  requiredMessage?: string;
  pattern?: RegExp | string;
  patternMessage?: string;
  showErrorOn?: 'change' | 'blur';

  validate?: (value: string) => string | null | undefined;

  invalidCpfMessage?: string; // default: "CPF inválido"

  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const onlyNumbers = (raw: string) => (raw ?? '').replace(/[^\d]/g, '');


const isValidCpfFormatted = (formatted: string) => {
  // aceita com máscara completa
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formatted)) return false;
  const digits = onlyNumbers(formatted);
  return validateCpf(digits);
};

const computeError = (
  value: string,
  {
    required,
    requiredMessage,
    minLength,
    maxLength,
    pattern,
    patternMessage,
    validate,
  }: Pick<
    TextFieldCPFValidateProps,
    'required' | 'requiredMessage' | 'minLength' | 'maxLength' | 'pattern' | 'patternMessage' | 'validate'
  >,
): string | null => {
  const v = value ?? '';
  if (required && v.trim().length === 0) return requiredMessage || 'Campo obrigatório';

  if (typeof minLength === 'number' && v.length < minLength) return `Mínimo de ${minLength} caracteres`;
  if (typeof maxLength === 'number' && v.length > maxLength) return `Máximo de ${maxLength} caracteres`;

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
 * Campo de CPF com entrada somente numérica, máscara `000.000.000-00`,
 * validações comuns (required, min/maxLength, pattern) + validação customizada.
 *
 * @example
 * ```tsx
 * <TextFieldCPFValidate
 *   label="CPF"
 *   value={cpf}
 *   onChange={(e) => setCpf(e.target.value)} // recebe SEMPRE o valor formatado
 * />
 * ```
 */
const TextFieldCPFValidate: React.FC<TextFieldCPFValidateProps> = ({
  id,
  label = 'CPF',
  placeholder = '000.000.000-00',
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
  minLength,
  maxLength,

  required = false,
  requiredMessage = 'Campo obrigatório',
  pattern,
  patternMessage = 'Formato inválido',
  validate,
  showErrorOn = 'blur',

  invalidCpfMessage = 'CPF inválido',

  onChange,
  onBlur,
}) => {
  const [touched, setTouched] = React.useState(false);

  const formattedValue = React.useMemo(() => formatCpf(value), [value]);

  const cpfValid = React.useMemo(() => {
    // só valida quando estiver completo (14 com máscara)
    if (formattedValue.length !== 14) return null; // incompleto
    return isValidCpfFormatted(formattedValue);
  }, [formattedValue]);

  const errorMessage = React.useMemo(() => {
    const v = formattedValue;

    const baseError =
      showErrorOn === 'change'
        ? computeError(v, { required, requiredMessage, minLength, maxLength, pattern, patternMessage, validate })
        : showErrorOn === 'blur' && touched
          ? computeError(v, { required, requiredMessage, minLength, maxLength, pattern, patternMessage, validate })
          : null;

    if (baseError) return baseError;

    // valida CPF apenas quando completo
    if (v.length === 14 && cpfValid === false) return invalidCpfMessage;

    return null;
  }, [
    formattedValue,
    required,
    requiredMessage,
    minLength,
    maxLength,
    pattern,
    patternMessage,
    validate,
    showErrorOn,
    touched,
    cpfValid,
    invalidCpfMessage,
  ]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!touched) setTouched(true);
    onBlur?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!onChange) return;

    const next = formatCpf(event.target.value);

    const syntheticEvent = {
      ...event,
      target: { ...event.target, value: next },
      currentTarget: { ...event.currentTarget, value: next },
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    onChange(syntheticEvent);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
    if (event.ctrlKey || event.metaKey) return;

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

  const helperText = errorMessage ? errorMessage : '\u00A0';

  return (
    <TextFieldStyled
      id={id}
      label={label}
      placeholder={placeholder}
      value={formattedValue}
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
      helperText={helperText}
      onKeyDown={handleKeyDown}
      slotProps={{
        input: {
          inputProps: {
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 14, // 000.000.000-00
          },
        },
      }}
    />
  );
};

TextFieldCPFValidate.displayName = 'TextFieldCPFValidate';

export default TextFieldCPFValidate;
