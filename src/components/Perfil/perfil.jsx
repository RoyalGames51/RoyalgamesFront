import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
} from "@chakra-ui/react";
import GameGrid from "./../Juegos/juegos";
import UpdateProfileForm from "./UpdateProfileForm";
import { useParams } from "react-router-dom";
import {
  fetchFavoriteGames,
  fetchPublicFavorites,
  viewedUserProfile,
} from "./../../redux/actions/index";

const Perfil = ({ isPublic = false }) => {
  const dispatch = useDispatch();
  const { userNick } = useParams();

  const currentUser = useSelector((state) => state.currentUser);
  const viewedUser = useSelector((state) => state.viewedUserProfile);

  useEffect(() => {
    if (isPublic) {
      dispatch(viewedUserProfile(userNick));
    }
  }, [dispatch, userNick, isPublic]);

  useEffect(() => {
    if (isPublic && viewedUser?.id) {
      dispatch(fetchPublicFavorites(viewedUser.id));
    }
  }, [dispatch, isPublic, viewedUser?.id]);

  useEffect(() => {
    if (!isPublic && currentUser?.id) {
      dispatch(fetchFavoriteGames(currentUser.id));
    }
  }, [dispatch, isPublic, currentUser?.id]);

  const user = isPublic ? viewedUser : currentUser;

  if (!user) {
    return (
      <Box w="90%" m="0 auto" p="20px" textAlign="center">
        <Text fontSize="2xl" color="red.500">
          Perfil no encontrado.
        </Text>
      </Box>
    );
  }

  const formattedNick =
    user.nick.charAt(0).toUpperCase() + user.nick.slice(1).toLowerCase();

  const defaultDescription = user.sexo === "H" ? "Soy un chico" : "Soy una chica";
  const additionalDescription = [
    user.country && `de ${user.country}`,
    user.age && `, tengo ${user.age} años`,
    user.description && `y quiero decir que: "${user.description}"`,
  ]
    .filter(Boolean)
    .join(", ");

  const finalDescription = `${defaultDescription}${
    additionalDescription ? ` ${additionalDescription}` : ""
  }.`;  

  return (
    <Box
      w="90%"
      m="0 auto"
      mt="10px"
      p="20px"
      bg="white"
      borderRadius="15px"
      boxShadow="lg"
      pb={"20%"}
    >
      <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
        <TabList mb="4" position="relative">
          <Tab fontSize="lg" fontWeight="bold">Información</Tab>
          <Tab fontSize="lg" fontWeight="bold">Juegos Favoritos</Tab>
          {!isPublic && <Tab fontSize="lg" fontWeight="bold">Configuración</Tab>}

          {/* Status del usuario */}
          <Flex
            position="absolute"
            top="50px"
            right="10px"
            alignItems="center"
            gap="2"
          >
            <Box
              w="10px"
              h="10px"
              borderRadius="50%"
              bg="green.400"
            />
            <Text fontSize="sm" color="green.600">
              {currentUser?.status || "Conectado"}
            </Text>
          </Flex>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex
              direction={{ base: "column", md: "row" }}
              align="start"
              justify="flex-start"
              gap="6"
            >
              {/* Nick e Imagen */}
              <VStack
                align="center"
                spacing="4"
                w={{ base: "100%", md: "40%" }}
                bg="gray.100"
                p="4"
                borderRadius="10px"
                boxShadow="sm"
              >
                <Text fontSize="3xl" fontWeight="bold" color="gray.700">
                  {formattedNick}
                </Text>
                <Image
                  borderRadius="full"
                  boxSize="220px"
                  src={user.image || "https://via.placeholder.com/150"}
                  alt={`${formattedNick} avatar`}
                  boxShadow="md"
                />
              </VStack>

              {/* Descripción */}
              <Box
                bg="gray.100"
                borderRadius="10px"
                p="4"
                textAlign="left"
                boxShadow="sm"
                maxW="60%" // Limita el ancho máximo del contenedor según su contenido
                w="fit-content" // Ajusta el ancho al contenido automáticamente
              >
                <Text fontSize="xl" color="gray.600">
                  {finalDescription}
                </Text>
              </Box>
            </Flex>
          </TabPanel>

          <TabPanel>
            <Heading size="lg" mb="4" textAlign="center">
              Juegos Favoritos
            </Heading>
            <GameGrid onlyFavorites={true} isPublicProfile={isPublic} />
          </TabPanel>

          {!isPublic && (
            <TabPanel>
              <Heading size="lg" mb="4" textAlign="center">
                Configuración del Perfil
              </Heading>
              <UpdateProfileForm />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Perfil;
