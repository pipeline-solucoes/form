'use client';
import React, { useState } from 'react';
import { TypographyVariant, useTheme } from '@mui/material/styles';
import { SvgIconProps, Typography } from '@mui/material';
import { ButtonProps } from '../types/ButtonProps';
import { ButtonFormStyled } from '../style/ButtonFormStyled';
import { FieldProps } from '@/types/FieldProps';
import { validateEmailMessage } from '../utils/validateEmail';
import TextFieldValidate from './TextFieldValidate';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';
import { DivTitulo, FormContainer, StyledRoot } from './StyleForm';
import { validateTelefoneMessage } from '@/utils/validateTelefone';
import { ClickResult } from '../types/ClickResult';


export interface FormMessageProps extends 
  ColorProps, 
  BorderProps, 
  ButtonProps, 
  FieldProps, 
  LayoutProps 
{  
 
  Icon?: React.ElementType<SvgIconProps>;
  titulo?: () => React.ReactElement;

  textButton?: string;
  variantButton?: TypographyVariant;  
  rowsMessage?: number,
  
  children?: React.ReactNode;
  onClick?: (data: { nome: string; email: string; telefone: string; mensagem: string; }) => Promise<ClickResult> | ClickResult;
}

/**
 * Componente de formulário de mensagem, com suporte a:
 * validação básica de campos, exibição de mensagens de sucesso/erro
 * e customização visual via props ou tema.
 *
 * @param {React.ElementType<SvgIconProps>} [Icon] Ícone exibido no topo do formulário.
 * 
 * @param {() => React.ReactElement} [titulo] Função que retorna o título do formulário.
 * 
 * @param {string} [textButton='Enviar'] Texto exibido no botão principal de submit.
 * @param {TypographyVariant} [variantButton='body1'] Variante tipográfica usada nos textos do botão e links.
 *  
 * @param {React.ReactNode} [children] Conteúdo adicional renderizado abaixo do formulário.
 * 
 * @param {string} [background] Cor de fundo do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.
 *
 * @param {string | number} [borderRadius] Raio da borda do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.
 *
 * @param {string} [border] Borda do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.
 *
 * @param {string} [boxShadow] Sombra do container principal do formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.
 * 
 * @param {string} [maxWidth] Largura Máxima do container principal do formulário.
 *
 * @param {string} [backgroundField] Cor de fundo dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.field.
 *
 * @param {string} [colorField] Cor do texto dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.field.
 *
 * @param {string | number} [borderRadiusField] Raio da borda dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.field.
 *
 * @param {string} [boxShadowField] Sombra aplicada aos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.field.
 *
 * @param {string} [borderColorField] Cor da borda dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.field.
 *
 * @param {string | number} [paddingField] Espaçamento interno dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.field.
 *
 * @param {string | number} [marginField] Margem externa dos campos de formulário.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.field.
 * 
 * @param {string} [textButton='Enviar'] Texto exibido no botão principal do formulário.
 *
 * @param {TypographyVariant} [variantButton='body1'] Variante tipográfica utilizada no texto do botão e links.
 *
 * @param {string} [backgroundButton] Cor de fundo do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string} [backgroundHoverButton] Cor de fundo do botão ao passar o mouse.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string} [colorButton] Cor do texto do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string} [colorHoverButton] Cor do texto do botão ao passar o mouse.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string | number} [borderRadiusButton] Raio da borda do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string} [borderButton='none'] Borda do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string} [boxShadowButton] Sombra aplicada ao botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string | number} [widthButton='auto'] Largura do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string | number} [heightButton='auto'] Altura do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string | number} [paddingButton] Espaçamento interno do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.
 *
 * @param {string | number} [marginButton='0'] Margem externa do botão.
 * Opcional. Caso não seja informado, será utilizada a configuração definida no theme.pipelinesolucoes.forms.button.


 * @example
 * ```tsx
 * const Example = () => {
 *   return (
 *     <FormBrevo/>
 *   );
 * };
 * ```
 */

const FormMessage: React.FC<FormMessageProps> = ({
    
  Icon,
  titulo,

  background,
  borderRadius,
  border,
  boxShadow,
  maxWidth,

  backgroundField,
  colorField,
  borderRadiusField,
  boxShadowField,
  borderColorField,
  paddingField,
  marginField,
  heightField,  

  textButton = 'Enviar',
  variantButton = 'body1',

  backgroundButton,
  backgroundHoverButton,
  colorButton,
  colorHoverButton,
  borderRadiusButton,
  borderButton = 'none',
  boxShadowButton,
  widthButton = 'auto',
  heightButton = 'auto',
  paddingButton,
  marginButton = '0',

  rowsMessage = 5,
  
  children,
  onClick,
}) => {

  const theme = useTheme();
  const color_message_sucess = theme.palette.success.main;
  const color_message_erro = theme.palette.error.main;

  const bContainer = background ?? theme?.pipelinesolucoes?.forms?.background ?? 'transparent';
  const brContainer = borderRadius ?? theme?.pipelinesolucoes?.forms?.borderRadius ?? '0';
  const bdContainer= border ?? theme?.pipelinesolucoes?.forms?.border ?? '0';
  const bsContainer= boxShadow ?? theme?.pipelinesolucoes?.forms?.boxShadow ?? 'none';

  const bField = backgroundField ?? theme?.pipelinesolucoes?.forms?.field?.background ?? undefined;
  const cField = colorField ?? theme?.pipelinesolucoes?.forms?.field?.color ?? undefined;
  const brField = borderRadiusField ?? theme?.pipelinesolucoes?.forms?.field?.borderRadius ?? undefined;
  const bsField = boxShadowField ?? theme?.pipelinesolucoes?.forms?.field?.boxShadow ?? undefined;
  const bcField = borderColorField ?? theme?.pipelinesolucoes?.forms?.field?.borderColor ?? undefined;
  const pField = paddingField ?? theme?.pipelinesolucoes?.forms?.field?.padding ?? undefined;
  const mgField = marginField ?? theme?.pipelinesolucoes?.forms?.field?.margin ?? undefined;
  const hgField = heightField ?? theme?.pipelinesolucoes?.forms?.field?.height ?? undefined;   
    
  const bgButton = backgroundButton ?? theme?.pipelinesolucoes?.forms?.button?.background ?? undefined;
  const bgHoverButton = backgroundHoverButton ?? theme?.pipelinesolucoes?.forms?.button?.backgroundHover ?? undefined;
  const cButton = colorButton ?? theme?.pipelinesolucoes?.forms?.button?.color ?? undefined;
  const cHoverButton = colorHoverButton ?? theme?.pipelinesolucoes?.forms?.button?.colorHover ?? undefined;
  const brButton = borderRadiusButton ?? theme?.pipelinesolucoes?.forms?.button?.borderRadius ?? undefined;
  const bsButton = boxShadowButton ?? theme?.pipelinesolucoes?.forms?.button?.boxShadow ?? undefined;  
  const pButton = paddingButton ?? theme?.pipelinesolucoes?.forms?.button?.padding ?? undefined;
      
  const [mensagemApi, setMensagemApi] = useState('');
  const [corMensagemApi, setCorMensagemApi] = useState(color_message_erro);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // validação local básica (mantém o comportamento atual)
    const newErrors: { [key: string]: boolean } = {
      email: !validateEmail(email),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi(
        'Alguns dos dados fornecidos estão inválidos. Por favor, revise as informações preenchidas e corrija os campos destacados.'
      );
      return;
    }

    setIsLoading(true);
    setMensagemApi('');

    try {
      if (!onClick) {
        // Se o pai não passou handler, mantém feedback amigável
        setCorMensagemApi(color_message_erro);
        setMensagemApi('Nenhuma ação foi configurada para o botão.');
        return;
      }

      const result = await onClick({ nome, email, telefone, mensagem });

      if (result?.success) {
        setCorMensagemApi(result.color ?? color_message_sucess);
        setMensagemApi(result.message);
      } else {
        setCorMensagemApi(result.color ?? color_message_erro);
        setMensagemApi(result?.message ?? 'Falha ao realizar a operação.');
      }
    } catch (err) {
      setCorMensagemApi(color_message_erro);
      setMensagemApi('Erro inesperado ao processar a solicitação.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <StyledRoot background={bContainer} border_radius={brContainer} box_shadow={bsContainer} border={bdContainer} maxWidth={maxWidth}>
      {(Icon || titulo) && (
        <DivTitulo>
          {Icon && <Icon />}
          {titulo && titulo()}
        </DivTitulo>
      )}

      <FormContainer>
        
        <TextFieldValidate
            id="nome"
            label="Nome"
            placeholder="Nome"  
            value={nome}
            onChange={(e) => setNome(e.target.value)}                              
            required     
            requiredMessage="nome obrigatório"             
            showErrorOn="blur"
            height={hgField}            
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            margin={mgField}
        />
        
        <TextFieldValidate
            id="email"
            label="Email"
            placeholder="Email"            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            requiredMessage="email obrigatório"
            validate={validateEmailMessage}
            showErrorOn="blur"
            height={hgField}            
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            margin={mgField}
        />
        
        <TextFieldValidate
            id="telefone"
            label="Telefone"
            placeholder="Telefone"    
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}                  
            required={true}
            requiredMessage="telefone obrigatório"
            validate={validateTelefoneMessage}
            showErrorOn="blur"
            height={hgField}            
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            margin={mgField}            
        />
    
        <TextFieldValidate
            id="mensagem"
            label="Mensagem"
            placeholder="Mensagem"  
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}             
            required
            requiredMessage="mensagem obrigatória"
            multiline 
            rows={rowsMessage}                  
            showErrorOn="blur"
            height={hgField}            
            background={bField}
            color={cField}
            borderRadius={brField}
            borderColor={bcField}
            boxShadow={bsField}
            padding={pField}
            margin={mgField}
        />
                  
        <ButtonFormStyled
          backgroundButton={bgButton}
          backgroundHoverButton={bgHoverButton}
          colorButton={cButton}
          colorHoverButton={cHoverButton}
          borderRadiusButton={brButton}
          borderButton={borderButton}
          boxShadowButton={bsButton}
          widthButton={widthButton}
          heightButton={heightButton}
          paddingButton={pButton}
          marginButton={marginButton}
          disabled={isLoading}
          onClick={handleClick}
        >
          {isLoading ? (
            'Enviando...'
          ) : (
            <Typography variant={variantButton} component="span">
              {textButton}
            </Typography>
          )}
        </ButtonFormStyled>

      </FormContainer>

      {/* Mensagem retornada do onClick do pai */}
      {mensagemApi && (
        <Typography variant="body2" sx={{ color: corMensagemApi }}>
          {mensagemApi}
        </Typography>
      )}

      {children}
    </StyledRoot>
  );
};

export default FormMessage;
