import { configureStore } from "@reduxjs/toolkit";
import parkingLotReducer from "./parkingLotSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      parkingLot: parkingLotReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action<string>
// >;

export default store;
