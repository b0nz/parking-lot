import { freeSpace, listAvailableSpace, findCarLocation } from "../parking-lot";

describe("freeSpace function", () => {
  it("should return 1 when no car in parking lot", () => {
    const result = freeSpace([], 10);
    expect(result).toEqual(1);
  });

  it("should return 8 when parking lot has 7 cars", () => {
    let cars = [];
    for (let i = 1; i <= 7; i++) {
      cars.push({ id: i, color: "red", lot: i });
    }
    const result = freeSpace(cars, 10);
    expect(result).toEqual(8);
  });

  it("should return 0 when parking car lot is full", () => {
    let cars = [];
    for (let i = 1; i <= 10; i++) {
      cars.push({ id: i, color: "red", lot: i });
    }
    const result = freeSpace(cars, 10);
    expect(result).toEqual(0);
  });
});

describe("listAvailableSpace function", () => {
  it("should return a list of odd numbered parking lot", () => {
    let cars = [];
    for (let i = 1; i <= 10; i++) {
      if (i % 2 === 0) {
        cars.push({ id: i, color: "red", lot: i });
      }
    }
    const result = listAvailableSpace(cars, 10);
    expect(result).toEqual([1, 3, 5, 7, 9]);
  });
  it("should return a list of even numbered parking lot", () => {
    let cars = [];
    for (let i = 1; i <= 10; i++) {
      if (i % 2 === 1) {
        cars.push({ id: i, color: "red", lot: i });
      }
    }
    const result = listAvailableSpace(cars, 10);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });
  it("should return empty array when parking lot not available", () => {
    let cars = [];
    for (let i = 1; i <= 10; i++) {
      cars.push({ id: i, color: "red", lot: i });
    }
    const result = listAvailableSpace(cars, 10);
    expect(result).toEqual([]);
  });
});

describe("findCarLocation function", () => {
  it("should return the parking lot number of the car", () => {
    let cars = [];
    const maxLot = 10;
    for (let i = maxLot; i >= 1; i--) {
      cars.push({ id: i, color: "red", lot: maxLot - i + 1 });
    }
    const result = findCarLocation(cars, 2);
    expect(result).toEqual(9);
  });
  it("should return 0 when car not found", () => {
    let cars = [];
    const maxLot = 10;
    for (let i = maxLot; i >= 1; i--) {
      cars.push({ id: i, color: "red", lot: maxLot - i + 1 });
    }
    const result = findCarLocation(cars, 11);
    expect(result).toEqual(0);
  });
});
