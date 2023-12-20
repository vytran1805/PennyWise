import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
// import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  // create theme that comes from MUI
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      {/* <ErrorBoundary> */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline will reset the setting of MUI to default */}
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          This is the box
        </Box>
      </ThemeProvider>
      {/* </ErrorBoundary> */}
    </div>
  );
}

export default App;
