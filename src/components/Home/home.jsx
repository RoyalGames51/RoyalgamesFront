import { Box, Container, Flex } from "@chakra-ui/react";
import Novedades from "../Novedades/novedades";
import Juegos from "../Juegos/juegos";
import UserList from "../jugadoresOnline/jugadoresOnline"; // Importa el componente de la lista de usuarios

export default function () {
  return (
    <Box>
    <Box  pb={"1%"}  ml={"10%"} mr={"10%"}  pt={"0%"} borderRadius={"20px"}>
        <Novedades />
    </Box>
    <Box  pb={"1%"} bgColor={"white"} ml={"10%"} mr={"10%"} p={"2%"} pt={"2%"} borderRadius={"20px"}>
       {/* Renderiza la sección de novedades arriba */}
      <Flex mt="4">
        {/* Lista de usuarios en el lado izquierdo */}
        <Box w="300px" h="1000px" mr={"2%"}>
          <UserList />
        </Box>
        {/* Juegos ocupa el resto del espacio */}
        <Box flex="1">
          <Juegos />
        </Box>
      </Flex>
    </Box>
    </Box>
  );
}
