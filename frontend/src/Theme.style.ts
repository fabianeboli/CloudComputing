import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const theme: DefaultTheme = {
    background: '#fcfaee',
    foreground: '#333',
    accent: '#e63946'
    
}

export const GlobalStyle = createGlobalStyle`
    html, body {
        width: 100%;
        height: 100%;
    }
`