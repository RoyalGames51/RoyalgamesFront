import React from "react";
import { useSelector } from "react-redux";
import { Box, Spinner, Center } from "@chakra-ui/react";

const RoyalJoker = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const jugadorID = currentUser?.id || "default-id";

  const gameURL = `https://html-classic.itch.zone/html/14848609/rj6/index.html?jugadorID=${jugadorID}`;

  return (
    <Box
      w="100vw"
      // altura total menos la navbar
      h="calc(100vh - 60px)"
      bg="gray.900"
      display="flex"
      flexDirection="column"
      // 👉 empuja el contenido 1 cm hacia abajo
      pt="1cm"
      // evita que aparezca una scrollbar de la página
      overflow="hidden"
    >
      {jugadorID ? (
        <Box
          // ocupa todo el espacio restante (ya con el padding top)
          flex="1"
          position="relative"
          w="100%"
          // resta el padding-top para que no desborde
          h="calc(100% - 1cm)"
          bg="gray.800"
          overflow="hidden"
        >
          <iframe
            src={gameURL}
            title="Juego Slots"
            // 👉 100% del contenedor para no generar scroll interno
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            // ayuda a que el iframe no muestre su propia scrollbar
            scrolling="no"
            allow="fullscreen"
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
