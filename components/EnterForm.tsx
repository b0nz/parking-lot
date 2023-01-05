import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInputs {
  id: number;
  color: string;
  lot: number;
}
interface IEnterFormProps {
  onSubmit: (data: IFormInputs) => void;
  onFindFreeSpace: () => number;
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

export default function EnterForm({
  onSubmit,
  onFindFreeSpace,
}: IEnterFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <FormControl isInvalid={Boolean(errors.id?.message)}>
        <FormLabel>Car Number</FormLabel>
        <Input {...register("id")} placeholder="Car number" type="number" />
        <FormHelperText color="red">{errors.id?.message}</FormHelperText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.color?.message)}>
        <FormLabel>Car Color</FormLabel>
        <Input {...register("color")} placeholder="Car color" />
        <FormHelperText color="red">{errors.color?.message}</FormHelperText>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.lot?.message)}>
        <FormLabel>Parking Lot Number</FormLabel>
        <Input
          {...register("lot")}
          placeholder="Parking lot number"
          type="number"
        />
        <FormHelperText color="red">{errors.lot?.message}</FormHelperText>
      </FormControl>

      <HStack spacing={2}>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
        <Button
          type="button"
          onClick={() => setValue("lot", onFindFreeSpace())}
        >
          Find Free Space
        </Button>
      </HStack>
    </form>
  );
}
