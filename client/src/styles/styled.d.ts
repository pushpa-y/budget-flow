// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: "light" | "dark";
    bg: string;
    cardBg: string; 
    surface: string;
    text: string;
    muted: string;
    accent: string;
    glassBorder: string;
    cardShadow: string;
  }
}
