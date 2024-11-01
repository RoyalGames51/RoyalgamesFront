import { useState } from "react";
import { Box, Button, Input, Stack, Text, Flex, useDisclosure } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa"; // Icono de Google

export default function Login() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el cuadro desplegable
  const { isOpen: isDropdownOpen, onToggle } = useDisclosure(); // Para manejar el estado del dropdown

  const toggleLoginBox = () => {
    setIsLoginOpen(!isLoginOpen);
    // setIsRegisterOpen(false); // Cerrar el cuadro de registro si está abierto
  };
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Estado para cuadro de inicio de sesión

  return (
    <Box mr={"15px"} ml={"auto"}>
    <Button
      borderRadius={"20px"}
      color={"black"}
      bgColor={"#94f341"}
      fontSize={"20px"}
      onClick={toggleLoginBox} // Abrimos el cuadro de login al hacer clic
    >
      Iniciar Sesión
    </Button>
    {isLoginOpen && (
        <Box
          position="absolute"
          top="100px" // Colocamos el cuadro debajo de la navbar
          right="10%"
          bg="white"
          p="20px"
          boxShadow="lg"
          borderRadius="10px"
          width="300px"
        >
          <Stack spacing={4}>
            <Input placeholder="Usuario" type="text" />
            <Input placeholder="Contraseña" type="password" />
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              variant="outline"
              width="100%"
            >
              Iniciar sesión con Google
            </Button>
            <Button colorScheme="teal" variant="solid" width="100%">
              Iniciar sesión
            </Button>
          </Stack>
        </Box>
      )}
  </Box>
  
  );
}
