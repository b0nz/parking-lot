import { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Car, State } from "@/types/parking-lot";
import {
  initialState,
  enter,
  leave,
  findFreeSpace,
  listAvailableSpace,
  findCarLocation,
} from "@/lib/parking-lot";
import EnterForm from "@/components/EnterForm";
import Head from "next/head";
import LeaveForm from "@/components/LeaveForm";
import CarsTable from "@/components/CarsTable";

export default function Home() {
  const toast = useToast();
  const [state, setState] = useState<State>(initialState);
  const [lotNum, setLotNum] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEnter = (car: Car) => {
    const newState = enter(state, car);
    setState(newState);
    setErrorMessage(newState.errorMessage);
  };

  const handleLeave = (id: number) => {
    const newState = leave(state, id);
    setState(newState);
    setErrorMessage(newState.errorMessage);
  };

  const handleFindFreeSpace = () => {
    const lot = findFreeSpace(state);
    setErrorMessage(lot.errorMessage);
    return lot.lot;
  };

  const handleAvailableSpace = () => {
    const availableSpace = listAvailableSpace(state);
    setState((prevState) => ({ ...prevState, availableSpace }));
  };

  const handleReset = () => {
    setState((prevState) => ({ ...prevState, cars: [] }));
  };

  const handleFindfindCarLocation = (lotNumber: number) => {
    const result = findCarLocation(state, lotNumber);
    const isFound = result !== 0;
    toast({
      title: isFound ? "Car found!" : "Car not found!",
      description: isFound ? `Car Lot Number = ${result}` : "",
      status: isFound ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Head>
        <title>Parking Lot</title>
      </Head>
      <Box
        mx="auto"
        maxW="xl"
        display="flex"
        flexDirection="column"
        gap={8}
        p={8}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Text>Max Lot</Text>
          <Input
            value={state.maxLot}
            onChange={(e) => {
              setState((prevState) => ({
                ...prevState,
                maxLot: Number(e.target.value),
              }));
            }}
          />
        </Box>
        <Box>
          <Tabs>
            <TabList>
              <Tab>Enter Parking Lot</Tab>
              <Tab>Leave Parking Lot</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <EnterForm
                  onSubmit={(data) => handleEnter(data)}
                  onFindFreeSpace={handleFindFreeSpace}
                />
              </TabPanel>
              <TabPanel>
                <LeaveForm onSubmit={(data) => handleLeave(data?.id)} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
        </Box>
        <Box display="flex" flexDir="column" gap={2}>
          <Text>Available Space : {JSON.stringify(state.availableSpace)}</Text>
          <Button onClick={handleAvailableSpace}>Available Space</Button>
        </Box>
        <Box display="flex" flexDir="column" gap={2}>
          <Text>Car Number</Text>
          <Input
            value={lotNum}
            onChange={(e) => setLotNum(Number(e.target.value))}
            placeholder="Car Number"
          />
          <Button onClick={() => handleFindfindCarLocation(lotNum)}>
            Car Location
          </Button>
        </Box>
        <Box>
          <CarsTable cars={state.cars} />
        </Box>
        <Button colorScheme="red" onClick={handleReset}>
          Reset Data
        </Button>
      </Box>
    </>
  );
}
