import {
    Box,
    Avatar,
    Text,
    Stack,
    Flex,
    Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import chips from "../../assets/chips.png";
import Select from 'react-select';
import { useAuth } from "../../context/oauthContext";

export default function UserZone() {
    const { currentUser } = useSelector((state) => state);
    const memoizedUser = useMemo(() => currentUser, [currentUser]);
    const navigate = useNavigate();
     const auth = useAuth();
     const dispatch = useDispatch();

    const options = [
        { value: "perfil", label: "Perfil" },
        {value: "amigos", label: "Amigos"},
        { value: "configuracion", label: "Configuración" },
        { value: "movimientos", label: "Movimientos" },
        { value: "logout", label: "Cerrar sesión" },
    ];

    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "transparent",
            border: "1px solid #393939",
            boxShadow: state.isFocused ? "0 0 0 1px #393939" : "none",
            borderRadius: "4px",
            maxHeight: "70px",
            cursor: "pointer",
            marginLeft: "30px",
            paddingLeft: "4px",
            marginBottom: "0px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
                border: "1px solid #555",
            },
        }),
        placeholder: (base) => ({
            ...base,
            display: "none",
        }),
        indicatorsContainer: (base) => ({
            ...base,
            paddingRight: "2px",
        }),
        menu: (base) => ({
            ...base,
            borderRadius: "8px",
            overflow: "hidden",
            minWidth: "200px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            marginRight: "200px",
        }),
        option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? "#f0f0f0" : "white",
            color: "black",
            padding: "10px",
            cursor: "pointer",
        }),
    };
    const handleLogOut = async () => {
        try {
          await auth.logOut();  // Asumo que tu función logOut está implementada correctamente en useAuth
          localStorage.clear();
          window.location.reload()
        //   navigate("/");
          // window.location.reload();
              Swal.fire({
                title: "¡Sesión cerrada con éxito!",
                icon: "success"
              });
    
          // Limpiar el estado de Redux
        dispatch(cleanCurrentUser());
    
    
          // Redirigir al usuario a la página de inicio
         
        } catch (error) {
          console.error(`Error al cerrar sesión: ${error.message}`);
        }
      };

    return (
        <Flex
            w="fit-content"
            h="auto"
            p={2}
            pr={0}
            pt={0}
            pb={0}
            m={2}
            align="center"
            pl={3}
            bg="green.500"
            bgColor="black"
            borderRadius="md"
            border="1px"
            borderColor="gray.600"
            bgGradient="linear(to-b, #2e2e2e, black)"
        >
            {memoizedUser?.id ? (
                <>
                    <Box
                        display="flex"
                        alignItems="center"
                        onClick={() => navigate("/perfil")} // Redirige a la ruta /perfil
                        cursor="pointer"
                    >
                        <Avatar src={memoizedUser.image} />

                        <Stack spacing={0} ml={3}>
                            <Text fontWeight="bold" color="white">
                                {memoizedUser.nick.charAt(0).toUpperCase() + memoizedUser.nick.slice(1)}
                            </Text>
                            <Flex align="center" color="gray.300">
                                <Image src={chips} alt="Chips" boxSize="1em" mr={2} />
                                <Text whiteSpace="nowrap">
                                    {new Intl.NumberFormat('en-US').format(memoizedUser.chips).replace(/,/g, ' ')} fichas
                                </Text>
                            </Flex>
                        </Stack>
                    </Box>

                    <Select
                        options={options}
                        onChange={(selectedOption) => {
                            if (selectedOption.value === 'logout') {
                                handleLogOut()
                            } else {
                                navigate(`/${selectedOption.value}`);
                            }
                        }}
                        placeholder=""
                        styles={customStyles}
                        isSearchable={false}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                    />
                </>
            ) : null}
        </Flex>
    );
}
