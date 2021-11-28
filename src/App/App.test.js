import React from "react";
import { render } from "@testing-library/react";
import PF2App from "./PF2App";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store";

describe("PF2App", () => {
  test("renders", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PF2App />
        </ThemeProvider>
      </Provider>
    );
  });
});
