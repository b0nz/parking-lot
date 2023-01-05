import { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
} from "@chakra-ui/react";
import { Car, State } from "../types/parking-lot";
import {
  initialState,
  enter,
  leave,
  findFreeSpace,
} from "../utils/parking-lot";
import EnterForm from "@/components/EnterForm";
import Head from "next/head";
import LeaveForm from "@/components/LeaveForm";

export default function Home() {
  const [state, setState] = useState<State>(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  function handleEnter(car: Car) {
    try {
      if (state.cars.filter((f) => f.id === car.id).length > 0) {
        throw new Error("Car already exists");
      }
      if (state.cars.filter((f) => f.lot === car.lot).length > 0) {
        throw new Error("Parking lot already occupied");
      }
      setState(enter(state, car));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  function handleLeave(id: number) {
    try {
      if (state.cars.filter((f) => f.id === id).length === 0) {
        throw new Error("Car not found");
      }
      setState(leave(state, id));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  function handleFindFreeSpace() {
    const lot = findFreeSpace(state);
    if (lot === undefined) {
      setErrorMessage("No free space available");
    }
    setErrorMessage("");
    return lot === undefined ? 0 : lot;
  }

  return (
    <>
      <Head>
        <title>Parking Lot</title>
      </Head>
      <Box mx="auto" maxW="xl" display="flex" flexDirection="column" gap={8}>
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Box>
        <Box>
          <TableContainer data-testid="cars-table">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Car Number</Th>
                  <Th>Car Color</Th>
                  <Th>Parking Lot Number</Th>
                </Tr>
              </Thead>
              <Tbody>
                {state.cars.length > 0 ? (
                  state.cars.map((car) => (
                    <Tr key={car.id}>
                      <Td>{car.id}</Td>
                      <Td>{car.color}</Td>
                      <Td>{car.lot}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={3} textAlign="center">
                      No Data
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
