import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Avatar,
  Button,
  Input,
  Grid,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../redux/actions/index";
import { fetchFavoriteGames, addFavoriteGame, removeFavoriteGame } from "../../redux/actions/index";

const Perfil = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  // Estado del usuario y juegos favoritos desde Redux
  const currentUser  = useSelector((state) => state.currentUser);
  const favoriteGames= useSelector((state) => state.favoriteGames);

  // Local state para edición de perfil
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    nickname: "",
  });

  // Efecto para cargar los datos del usuario y sus favoritos
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        nickname: currentUser.nickname || "",
      });
    } else {
      dispatch(fetchUserProfile());
    }

    if (currentUser?.id) {
      dispatch(fetchFavoriteGames(currentUser.id));
    }
  }, [currentUser, dispatch]);

  // Manejadores de eventos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    dispatch(updateUserProfile(currentUser.id, profileData))
      .then(() => {
        toast({
          title: "Perfil actualizado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEditMode(false);
      })
      .catch((error) => {
        toast({
          title: "Error al actualizar el perfil",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleToggleFavorite = (gameId, isFavorite) => {
    if (isFavorite) {
      dispatch(removeFavoriteGame(currentUser.id, gameId))
        .then(() => {
          toast({
            title: "Juego eliminado de favoritos",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "Error al eliminar de favoritos",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      dispatch(addFavoriteGame(currentUser.id, gameId))
        .then(() => {
          toast({
            title: "Juego agregado a favoritos",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "Error al agregar a favoritos",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  if (!currentUser) return <Text>Cargando perfil...</Text>;

  return (
    <Box p="4" maxW="800px" m="0 auto">
      {/* Avatar y datos principales */}
      <Box textAlign="center" mb="6">
        <Avatar size="xl" name={currentUser.name} mb="4" />
        {editMode ? (
          <Input
            name="nickname"
            value={profileData.nickname}
            onChange={handleInputChange}
            placeholder="Apodo"
            textAlign="center"
            mb="4"
          />
        ) : (
          <Text fontSize="2xl" fontWeight="bold">
            {currentUser.nickname}
          </Text>
        )}
      </Box>

      {/* Información editable del perfil */}
      <Box mb="6">
        <Text fontWeight="bold" mb="2">
          Nombre
        </Text>
        {editMode ? (
          <Input
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
        ) : (
          <Text>{currentUser.name}</Text>
        )}
        <Text fontWeight="bold" mt="4" mb="2">
          Email
        </Text>
        {editMode ? (
          <Input
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        ) : (
          <Text>{currentUser.email}</Text>
        )}
      </Box>

      {/* Botones de acción */}
      <Box textAlign="center" mb="6">
        {editMode ? (
          <>
            <Button colorScheme="teal" mr="4" onClick={handleSaveProfile}>
              Guardar
            </Button>
            <Button onClick={() => setEditMode(false)}>Cancelar</Button>
          </>
        ) : (
          <Button colorScheme="blue" onClick={() => setEditMode(true)}>
            Editar perfil
          </Button>
        )}
      </Box>

      {/* Juegos favoritos */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Juegos favoritos
        </Text>
        <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap="4">
          {favoriteGames.map((game) => {
            const isFavorite = favoriteGames.some((fav) => fav.id === game.id);
            return (
              <Box
                key={game.id}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                textAlign="center"
                position="relative"
              >
                <Text fontSize="sm" mt="2">
                  {game.name}
                </Text>
                <IconButton
                  aria-label="Toggle Favorite"
                  icon={isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                  position="absolute"
                  top="2"
                  right="2"
                  bg="white"
                  borderRadius="50%"
                  onClick={() => handleToggleFavorite(game.id, isFavorite)}
                  _hover={{ bg: "gray.200" }}
                />
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Perfil;
