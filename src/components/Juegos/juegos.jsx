import { Box, Image, Grid, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import juego1 from '../../assets/IMG_4119.png';
import juego2 from '../../assets/ruleta.png';
import juego3 from '../../assets/bingoproxi.png';
import juego4 from '../../assets/minas.png';

export default function GameGrid() {
  const navigate = useNavigate();

  const handleGameClick = (gamePath) => {
    navigate(gamePath); // Redirige a la ruta del juego
  };

  return (
    <Box
      w="90%" // Caja principal ocupa el 90% del ancho de la pantalla
      m="0 auto" // Centra horizontalmente
      p="20px"
      
    >
      {/* Título centrado */}
      <Text
        fontSize="2xl" // Tamaño del texto
        fontWeight="bold"
        textAlign="center" // Centrar el texto
        mb="20px" // Espaciado inferior
        bgColor={"gray.200"}
        borderTopRadius="15px"
      >
       Juegos
      </Text>

      <Grid 
        templateColumns="repeat(auto-fit, minmax(230px, 1fr))" // Ajusta dinámicamente según el tamaño de la pantalla
        gap="30px" // Espaciado entre las cajas
      >
        {[ // Lista de juegos
          { src: juego1, path: "/loteria-instantanea", alt: "Lotería" },
          { src: juego2, path: "/ruleta", alt: "Ruleta" },
          { src: juego3, path: "/bingo", alt: "Bingo" },
          { src: juego4, path: "/minas", alt: "Minas" },
        ].map((game, index) => (
          <Box
            key={index}
            position="relative"
            overflow="hidden"
            borderRadius="15px"
            boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)"
            cursor="pointer"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{
              transform: "scale(1.05)", // Efecto de zoom
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            }}
            onClick={() => handleGameClick(game.path)}
          >
            <Image
              src={game.src}
              alt={game.alt}
              objectFit="contain" // Ajusta la imagen para que ocupe todo el espacio sin distorsión
              w="100%"
              h="225px" // Tamaño reducido
            />
            <Box
              position="absolute"
              bottom="0"
              w="100%"
              bg="rgba(0, 0, 0, 0.5)" // Fondo semi-transparente
              color="white"
              textAlign="center"
              py="10px"
            >
              {game.alt} {/* Muestra el nombre del juego */}
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
