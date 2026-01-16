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

interface TextFieldBirthDateWithAgeProps
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

  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  /**
   * Callback disparado sempre que a idade puder ser calculada.
   * Retorna `null` quando a data é inválida ou incompleta.
   */
  onAgeChange?: (age: number | null) => void;
}

const onlyNumbers = (raw: string) => (raw ?? '').replace(/[^\d]/g, '');

const formatBirthDate = (raw: string) => {
  const digits = onlyNumbers(raw).slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const isValidBirthDate = (formatted: string) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formatted)) return false;

  const [ddStr, mmStr, yyyyStr] = formatted.split('/');
  const dd = Number(ddStr);
  const mm = Number(mmStr);
  const yyyy = Number(yyyyStr);

  if (!Number.isFinite(dd) || !Number.isFinite(mm) || !Number.isFinite(yyyy)) return false;
  if (yyyy < 1900 || yyyy > 3000) return false;
  if (mm < 1 || mm > 12) return false;
  if (dd < 1 || dd > 31) return false;

  const date = new Date(yyyy, mm - 1, dd);
  if (Number.isNaN(date.getTime())) return false;

  // garante que não "normalizou" (ex.: 31/02 vira 02/03)
  return (
    date.getFullYear() === yyyy &&
    date.getMonth() === mm - 1 &&
    date.getDate() === dd
  );
};

const calculateAgeFromFormatted = (formatted: string): number | null => {
  if (!isValidBirthDate(formatted)) return null;

  const [ddStr, mmStr, yyyyStr] = formatted.split('/');
  const dd = Number(ddStr);
  const mm = Number(mmStr);
  const yyyy = Number(yyyyStr);

  const birth = new Date(yyyy, mm - 1, dd);
  const today = new Date();

  // Não permitir data no futuro
  const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (birth.getTime() > todayAtMidnight.getTime()) return null;

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= 0 ? age : null;
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
    TextFieldBirthDateWithAgeProps,
    'required' | 'requiredMessage' | 'minLength' | 'maxLength' | 'pattern' | 'patternMessage' | 'validate'
  >,
): string | null => {
  const v = value ?? '';
  if (required && v.trim().length === 0) return requiredMessage || 'Campo obrigatório';

  if (typeof minLength === 'number' && v.length < minLength) {
    return `Mínimo de ${minLength} caracteres`;
  }

  if (typeof maxLength === 'number' && v.length > maxLength) {
    return `Máximo de ${maxLength} caracteres`;
  }

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
 * Campo de data de nascimento com entrada somente numérica, máscara `dd/mm/yyyy`,
 * validações comuns (required, min/maxLength, pattern) + validação customizada,
 * e cálculo automático de idade exibido no helperText.
 *
 * Regras:
 * - O usuário digita apenas números.
 * - Ao digitar, o valor é formatado automaticamente como `dd/mm/yyyy`.
 * - Quando a data estiver completa e for válida, a idade é calculada e exibida.
 * - Erros sempre têm prioridade no helperText.
 *
 * Tokens de estilo (ordem de prioridade):
 * - props do componente
 * - `theme.pipelinesolucoes.forms.field`
 * - fallback interno (constantes `fb*`)
 *
 * @param {string} [id] Identificador do campo.
 * @param {string} [label] Rótulo exibido acima do campo.
 * @param {string} [placeholder='dd/mm/aaaa'] Placeholder do input.
 * @param {string} [value] Valor do campo (controlado).
 * @param {boolean} [disabled=false] Define se o campo está desabilitado.
 *
 * @param {number} [minLength] Número mínimo de caracteres para validação (após máscara).
 * @param {number} [maxLength] Número máximo de caracteres para validação (após máscara).
 *
 * @param {boolean} [required=false] Define se é obrigatório.
 * @param {string} [requiredMessage='Campo obrigatório'] Mensagem de obrigatório.
 * @param {RegExp | string} [pattern] Pattern para validação do valor formatado.
 * @param {string} [patternMessage='Formato inválido'] Mensagem do pattern.
 * @param {'change' | 'blur'} [showErrorOn='blur'] Momento de exibir o erro.
 * @param {(value: string) => string | null | undefined} [validate] Validação customizada do valor formatado.
 *
 * @param {(age: number | null) => void} [onAgeChange] Callback com a idade calculada (ou null se inválido/incompleto).
 * @param {(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} [onChange] Callback disparado ao alterar (já com valor formatado).
 * @param {(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void} [onBlur] Callback disparado ao perder o foco.
 *
 * @example
 * ```tsx
 * const Example = () => {
 *   const [birthDate, setBirthDate] = React.useState('');
 *   const [age, setAge] = React.useState<number | null>(null);
 *
 *   return (
 *     <TextFieldBirthDateWithAge
 *       label="Data de nascimento"
 *       value={birthDate}
 *       required
 *       showErrorOn="blur"
 *       onChange={(e) => setBirthDate(e.target.value)}
 *       onAgeChange={(nextAge) => setAge(nextAge)}
 *       validate={(v) => (v.length === 10 && !/^\d{2}\/\d{2}\/\d{4}$/.test(v) ? 'Data inválida' : null)}
 *     />
 *   );
 * };
 * ```
 */
const TextFieldBirthDateWithAge: React.FC<TextFieldBirthDateWithAgeProps> = ({
  id,
  label,
  placeholder = 'dd/mm/aaaa',
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

  onChange,
  onBlur,
  onAgeChange,
}) => {
  const [touched, setTouched] = React.useState(false);

  const formattedValue = React.useMemo(() => formatBirthDate(value), [value]);

  const computedAge = React.useMemo(() => {
    // só calcula quando completo
    if (formattedValue.length !== 10) return null;
    return calculateAgeFromFormatted(formattedValue);
  }, [formattedValue]);

  React.useEffect(() => {
    onAgeChange?.(computedAge);
  }, [computedAge, onAgeChange]);

  const errorMessage = React.useMemo(() => {
    const v = formattedValue;

    const baseError =
      showErrorOn === 'change'
        ? computeError(v, { required, requiredMessage, minLength, maxLength, pattern, patternMessage, validate })
        : showErrorOn === 'blur' && touched
          ? computeError(v, { required, requiredMessage, minLength, maxLength, pattern, patternMessage, validate })
          : null;

    if (baseError) return baseError;

    // Validação adicional: data completa mas inválida (ex.: 31/02/2020 ou data futura)
    if (v.length === 10 && !isValidBirthDate(v)) return 'Data inválida';
    if (v.length === 10 && isValidBirthDate(v) && computedAge === null) return 'Data inválida';

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
    computedAge,
  ]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!touched) setTouched(true);
    onBlur?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!onChange) return;

    const next = formatBirthDate(event.target.value);

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

  const helperText = errorMessage
    ? errorMessage
    : computedAge !== null
      ? `Idade: ${computedAge} anos`
      : ' ';

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
            maxLength: 10,
          },
        },
      }}
    />
  );
};

TextFieldBirthDateWithAge.displayName = 'TextFieldBirthDateWithAge';

export default TextFieldBirthDateWithAge;
