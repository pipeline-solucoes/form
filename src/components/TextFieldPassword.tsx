'use client';

import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { TypographyVariant, useTheme } from '@mui/material/styles';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { TextFieldStyled } from '../style/TextFieldStyle';
import { fbbackground, fbbackgroundDisabled, fbborderColor, fbborderRadius, fbboxShadow, fbcolor, fbcolorDisabled, fbcolorFocused, fbheigth, fbpadding } from '../constant';

type ValidationStatus = 'idle' | 'required' | 'invalid' | 'valid';

interface PasswordValidationResult {
  isValid: boolean;
  status: ValidationStatus;
  message: string;
  value: string;
}

interface TextFieldPasswordProps  
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

  required?: boolean;
  requiredMessage?: string;
  pattern?: RegExp;
  patternMessage?: string;  
  showErrorOn?: 'blur' | 'change' | 'both';
  
  onPasswordChange?: (password: string) => void;
  onValidationChange?: (result: PasswordValidationResult) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Componente de campo de senha baseado no TextField do Material UI, com botão para alternar
 * entre mostrar e ocultar a senha.
 *
 * O componente oferece:
 * - Retorno apenas do valor da senha digitada via `onPasswordChange`
 * - Validação automática de obrigatoriedade e formato (Regex)
 * - Exibição controlada de mensagens de erro
 * - Evento de validação completo via `onValidationChange`
 * - Estilização via props com fallback para tokens do theme da Pipeline
 *
 * ---
 *
 * ### Tokens de estilo (ordem de prioridade)
 *
 * Para propriedades visuais, o componente resolve os valores nesta ordem:
 * 1. **Props do componente**
 * 2. **Theme da Pipeline** (`theme.pipelinesolucoes.forms.field`)
 * 3. **Fallback interno** (valores padrão do componente)
 *
 * ---
 *
 * ### Tipografia
 *
 * A tipografia do texto digitado e do placeholder pode ser definida de duas formas:
 *
 * 1. **Material UI**  
 *    Ao informar `textVariant`, o componente utiliza `theme.typography[textVariant]`.
 *
 * 2. **Theme da Pipeline**  
 *    Quando `textVariant` não é informado, utiliza `theme.pipelinesolucoes.forms.field.typography`.
 *
 * **Ordem de prioridade (tipografia):**
 * 1. `textVariant` (prop do componente)
 * 2. `theme.typography[textVariant]` (Material UI)
 * 3. `theme.pipelinesolucoes.forms.field.typography` (Pipeline)
 * 4. Fallback interno (`theme.typography.body1`)
 *
 * ---
 *
 * @param {string} [id]
 * ID do input.
 *
 * @param {string} [label]
 * Label exibido no campo.
 *
 * @param {string} [placeholder]
 * Texto de placeholder do input.
 *
 * @param {string} [value]
 * Valor controlado do campo.
 *
 * @param {import('@mui/material/styles').TypographyVariant} [textVariant]
 * Variante de tipografia do Material UI aplicada ao texto digitado e ao placeholder.
 * Quando omitida, utiliza a tipografia do theme da Pipeline (`theme.pipelinesolucoes.forms.field.typography`).
 *
 * ---
 * ### Estilo / Aparência
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
 * @param {boolean} [required=true]
 * Define se o campo é obrigatório.
 *
 * @param {RegExp} [pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/]
 * Expressão regular usada para validar o formato da senha.
 *
 * @param {string} [requiredMessage='Senha obrigatória']
 * Mensagem exibida quando o campo obrigatório está vazio.
 *
 * @param {string} [patternMessage]
 * Mensagem exibida quando a senha não atende ao formato definido.
 *
 * @param {'blur' | 'change' | 'both'} [showErrorOn='blur']
 * Define quando a validação e exibição de erros deve ocorrer.
 *
 * @param {boolean} [disabled=false]
 * Desabilita o campo.
 *
 * ---
 * ### Eventos
 *
 * @param {(password: string) => void} [onPasswordChange]
 * Callback que retorna apenas o valor da senha digitada.
 *
 * @param {(result: PasswordValidationResult) => void} [onValidationChange]
 * Callback disparado sempre que a validação é executada, contendo o resultado completo.
 *
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange]
 * Evento `onChange` nativo do input (opcional).
 *
 * @param {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur]
 * Evento `onBlur` nativo do input (opcional).
 *
 * ---
 *
 * @example
 * ```tsx
 * <TextFieldPassword
 *   label="Senha"
 *   background="#fff"
 *   borderRadius="10px"
 *   textVariant="body2"
 *   showErrorOn="both"
 *   onPasswordChange={(password) => console.log(password)}
 * />
 * ```
 */

const TextFieldPassword: React.FC<TextFieldPasswordProps> = ({
  id,
  label,
  placeholder,

  value,
  onPasswordChange,
  onValidationChange,

  disabled = false,
  required = true,
  
  pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  requiredMessage = 'Senha obrigatória',
  patternMessage = 'A senha deve ter no mínimo 8 caracteres, com ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  showErrorOn = 'blur',

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
  textVariant,

  onChange,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [touched, setTouched] = React.useState<boolean>(false);

  // fallback interno caso o usuário não use `value`
  const [innerValue, setInnerValue] = React.useState<string>(value ?? '');
  const currentValue = value ?? innerValue;

  React.useEffect(() => {
    if (typeof value === 'string') setInnerValue(value);
  }, [value]);

  const computeValidation = React.useCallback(
    (nextValue: string): PasswordValidationResult => {
      const trimmed = nextValue ?? '';

      if (required && trimmed.length === 0) {
        return { isValid: false, status: 'required', message: requiredMessage, value: nextValue };
      }

      if (trimmed.length > 0 && pattern && !pattern.test(trimmed)) {
        return { isValid: false, status: 'invalid', message: patternMessage, value: nextValue };
      }

      // se não é required e está vazio, consideramos "idle" (sem erro)
      if (!required && trimmed.length === 0) {
        return { isValid: true, status: 'idle', message: '', value: nextValue };
      }

      return { isValid: true, status: 'valid', message: '', value: nextValue };
    },
    [patternMessage, pattern, required, requiredMessage]
  );

  const emitValidation = React.useCallback(
    (nextValue: string) => {
      const result = computeValidation(nextValue);
      if (onValidationChange) onValidationChange(result);
      return result;
    },
    [computeValidation, onValidationChange]
  );

  const [validation, setValidation] = React.useState<PasswordValidationResult>(() =>
    computeValidation(currentValue)
  );

  const shouldValidateOnChange = showErrorOn === 'change' || showErrorOn === 'both';
  const shouldValidateOnBlur = showErrorOn === 'blur' || showErrorOn === 'both';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    // atualiza interno caso não seja controlado
    if (typeof value !== 'string') setInnerValue(nextValue);

    // retorna apenas a senha (string)
    if (onPasswordChange) onPasswordChange(nextValue);

    // mantém compatibilidade com evento nativo
    if (onChange) onChange(event);

    if (shouldValidateOnChange) {
      const result = emitValidation(nextValue);
      setValidation(result);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!touched) setTouched(true);

    if (onBlur) onBlur(event);

    if (shouldValidateOnBlur) {
      const result = emitValidation(currentValue);
      setValidation(result);
    }
  };

  const shouldShowError = touched && !validation.isValid && validation.status !== 'idle';
  const helperText = shouldShowError ? validation.message : ' ';

  const theme = useTheme();
  const field = theme.pipelinesolucoes?.forms?.field;

  // props -> tokens -> fallback
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
  const typo =
    (textVariant && theme.typography[textVariant]) ??
    field?.typography ??
    theme.typography.body1;
  const hg = height ?? field?.height ?? fbheigth;  

  return (
    <TextFieldStyled
      type={showPassword ? 'text' : 'password'}
      id={id}
      typo={typo}
      label={label}
      placeholder={placeholder}
      value={currentValue}

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
      height={hg}

      disabled={disabled}
      required={required}
      fullWidth
      error={shouldShowError}
      helperText={helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                sx={{margin: '0 4px 0 0'}}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

TextFieldPassword.displayName = 'TextFieldPassword';

export default TextFieldPassword;
