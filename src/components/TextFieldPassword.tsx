'use client';

import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';

type ValidationStatus = 'idle' | 'required' | 'invalid' | 'valid';

const VisibilityIconStyle = styled(VisibilityIcon)(({ theme }) => ({  
  marginLeft: '20px', 
}));  

const VisibilityOffIconStyle = styled(VisibilityOffIcon)(({ theme }) => ({  
  marginLeft: '20px',   
}));  

interface PasswordValidationResult {
  isValid: boolean;
  status: ValidationStatus;
  message: string;
  value: string;
}

interface TextFieldPasswordProps extends BorderProps, ColorProps, LayoutProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;

  background?: string;
  backgroundDisabled?: string;
  color?: string;
  colorFocused?: string;
  colorDisabled?: string;
  borderRadius?: string;
  boxShadow?: string;
  borderColor?: string;
  padding?: string;
  disabled?: boolean;

  required?: boolean;
  requiredMessage?: string;
  pattern?: RegExp;
  patternMessage?: string;  
  showErrorOn?: 'blur' | 'change' | 'both';

  /**
   * Retorna somente a senha digitada (string).
   */
  onPasswordChange?: (password: string) => void;

  /**
   * "Evento" com o resultado completo da validação.
   */
  onValidationChange?: (result: PasswordValidationResult) => void;

  /**
   * Se você ainda quiser receber o evento nativo.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) =>
    ![
      'background',
      'borderRadius',
      'boxShadow',
      'borderColor',
      'colorFocused',
      'backgroundDisabled',
      'colorDisabled',
      'padding',
      'colorText',
    ].includes(prop as string),
})<{
  background?: string;
  backgroundDisabled?: string;
  colorText?: string;
  colorFocused?: string;
  colorDisabled?: string;
  borderRadius?: string;
  boxShadow?: string;
  borderColor?: string;
  padding?: string;
}>(
  ({
    theme,
    background,
    backgroundDisabled,
    colorText,
    borderRadius,
    boxShadow,
    borderColor,
    colorFocused,
    colorDisabled,
    padding,
  }) => {
    const field = theme.pipelinesolucoes?.forms?.field;

    // props -> tokens -> fallback
    const bg = background ?? field?.background ?? '#fff';
    const bgDisabled = backgroundDisabled ?? field?.backgroundDisabled ?? "#E5E7EB";
    const txt = colorText ?? field?.color ?? '#000';
    const txtDisabled = colorDisabled ?? field?.colorDisabled ?? "#9CA3AF";

    const br = borderRadius ?? field?.borderRadius ?? "0";
    const sh = boxShadow ?? field?.boxShadow ?? "none";
    const bd = borderColor ?? field?.borderColor ?? '#ccc';
    const bdFocused = colorFocused ?? field?.colorFocused ?? '#1976d2';

    const pad = padding ?? field?.padding ?? '4px 8px'; // pode deixar undefined se quiser respeitar o default do MUI

    return {      
      borderRadius: br,
      boxShadow: sh,      

      '& .MuiInputBase-root': {
        color: txt,
      },

      '& .MuiOutlinedInput-root': { 
        background: bg,       
        borderRadius: br,
        boxShadow: sh,

        ...(pad ? { padding: pad } : {}),

        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: bd,
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: bd,
        },

        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: bdFocused,
        },

        '&.Mui-disabled': {
          background: bgDisabled,
          color: txtDisabled,

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: bd,
          },
        },

        '& input.Mui-disabled': {
          WebkitTextFillColor: txtDisabled,
        },
      },

      '& .MuiInputLabel-root': {
        color: txt,
      },

      '& .MuiInputLabel-root.Mui-focused': {
        color: bdFocused,
      },

      '& .MuiInputLabel-root.Mui-disabled': {
        color: txtDisabled,
      },
    };
  }
);

/**
 * Componente de campo de senha baseado no TextField do Material UI, com botão para alternar
 * entre mostrar/ocultar a senha. O componente:
 * - Retorna somente a senha digitada via `onPasswordChange`
 * - Valida obrigatório + formato (regex) e exibe mensagens de erro automaticamente
 * - Dispara um "evento" de validação via `onValidationChange`
 *
 * @param {string} [id] ID do input.
 * @param {string} [label] Label do campo.
 * @param {string} [placeholder] Placeholder do input.
 * @param {string} [value] Valor controlado do campo.
 * @param {boolean} [required=true] Se true, valida senha obrigatória.
 * @param {RegExp} [passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/] Regex para validar formato.
 * @param {string} [requiredMessage='Senha obrigatória'] Mensagem para campo vazio.
 * @param {string} [invalidMessage='Senha inválida'] Mensagem para formato inválido.
 * @param {'blur' | 'change' | 'both'} [validateOn='blur'] Quando validar.
 * @param {(password: string) => void} [onPasswordChange] Retorna somente a senha digitada.
 * @param {(result: PasswordValidationResult) => void} [onValidationChange] Evento com resultado completo da validação.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] onChange nativo (opcional).
 * @param {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur] onBlur nativo (opcional).
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { TextFieldPassword } from '@/components/TextFieldPassword';
 *
 * const Example = () => {
 *   const [password, setPassword] = React.useState('');
 *
 *   return (
 *     <TextFieldPassword
 *       label="Senha"
 *       value={password}
 *       onPasswordChange={(p) => setPassword(p)}
 *       onValidationChange={(r) => console.log(r)}
 *       validateOn="both"
 *     />
 *   );
 * };
 * ```
 */
const TextFieldPassword: React.FC<TextFieldPasswordProps> = ({
  id,
  label,
  placeholder,

  value,
  onPasswordChange,
  onValidationChange,

  required = true,
  pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  requiredMessage = 'Senha obrigatória',
  patternMessage = 'A senha deve ter no mínimo 8 caracteres, com ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  showErrorOn = 'blur',

  background,
  backgroundDisabled,
  color,
  colorFocused,
  colorDisabled,
  borderRadius,
  boxShadow,
  borderColor,
  disabled = false,
  padding,

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

  return (
    <StyledTextField
      type={showPassword ? 'text' : 'password'}
      id={id}
      label={label}
      placeholder={placeholder}
      value={currentValue}
      background={background}
      backgroundDisabled={backgroundDisabled}
      colorText={color}
      colorFocused={colorFocused}
      colorDisabled={colorDisabled}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      borderColor={borderColor}
      padding={padding}
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
              >
                {showPassword ? <VisibilityOffIconStyle /> : <VisibilityIconStyle />}
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
