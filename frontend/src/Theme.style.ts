import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const theme: DefaultTheme = {
    background: '#1f2229',
    foreground: '#F2F7FF',
    accent: '#00CC81'
    
}

export const GlobalStyle = createGlobalStyle`
    html, body {
        width: 100%;
        height: 100%;
    }
`