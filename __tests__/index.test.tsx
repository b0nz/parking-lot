import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const table = screen.getByTestId("cars-table");

    expect(table).toBeInTheDocument();
  });
});
