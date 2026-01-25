import { ThemeOptions } from '@mui/material/styles';


export const formThemeOptions: ThemeOptions = {
  pipelinesolucoes: {
    forms: {
      background: 'linear-gradient(180deg, white, #d1e6ff)',
      borderRadius: "24px", 
      
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
      },                  
      button: {
        background: "#216fed",
        backgroundHover: "#005ce3",
        color: "#fff",
        colorHover: "#fff",
        borderRadius: "9999px",
        padding: "8px 24px",
      } 
    }
  },
};