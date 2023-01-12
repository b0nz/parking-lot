import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import {
  leave,
  selectCars,
  selectMaxLot,
} from "@/lib/parkingLotSlice";
import { useMemo } from "react";
import { freeSpace } from "@/lib/parking-lot";

interface IFormInputs {
  id: number;
}

const schema = yup
  .object({
    id: yup
      .number()
      .typeError("Car Number must be a number")
      .min(1, "Car Number must be greater than or equal to 1")
      .required("Car Number is required"),
  })
  .required();

const LeaveForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const dispatch = useDispatch();

  const maxLotSelector = useAppSelector(selectMaxLot);
  const carsSelector = useAppSelector(selectCars);

  const cars = useMemo(() => carsSelector, [carsSelector]);
  const maxLot = useMemo(() => maxLotSelector, [maxLotSelector]);

  const onSubmit = (data: IFormInputs) => {
    try {
      if (cars?.filter((f) => f.id === data.id).length === 0) {
        throw new Error("Car not found");
      }
      dispatch(leave(data.id));
      toast({
        title: "Success",
        description: `Car ${data.id} left the parking lot`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form
      data-testid="leave-form"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <FormControl isInvalid={Boolean(errors.id?.message)}>
        <FormLabel>Car Number</FormLabel>
        <Input {...register("id")} placeholder="Car number" type="number" />
        <FormHelperText color="red">{errors.id?.message}</FormHelperText>
      </FormControl>

      <HStack spacing={2}>
        <Button data-testid="leave-submit-btn" type="submit" colorScheme="blue">
          Submit
        </Button>
      </HStack>
    </form>
  );
};

export default LeaveForm;
