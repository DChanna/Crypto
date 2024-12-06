import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sideBar";
import Dashboard from "./scripts/dashboard";
import Summary from "./scripts/summary";
import ApiDevTools from "./scripts/apiDevTools";

import { Grid, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#317873",
    },
    secondary: {
      main: "#BCC5D3",
    },
    background: {
      default: "#F3F5F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1B2838",
      secondary: "#5C6975",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h4: {
      fontWeight: 600,
      color: "#1B2838",
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      textTransform: "capitalize",
    },
  },
});

// Final Rendered Output of App.js - Controls app flow from one page to another.

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Grid
          container
          sx={{
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Grid>
            <Sidebar />
          </Grid>

          <Grid item xs sx={{ overflowY: "auto", padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/crypto-summaries" element={<Summary />} />
              <Route path="/apiDevTools" element={<ApiDevTools />} />
            </Routes>
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
}

export default App;
