import React from "react";
import { describe, expect, test } from "vitest";
import { render, waitFor } from "./test-utils";

import Export from "../src/Sharing/Export";
import { screen } from "@testing-library/dom";
import { userEvent } from "@testing-library/user-event";

describe("Export", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Export />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Export and Import functions work correctly", async () => {
    render(<Export />);
    expect(screen.getByRole("textbox").innerHTML).toBe("Import successful");

    userEvent.click(screen.getByText("Export"));
    expect(screen.getByRole("textbox").innerHTML).not.toBe("Import successful");

    userEvent.click(screen.getByText("Import"));
    await waitFor(() =>
      expect(screen.getByRole("textbox").innerHTML).toBe("Import successful")
    );

    userEvent.click(screen.getByText("Import"));
    await waitFor(() =>
      expect(screen.getByRole("textbox").innerHTML).toBe("Import failed")
    );
  });
});
