import { getByText, screen } from "@testing-library/dom";
import React from "react";
import PF2App from "../App/PF2App";
import { render } from "./test-utils";

describe("PF2App", () => {
  test("renders", () => {
    render(<PF2App />);
    // screen.querySelector(
    //   "#root > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div > div:nth-child(3) > div > div > div > svg:nth-child(3) > g:nth-child(4) > g:nth-child(1) > g > g > g:nth-child(1) > rect"
    // );
    // the first list is the list of routines
    let routines = screen.getAllByRole("list")[0];

    // 7 routines loaded by default
    expect(routines.children.length).toBe(7);

    //screen.debug(routines);
    // the first loaded routine is 'baseline'
    expect(
      getByText(routines.children[0] as HTMLElement, "Baseline")
    ).toBeInTheDocument();
  });

  // test("renders Routines correctly", () => {
  //   const { container } = render(<PF2App />);

  // });
});
