import { Box, Button, Input, Stack, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

export default function Panel() {
  const [userId, setUserId] = useState("");
  const [chipsAmount, setChipsAmount] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    // agrega otros campos necesarios para actualizar
  });

  const handleAddChips = () => {
    // Lógica para agregar fichas al usuario
  };

  const handleRemoveChips = () => {
    // Lógica para quitar fichas al usuario
  };

  const handleBanUser = () => {
    // Lógica para banear al usuario
  };

  const handleDeactivateUser = () => {
    // Lógica para inactivar al usuario
  };

  const handleDeleteUser = () => {
    // Lógica para eliminar al usuario
  };

  const handleUpdateUser = () => {
    // Lógica para actualizar los datos del usuario
  };

  return (
    <Box p={5} maxW="500px" mx="auto" borderWidth="1px" borderRadius="lg" bgColor={"#FFFFFF "}>
      <Text fontSize="2xl" mb={4} textAlign="center">Panel de Administración</Text>
      
      <FormControl mb={4}>
        <FormLabel>ID de Usuario</FormLabel>
        <Input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Ingresa el ID del usuario"
          
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Fichas</FormLabel>
        <Input
          value={chipsAmount}
          onChange={(e) => setChipsAmount(e.target.value)}
          placeholder="Cantidad de fichas"
          type="number"
        />
        <Stack direction="row" spacing={4} mt={2}>
          <Button colorScheme="green" onClick={handleAddChips}>Agregar Fichas</Button>
          <Button colorScheme="red" onClick={handleRemoveChips}>Quitar Fichas</Button>
        </Stack>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Actualizar Datos de Usuario</FormLabel>
        <Input
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          placeholder="Nuevo nombre de usuario"
          mb={2}
        />
        <Input
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Nuevo email"
          mb={2}
        />
        <Button colorScheme="blue" onClick={handleUpdateUser}>Actualizar Usuario</Button>
      </FormControl>

      <Stack direction="row" spacing={4} mt={4}>
        <Button colorScheme="orange" onClick={handleBanUser}>Banear Usuario</Button>
        <Button colorScheme="yellow" onClick={handleDeactivateUser}>Inactivar Usuario</Button>
        <Button colorScheme="red" onClick={handleDeleteUser}>Eliminar Usuario</Button>
      </Stack>
    </Box>
  );
}
