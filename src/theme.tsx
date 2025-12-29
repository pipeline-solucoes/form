import { ThemeOptions } from '@mui/material/styles';
import { PipelineSolucoesFormTokens } from '@pipelinesolucoes/theme';

// Definindo o tema personalizado
const forms: PipelineSolucoesFormTokens = {    
    notification: {
      background: '#fff',     
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