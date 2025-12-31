import { ThemeOptions } from '@mui/material/styles';
import { PipelineSolucoesFormTokens } from '@pipelinesolucoes/theme';

// Definindo o tema personalizado
const forms: PipelineSolucoesFormTokens = {    
    notification: {
      background: '#fff',     
    },
    login: {
      background: 'linear-gradient(180deg, white, #d1e6ff)',
      borderRadius: "24px",
      divider: '#8c8c8c',
      link: {
        color: '#216fed',
      },
      field: {
        background: '#fff', 
        backgroundDisabled: "#9CA3AF",
        color: "#000",
        colorFocused: "#000",
        colorDisabled: "#9CA3AF", 
        borderRadius: "10px",
        boxShadow: "none",
        borderColor: "#ccc",
        padding: "4px 8px",
      },
      button: {
        background: "#216fed",
        backgroundHover: "#005ce3",
        color: "#fff",
        colorHover: "#fff",
        borderRadius: "9999px",
        padding: "8px 24px",
      }
    },    
    field: {
        background: '#fff', 
        backgroundDisabled: "#9CA3AF",
        color: "#000",
        colorFocused: "#000",
        colorDisabled: "#9CA3AF", 
        borderRadius: "0",
        boxShadow: "none",
        borderColor: "#ccc",
        padding: "4px 8px",
    }      
};


export const formThemeOptions: ThemeOptions = {
  pipelinesolucoes: {
    forms,
  },
};