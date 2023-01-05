import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { Car } from "../types/parking-lot";

interface Props {
  cars: Car[];
}

const CarsTable: React.FC<Props> = ({ cars }) => {
  return (
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
          {cars.length > 0 ? (
            cars.map((car) => (
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
  );
};

export default CarsTable;
