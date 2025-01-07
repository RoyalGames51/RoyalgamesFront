import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Button,
  VStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { updateUserProfile } from "../../redux/actions/index";
import GameGrid from "./UserFavoriteGame";

const Perfil = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  const favoriteGames = useSelector((state) => state.favoriteGames);

  const [formData, setFormData] = useState({
    nick: "",
    age: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nick: user.nick || "",
        age: user.age || "",
        email: user.email || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    dispatch(updateUserProfile
      (user.id, formData));
  };

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
            <GameGrid favoriteGames={favoriteGames} />
          </TabPanel>

          {/* Configuración/Edición del perfil */}
          <TabPanel>
            <VStack spacing="4" align="start">
              <Input
                placeholder="Nick"
                name="nick"
                value={formData.nick}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Edad"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Imagen de perfil (URL)"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
              <Button colorScheme="blue" onClick={handleUpdate}>Actualizar Perfil</Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Perfil;
