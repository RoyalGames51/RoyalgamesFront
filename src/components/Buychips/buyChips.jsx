import { useState } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
} from "@chakra-ui/react";

export default function BuyChips() {
  const [country, setCountry] = useState("resto del mundo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);

  const chipOptions = [
    { id: 1, price: "$1", amount: "100 fichas" },
    { id: 2, price: "$2", amount: "200 fichas" },
    { id: 3, price: "$3", amount: "300 fichas" },
    { id: 4, price: "$4", amount: "400 fichas" },
    { id: 5, price: "$5", amount: "500 fichas" },
    { id: 6, price: "$6", amount: "600 fichas" },
    { id: 7, price: "$7", amount: "700 fichas" },
    { id: 8, price: "$8", amount: "800 fichas" },
  ];

  const handleCountryChange = (e) => setCountry(e.target.value);

  const openPaymentModal = (chip) => {
    setSelectedChip(chip);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChip(null);
  };

  return (
    <Box p={5} bgColor={"#64d600"} m={3} borderRadius={"20px"} w={"70%"}>
      <Text fontSize="2xl" mb={4}>Compra de Fichas</Text>

      <Select mb={4} placeholder="Selecciona tu país" onChange={handleCountryChange} bgColor={"white"}>
        <option value="argentina">Argentina</option>
        <option value="brasil">Brasil</option>
        <option value="eeuu">EEUU</option>
        <option value="espana">España</option>
        <option value="mexico">México</option>
        <option value="resto del mundo">Resto del Mundo</option>
      </Select>

      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {chipOptions.map((chip) => (
          <Box
            key={chip.id}
            textAlign="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={() => openPaymentModal(chip)}
            cursor="pointer"
            p={4}
          >
            <Image src="" alt={`Chip ${chip.amount}`} boxSize="100px" mb={3} /> {/* Reemplaza con la imagen de cada opción */}
            <Text fontWeight="bold">{chip.amount}</Text>
            <Text>{chip.price} {country}</Text> {/* Aquí puedes modificar para precios por país */}
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecciona un método de pago</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3}>{selectedChip?.amount}</Text>
            <VStack align="stretch">
              <Button variant="outline">Tarjeta Bancaria</Button>
              <Button variant="outline">Criptomoneda</Button>
              <Button variant="outline">PayPal</Button>
              <Button variant="outline">Paysafecard</Button>
              <Button variant="outline">Mercado Pago</Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
