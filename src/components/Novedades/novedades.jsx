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
      w="100%"  // Asegura que el contenedor ocupe el 100% del ancho disponible
      h="auto" // La altura será automática según la relación de aspecto de la imagen
      m="0 auto" // Centrar el contenedor
      borderRadius="10px"
      overflow="hidden"
      mt={2}
      pl={"85px"}
      pr={"85px"}
    >
      <Slider {...settings}>
        {banners.map((banner) => (
          <Box
            key={banner.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="100%" // Asegura que el contenedor ocupe el 100% del ancho
            h="auto" // La altura del contenedor se ajusta al tamaño de la imagen
          >
            <Image
              borderRadius="10px"
              w="100%" // Hace que la imagen ocupe el 100% del ancho del contenedor
              h="auto" // Mantiene la proporción de la imagen sin estirarla
              objectFit="cover" // Ajusta la imagen para cubrir el contenedor sin deformarse
              src={banner.src}
              alt={banner.alt}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
