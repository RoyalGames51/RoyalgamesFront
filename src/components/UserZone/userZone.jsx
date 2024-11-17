import {
    Box,
    Avatar,
    Text,
    Stack,
    Flex,
    Image,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
  } from "@chakra-ui/react";
  import { ChevronDownIcon } from "@chakra-ui/icons";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, useNavigate } from "react-router-dom";
  import chips from "../../assets/chips.png";
  import { cleanCurrentUser } from "../../redux/actions";
  import { useAuth } from "../../context/oauthContext";
  import Swal from "sweetalert2";
  import Select from 'react-select';


  export default function UserZone() {
    const { currentUser } = useSelector((state) => state);
    const auth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const options = [
    //     { value: 'perfil', label: 'Perfil' },
    //     { value: 'configuracion', label: 'Configuración' },
    //     { value: 'movimientos', label: 'Movimientos' },
    //     { value: 'logout', label: 'Cerrar sesión' },
    //   ];
  
    const handleLogOut = async () => {
      try {
        await auth.logOut();
        localStorage.clear();
        dispatch(cleanCurrentUser());
        navigate("/"); // Redirige a la página de inicio
        Swal.fire({
          title: "¡Sesión cerrada con éxito!",
          icon: "success",
        });
      } catch (error) {
        console.error(`Error al cerrar sesión: ${error.message}`);
      } 
    };
    const handleChange = async (selectedOption) => {
        if (selectedOption.value === 'logout') {
            await auth.logOut();
            localStorage.clear();
            dispatch(cleanCurrentUser());
            navigate("/"); // Redirige a la página de inicio
            Swal.fire({
              title: "¡Sesión cerrada con éxito!",
              icon: "success",
            });
        } else {
          window.location.href = `/${selectedOption.value}`;
        }
      };
      const options = [
        { value: "perfil", label: "Perfil" },
        { value: "configuracion", label: "Configuración" },
        { value: "movimientos", label: "Movimientos" },
        { value: "logout", label: "Cerrar sesión" },
      ];
      
      const customStyles = {
        control: (base, state) => ({
          ...base,
          backgroundColor: "transparent",
          border: "1px solid #393939",
          boxShadow: state.isFocused ? "0 0 0 1px #393939" : "none", // Controla el borde en focus
          borderRadius: "4px",
          maxHeight: "70px", 
          cursor: "pointer",
          marginLeft: "30px",
          paddingLeft: "4px",
          marginBottom: "0px",
          transition: "all 0.2s ease-in-out", // Suaviza las transiciones
          "&:hover": {
            border: "1px solid #555", // Cambia el borde al pasar el mouse
          },
        }),
        placeholder: (base) => ({
          ...base,
          display: "none", // Oculta el texto del placeholder
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
  
            {/* Menú desplegable */}
            <Select
            
      options={options}
      onChange={handleChange}
      placeholder="" // Deja el placeholder vacío
      styles={customStyles}
      isSearchable={false} // Deshabilita la barra de búsqueda
      components={{
        IndicatorSeparator: () => null, // Oculta la línea divisoria entre la flecha y el menú
      }}
    />
          </>
        ) : null}
      </Flex>
    );
  }
  