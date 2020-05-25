import { DefaultTheme } from './src/components/Theme.style';
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        background: string;
        foreground: string;
        accent: string;
      
    }
}