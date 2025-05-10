import React, { FC, ReactElement, ReactNode } from "react";
import {
  render as rtlRender,
  RenderOptions,
  cleanup,
} from "@testing-library/react";
import store from "../src/App/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/App/theme";
import { CssBaseline } from "@mui/material";

import { expect, afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

const WithProviders: FC<{ children: ReactNode }> = ({ children }) => {
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
export { default as userEvent } from "@testing-library/user-event";
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
