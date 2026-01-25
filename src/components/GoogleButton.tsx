import React, { ReactElement } from 'react';
import { Button, styled, Typography, Box, TypographyVariant, SvgIconProps } from '@mui/material';
import { BorderProps, ColorProps, LayoutProps, TextProps } from '@pipelinesolucoes/theme';


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
    width: width,
    height: height,
    padding: padding,
    margin: margin,

    // Visual
    background: background,
    border: border,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
    textTransform: 'none',
    cursor: 'pointer',

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

const AreaTexto = styled('div')(() => ({     
    display: 'flex',
    flexDirection: 'row',    
    alignItems: 'center',
    justifyContent: 'center',    
    width: '100%',
    gap: '8px',
    textAlign: 'left',    
    padding: '0',
    margin: '0',    
  }));


interface GoogleButtonProps extends 
  ColorProps, BorderProps, LayoutProps, TextProps {

  icon: () => ReactElement<HTMLImageElement> | ReactElement<SvgIconProps>;
  text: string;
  variant?: TypographyVariant;
  endpoint: string;

  messageError?: string;
  errorColor?: string;

  // Estilo solicitado
  background?: string;
  color?: string;

  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  
  border?: string;
  borderRadius?: string;
  boxShadow?: string;  
}

/**
 * Componente de botão que redireciona o usuário para um endpoint externo
 * (ex: autenticação com Google). Durante o clique, o botão entra em estado
 * de loading e, caso ocorra algum erro, exibe uma mensagem abaixo do botão.
 *
 * @param {ReactElement<HTMLImageElement> | ReactElement<SvgIconProps>} icon Icone exibido dentro do botão.
 * @param {string} text Texto exibido dentro do botão.
 * @param {TypographyVariant} [variant='body1'] Variante do Typography usada no texto do botão.
 * @param {string} endpoint URL para a qual o usuário será redirecionado ao clicar no botão.
 * @param {string} [messageError='Ocorreu um erro ao processar sua solicitação.'] Mensagem exibida em caso de erro.
 * @param {string} [errorColor='#d32f2f'] Cor do texto da mensagem de erro.
 * @param {string} [width='auto'] Largura do botão.
 * @param {string} [height='auto'] Altura do botão.
 * @param {string} [padding='8px 24px'] Espaçamento interno do botão.
 * @param {string} [margin='0'] Margem externa do botão.
 * @param {string} [background='transparent'] Cor de fundo do botão.
 * @param {string} [border='none'] Borda do botão.
 * @param {string | number} [borderRadius='8px'] Raio da borda do botão.
 * @param {string} [boxShadow='none'] Sombra aplicada ao botão.
 *
 * @example
 * ```tsx
 * import { GoogleButton } from '@/components/GoogleButton';
 *
 * const Example = () => {
 *   return (
 *     <GoogleButton
 *       text="Continuar com Google"
 *       endpoint="/api/auth/google"
 *       width="100%"
 *       height="40px"
 *       background="transparent"
 *       border="1px solid #ccc"
 *       borderRadius="6px"
 *       boxShadow="0 2px 6px rgba(0,0,0,0.1)"
 *       messageError="Falha ao autenticar com o Google."
 *       errorColor="#d32f2f"
 *     />
 *   );
 * };
 * ```
 */
const GoogleButton: React.FC<GoogleButtonProps> = ({
  icon,
  text,
  variant = 'body1',
  endpoint,
  messageError = 'Ocorreu um erro ao processar sua solicitação.',
  errorColor = '#d32f2f',
  boxShadow = 'none',
  width = 'auto',
  height = 'auto',
  padding = '8px 24px',
  margin = '0',
  background = "transparent",
  color="#000",
  border = 'none',
  borderRadius,  
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
        {loading 
          ? 'Carregando...' 
          : ( <AreaTexto>
               { icon() }
               <Typography variant={variant} color={color}>{text}</Typography>
              </AreaTexto>)}
      </ButtonFormStyled>

      {errorMsg && (
        <Typography
          role="alert"
          variant="body1"
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
