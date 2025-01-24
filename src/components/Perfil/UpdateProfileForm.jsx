import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Heading,
  Select,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/actions";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

  const [formData, setFormData] = useState({
    nick: "",
    email: "",
    image: "",
    receiveMessages: "Cualquiera",
    showStatus: "Cualquiera",
    showPhotos: "Sí",
    showFriendsList: "Cualquiera",
    chatEnabled: "activado",
    age: "",
    description: "",
  });
  const [originalBirthDate, setOriginalBirthDate] = useState("");
  useEffect(() => {
    if (user) {
      setFormData({
        nick: user.nick || "",
        email: user.email || "",
        image: user.image || "",
        receiveMessages: user.receiveMessages || "Cualquiera",
        showStatus: user.showStatus || "Cualquiera",
        showPhotos: user.showPhotos || "Sí",
        showFriendsList: user.showFriendsList || "Cualquiera",
        chatEnabled: user.chatEnabled || "activado",
        age: user.birthDate ,
        description: user.description ||"",
      });
      setOriginalBirthDate(user.age || "");
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleUpdate = () => {
    if (!user || !user.id) {
      console.error("El ID del usuario es inválido.");
      return;
    }

    const age = calculateAge(formData.birthDate);
    const updatedData = { ...formData, age }; // Incluye la edad calculada en el envío

    dispatch(updateUserProfile(user.id, updatedData))
      .then(() => {
        // Recargar la página después de la actualización
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  };
  

  return (
    <Box bgColor="white" p="4" borderRadius="20px" borderColor={"gray"} boxShadow="lg" border="1px">
      <Heading size="md" mb="4">
        Perfil de Jugador
      </Heading>
      <VStack spacing="4" align="start" w="100%">
        <Flex justifyContent="space-between" w="100%">
          <Text fontWeight="bold">Nick:</Text>
          <HStack>
            <Text>{formData.nick}</Text>
            <Input
              placeholder="Cambiar nick"
              name="nick"
              value={formData.nick}
              onChange={handleInputChange}
              size="sm"
              bgColor="white"
              border="1px"
              borderRadius="10px"
            />
          </HStack>
        </Flex>
        <Divider borderColor="gray.400" />
{/* 
        <Flex justifyContent="space-between" w="100%">
          <Text fontWeight="bold">Email:</Text>
          <HStack>
            <Text>{formData.email}</Text>
            <Input
              placeholder="Cambiar email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              size="sm"
            />
          </HStack>
        </Flex>
        <Divider borderColor="gray.400" /> */}

        <Flex justifyContent="space-between" w="100%">
          <Text fontWeight="bold">Cambiar foto de perfil:</Text>
          <HStack>
            <Text color="gray.600">Ingresa el URL de tu nueva foto</Text>
            <Input
              placeholder="URL de imagen"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              size="sm"
              bgColor="white"
              border="1px"
              borderRadius="10px"
            />
          </HStack>
        </Flex>
        <Divider borderColor="gray.400" />
         {/* Nueva sección para la fecha de nacimiento */}
         <Flex justifyContent="space-between" w="100%">
          <Text fontWeight="bold">Fecha de nacimiento:</Text>
          <HStack>
            <Input
              type="date"
              name="birthDate"
              value={formData.age}
              onChange={handleInputChange}
              size="sm"
              bgColor="white"
              border="1px"
              borderRadius="10px"
            />
          </HStack>
        </Flex>
        <Divider borderColor="gray.400" />
        {/* Nueva sección para la descripción */}
        <Flex justifyContent="space-between" w="100%" alignItems="start">
          <Text fontWeight="bold">Descripción:</Text>
          <Textarea
            placeholder="Escribe algo sobre ti"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            size="sm"
            bgColor="white"
            border="1px"
            borderRadius="10px"
            resize="none"
            w="70%"
          />
        </Flex>
        <Divider borderColor="gray.400" />

        <Flex justifyContent="space-between" w="100%">
          <Text fontWeight="bold">Puedes recibir mensajes de:</Text>
          <Select
            name="receiveMessages"
            value={formData.receiveMessages}
            onChange={handleInputChange}
            size="sm"
            border="1px"
            borderRadius="10px"
            w="30%"
          >
            <option value="Cualquiera">Cualquiera</option>
            <option value="Amigos">Sólo Amigos</option>
            <option value="Nadie">Nadie</option>
          </Select>
        </Flex>
        <Divider borderColor="gray.400" />

        <Flex justifyContent="space-between" w="100%">
          <Text fontWeight="bold">Mostrar tu estado a:</Text>
          <Select
            name="showStatus"
            value={formData.showStatus}
            onChange={handleInputChange}
            size="sm"
            border="1px"
            borderRadius="10px"
            w="30%"
          >
            <option value="Cualquiera">Cualquiera</option>
            <option value="Amigos">Sólo Amigos</option>
            <option value="Nadie">Nadie</option>
          </Select>
        </Flex>
        <Divider borderColor="gray.400" />

        <Flex justifyContent="space-between" w="100%">
          <Text fontWeight="bold">Ver todas las fotos:</Text>
          <Select
            name="showPhotos"
            value={formData.showPhotos}
            onChange={handleInputChange}
            size="sm"
            border="1px"
            borderRadius="10px"
            w="30%"
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
        </Flex>
        <Divider borderColor="gray.400" />

        <Button colorScheme="blue" onClick={handleUpdate} w="100%">
          Guardar Cambios
        </Button>
      </VStack>
    </Box>
  );
};

export default UpdateProfileForm;
