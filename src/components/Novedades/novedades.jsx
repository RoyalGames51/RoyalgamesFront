import { Box, Image } from "@chakra-ui/react";
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/b1.jpg';
import banner3 from '../../assets/banner3.jpg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Novedades() {
  const banners = [
    { id: 1, src: banner1, alt: "Banner 1" },
    { id: 2, src: banner2, alt: "Banner 2" },
    { id: 3, src: banner3, alt: "Banner 3" },
    // Agrega más imágenes según necesites
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box
      w="80%"  // Ancho total del contenedor
      h="360px" // Altura para mostrar las imágenes
      m="0 auto" // Centrar horizontalmente el contenedor
      borderRadius="10px"
      overflow="hidden"
      mt={2}
    >
      <Slider {...settings}>
        {banners.map((banner) => (
          <Box
            key={banner.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="100%"
            w="100%"
            bg="gray.100" // Fondo de color para verificar los bordes de la imagen
          >
            <Image
              borderRadius="10px"
              maxH="100%" // Ajuste máximo de altura
              objectFit="cover" // Asegura que la imagen ocupe todo el contenedor sin deformarse
              src={banner.src}
              alt={banner.alt}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
