import { render, fireEvent, waitFor } from "@testing-library/react";
import EnterForm from "../EnterForm";

const onSubmit = jest.fn();
const onFindFreeSpace = jest.fn().mockReturnValue(1);

test("form with default props", async () => {
  const { getByText } = render(<EnterForm />);

  expect(getByText(/Submit/i)).toBeInTheDocument();
  expect(getByText(/Find free space/i)).toBeInTheDocument();
});

test("form displays errors when invalid data is submitted", async () => {
  const { getByText } = render(
    <EnterForm onSubmit={onSubmit} onFindFreeSpace={onFindFreeSpace} />
  );

  await fireEvent.click(getByText(/Submit/i));

  await waitFor(() => {
    expect(getByText("Car Number must be a number")).toBeInTheDocument();
    expect(getByText("Color is required")).toBeInTheDocument();
    expect(
      getByText("Parking Lot Number must be a number")
    ).toBeInTheDocument();
  });
});

test("find free space button", async () => {
  const { getByText, getByTestId } = render(
    <EnterForm onSubmit={onSubmit} onFindFreeSpace={onFindFreeSpace} />
  );

  await fireEvent.click(getByText(/Find Free Space/i));

  expect(getByTestId("parking-lot-number")).toHaveValue(1);
});

test("form calls onSubmit with correct data when submitted with valid data", async () => {
  const onSubmitMock = jest.fn();
  const { getByTestId, getByText } = render(
    <EnterForm onSubmit={onSubmitMock} />
  );

  const carNumberInput = getByTestId("car-number");
  const carColorInput = getByTestId("car-color");
  const parkingLotInput = getByTestId("parking-lot-number");
  const submitButton = getByText(/Submit/i);

  // Fill out the form
  await fireEvent.change(carNumberInput, { target: { value: "123" } });
  await fireEvent.change(carColorInput, { target: { value: "red" } });
  await fireEvent.change(parkingLotInput, { target: { value: "4" } });

  // Submit the form
  await fireEvent.click(submitButton);

  // Assert that onSubmit was called with the correct data
  await waitFor(() => {
    expect(onSubmitMock).toHaveBeenCalledWith({
      id: 123,
      color: "red",
      lot: 4,
    });
  });
});
