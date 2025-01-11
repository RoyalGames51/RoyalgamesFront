import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import GameGrid from "./../Juegos/juegos";
import UpdateProfileForm from "./UpdateProfileForm";

const Perfil = () => {
  const user = useSelector((state) => state.currentUser);
  const favoriteGames = useSelector((state) => state.favoriteGames);

  return (
    <Box w="90%" m="0 auto" p="20px">
      <Heading mb="6">Perfil</Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Información</Tab>
          <Tab>Juegos Favoritos</Tab>
          <Tab>Configuración</Tab>
        </TabList>

        <TabPanels>
          {/* Información del usuario */}
          <TabPanel>
            <VStack spacing="4" align="start">
              <Text><strong>Nick:</strong> {user.nick}</Text>
              <Text><strong>Email:</strong> {user.email}</Text>
              <Text><strong>Edad:</strong> {user.age}</Text>
            </VStack>
          </TabPanel>

          {/* Juegos Favoritos */}
          <TabPanel>
            <Heading size="md" mb="4">Tus Juegos Favoritos</Heading>
            <GameGrid onlyFavorites={true} />
          </TabPanel>

          {/* Configuración/Edición del perfil */}
          <TabPanel>
            <UpdateProfileForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Perfil;
