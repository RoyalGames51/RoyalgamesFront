import { Box, Image, Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function GameGrid() {
  const navigate = useNavigate();

  const handleGameClick = (gamePath) => {
    navigate(gamePath); // Redirige a la ruta del juego
  };

  return (
    <Box
      w="75%" /* La caja principal ocupa el 75% del ancho de la pantalla */
      m="0 auto" /* Centra la caja horizontalmente */
      p="20px"
    >
      <Grid 
        templateColumns="repeat(3, 1fr)" /* Crea 3 columnas iguales por fila */
        gap="10%" /* Separación del 10% entre las cajas */
      >
        {/* Caja contenedora 1 */}
        <Box 
          bg="gray.200" 
          p="20px" 
          borderRadius="10px"
          onClick={() => handleGameClick("/game1")} /* Ejemplo de ruta para el juego 1 */
          cursor="pointer"
          h={"200px"}
        >
          <Image src="/images/game1.jpg" alt="Juego 1" w="100%" />
        </Box>

        {/* Caja contenedora 2 */}
        <Box 
        h={"200px"}
          bg="gray.200" 
          p="20px" 
          borderRadius="10px"
          onClick={() => handleGameClick("/game2")} /* Ejemplo de ruta para el juego 2 */
          cursor="pointer"
        >
          <Image src="/images/game2.jpg" alt="Juego 2" w="100%" />
        </Box>

        {/* Caja contenedora 3 */}
        <Box 
        h={"200px"}
          bg="gray.200" 
          p="20px" 
          borderRadius="10px"
          onClick={() => handleGameClick("/game3")} /* Ejemplo de ruta para el juego 3 */
          cursor="pointer"
        >
          <Image src="/images/game3.jpg" alt="Juego 3" w="100%" />
        </Box>

        {/* Caja contenedora 4 */}
        <Box 
       h={"200px"} 
          bg="gray.200" 
          p="20px" 
          borderRadius="10px"
          onClick={() => handleGameClick("/game4")} /* Ejemplo de ruta para el juego 4 */
          cursor="pointer"
        >
          <Image src="/images/game4.jpg" alt="Juego 4" w="100%" />
        </Box>

        {/* Caja contenedora 5 */}
        <Box 
        h={"200px"}
          bg="gray.200" 
          p="20px" 
          borderRadius="10px"
          onClick={() => handleGameClick("/game5")} /* Ejemplo de ruta para el juego 5 */
          cursor="pointer"
        >
          <Image src="/images/game5.jpg" alt="Juego 5" w="100%" />
        </Box>

        {/* Caja contenedora 6 */}
        <Box 
        h={"200px"}
          bg="gray.200" 
          p="20px" 
          borderRadius="10px"
          onClick={() => handleGameClick("/game6")} /* Ejemplo de ruta para el juego 6 */
          cursor="pointer"
        >
          <Image src="/images/game6.jpg" alt="Juego 6" w="100%" />
        </Box>
      </Grid>
    </Box>
  );
}
