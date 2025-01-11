import { Box, Image, Grid, Text, IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { addFavoriteGame, createGame, fetchFavoriteGames, removeFavoriteGame } from "../../redux/actions/index";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import juego1 from "../../assets/IMG_4119.png";
import juego2 from "../../assets/ruleta.png";
import juego3 from "../../assets/bingoproxi.png";
import juego4 from "../../assets/minas.png";

// Lista de juegos disponibles
const GAMES = [
  { id: "410a5d65-9ddc-410e-8a46-7c24f7029fd7", src: juego1, path: "/loteria-instantanea", alt: "Lotería" },
  { id: "628c2c5b-7b87-4bc5-893b-c81cbdd0f849", src: juego2, path: "/ruleta", alt: "Ruleta" },
  { id: "6cbe1c81-a7de-410c-8753-66ac8791c208", src: juego3, path: "/bingo", alt: "Bingo" },
  { id: "3d18f6fa-cf8e-4c36-af46-abed4395799a", src: juego4, path: "/play/diamantes", alt: "Diamantes" },
];

export default function GameGrid({ onlyFavorites = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.currentUser.id); 
 
  // Obtén el ID del usuario actual desde el estado global
  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteGames(userId));
      
    }

   
  }, [dispatch, userId]);
  


  

  
  const favor = useSelector((state) => state.favoriteGames)?.flat() || [];

  console.log('favor', favor)
  // Filtramos los juegos según la prop `onlyFavorites`
  const filteredGames = useMemo(() => {
    if (onlyFavorites) {
      return GAMES.filter((game) => favor.includes(game.id)); // Filtramos solo los juegos favoritos
    }
    return GAMES;
  }, [favor, onlyFavorites]);

  const handleFavoriteClick = (gameId) => {
    const isFavorite = favor.includes(gameId);
    if (isFavorite) {
      dispatch(removeFavoriteGame(userId, gameId));
    } else {
      
      dispatch(addFavoriteGame(userId, gameId));

    }
    dispatch(fetchFavoriteGames(userId));
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
        {onlyFavorites ? "Tus Juegos Favoritos" : "Todos los Juegos"}
      </Text>

      {filteredGames.length > 0 ? (
        <Grid templateColumns="repeat(auto-fit, minmax(230px, 1fr))" gap="30px">
          {filteredGames.map((game) => {
            const isFavorite = favor.includes(game.id); // Verificamos si el juego es favorito
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
                    e.stopPropagation();
                    handleFavoriteClick(game.id);
                  }}
                  bg="white"
                  _hover={{ bg: "gray.100" }}
                />
              </Box>
            );
          })}
        </Grid>
      ) : (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          No tienes juegos favoritos aún.
        </Text>
      )}
    </Box>
  );
}
