import { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
import CarsTable from "@/components/CarsTable";

export default function Home() {
  const [state, setState] = useState<State>(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  function handleEnter(car: Car) {
    const newState = enter(state, car);
    setState(newState);
    setErrorMessage(newState.errorMessage);
  }

  function handleLeave(id: number) {
    const newState = leave(state, id);
    setState(newState);
    setErrorMessage(newState.errorMessage);
  }

  function handleFindFreeSpace() {
    const lot = findFreeSpace(state);
    setErrorMessage(lot.errorMessage);
    return lot.lot;
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
          <CarsTable cars={state.cars} />
        </Box>
      </Box>
    </>
  );
}
