export type Car = {
  id: number;
  color: string;
  lot: number;
};

export type State = {
  cars: Car[];
  maxLot: number;
  availableSpace: Array<number>;
};
