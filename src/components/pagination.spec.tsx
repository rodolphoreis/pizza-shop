import { render } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from "./pagination";
import userEvent from "@testing-library/user-event";

const onPageChangeCallBack = vi.fn();

describe("Pagination", () => {
  it("should display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />
    );
    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
  });
  it("should be able to navigate to the next page", async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallBack}
      />
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Próxima página",
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallBack).toHaveBeenCalled();
  });
});
