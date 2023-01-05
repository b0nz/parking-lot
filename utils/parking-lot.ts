import { Car, State } from "../types/parking-lot";

export const initialState: State = {
  cars: [],
  errorMessage: "",
};

// car enters the parking lot
export function enter(state: State, car: Car): State {
  try {
    if (state.cars.filter((f) => f.id === car.id).length > 0) {
      throw new Error("Car already exists");
    }
    if (state.cars.filter((f) => f.lot === car.lot).length > 0) {
      throw new Error("Parking lot already occupied");
    }
    return {
      ...state,
      cars: [...state.cars, car],
      errorMessage: "",
    };
  } catch (error) {
    return {
      ...state,
      errorMessage: (error as Error).message,
    };
  }
}

// car leaves the parking lot
export function leave(state: State, id: number): State {
  try {
    if (state.cars.filter((f) => f.id === id).length === 0) {
      throw new Error("Car not found");
    }
    return {
      cars: state.cars.filter((car) => car.id !== id),
      errorMessage: "",
    };
  } catch (error) {
    return {
      ...state,
      errorMessage: (error as Error).message,
    };
  }
}

// parking lot with max 10 spaces
export function freeSpace(state: State): number | undefined {
  for (let i = 1; i <= 10; i++) {
    if (!state.cars.some((car) => car.lot === i)) {
      return i;
    }
  }
  return undefined;
}

// find free space
export function findFreeSpace(state: State): {
  lot: number;
  errorMessage: string;
} {
  const lot = freeSpace(state);
  if (lot === undefined) {
    return {
      lot: 0,
      errorMessage: "No free space available",
    };
  }
  return {
    lot,
    errorMessage: "",
  };
}
