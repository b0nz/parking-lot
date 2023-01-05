import {
  enter,
  leave,
  initialState,
  freeSpace,
  findFreeSpace,
} from "../utils/parking-lot";

describe("enter function", () => {
  test("adds a new car to an empty parking lot", () => {
    const car = { id: 1, color: "red", lot: 1 };
    const state = enter(initialState, car);
    expect(state.cars).toEqual([car]);
    expect(state.errorMessage).toEqual("");
  });

  test("adds a new car to a parking lot with existing cars", () => {
    const car1 = { id: 1, color: "red", lot: 1 };
    const car2 = { id: 2, color: "red", lot: 2 };
    let state = enter(initialState, car1);
    state = enter(state, car2);
    expect(state.cars).toEqual([car1, car2]);
    expect(state.errorMessage).toEqual("");
  });

  test("throws an error when trying to add a car with the same id as an existing car", () => {
    const car1 = { id: 1, color: "red", lot: 1 };
    const car2 = { id: 1, color: "red", lot: 2 };
    let state = enter(initialState, car1);
    state = enter(state, car2);
    expect(state.cars).toEqual([car1]);
    expect(state.errorMessage).toEqual("Car already exists");
  });

  test("throws an error when trying to add a car to a parking spot that is already occupied", () => {
    const car1 = { id: 1, color: "red", lot: 1 };
    const car2 = { id: 2, color: "red", lot: 1 };
    let state = enter(initialState, car1);
    state = enter(state, car2);
    expect(state.cars).toEqual([car1]);
    expect(state.errorMessage).toEqual("Parking lot already occupied");
  });
});

describe("leave function", () => {
  test("removes a car from a parking lot with multiple cars", () => {
    const car1 = { id: 1, color: "red", lot: 1 };
    const car2 = { id: 2, color: "red", lot: 2 };
    let state = enter(initialState, car1);
    state = enter(state, car2);
    state = leave(state, 1);
    expect(state.cars).toEqual([car2]);
    expect(state.errorMessage).toEqual("");
  });

  test("removes the only car from a parking lot", () => {
    const car = { id: 1, color: "red", lot: 1 };
    let state = enter(initialState, car);
    state = leave(state, 1);
    expect(state.cars).toEqual([]);
    expect(state.errorMessage).toEqual("");
  });

  test("throws an error when trying to remove a car with an id that does not exist in the parking lot", () => {
    const car = { id: 1, color: "red", lot: 1 };
    let state = enter(initialState, car);
    state = leave(state, 2);
    expect(state.cars).toEqual([car]);
    expect(state.errorMessage).toEqual("Car not found");
  });
});

describe("findFreeSpace function", () => {
  test("find free space", () => {
    let state = initialState;
    state = enter(state, { id: 1, color: "red", lot: 1 });
    state = enter(state, { id: 2, color: "blue", lot: 2 });
    expect(freeSpace(state)).toBe(3);
    state = enter(state, { id: 3, color: "green", lot: 3 });
    state = enter(state, { id: 4, color: "yellow", lot: 4 });
    state = enter(state, { id: 5, color: "black", lot: 5 });
    state = enter(state, { id: 6, color: "white", lot: 6 });
    state = enter(state, { id: 7, color: "gray", lot: 7 });
    state = enter(state, { id: 8, color: "purple", lot: 8 });
    state = enter(state, { id: 9, color: "pink", lot: 9 });
    state = enter(state, { id: 10, color: "orange", lot: 10 });
    expect(freeSpace(state)).toBe(undefined);
  });

  test("returns an error when there are no free parking spots", () => {
    let state = initialState;
    for (let i = 1; i <= 10; i++) {
      state = enter(state, { id: i, color: "red", lot: i });
    }
    const result = findFreeSpace(state);
    expect(result.lot).toEqual(0);
    expect(result.errorMessage).toEqual("No free space available");
  });

  test("returns the first free parking spot when it is available", () => {
    let state = initialState;
    for (let i = 2; i <= 10; i++) {
      state = enter(state, { id: i, color: "red", lot: i });
    }
    const result = findFreeSpace(state);
    expect(result.lot).toEqual(1);
    expect(result.errorMessage).toEqual("");
  });
});
