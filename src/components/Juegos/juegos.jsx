import { Box, Image, Grid, Text, IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteGame, removeFavoriteGame } from "../../redux/actions/index"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import juego1 from '../../assets/IMG_4119.png';
import juego2 from '../../assets/ruleta.png';
import juego3 from '../../assets/bingoproxi.png';
import juego4 from '../../assets/minas.png';

export default function GameGrid() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtenemos los favoritos desde el estado global
  const favoriteGames = useSelector((state) => state.favorites?.favoriteGames || []); // Aseguramos que sea un array

  // Función para manejar clics en favoritos
  const handleFavoriteClick = (game) => {
    const isFavorite = favoriteGames.some((favGame) => favGame.id === game.id);
    if (isFavorite) {
      dispatch(removeFavoriteGame(game.id));
    } else {
      dispatch(addFavoriteGame(game));
    }
  };

  // Función para manejar clics en los juegos
  const handleGameClick = (gamePath) => {
    navigate(gamePath);
  };

  return (
    <Box w="90%" m="0 auto" p="20px">
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        mb="20px"
        bgColor={"gray.200"}
        borderTopRadius="15px"
      >
        Juegos
      </Text>

      <Grid templateColumns="repeat(auto-fit, minmax(230px, 1fr))" gap="30px">
        {[
          { id: 1, src: juego1, path: "/loteria-instantanea", alt: "Lotería" },
          { id: 2, src: juego2, path: "/ruleta", alt: "Ruleta" },
          { id: 3, src: juego3, path: "/bingo", alt: "Bingo" },
          { id: 4, src: juego4, path: "/minas", alt: "Minas" },
        ].map((game) => {
          const isFavorite = favoriteGames.some((favGame) => favGame.id === game.id); // Validación de favoritos

          return (
            <Box
              key={game.id}
              position="relative"
              overflow="hidden"
              borderRadius="15px"
              boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)"
              cursor="pointer"
              transition="transform 0.3s, box-shadow 0.3s"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Image
                src={game.src}
                alt={game.alt}
                objectFit="contain"
                w="100%"
                h="225px"
                onClick={() => handleGameClick(game.path)}
              />
              <Box
                position="absolute"
                bottom="0"
                w="100%"
                bg="rgba(0, 0, 0, 0.5)"
                color="white"
                textAlign="center"
                py="10px"
              >
                {game.alt}
              </Box>
              <IconButton
                aria-label="Toggle favorite"
                icon={isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                size="sm"
                position="absolute"
                top="10px"
                right="10px"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el click en el ícono active la navegación
                  handleFavoriteClick(game);
                }}
                bg="white"
                _hover={{ bg: "gray.100" }}
              />
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}
