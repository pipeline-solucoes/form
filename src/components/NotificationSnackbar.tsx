"use client";

import { ColorProps } from "../types/ColorProps";
import { TextProps } from "../types/TextProps";
import { Snackbar, Alert, AlertColor, Typography, TypographyVariant, SnackbarOrigin, useTheme } from "@mui/material";

export interface NotificationSnackbarProps extends TextProps, ColorProps {
  background?: string;
  text: string;
  variant?: TypographyVariant;
  open: boolean;  
  severity?: AlertColor;  //"success" | "info" | "warning" | "error"
  anchorOrigin?: SnackbarOrigin;
  onClose: () => void;
}

/**
 * Componente que exibe uma notificação no topo da tela utilizando o Snackbar
 * e Alert do Material UI.
 *
 * É ideal para feedbacks rápidos de sucesso, erro, aviso ou informação,
 * aparecendo centralizado no topo da viewport e sendo fechado automaticamente
 * após um período ou manualmente.
 *
 * @param {boolean} open Controla se o Snackbar está visível ou não. Obrigatório.
 * @param {string} text Texto exibido dentro do Snackbar. Obrigatório.
 * @param {() => void} onClose Função chamada ao fechar o Snackbar (manual ou automático). Obrigatório.
 * @param {string} [background='#fff'] Cor aplicada ao texto do alerta.
 * @param {TypographyVariant} [variant='body1'] Variante tipográfica do texto exibido.
 * @param {'success' | 'info' | 'warning' | 'error'} [severity='success'] Tipo de severidade do alerta.
 * @param {SnackbarOrigin} [anchorOrigin={ vertical: 'top', horizontal: 'center' }]
 * Define a posição onde o Snackbar será exibido na tela.
 * Permite controlar o alinhamento vertical (`top` ou `bottom`)
 * e horizontal (`left`, `center` ou `right`) dentro da viewport.
 *
 * @example
 * ```tsx
 * import { NotificationSnackbar } from '@/components/NotificationSnackbar';
 * import { useState } from 'react';
 *
 * const Example = () => {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Mostrar Snackbar</button>
 *
 *       <NotificationSnackbar
 *         open={open}
 *         text="Operação realizada com sucesso!"
 *         severity="success"
 *         onClose={() => setOpen(false)}
 *       />
 *     </>
 *   );
 * };
 * ```
 */
const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  background='#fff',
  open,
  text,
  variant='body1',
  severity = "success",
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  onClose,
}) => {

  const theme = useTheme();

  // 1) prop -> 2) token -> 3) fallback
  const resolvedBackground =
    background ??
    theme.pipesol?.forms?.notification?.background ??
    "#ffffff";

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ color: resolvedBackground }}>
        <Typography variant={variant} component="span">{text}</Typography>
      </Alert>
    </Snackbar>
  );
};

NotificationSnackbar.displayName = 'NotificationSnackbar';

export default NotificationSnackbar;