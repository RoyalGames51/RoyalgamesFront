import React from "react";
import { useSelector } from "react-redux";
import { Box, Spinner, Center } from "@chakra-ui/react";

const RoyalJoker = () => {
  // Obtener el jugadorID del estado global
  const currentUser = useSelector((state) => state.currentUser);
  const jugadorID = currentUser?.id || "default-id"; // Valor por defecto si no hay usuario

  // URL del juego con el jugadorID
  const gameURL = `https://html-classic.itch.zone/html/14848609/rj6/index.html?jugadorID=${jugadorID}`;

  return (
    <Box
      w="100vw"
      h="calc(100vh - 60px)" // resta la altura de la Navbar
      bg="gray.900"
      display="flex"
      flexDirection="column"
    >
      {/* Contenedor del juego */}
      {jugadorID ? (
        <Box
          flex="1"
          position="relative"
          w="100%"
          bg="gray.800"
          overflow="hidden"
        >
          <iframe
            src={gameURL}
            title="Juego Slots"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "80%",
              height: "80%",
              border: "none",
            }}
          />
        </Box>
      ) : (
        <Center h="100%">
          <Spinner size="xl" color="teal.300" />
        </Center>
      )}
    </Box>
  );
};

export default RoyalJoker;
