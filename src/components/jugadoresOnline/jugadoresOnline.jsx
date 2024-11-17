import React, { useEffect, useState } from "react";
import { Box, Avatar, Text, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch usuarios desde la base de datos
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://royalback-f340.onrender.com/getUsers");
        console.log(response.data,"aaa");
         // Cambia la URL según tu backend
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box
      w="300px"
      h="1000px"
       // Habilita el scroll si la lista es más grande que el contenedor
      bg="gray.100"
      borderRadius="10px"
      p="4"
      ml={"3%"}
      boxShadow="md"
    >
      {loading ? (
        <Flex justify="center" align="center" h="100%">
          <Spinner size="lg" color="teal.500" />
        </Flex>
      ) : (
        users.map((user) => (
          <Flex
            key={user.id} // Asegúrate de que cada usuario tenga una propiedad única como `id`
            align="center"
            p="3"
            mb="2"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
          >
            <Avatar
              size="md"
              name={user.nick}
              src={user.avatar} // Asegúrate de que el backend envíe la URL del avatar
              mr="3"
            />
            <Box>
              <Text fontWeight="bold">{user.nick}</Text>
              <Text fontSize="sm" color="gray.500">
                Jugando
              </Text>
            </Box>
          </Flex>
        ))
      )}
    </Box>
  );
}
