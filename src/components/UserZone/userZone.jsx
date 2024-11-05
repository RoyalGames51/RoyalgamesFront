import { Box, Avatar, Text, Stack, Flex, Image, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import Logout from "../../components/Logout/logout"; // Asegúrate de que la ruta sea correcta
import chips from "../../assets/chips.png";

export default function UserZone() {
    const { currentUser } = useSelector((state) => state);

    return (
        <Flex w={"fit-content"} h={"auto"} p={2} align="center" pl={3} bg="#616161" borderRadius="md">
            {currentUser?.id ? (
                <>
                    <Avatar src={currentUser.avatar} />
                    <Stack spacing={0} ml={3}>
                        <Text fontWeight="bold" color="white">
                            {currentUser.nick.charAt(0).toUpperCase() + currentUser.nick.slice(1)}
                        </Text>
                        <Flex align="center" color="gray.300">
                            <Image src={chips} alt="Chips" boxSize="1em" mr={1} />
                            <Text>{currentUser.chips}</Text>
                        </Flex>
                    </Stack>
                    
                    {/* Menú desplegable al lado del perfil del usuario */}
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<ChevronDownIcon />}
                            variant="ghost"
                            color="white"
                            _hover={{ bg: "transparent" }}
                            _active={{ bg: "transparent" }}
                            ml={3} // Ajusta el margen para pegarlo más al perfil
                        />
                        <MenuList bg="#616161" borderColor="gray.600" color="white" mt="0" minW="fit-content" p={0}>
                            <MenuItem _hover={{ bg: "#505050" }} justifyContent="center">
                                <Logout />
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </>
            ) : null}
        </Flex>
    );
}
