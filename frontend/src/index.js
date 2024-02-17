import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import PF2App from "./App/PF2App";
import store from "./App/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { CssBaseline } from "@mui/material";
import theme from "./App/theme";
import { ThemeProvider } from "@mui/material/styles";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PF2App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
