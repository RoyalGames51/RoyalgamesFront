import { Box, Button, Image, Text, Input, Stack, Checkbox, FormControl, FormLabel, useDisclosure, Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react"; // Importamos useState para controlar el estado del dropdown
import logo from '../../assets/logo.png';
import { FaGoogle } from "react-icons/fa"; // Icono de Google
import axios from "axios";
import Swal from "sweetalert2";

import { useAuth } from "../../../src/context/oauthContext";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login/login";
import RegistroForm from "../Register/register";
import { ViewIcon } from "@chakra-ui/icons";
import LogOut from "../Logout/logout";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserZone from "../UserZone/userZone";


export default function Navbar() {

  
  const { currentUser } = useSelector((state) => state);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const handleSwitchForm = () => setIsLoginFormVisible(!isLoginFormVisible);
  const location = useLocation();
  useEffect(() => {
    console.log(currentUser);
}, [currentUser]);  return (
    <Box
      width="100%"
      height="73px"
      display="flex"
      bg="black"
      padding="15px"
      alignItems="center"
      pr={"135px"}
      pl={"125px"}
    >
      <Link to="/"
      >
        <Flex maxW={"360px"} >
    <Image src={logo}  w="100%"  alt="Logo" />
    </Flex>
</Link>
      
      <Box w="100%" alignContent="center" justifyContent="center" ml={"10%"}>
  <Flex justify="center" alignItems="center">
    {currentUser?.admin && currentUser?.admin ? (
      <Box>
        <Flex>
          
          <NavLink
            to="/panel" 
            style={{
              color: "white",
              textDecoration: location.pathname === '/panel' ? 'underline' : 'none',
              marginRight: '35px',
              fontSize: '21px'
            }}
          >
            PANEL 
          </NavLink>
        </Flex>
      </Box>
    ) : currentUser?.admin === false ? (
      <Box>
        <Flex>
        
          <NavLink
            to="/juegos"
            style={{
              color: "white",
              textDecoration: location.pathname === '/juegos' ? 'underline' : 'none',
              marginRight: '35px',
              fontSize: '21px'
            }}
          >
            Juegos
          </NavLink>
          <NavLink
            to="/noticias"
            style={{
              color: "white",
              textDecoration: location.pathname === '/noticias' ? 'underline' : 'none',
              fontSize: '21px'
            }}
          >
            Noticias
          </NavLink>
        </Flex>
      </Box>
    ) : (
      <Box >
        <Flex >
          
          <NavLink
            to="/juegos"
            style={{
              color: "white",
              textDecoration: location.pathname === '/juegos' ? 'underline' : 'none',
              marginRight: '35px',
              fontSize: '21px'
            }}
          >
            Juegos
          </NavLink>
          <NavLink
            to="/noticias"
            style={{
              color: "white",
              textDecoration: location.pathname === '/noticias' ? 'underline' : 'none',
              fontSize: '21px'
            }}
          >
           Noticias
          </NavLink>
          {currentUser && currentUser?.admin ? <LogOut /> : null}
        </Flex>
      </Box>
    )}
  </Flex>
</Box>
{currentUser?.id ? (
        <>
         <Flex >
  <UserZone/>
 
</Flex>
        </>
      ) : null}


<Flex pl={"1%"}>
  {currentUser?.id ? (
    <Button
      as={Link} // Hace que el botón sea un enlace
      to="/chips" // Ruta del enlace
      bgGradient="linear(to-r, #13d500, #13d500)" // Gradiente verde
      color="white" // Texto blanco
      fontSize="lg" // Tamaño de fuente general
      fontWeight="bold" // Texto en negrita
      pt={2}
      pb={2}
      h={"60px"} // Bordes redondeados
      // px={6} // Espaciado horizontal dentro del botón
      // py={3} // Espaciado vertical dentro del botón
      boxShadow="lg" // Sombra para dar efecto de profundidad
      textAlign="center" // Centra el texto
      _hover={{
        bgGradient: "linear(to-r, #13d500, #13d500)", // Cambia el gradiente al pasar el mouse
        transform: "scale(1.05)", // Agranda ligeramente el botón
      }}
      _active={{
        bgGradient: "linear(to-r, green.600, green.700)", // Gradiente al hacer clic
        transform: "scale(0.95)", // Reduce ligeramente el botón
      }}
    >
      <Box>
        <Box fontSize="lg" fontWeight="bold">
          Comprar
        </Box>
        <Box fontSize="md" fontWeight="bold">
          Fichas
        </Box>
      </Box>
    </Button>
  ) : (
    <>
      <Login /> {/* Botón de iniciar sesión */}
      <RegistroForm /> {/* Botón de registrarse */}
    </>
  )}
</Flex>

    
    </Box>
  );
}