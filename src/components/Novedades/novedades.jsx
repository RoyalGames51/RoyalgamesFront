import { Box, Image, Text } from "@chakra-ui/react";
import banner1 from '../../assets/IMG_3872.jpg'

export default function () {
    return(
        <Box
        w={"100%"}
        h={"390px"}
        
        // bgColor={"rgba(154, 255, 59, 0.3)"} /* Fondo con 80% de transparencia */
        m={"0 auto"} /* Centrar el contenedor horizontalmente */
        borderRadius={"10px"}
        display={"flex"} 
        justifyContent={"center"} /* Centrar contenido horizontalmente */
        alignItems={"center"} /* Centrar contenido verticalmente */
      >
            <Box 
              w={"80%"}
              display={"flex"} /* Flex para centrar la imagen */
              justifyContent={"center"} /* Asegura que la imagen esté centrada */
            >
              <Image
              borderRadius={"10px"}
              maxW={"90%"} /* Se asegura que la imagen no exceda el ancho del contenedor */
              src={banner1}
              />
            </Box>
        </Box>
    )
}
