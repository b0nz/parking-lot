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
}
interface ILeaveFormProps {
  onSubmit: (data: IFormInputs) => void;
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

export default function LeaveForm({ onSubmit }: ILeaveFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

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
}
