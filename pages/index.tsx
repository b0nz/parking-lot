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
import EnterForm from "@/components/EnterForm";
import Head from "next/head";
import LeaveForm from "@/components/LeaveForm";
import AppMenu from "@/components/AppMenu";
import InputMaxLot from "@/components/InputMaxLot";

export default function Home() {
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
        <InputMaxLot />
        <Box>
          <Tabs>
            <TabList>
              <Tab>Enter Parking Lot</Tab>
              <Tab>Leave Parking Lot</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <EnterForm />
              </TabPanel>
              <TabPanel>
                <LeaveForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <AppMenu />
      </Box>
    </>
  );
}
