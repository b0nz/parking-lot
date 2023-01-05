import { render, fireEvent, waitFor } from "@testing-library/react";
import LeaveForm from "../LeaveForm";

const onSubmitMock = jest.fn();

test("LeaveForm component", () => {
  const { getByLabelText, getByText } = render(
    <LeaveForm onSubmit={onSubmitMock} />
  );

  // get the form input and submit button
  const input = getByLabelText("Car Number");

  // simulate a change in the input field
  fireEvent.change(input, { target: { value: "1" } });

  // simulate a click on the submit button
  fireEvent.click(getByText(/Submit/i));

  waitFor(() => {
    // assert that the onSubmit mock function was called
    expect(onSubmitMock).toHaveBeenCalled();

    // assert that the onSubmit mock function was called with the correct argument
    expect(onSubmitMock).toHaveBeenCalledWith({ id: 1 });
  });
});
