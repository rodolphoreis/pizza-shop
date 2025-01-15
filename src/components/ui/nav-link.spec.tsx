import { render } from "@testing-library/react";
import NavLink from "../nav-link";
import { MemoryRouter } from "react-router-dom";

describe("Nav-Link", () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/">Home</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      }
    );
    expect(wrapper.getByText("Home").getAttribute("data-active")).toEqual(
      "false"
    );
    expect(wrapper.getByText("About").getAttribute("data-active")).toEqual(
      "true"
    );
  });
});
