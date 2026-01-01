'use client';

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, FormHelperText, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { TypographyProps } from '@mui/material/Typography';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { fbbackground, fbborderColor, fbborderRadius, fbboxShadow, fbcolor, fbcolorFocused, fbpadding } from '@/constant';

export interface SelectFieldOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps extends BorderProps, ColorProps, LayoutProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string | number;

  disabled?: boolean;
  variant?: TypographyProps['variant'];

  helperText?: string;
  helperTextColor?: string;

  options: SelectFieldOption[];  
  onChange: (value: string | number) => void;
}

const StyledWrapper = styled('div', {
  shouldForwardProp: (prop) => !['width', 'margin'].includes(prop as string),
})<{width: string; margin: string}>(({ width, margin }) => ({

  width: width,
  margin: margin,
}));

const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) =>
    !['height',
      'padding',
      'background',
      'borderRadius',
      'boxShadow',
      'borderColor',
      'colorText',
    ].includes(prop as string),
})<{
    height: string; 
    padding: string; 
    background: string; 
    borderRadius: string; 
    boxShadow: string; 
    borderColor: string; 
    colorText: string;
}>(({ height, padding, background, borderRadius, boxShadow, borderColor, colorText }) => ({
  width: '100%',

  '& .MuiOutlinedInput-root': {
    height: height,
    background: background ?? fbbackground,
    borderRadius: borderRadius ?? fbborderRadius,
    boxShadow: boxShadow ?? fbboxShadow,

    '& fieldset': {
      borderColor: borderColor ?? fbborderColor,
    },
    '&:hover fieldset': {
      borderColor: borderColor ?? fbborderColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: borderColor ?? fbcolorFocused,
    },

    '& .MuiSelect-select': {
      padding: padding ?? fbpadding,
      color: colorText ?? fbcolor,
      display: 'flex',
      alignItems: 'center',
    },
  },

  '& .MuiInputLabel-root': {
    color: colorText ?? fbcolor,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: colorText ?? fbcolor,
  },
}));

/**
 * ComboBox baseado no Material UI, sem validação e sem máscaras,
 * permitindo customização visual e controle completo do valor selecionado.
 *
 * @param {string} [id] Identificador único do campo (usado para acessibilidade).
 * @param {ComboBoxOption[]} options Lista de opções exibidas no ComboBox.
 * @param {string | number} value Valor selecionado.
 * @param {(value: string | number) => void} onChange Callback disparado ao selecionar uma opção.
 * @param {string} [label] Texto do rótulo do campo.
 * @param {string} [placeholder] Texto exibido quando nenhum valor está selecionado.
 * @param {string} [helperText] Texto auxiliar exibido abaixo do campo.
 * @param {string} [helperTextColor] Cor do helperText. Se não for informada, usa a cor de erro do theme.
 * @param {TypographyProps['variant']} [variant='body1'] Variante da tipografia aplicada ao label, valor, opções e helperText.
 * @param {string | number} [width='100%'] Largura do componente.
 * @param {string | number} [height='auto'] Altura do campo.
 * @param {string | number} [containerMargin=0] Margem externa do container.
 * @param {string | number} [padding=0] Padding interno do texto selecionado.
 * @param {string} [background='transparent'] Cor de fundo do campo e do menu aberto.
 * @param {string} [colorText='#000'] Cor do texto (label, valor selecionado e itens).
 * @param {string | number} [borderRadius=4] Raio da borda.
 * @param {string} [boxShadow='none'] Sombra do campo.
 * @param {string} [borderColor='#c4c4c4'] Cor da borda.
 * @param {boolean} [disabled=false] Desabilita o campo.
 *
 * @example
 * ```tsx
 * import { ComboBox } from '@/components/ComboBox';
 *
 * const Example = () => (
 *   <ComboBox
 *     id="category"
 *     label="Categoria"
 *     placeholder="Selecione uma opção"
 *     helperText="Campo obrigatório"
 *     helperTextColor="warning.main"
 *     variant="body2"
 *     background="#111"
 *     colorText="#fff"
 *     options={[
 *       { value: 1, label: 'Frontend' },
 *       { value: 2, label: 'Backend' },
 *     ]}
 *     value={1}
 *     onChange={(v) => console.log(v)}
 *     width={320}
 *     containerMargin="16px 0"
 *     padding="12px"
 *     borderRadius={12}
 *   />
 * );
 * ```
 */
const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  placeholder,
  value,

  background,
  backgroundDisabled,
  color,
  colorFocused,
  colorDisabled,
  borderRadius,
  boxShadow,
  borderColor,

  width="100%",
  height,
  padding,
  margin='0',

  disabled = false,
  variant = 'body1',

  helperText,
  helperTextColor,
  options,
  onChange,
  
  
}) => {


  const labelId = id ? `${id}-label` : undefined;
  const shouldShrinkLabel = Boolean(value) || Boolean(placeholder);

  const handleChange = (event: SelectChangeEvent<string>, _child: React.ReactNode) => {
    const raw = event.target.value;
    const matched = options.find((opt) => String(opt.value) === raw);
    onChange(matched ? matched.value : raw);
  };

  const theme = useTheme(); 
  const field = theme.pipelinesolucoes?.forms?.field;

  const bg = background ?? field?.background ?? '#fff';
  const txt = color ?? field?.color ?? '#000';

  const bgDisabled = backgroundDisabled ?? field?.backgroundDisabled ?? "#E5E7EB";
  const txtDisabled = colorDisabled ?? field?.colorDisabled ?? "#9CA3AF";
  const bdFocused = colorFocused ?? field?.colorFocused ?? '#1976d2';

  const br = borderRadius ?? field?.borderRadius ?? "0";
  const sh = boxShadow ?? field?.boxShadow ?? "none";
  const bd = borderColor ?? field?.borderColor ?? '#ccc';

  const pad = padding ?? field?.padding ?? '4px 8px';
  const mg = margin ?? field?.margin ?? '0'; 

  return (
    <StyledWrapper width={width} margin={mg}>

      <StyledFormControl        
        id={id}
        disabled={disabled}
        variant="outlined"                     
        background={bg} 
        borderRadius={br}
        boxShadow={sh}
        borderColor={bd}
        colorText={txt}
        height={height ?? 'auto'} 
        padding={pad}
      >

        {label && (
          <InputLabel id={labelId} htmlFor={id} shrink={shouldShrinkLabel}>
            <Typography variant={variant} sx={{ color: txt }}>
              {label}
            </Typography>
          </InputLabel>
        )}

        <Select<string>
          id={id}
          labelId={labelId}
          value={value !== undefined && value !== null ? String(value) : ''}
          onChange={handleChange}
          displayEmpty
          label={label}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: bg,
              },
            },
          }}
          renderValue={(selected) => {
            if ((selected === '' || selected === undefined) && placeholder) {
              return (
                <Typography variant={variant} color="text.disabled">
                  {placeholder}
                </Typography>
              );
            }

            const option = options.find((opt) => String(opt.value) === selected);

            return <Typography variant={variant}>{option?.label ?? ''}</Typography>;
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={String(option.value)}>
              <Typography variant={variant} sx={{ color: txt }}>
                {option.label}
              </Typography>
            </MenuItem>
          ))}
        </Select>

        {helperText && (
          <FormHelperText error={!helperTextColor}>
            <Typography variant={variant} sx={{ color: helperTextColor }}>
              {helperText}
            </Typography>
          </FormHelperText>
        )}

      </StyledFormControl>
    </StyledWrapper>
  );
};

SelectField.displayName = 'SelectField';

export default SelectField;
