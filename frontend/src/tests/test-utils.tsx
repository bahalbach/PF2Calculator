import React, { FC, ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import store from "../App/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../App/theme";
import { CssBaseline } from "@mui/material";

const WithProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
};
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: WithProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

function expectToBeCloseToArray(actual: number[], expected: number[]) {
  expect(actual.length).toBe(expected.length);
  actual.forEach((x: number, i: number) => expect(x).toBeCloseTo(expected[i]));
}

function expectedValue(dist: number[]) {
  let total = 0;
  for (let i = 0; i < dist.length; i++) {
    total += i * dist[i];
  }
  return total;
}

export { expectToBeCloseToArray, expectedValue };
