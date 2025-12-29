import { createGlobalStyle } from "styled-components";
import type { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  name: "light",
  bg: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
  surface: "rgba(255,255,255,0.65)",
  text: "#0f172a",
  muted: "#64748b",
  accent: "#4f46e5",
  glassBorder: "rgba(255,255,255,0.6)",
  cardShadow: "0 10px 30px rgba(15,23,42,0.06)",
  cardBg: "rgba(255,255,255,0.8)",
};

export const darkTheme: DefaultTheme = {
  name: "dark",
  bg: "linear-gradient(180deg, #0b1220 0%, #071021 100%)",
  surface: "rgba(10,11,15,0.4)",
  text: "#e6eef8",
  muted: "#94a3b8",
  accent: "#7c3aed",
  glassBorder: "rgba(255,255,255,0.06)",
  cardShadow: "0 10px 30px rgba(2,6,23,0.6)",
  cardBg: "rgba(20,25,35,0.6)",
};

export const GlobalStyle = createGlobalStyle<{theme:any}>`
  html,body,#root { height:100%; }
  body {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: ${(p) => p.theme.bg};
    color: ${(p) => p.theme.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background .25s ease, color .25s ease;
  }

  /* glass helper */
  .glass {
    background: ${(p) => p.theme.surface};
    backdrop-filter: blur(8px) saturate(120%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
    border: 1px solid ${(p) => p.theme.glassBorder};
    box-shadow: ${(p) => p.theme.cardShadow};
  }

  /* utility small */
  .muted { color: ${(p) => p.theme.muted}; }
`;
