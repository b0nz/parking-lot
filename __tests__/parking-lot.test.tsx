import {
  initialState,
  enter,
  leave,
  findFreeSpace,
} from "../utils/parking-lot";

test("enter and leave", () => {
  let state = initialState;
  state = enter(state, { id: 1, color: "red", lot: 1 });
  state = enter(state, { id: 2, color: "blue", lot: 2 });
  expect(state).toEqual({
    cars: [
      { id: 1, color: "red", lot: 1 },
      { id: 2, color: "blue", lot: 2 },
    ],
  });
  state = leave(state, 1);
  expect(state).toEqual({
    cars: [{ id: 2, color: "blue", lot: 2 }],
  });
});

test("find free space", () => {
  let state = initialState;
  state = enter(state, { id: 1, color: "red", lot: 1 });
  state = enter(state, { id: 2, color: "blue", lot: 2 });
  expect(findFreeSpace(state)).toBe(3);
  state = enter(state, { id: 3, color: "green", lot: 3 });
  state = enter(state, { id: 4, color: "yellow", lot: 4 });
  state = enter(state, { id: 5, color: "black", lot: 5 });
  state = enter(state, { id: 6, color: "white", lot: 6 });
  state = enter(state, { id: 7, color: "gray", lot: 7 });
  state = enter(state, { id: 8, color: "purple", lot: 8 });
  state = enter(state, { id: 9, color: "pink", lot: 9 });
  state = enter(state, { id: 10, color: "orange", lot: 10 });
  expect(findFreeSpace(state)).toBe(undefined);
});
