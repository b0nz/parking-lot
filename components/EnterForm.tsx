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
import { freeSpace } from "@/lib/parking-lot";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { enter, selectCars, selectMaxLot } from "@/lib/parkingLotSlice";
import { useDispatch } from "react-redux";

interface IFormInputs {
  id: number;
  color: string;
  lot: number;
}

const schema = yup
  .object({
    id: yup
      .number()
      .typeError("Car Number must be a number")
      .min(1, "Car Number must be greater than or equal to 1")
      .required("Car Number is required"),
    color: yup.string().required("Color is required"),
    lot: yup
      .number()
      .typeError("Parking Lot Number must be a number")
      .min(1, "Parking Lot must be greater than or equal to 1")
      .required("Parking Lot Number is required"),
  })
  .required();

const EnterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
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
  const spaceRecomendation = Number(freeSpace(cars, maxLot));

  const onSubmit = (data: IFormInputs) => {
    try {
      if (cars.filter((f) => f.id === data.id).length > 0) {
        throw new Error("Car already exists");
      }
      if (cars.filter((f) => f.lot === data.lot).length > 0) {
        throw new Error("Parking lot already occupied");
      }
      if (data.lot > maxLot) {
        throw new Error("Parking lot not available");
      }
      dispatch(enter(data));
      toast({
        title: "Car entered",
        description: `Car number ${data.id} entered parking lot ${data.lot}`,
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
    <form data-testid="enter-form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.id?.message)}>
        <FormLabel>Car Number</FormLabel>
        <Input
          {...register("id")}
          placeholder="Car number"
          type="number"
          data-testid="car-number"
        />
        <FormHelperText data-testid="car-number-error" color="red">
          {errors.id?.message}
        </FormHelperText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.color?.message)}>
        <FormLabel>Car Color</FormLabel>
        <Input
          {...register("color")}
          placeholder="Car color"
          data-testid="car-color"
        />
        <FormHelperText data-testid="car-color-error" color="red">
          {errors.color?.message}
        </FormHelperText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.lot?.message)}>
        <FormLabel>Parking Lot Number</FormLabel>
        <Input
          {...register("lot")}
          data-testid="parking-lot-number"
          placeholder="Parking lot number"
          type="number"
        />
        <FormHelperText data-testid="parking-lot-number-error" color="red">
          {errors.lot?.message}
        </FormHelperText>
      </FormControl>

      <HStack spacing={2}>
        <Button data-testid="enter-submit-btn" type="submit" colorScheme="blue">
          Submit
        </Button>
        <Button
          data-testid="autofill-free-space-btn"
          type="button"
          onClick={() => setValue("lot", spaceRecomendation)}
        >
          Autofill Free Space
        </Button>
      </HStack>
    </form>
  );
};

export default EnterForm;
