import { Car } from "@/types/parking-lot";

// parking lot with max 10 spaces
export function freeSpace(cars: Car[], maxLot: number): number {
  for (let i = 1; i <= maxLot; i++) {
    if (!cars.some((car) => car.lot === i)) {
      return i;
    }
  }
  return 0;
}

// list available space
export function listAvailableSpace(cars: Car[], maxLot: number): Array<number> {
  const availableSpace: Array<number> = [];
  for (let i = 1; i <= maxLot; i++) {
    let isUsed = false;
    for (let j = 0; j < cars.length; j++) {
      if (cars[j]?.lot === i) {
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

// find car lot by parameter id (car number)
export function findCarLocation(cars: Car[], id: number): number {
  let carLotNumber = 0;
  for (let i = 1; i <= cars.length; i++) {
    if (cars[i - 1]?.id === id) {
      carLotNumber = cars[i - 1]?.lot;
    }
  }
  return carLotNumber;
}
