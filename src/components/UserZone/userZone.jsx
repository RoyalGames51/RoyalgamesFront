import { Box, Avatar, Text, Stack, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function UserZone() {
  const { currentUser } = useSelector((state) => state);

  return (
    <Flex bgColor={"blue"} w={"10%"} h={"5%"}>
      {currentUser?.id ? (
        <Stack align="center">
          <Avatar src={currentUser.avatar} /> {/* Agrega el src al avatar del usuario */}
          <Text fontWeight="bold">{currentUser.nick}</Text> {/* Nickname */}
          <Text color="gray.500">{`Chips: ${currentUser.chips}`}</Text> {/* Fichas */}
        </Stack>
      ) : null}
    </Flex>
  );
}
 