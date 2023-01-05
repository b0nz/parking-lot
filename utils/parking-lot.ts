import { Car, State } from "../types/parking-lot";

export const initialState: State = {
  cars: [],
};

export function enter(state: State, car: Car): State {
  return {
    ...state,
    cars: [...state.cars, car],
  };
}

export function leave(state: State, id: number): State {
  return {
    ...state,
    cars: state.cars.filter((car) => car.id !== id),
  };
}

export function findFreeSpace(state: State): number | undefined {
  for (let i = 1; i <= 10; i++) {
    if (!state.cars.some((car) => car.lot === i)) {
      return i;
    }
  }
  return undefined;
}
