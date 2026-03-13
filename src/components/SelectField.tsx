'use client';

import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
  Typography,
  Divider,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { TypographyProps } from '@mui/material/Typography';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import {
  fbbackground,
  fbborderColor,
  fbborderRadius,
  fbboxShadow,
  fbcolor,
  fbcolorFocused,
  fbheigth,
  fbpadding,
} from '../constant';

export interface SelectFieldOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps
  extends
    Omit<ColorProps, 'backgroundHover' | 'colorHover'>,
    Omit<BorderProps, 'border'>,
    Pick<LayoutProps, 'height' | 'padding' | 'width' | 'margin'> {
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

  menuMaxHeight?: string | number;
  menuWidth?: string | number;
  menuItemHeight?: string | number;
  showClearAction?: boolean;
  clearLabel?: string;
  onClear?: () => void;
}

const StyledWrapper = styled('div', {
  shouldForwardProp: (prop) => !['width', 'margin'].includes(prop as string),
})<{
  width: string | number;
  margin: string | number;
}>(({ width, margin }) => ({
  width,
  margin,
}));

const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) =>
    ![
      'height',
      'padding',
      'background',
      'borderRadius',
      'boxShadow',
      'borderColor',
      'colorText',
    ].includes(prop as string),
})<{
  height: string | number;
  padding: string | number;
  background: string;
  borderRadius: string | number;
  boxShadow: string;
  borderColor: string;
  colorText: string;
}>(({ height, padding, background, borderRadius, boxShadow, borderColor, colorText }) => ({
  width: '100%',

  '& .MuiOutlinedInput-root': {
    height,
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

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => !['menuItemHeight', 'colorText'].includes(prop as string),
})<{
  menuItemHeight: string | number;
  colorText: string;
}>(({ menuItemHeight, colorText }) => ({
  minHeight: menuItemHeight,
  height: menuItemHeight,
  color: colorText,

  '& .MuiTypography-root': {
    color: colorText,
    width: '100%',
  },
}));

/**
 * Componente de seleção baseado no Material UI, com suporte a customização visual,
 * controle do valor selecionado, limite de altura do menu com scroll automático
 * e ação opcional para limpar a opção selecionada.
 *
 * @param {string} [id] Identificador único do campo para acessibilidade.
 * @param {string} [label] Texto do rótulo do campo.
 * @param {string} [placeholder] Texto exibido quando nenhuma opção estiver selecionada.
 * @param {string | number} [value] Valor atualmente selecionado.
 * @param {boolean} [disabled=false] Define se o campo estará desabilitado.
 * @param {TypographyProps['variant']} [variant='body1'] Variante tipográfica aplicada ao label, valor, opções e helperText.
 * @param {string} [helperText] Texto auxiliar exibido abaixo do campo.
 * @param {string} [helperTextColor] Cor do texto auxiliar.
 * @param {SelectFieldOption[]} options Lista de opções exibidas no menu.
 * @param {(value: string | number) => void} onChange Callback disparado ao selecionar uma opção.
 * @param {string | number} [width='100%'] Largura do componente.
 * @param {string | number} [height] Altura do campo.
 * @param {string | number} [padding] Espaçamento interno do valor selecionado.
 * @param {string | number} [margin='0'] Margem externa do componente.
 * @param {string} [background] Cor de fundo do campo e do menu.
 * @param {string} [color] Cor do texto do campo e das opções.
 * @param {string} [colorFocused] Cor aplicada ao estado focado da borda.
 * @param {string} [colorDisabled] Cor de texto no estado desabilitado.
 * @param {string} [backgroundDisabled] Cor de fundo no estado desabilitado.
 * @param {string | number} [borderRadius] Raio da borda do campo.
 * @param {string} [boxShadow] Sombra aplicada ao campo.
 * @param {string} [borderColor] Cor da borda do campo.
 * @param {string | number} [menuMaxHeight=240] Altura máxima da caixa de opções. Quando excedida, o scroll vertical é exibido automaticamente.
 * @param {string | number} [menuWidth='auto'] Largura da caixa de opções.
 * @param {string | number} [menuItemHeight=40] Altura de cada item da lista de opções.
 * @param {boolean} [showClearAction=false] Define se deve exibir a ação para limpar a opção selecionada.
 * @param {string} [clearLabel='Limpar seleção'] Texto exibido na ação de limpar seleção.
 * @param {() => void} [onClear] Callback disparado ao limpar a opção selecionada.
 *
 * @example
 * ```tsx
 * import { SelectField } from '@/components/SelectField';
 *
 * const Example = () => {
 *   const [value, setValue] = React.useState<string | number>('');
 *
 *   return (
 *     <SelectField
 *       id="category"
 *       label="Categoria"
 *       placeholder="Selecione uma opção"
 *       value={value}
 *       onChange={setValue}
 *       options={[
 *         { value: 1, label: 'Frontend' },
 *         { value: 2, label: 'Backend' },
 *         { value: 3, label: 'DevOps' },
 *         { value: 4, label: 'Product' },
 *       ]}
 *       width={320}
 *       menuWidth={320}
 *       menuMaxHeight={220}
 *       menuItemHeight={44}
 *       showClearAction
 *       clearLabel="Remover seleção"
 *       onClear={() => setValue('')}
 *     />
 *   );
 * };
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

  width = '100%',
  height,
  padding,
  margin = '0',

  disabled = false,
  variant = 'body1',

  helperText,
  helperTextColor,
  options,
  onChange,

  menuMaxHeight = 240,
  menuWidth = 'auto',
  menuItemHeight = 40,
  showClearAction = false,
  clearLabel = 'Limpar seleção',
  onClear,
}) => {
  const labelId = id ? `${id}-label` : undefined;
  const shouldShrinkLabel = Boolean(value) || Boolean(placeholder);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const raw = event.target.value;
    const matched = options.find((opt) => String(opt.value) === raw);

    onChange(matched ? matched.value : raw);
  };

  const handleClearSelection = () => {
    onChange('');
    if (onClear) {
      onClear();
    }
  };

  const theme = useTheme();
  const field = theme.pipelinesolucoes?.forms?.field;

  const bg = background ?? field?.background ?? '#fff';
  const txt = color ?? field?.color ?? '#000';

  const bgDisabled = backgroundDisabled ?? field?.backgroundDisabled ?? '#E5E7EB';
  const txtDisabled = colorDisabled ?? field?.colorDisabled ?? '#9CA3AF';
  const bdFocused = colorFocused ?? field?.colorFocused ?? '#1976d2';

  const br = borderRadius ?? field?.borderRadius ?? '0';
  const sh = boxShadow ?? field?.boxShadow ?? 'none';
  const bd = borderColor ?? field?.borderColor ?? '#ccc';

  const pad = padding ?? field?.padding ?? '4px 8px';
  const mg = margin ?? field?.margin ?? '0';
  const hg = height ?? field?.height ?? fbheigth;

  const hasSelectedValue = value !== undefined && value !== null && String(value) !== '';

  return (
    <StyledWrapper width={width} margin={mg}>
      <StyledFormControl
        id={id}
        disabled={disabled}
        variant="outlined"
        background={disabled ? bgDisabled : bg}
        borderRadius={br}
        boxShadow={sh}
        borderColor={bdFocused ? bd : bd}
        colorText={disabled ? txtDisabled : txt}
        height={hg}
        padding={pad}
      >
        {label && (
          <InputLabel id={labelId} htmlFor={id} shrink={shouldShrinkLabel}>
            <Typography variant={variant} sx={{ color: disabled ? txtDisabled : txt }}>
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
                width: menuWidth,
                maxHeight: menuMaxHeight,
                overflowY: 'auto',
              },
            },
            MenuListProps: {
              sx: {
                padding: 0,
                maxHeight: menuMaxHeight,
                overflowY: 'auto',
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

            return (
              <Typography variant={variant} sx={{ color: disabled ? txtDisabled : txt }}>
                {option?.label ?? ''}
              </Typography>
            );
          }}
          sx={{
            '& .MuiSelect-icon': {
              color: disabled ? txtDisabled : txt,
            },
            '&.Mui-disabled': {
              backgroundColor: bgDisabled,
              color: txtDisabled,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: bdFocused,
            },
          }}
        >
          {showClearAction && hasSelectedValue && (
            <div>
              <StyledMenuItem
                onClick={handleClearSelection}
                value=""
                menuItemHeight={menuItemHeight}
                colorText={txt}
              >
                <Typography variant={variant}>{clearLabel}</Typography>
              </StyledMenuItem>
              <Divider />
            </div>
          )}

          {options.map((option) => (
            <StyledMenuItem
              key={option.value}
              value={String(option.value)}
              menuItemHeight={menuItemHeight}
              colorText={txt}
            >
              <Typography variant={variant}>{option.label}</Typography>
            </StyledMenuItem>
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