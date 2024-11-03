import { Box, Avatar, Text, Stack, Flex, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import chips from "../../assets/chips.png";

export default function UserZone() {
  const { currentUser } = useSelector((state) => state);

  return (
    <Flex w={"auto"} h={"auto"} p={2} align="center" pl={3} bg="blue" borderRadius="md">
      {currentUser?.id ? (
        <>
          <Avatar src={currentUser.avatar} />
          <Stack spacing={0} ml={3}> {/* Margen a la izquierda del nickname y las fichas */}
            <Text fontWeight="bold" color="white">{currentUser.nick}</Text> {/* Nickname */}
            <Flex align="center" color="gray.300">
              <Image src={chips} alt="Chips" boxSize="1em" mr={1} /> {/* Imagen de ficha */}
              <Text>{currentUser.chips}</Text> {/* Cantidad de fichas */}
            </Flex>
          </Stack>
        </>
      ) : null}
    </Flex>
  );
}

