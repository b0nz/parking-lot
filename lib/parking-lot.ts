import { Car, State } from "@/types/parking-lot";

export const initialState: State = {
  cars: [],
  errorMessage: "",
  maxLot: 10,
  availableSpace: [],
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
    if (car.lot > state.maxLot) {
      throw new Error("Parking lot not available");
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
      ...state,
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
  for (let i = 1; i <= state.maxLot; i++) {
    if (!state.cars.some((car) => car.lot === i)) {
      return i;
    }
  }
  return undefined;
}

// list available space
export function listAvailableSpace(state: State): Array<number> {
  const availableSpace: Array<number> = [];
  for (let i = 1; i <= state.maxLot; i++) {
    let isUsed = false;
    for (let j = 0; j < state.cars.length; j++) {
      if (state.cars[j]?.lot === i) {
        isUsed = true;
        break;
      }
    }
    if (!isUsed) {
      availableSpace.push(i);
    }
  }

  return availableSpace;
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

// find car lot by parameter id (car number)
export function findCarLocation(state: State, id: number): number {
  let carLotNumber = 0;
  for (let i = 1; i <= state.cars.length; i++) {
    if (state.cars[i - 1]?.id === id) {
      carLotNumber = state.cars[i - 1]?.lot;
    }
  }
  return carLotNumber;
}
