import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

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
  Flex,
} from "@chakra-ui/react";
import quinientosmil from '../../assets/500000.jpg';
import millon from '../../assets/millon.jpg';
import cincomillones from '../../assets/5millones.jpg';
import quincemillones from '../../assets/15millones.jpg';
import cincuentamillones from '../../assets/50millones.jpg';
import doscincuenta from '../../assets/250millones.jpg';
import billon from '../../assets/1billon.jpg';
import veinticeisb from '../../assets/26billones.jpg';

export default function BuyChips() {
    //paypal
  const [country, setCountry] = useState("resto del mundo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState(null);

  // Configuración de precios y monedas por país
  const countryConfig = {
    argentina: { currency: "ARS", exchangeRate: 1000 },
    brasil: { currency: "BRL", exchangeRate: 5 },
    eeuu: { currency: "USD", exchangeRate: 1 },
    espana: { currency: "EUR", exchangeRate: 0.9 },
    mexico: { currency: "MXN", exchangeRate: 20 },
    "resto del mundo": { currency: "USD", exchangeRate: 1 },
  };

  const chipOptions = [
    { id: 1, basePrice: 1, amount: "500000", image: quinientosmil },
    { id: 2, basePrice: 2, amount: "1000000", image: millon },
    { id: 3, basePrice: 6, amount: "5000000", image: cincomillones },
    { id: 4, basePrice: 15, amount: "15000000", image: quincemillones },
    { id: 5, basePrice: 50, amount: "50000000", image: cincuentamillones },
    { id: 6, basePrice: 200, amount: "250000000", image: doscincuenta },
    { id: 7, basePrice: 500, amount: "1000000000", image: billon },
    { id: 8, basePrice: 1000, amount: "2600000000", image: veinticeisb },
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

  // Obtén la configuración del país actual
  const { currency, exchangeRate } = countryConfig[country];


  //MercadoPagoArgentina
  const { currentUser } = useSelector((state) => state);
  const createOrder = async () => {
    if (!selectedChip) return alert("Selecciona un paquete de fichas.");
    
    const price = (selectedChip.basePrice * exchangeRate).toFixed(2);
    const date = new Date().toISOString(); // Fecha actual para metadata
  
    const product = {
      price: parseFloat(price), // Enviar como número
      userId: currentUser?.id || "guest", // Asegúrate de que haya un ID de usuario
      chips: selectedChip.amount,
      paymentPlataform: "MercadoPago",
      date,
    };
  
    // Determinar la ruta de la orden según la moneda
    let apiUrl = "https://royalback-f340.onrender.com/mepago/create-order"; // Ruta por defecto
    if (currency === "ARS") {
      apiUrl = "https://royalback-f340.onrender.com/mepago/create-order";
    } else if (currency === "MXN") {
      apiUrl = "https://royalback-f340.onrender.com/mepago/create-order/mx";
    }
  
    try {
      const response = await axios.post(apiUrl, product);
  
      // Redirige al link de MercadoPago
      window.location.href = response.data;
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };
  

  return (
    <Flex ml={"10%"}>
      <Box p={5} bgColor={"white"} m={3} borderRadius={"20px"} w={"65%"}  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)" >
        <Text fontSize="2xl" mb={4} textAlign={"center"} fontWeight="bold">Royal Chips</Text>

        <Select
          textAlign={"center"}
          mb={4}
          placeholder="Selecciona tu país"
          onChange={handleCountryChange}
          bgColor={"white"}
          w={"200px"}
          alignItems={"center"}
          border={"1px"}
          borderColor={"black"}
        >
          {Object.keys(countryConfig).map((countryKey) => (
            <option key={countryKey} value={countryKey}>
              {countryKey.charAt(0).toUpperCase() + countryKey.slice(1)}
            </option>
          ))}
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
              bgColor={"#9eff00"}
              boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)" 
            >
              <Image borderRadius={"10px"} src={chip.image} alt={`Chip ${chip.amount}`} mb={3} />
              <Text bgColor={"#000000"} borderRadius={"20px"} color={"white"}>
                {currency} {(chip.basePrice * exchangeRate).toFixed(2)}
              </Text>
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
                <Button variant="outline" onClick={createOrder}>Mercado Pago</Button>

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
      <Box boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)"  w={"20%"} m={3} borderRadius={"20px"} bgColor={"white"} h={"50%"}>
        <Text fontWeight={"bold"} textAlign={"center"} p={3}>
          Qué son las RoyalChips?
        </Text>
        <Text p={6} fontSize={"13px"}>
          Las Royal Chips son la moneda oficial de la página. Con ellas podrás apostar en los juegos y comprar avatares personalizados.
          Cabe destacar que las Royal Chips son monedas ficticias, no intercambiables por dinero real; son solo para divertirse.
        </Text>
      </Box>
    </Flex>
  );
}
