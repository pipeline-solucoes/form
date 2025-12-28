import "@mui/material/styles";

export interface PipeSolFormTokens {
  
  notification?: {
    background: string;      
  },
  field?: {
    background?: string;
    backgroundDisabled?: string;
    color?: string;
    colorFocused?: string;
    colorDisabled?: string; 
    borderRadius?: string;
    boxShadow?: string;
    borderColor?: string;
    padding?: string; 
  }    
}

declare module "@mui/material/styles" {
  interface Theme {
    pipesol?: {
      form?: PipeSolFormTokens;
    };
  }

  interface ThemeOptions {
    pipesol?: {
      form?: PipeSolFormTokens;
    };
  }
}