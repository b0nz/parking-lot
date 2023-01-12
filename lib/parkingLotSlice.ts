import { Car } from "@/types/parking-lot.d";
import { State } from "@/types/parking-lot";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "./store";

// initial state
const initialState: State = {
  cars: [],
  maxLot: 10,
  availableSpace: [],
};

// slice
export const parkingLotSlice = createSlice({
  name: "parkingLot",
  initialState,
  reducers: {
    enter: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    },
    leave: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
      };
    },
    setMaxLot: (state, action: PayloadAction<number>) => {
      state.maxLot = action.payload;
    },
    setAvailableSpace: (state, action: PayloadAction<Array<number>>) => {
      state.availableSpace = action.payload;
    },
    resetData: (state) => {
      state.cars = initialState.cars;
      state.maxLot = initialState.maxLot;
      state.availableSpace = initialState.availableSpace;
    },
  },
});

// actions
export const { enter, leave, setMaxLot, setAvailableSpace, resetData } =
  parkingLotSlice.actions;

// selectors
export const selectCars = (state: AppState) => state.parkingLot.cars;
export const selectMaxLot = (state: AppState) => state.parkingLot.maxLot;
export const selectAvailableSpace = (state: AppState) =>
  state.parkingLot.availableSpace;

export default parkingLotSlice.reducer;
