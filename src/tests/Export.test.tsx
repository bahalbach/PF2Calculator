import React from "react";
import { render } from "./test-utils";

import Export from "../Sharing/Export";
import { fireEvent, screen } from "@testing-library/dom";

describe("Export", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Export />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Export and Import functions work correctly", () => {
    render(<Export />);
    expect(screen.getByRole("textbox")).toHaveValue("Import successful");

    fireEvent.click(screen.getByText("Export"));
    expect(screen.getByRole("textbox")).not.toHaveValue("Import successful");

    fireEvent.click(screen.getByText("Import"));
    expect(screen.getByRole("textbox")).toHaveValue("Import successful");

    fireEvent.click(screen.getByText("Import"));
    expect(screen.getByRole("textbox")).toHaveValue("Import failed");
  });

  // Can't test 'Copy' because no navigator.clipboard
});
