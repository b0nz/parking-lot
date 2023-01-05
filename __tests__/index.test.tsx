import { render, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders the Enter Parking Lot and Leave Parking Lot tabs", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Enter Parking Lot")).toBeInTheDocument();
    expect(getByText("Leave Parking Lot")).toBeInTheDocument();
  });

  it("renders the EnterForm and LeaveForm components", () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId("enter-form")).toBeInTheDocument();
    expect(getByTestId("leave-form")).toBeInTheDocument();
  });

  it("renders the CarsTable component", () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId("cars-table")).toBeInTheDocument();
  });

  it("displays an error message if entering a car with an already existing car number", () => {
    const { getByTestId, getByText } = render(<Home />);

    const carNumberInput = getByTestId("car-number");
    const carColorInput = getByTestId("car-color");
    const parkingLotInput = getByTestId("parking-lot-number");
    const submitBtn = getByTestId("enter-submit-btn");

    waitFor(() => {
      fireEvent.change(carNumberInput, { target: { value: "123" } });
      fireEvent.change(carColorInput, { target: { value: "red" } });
      fireEvent.change(parkingLotInput, { target: { value: "4" } });
      fireEvent.click(submitBtn);
    });

    waitFor(() => {
      fireEvent.change(carNumberInput, { target: { value: "123" } });
      fireEvent.change(carColorInput, { target: { value: "red" } });
      fireEvent.change(parkingLotInput, { target: { value: "4" } });
      fireEvent.click(submitBtn);
    });

    waitFor(() => {
      expect(getByText("Car already exist")).toBeInTheDocument();
    });
  });

  it("displays a message if there are no free spaces in the parking lot", () => {
    const { getByTestId, getByText } = render(<Home />);

    const carNumberInput = getByTestId("car-number");
    const carColorInput = getByTestId("car-color");
    const parkingLotInput = getByTestId("parking-lot-number");
    const submitBtn = getByTestId("enter-submit-btn");

    for (let i = 0; i < 10; i++) {
      waitFor(() => {
        fireEvent.change(carNumberInput, { target: { value: i } });
        fireEvent.change(carColorInput, { target: { value: "red" } });
        fireEvent.change(parkingLotInput, { target: { value: i } });
        fireEvent.click(submitBtn);
      });
    }

    waitFor(() => {
      expect(getByText("No free space available")).toBeInTheDocument();
    });
  });

  it('remove car from the parking lot', () => {
    const { getByTestId, getByText } = render(<Home />);

    const carNumberInput = getByTestId("car-number");
    const carColorInput = getByTestId("car-color");
    const parkingLotInput = getByTestId("parking-lot-number");
    const enterSubmitBtn = getByTestId("enter-submit-btn");
    const leaveSubmitBtn = getByTestId("leave-submit-btn");

    waitFor(() => {
      fireEvent.change(carNumberInput, { target: { value: "123" } });
      fireEvent.change(carColorInput, { target: { value: "red" } });
      fireEvent.change(parkingLotInput, { target: { value: "4" } });
      fireEvent.click(enterSubmitBtn);
    });

    fireEvent.click(getByText('Leave Parking Lot'));

    waitFor(() => {
      fireEvent.change(carNumberInput, { target: { value: "123" } });
      fireEvent.click(leaveSubmitBtn);
    });
    waitFor(() => {
      fireEvent.change(carNumberInput, { target: { value: "123" } });
      fireEvent.click(leaveSubmitBtn);
    });

    waitFor(() => {
      expect(getByText("Car not found")).toBeInTheDocument();
    });
  })
});
