
import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


interface TextFieldValidateProps {
  id?: string;
  label?: string;
  background?: string;
  colorText?: string;
  borderRadius?: string;
  boxShadow?: string;
  borderColor?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // Multiline
  multiline?: boolean;
  rows?: number;

  // Validação
  required?: boolean;
  requiredMessage?: string;
  minLength?: number;
  pattern?: RegExp | string;
  patternMessage?: string;
  validate?: (value: string) => string | null | undefined;
  showErrorOn?: 'change' | 'blur';

  // Outros
  maxLength?: number;
}

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) =>
    !['background', 'colorText', 'borderRadius', 'boxShadow', 'borderColor'].includes(prop as string),
})<
  Pick<
    TextFieldValidateProps,
    'background' | 'colorText' | 'borderRadius' | 'boxShadow' | 'borderColor'
  >
>(({ background, colorText, borderRadius, boxShadow, borderColor }) => ({
  background: background || '#fff',
  color: colorText || '#000',
  borderRadius: borderRadius || '6px',
  boxShadow: boxShadow || 'none',

  '& .MuiInputBase-root': {
    color: colorText || '#000',
    background: background || '#fff',
    borderRadius: borderRadius || '6px',
    boxShadow: boxShadow || 'none',
    padding: '4px 8px',
  },
  '& .MuiInputLabel-root': {
    color: colorText || '#000',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: borderColor || '#ccc',
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: borderColor || '#888',
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2',
  },
}));

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
 * TextFieldValidate Component
 *
 * Um campo de texto personalizável baseado no Material UI (MUI 6+), com suporte a:
 * - Estilização via `styled` (background, cor do texto, bordas, sombra).
 * - Estados e acessibilidade do MUI (`label`, `disabled`, `helperText`, `error`).
 * - Modo multilinha (`multiline`, `rows`).
 * - Validações simples (obrigatório, tamanho mínimo, `pattern`) e validação customizada (`validate`).
 * - Controle de exibição de erro durante a digitação ou após perder o foco (`showErrorOn`).
 * - Limite máximo de caracteres via `maxLength` (aplicado ao input).
 * - Suporte a um `onBlur` externo para lógicas adicionais (ex: busca de CEP).
 *
 * ### Parâmetros (props)
 * - `id?: string` — Id do campo (passado para o DOM/MUI). **Default:** `undefined`
 * - `label?: string` — Rótulo exibido acima do campo (Label do MUI). **Default:** `undefined`
 * - `background?: string` — Cor de fundo do campo. **Default:** `"#fff"`
 * - `colorText?: string` — Cor do texto. **Default:** `"#000"`
 * - `borderRadius?: string` — Raio de borda. **Default:** `"6px"`
 * - `boxShadow?: string` — Sombra do campo. **Default:** `"none"`
 * - `borderColor?: string` — Cor da borda do campo (estado base e hover). **Default:** `"#ccc"`
 * - `placeholder?: string` — Placeholder exibido quando o campo está vazio. **Default:** `""`
 * - `disabled?: boolean` — Desabilita o campo (estado disabled). **Default:** `false`
 * - `value?: string` — Valor atual do campo (controlado). **Default:** `""`
 * - `onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void` — Função chamada ao alterar o valor. **Default:** `undefined`
 * - `onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void` — Função chamada ao perder o foco, após a lógica interna marcar o campo como “tocado”. **Default:** `undefined`
 *
 * **Multiline**
 * - `multiline?: boolean` — Define se o campo é multilinha. **Default:** `false`
 * - `rows?: number` — Número de linhas quando `multiline` está ativo. **Default:** `3`
 *
 * **Validação**
 * - `required?: boolean` — Indica se o preenchimento é obrigatório. **Default:** `false`
 * - `requiredMessage?: string` — Mensagem quando obrigatório não atendido. **Default:** `"Campo obrigatório"`
 * - `minLength?: number` — Tamanho mínimo (caracteres). **Default:** `undefined`
 * - `pattern?: RegExp | string` — Expressão regular para validar o formato. **Default:** `undefined`
 * - `patternMessage?: string` — Mensagem quando o `pattern` não é atendido. **Default:** `"Formato inválido"`
 * - `validate?: (value: string) => string | null | undefined` — Validação customizada; retorne string com a mensagem de erro, ou `null/undefined` se válido. **Default:** `undefined`
 * - `showErrorOn?: 'change' | 'blur'` — Quando exibir erros: durante a digitação (`"change"`) ou ao perder o foco (`"blur"`). **Default:** `"blur"`
 *
 * **Outros**
 * - `maxLength?: number` — Limite máximo de caracteres permitido (não valida; apenas limita o input). **Default:** `undefined`
 *
 * ### Exemplo (uso com CEP e onBlur)
 * ```tsx
 * import React from 'react';
 * import TextFieldValidate from './TextFieldValidate';
 *
 * const CepExample: React.FC = () => {
 *   const [cep, setCep] = React.useState('');
 *
 *   const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
 *     const raw = event.target.value || '';
 *     const onlyDigits = raw.replace(/\D/g, '');
 *
 *     if (onlyDigits.length === 8) {
 *       // Exemplo de chamada de API (ViaCEP)
 *       // const response = await fetch(`https://viacep.com.br/ws/${onlyDigits}/json/`);
 *       // const data = await response.json();
 *       // ...preencher outros campos do formulário...
 *       console.log('CEP para buscar:', onlyDigits);
 *     }
 *   };
 *
 *   return (
 *     <TextFieldValidate
 *       id="cep-input"
 *       label="CEP"
 *       placeholder="Digite o CEP"
 *       value={cep}
 *       onChange={(e) => setCep(e.target.value)}
 *       onBlur={handleCepBlur}
 *       pattern={/^\d{5}-?\d{3}$/}
 *       patternMessage="CEP inválido"
 *       required
 *       showErrorOn="blur"
 *       maxLength={9}
 *     />
 *   );
 * };
 * ```
 */
const TextFieldValidate: React.FC<TextFieldValidateProps> = ({
  id,
  label,
  background,
  colorText = '#000',
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
      colorText={colorText}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      borderColor={borderColor}
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
