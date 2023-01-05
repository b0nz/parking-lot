import { render, screen } from "@testing-library/react";
import CarsTable from "../CarsTable";

describe("CarsTable", () => {
  it("should render a table with the correct headings and data when given cars", () => {
    const cars = [
      {
        id: 123,
        color: "red",
        lot: 1,
      },
      {
        id: 456,
        color: "blue",
        lot: 2,
      },
    ];
    render(<CarsTable cars={cars} />);

    const table = screen.getByTestId("cars-table");
    const headings = table.querySelectorAll("th");
    const rows = table.querySelectorAll("tr");

    expect(headings).toHaveLength(3);
    expect(headings[0]).toHaveTextContent("Car Number");
    expect(headings[1]).toHaveTextContent("Car Color");
    expect(headings[2]).toHaveTextContent("Parking Lot Number");

    expect(rows).toHaveLength(3); // 3 rows, including the headings
    expect(rows[1]).toHaveTextContent("123");
    expect(rows[1]).toHaveTextContent("red");
    expect(rows[1]).toHaveTextContent("1");
    expect(rows[2]).toHaveTextContent("456");
    expect(rows[2]).toHaveTextContent("blue");
    expect(rows[2]).toHaveTextContent("2");
  });

  it("should render a table with a single 'No Data' row when given no cars", () => {
    render(<CarsTable cars={[]} />);

    const table = screen.getByTestId("cars-table");
    const rows = table.querySelectorAll("tr");

    expect(rows).toHaveLength(2); // 2 row, with 'No Data' message
    expect(rows[1]).toHaveTextContent("No Data");
  });
});
