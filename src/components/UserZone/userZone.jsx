import { Box, Avatar, Text, Stack, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function UserZone() {
  const { currentUser } = useSelector((state) => state);

  return (
    <Flex bgColor={"blue"} w={"10%"} h={"auto"} p={2} align="center">
      {currentUser?.id ? (
        <>
          <Avatar src={currentUser.avatar} />
          <Stack spacing={0} ml={3}> {/* Margen a la izquierda del nickname y las fichas */}
            <Text fontWeight="bold" color="white">{currentUser.nick}</Text> {/* Nickname */}
            <Text color="gray.300">{`Chips: ${currentUser.chips}`}</Text> {/* Fichas */}
          </Stack>
        </>
      ) : null}
    </Flex>
  );
}
