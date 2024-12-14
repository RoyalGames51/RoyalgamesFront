import React from "react";
import { useSelector } from "react-redux";
import { Box, Spinner, Center } from "@chakra-ui/react";

const Diamantes = () => {
  // Obtener el jugadorID del estado global
  const currentUser = useSelector((state) => state.currentUser);
  const jugadorID = currentUser?.id || "default-id"; // Valor por defecto si no hay usuario
  
  // URL del juego con el jugadorID
  const gameURL = `https://html-classic.itch.zone/html/12259214/juego3/index.html?jugadorID=${jugadorID}`;

  return (
    <Box
      w="100%"
      h="100vh"
      bg="gray.900"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {jugadorID ? (
        <iframe
          src={gameURL}
          title="Juego 2"
          width="100%"
          height="100%"
          style={{
            border: "none",
          }}
        />
      ) : (
        <Center>
          <Spinner size="xl" color="teal.300" />
        </Center>
      )}
    </Box>
  );
};

export default Diamantes;
