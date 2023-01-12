import { useAppSelector } from "@/lib/hooks";
import { selectMaxLot, setMaxLot } from "@/lib/parkingLotSlice";
import { Box, Input, Text } from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";

const InputMaxLot = () => {
  const dispatch = useDispatch();
  const maxLotSelector = useAppSelector(selectMaxLot);

  const maxLot = useMemo(() => maxLotSelector, [maxLotSelector]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Text>Max Lot</Text>
      <Input
        data-testid="input-max-lot"
        defaultValue={maxLot}
        onChange={debounce(
          (e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setMaxLot(Number(e.target.value))),
          150
        )}
      />
    </Box>
  );
};

export default InputMaxLot;
