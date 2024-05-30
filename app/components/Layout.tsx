import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{overscrollBehavior:"none"}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Box>
  );
}
