import React from "react";
import { createRoot } from "react-dom/client"
import "./index.css";
import PF2App from "./App/PF2App";
import store from "./App/store";
import { Provider } from "react-redux";
import * as serviceWorker from "/public/serviceWorker";
import { CssBaseline } from "@mui/material";
import theme from "./App/theme";
import { ThemeProvider } from "@mui/material/styles";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PF2App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

serviceWorker.register();
