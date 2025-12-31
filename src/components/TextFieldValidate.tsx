
import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';

interface TextFieldValidateProps 
  extends BorderProps, ColorProps, LayoutProps {
  
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
  margin?: string; 
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

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) =>
    ![
      "background",
      "borderRadius",
      "boxShadow",
      "borderColor",
      "colorFocused",
      "backgroundDisabled",
      "colorDisabled",
      "padding",
      "colorText",
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
  margin?: string;
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
    margin
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
    const mg = margin ?? field?.margin ?? '0'; 

    return {
      // (opcional) pode manter, mas o mais importante é estilizar os slots internos:      
      borderRadius: br,
      boxShadow: sh,

      "& .MuiInputBase-root": {
        color: txt,
      },

      "& .MuiOutlinedInput-root": {        
        borderRadius: br,
        boxShadow: sh,
        background: bg,

        ...(pad ? { padding: pad } : {}),

        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: bd,
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: bd,
        },

        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: bdFocused,
        },

        "&.Mui-disabled": {
          background: bgDisabled,
          color: txtDisabled,

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: bd,
          },
        },

        // texto digitado quando disabled
        "& input.Mui-disabled": {
          WebkitTextFillColor: txtDisabled,
        },
      },

      "& .MuiInputLabel-root": {
        color: txt,
      },

      "& .MuiInputLabel-root.Mui-focused": {
        color: bdFocused,
      },

      "& .MuiInputLabel-root.Mui-disabled": {
        color: txtDisabled,
      },
    };
  }
);

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
 * Componente de campo de texto com validação, baseado no TextField do Material UI.
 * Permite personalização visual via `styled` e suporte a validações comuns
 * (obrigatório, tamanho mínimo, regex) e validação customizada.
 *
 * O erro pode ser exibido durante a digitação ou apenas após o campo perder o foco.
 *
 * @param {string} [id] Id do campo (replicado no input do MUI).
 * @param {string} [label] Rótulo exibido acima do campo.
 * @param {string} [placeholder] Placeholder exibido quando o campo está vazio.
 * @param {string} [value=''] Valor atual do campo (modo controlado).
 * @param {boolean} [disabled=false] Define se o campo está desabilitado.
 *
 * @param {string} [background='#fff'] Cor de fundo do campo.
 * @param {string} [backgroundDisabled='#E5E7EB'] Cor de fundo do campo quando o campo está desabilitado.
 * @param {string} [color='#000'] Cor do texto e do label.
 * @param {string} [colorFocused='#1976d2'] Cor da borda quando o campo está focado.
 * @param {string} [colorDisabled='#9CA3AF'] Cor do texto e do label quando o campo está focado.
 * @param {string} [borderColor='#ccc'] Cor da borda no estado normal e hover.
 * @param {string} [borderRadius='0'] Raio da borda do campo.
 * @param {string} [boxShadow='none'] Sombra aplicada ao campo.
 * @param {string} [padding='4px 8px'] Espaçamento interno do input.
 *
 * @param {boolean} [multiline=false] Define se o campo é multilinha.
 * @param {number} [rows=3] Número de linhas quando `multiline` está ativo.
 *
 * @param {boolean} [required=false] Indica se o campo é obrigatório.
 * @param {string} [requiredMessage='Campo obrigatório'] Mensagem exibida quando o campo obrigatório está vazio.
 * @param {number} [minLength] Número mínimo de caracteres.
 * @param {RegExp | string} [pattern] Expressão regular para validação do valor.
 * @param {string} [patternMessage='Formato inválido'] Mensagem exibida quando o pattern não é atendido.
 * @param {(value: string) => string | null | undefined} [validate] Função de validação customizada.
 * @param {'change' | 'blur'} [showErrorOn='blur'] Momento em que o erro deve ser exibido.
 *
 * @param {number} [maxLength] Limite máximo de caracteres permitido no input.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] Callback disparado ao alterar o valor.
 * @param {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur] Callback disparado ao perder o foco.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import TextFieldValidate from '@/components/TextFieldValidate';
 *
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
  requiredMessage = 'Campo obrigatório',
  minLength,
  pattern,
  patternMessage = 'Formato inválido',
  validate,
  showErrorOn = 'blur',
  maxLength,
  padding
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

  return (
    <StyledTextField
      id={id}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
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
