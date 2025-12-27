import React from 'react';
import { Button, styled, Typography, Box } from '@mui/material';


const ButtonFormStyled = styled(Button, {
  shouldForwardProp: (prop) =>
    ![
      'width',
      'height',
      'padding',
      'margin',
      'background',
      'border',
      'borderRadius',
      'boxShadow',
    ].includes(prop as string),
})<{
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  background?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
}>(
  ({
    theme,
    width,
    height,
    padding,
    margin,
    background,
    border,
    borderRadius,
    boxShadow,
  }) => ({
    // Layout
    width: width || 'auto',
    height: height || 'auto',
    padding: padding || '8px 24px',
    margin: margin || '0',

    // Visual
    background: background || 'transparent',
    border: border || 'none',
    borderRadius: borderRadius || '8px',
    boxShadow: boxShadow || 'none',
    textTransform: 'none',
    cursor: 'pointer',

    // Tipografia baseada no tema
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.body1?.fontWeight,
    fontStyle: theme.typography.body1?.fontStyle,
    lineHeight: theme.typography.body1?.lineHeight as any,
    letterSpacing: theme.typography.body1?.letterSpacing as any,
    fontSize: theme.typography.body1?.fontSize as any,

    '&:hover': {
      opacity: 0.9,
      boxShadow: boxShadow || 'none',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  })
);


export interface GoogleButtonProps {
  endpoint: string;
  messageError?: string;
  errorColor?: string;

  // Estilo solicitado
  boxShadow?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  background?: string;
  border?: string;
  borderRadius?: string;

  children: React.ReactNode;
}

/**
 * Componente de botão que chama um endpoint ao clicar.
 * Em caso de erro (status não-2xx ou exceção de rede), exibe `messageError`.
 * 
 *
 * @property endpoint - URL que será chamada ao clicar.
 * @property messageError - Mensagem exibida quando a requisição falhar.
 * @property errorColor - Cor do texto da mensagem de erro.
 * @property width - Largura do botão. @default 'auto'
 * @property height - Altura do botão. @default 'auto'
 * @property padding - Espaçamento interno. @default '8px 24px'
 * @property margin - Margem externa. @default '0'
 * @property background - Cor de fundo. @default 'transparent'
 * @property border - Borda do botão. @default 'none'
 * @property borderRadius - Raio da borda. @default '8px'
 * @property boxShadow - Sombra do botão. @default 'none'
 * @property children - Conteúdo interno do botão.
 *
 * @default width 'auto'
 * @default height 'auto'
 * @default padding '8px 24px'
 * @default margin '0'
 * @default background 'transparent'
 * @default border 'none'
 * @default borderRadius '8px'
 * @default boxShadow 'none'
 *
 * @example
 * <GoogleButton
 *   endpoint="/api/auth/google"
 *   messageError="Falha ao autenticar com o Google."
 *   errorColor="#d32f2f"
 *   width="100%"
 *   height="40px"
 *   background="transparent"
 *   border="1px solid #ccc"
 *   borderRadius="6px"
 *   boxShadow="0 2px 6px rgba(0,0,0,0.1)"
 * >
 *   Continuar com Google
 * </GoogleButton> 
 * 
 **/
const GoogleButton: React.FC<GoogleButtonProps> = ({
  endpoint,
  messageError = 'Ocorreu um erro ao processar sua solicitação.',
  errorColor = '#d32f2f',
  boxShadow,
  width,
  height,
  padding,
  margin,
  background,
  border = 'none',
  borderRadius,

  children,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleClick = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      window.location.href = endpoint      
    } catch (e) {
      setErrorMsg(messageError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <ButtonFormStyled
       onClick={handleClick}
        disabled={loading}
        width={width}
        height={height}
        padding={padding}
        margin={margin}
        background={background}
        border={border}
        borderRadius={borderRadius}
        boxShadow={boxShadow}
      >
        {loading ? 'Carregando...' : children}
      </ButtonFormStyled>

      {errorMsg && (
        <Typography
          role="alert"
          variant="body2"
          sx={{ mt: 1 }}
          color={errorColor}
        >
          {errorMsg}
        </Typography>
      )}
    </Box>
  );
};

GoogleButton.displayName = 'GoogleButton';
export default GoogleButton;
