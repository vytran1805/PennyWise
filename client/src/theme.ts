import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";

export const colors = {
  // purple
  primary: {
    100: "#E4E2EE",
    200: "#C7C4D4",
    300: "#c0bcdb",
    400: "#a19bc9",
    500: "#827ab7",
    600: "#6359a5",
    700: "#4f4784",
    800: "#3b3663",
    900: "#312c51",
    950: "#272342",
  },
  // gold
  secondary: {
    100: "#FCEDCF",
    200: "#FAE2B0",
    300: "#F8D690",
    400: "#F7D080",
    500: "#f6ca70",
    600: "#f6c561",
    700: "#ddb157",
    800: "#c49d4d",
    900: "#906308",
  },
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  background: {
    light: "E4E2EE",
    dark: "1b182e",
  },
};

export const themeSettings = {
  palette: {
    primary: {
      ...colors.primary,
      main: colors.primary[500],
      light: colors.primary[400],
    },
    secondary: {
      ...colors.secondary,
      main: colors.secondary[600],
      light: colors.secondary[700],
    },
    background: {
      default: colors.background.light,
      dark: colors.background.dark,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 14,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: colors.grey[800],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 16,
      fontWeight: 600,
      color: colors.grey[900],
    },
  },
};
