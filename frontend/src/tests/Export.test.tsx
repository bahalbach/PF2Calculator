import React from "react";
import { describe, expect, test } from 'vitest'
import { render, waitFor } from "./test-utils";

import Export from "../Sharing/Export";
import { fireEvent, screen } from "@testing-library/dom";

describe("Export", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Export />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Export and Import functions work correctly", async () => {
    render(<Export />);
    expect(screen.getByRole("textbox")).toHaveValue("Import successful");

    fireEvent.click(screen.getByText("Export"));
    expect(screen.getByRole("textbox")).not.toHaveValue("Import successful");

    fireEvent.click(screen.getByText("Import"));
    await waitFor(() => expect(screen.getByRole("textbox")).toHaveValue("Import successful"));

    fireEvent.click(screen.getByText("Import"));
    await waitFor(() => expect(screen.getByRole("textbox")).toHaveValue("Import failed"));
  });

  // Can't test 'Copy' because no navigator.clipboard
});
