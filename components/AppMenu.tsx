import { useMemo, useState } from "react";
import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hooks";
import {
  resetData,
  selectAvailableSpace,
  selectCars,
  selectMaxLot,
  setAvailableSpace,
} from "@/lib/parkingLotSlice";
import { useDispatch } from "react-redux";
import { findCarLocation, listAvailableSpace } from "@/lib/parking-lot";
import CarsTable from "./CarsTable";

const AppMenu: React.FC = () => {
  const toast = useToast();
  const [lotNum, setLotNum] = useState(0);
  const dispatch = useDispatch();

  const availableSpaceSelector = useAppSelector(selectAvailableSpace);
  const carsSelector = useAppSelector(selectCars);
  const maxLotSelector = useAppSelector(selectMaxLot);

  const availableSpace = useMemo(
    () => availableSpaceSelector,
    [availableSpaceSelector]
  );
  const cars = useMemo(() => carsSelector, [carsSelector]);
  const maxLot = useMemo(() => maxLotSelector, [maxLotSelector]);

  const handleAvailableSpace = () => {
    const data = listAvailableSpace(cars, maxLot);
    dispatch(setAvailableSpace(data));
  };

  const handleFindCarLocation = (id: number) => {
    const data = findCarLocation(cars, id);
    const isFound = data !== 0;
    toast.closeAll();
    toast({
      title: isFound ? "Car found!" : "Car not found!",
      description: isFound ? `Car Lot Number = ${data}` : "",
      status: isFound ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box display="flex" flexDir="column" gap={2}>
        <Text>Available Space : {JSON.stringify(availableSpace)}</Text>
        <Button onClick={handleAvailableSpace}>Available Space</Button>
      </Box>
      <Box display="flex" flexDir="column" gap={2}>
        <Text>Car Number</Text>
        <Input
          value={lotNum}
          onChange={(e) => setLotNum(Number(e.target.value))}
          placeholder="Car Number"
        />
        <Button onClick={() => handleFindCarLocation(lotNum)}>
          Car Location
        </Button>
      </Box>
      <Box>
        <CarsTable />
      </Box>
      <Button
        data-testid="reset-btn"
        colorScheme="red"
        onClick={() => dispatch(resetData)}
      >
        Reset Data
      </Button>
    </>
  );
};

export default AppMenu;
