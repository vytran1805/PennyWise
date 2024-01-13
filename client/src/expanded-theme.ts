// import { PaletteColor } from "@mui/material/styles/createPalette";

// Extend the PaletteColor and Palette interfaces of Material UI
declare module '@mui/material/styles/createPalette' {
  interface PaletteColor {
    [key: number]: string;
  }
}
