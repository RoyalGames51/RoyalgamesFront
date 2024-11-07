import { Box, Button, Image, Text, Input, Stack, Checkbox, FormControl, FormLabel, useDisclosure, Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react"; // Importamos useState para controlar el estado del dropdown
import logo from '../../assets/IMG_3867.png';
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
      height="100px"
      display="flex"
      bg="linear-gradient(180deg, #000000 80%, #666666 100%)"
      padding="15px"
      alignItems="center"
    >
      <Image src={logo} pr={"120px"} w={"25%"} pt={"10px"} />
      
      <Box w="100%" alignContent="center" justifyContent="center">
  <Flex justify="center" alignItems="center">
    {currentUser?.admin && currentUser?.admin ? (
      <Box>
        <Flex>
          <NavLink
            exact
            to="/"
            style={{
              color: "white",
              textDecoration: location.pathname === '/' ? 'underline' : 'none',
              marginRight: '35px',
              fontSize: '21px'
            }}
          >
            INICIO
          </NavLink>
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
            exact
            to="/"
            style={{
              color: "white",
              textDecoration: location.pathname === '/' ? 'underline' : 'none',
              marginRight: '35px',
              fontSize: '21px'
            }}
          >
            Inicio
          </NavLink>
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
            to="/novedades"
            style={{
              color: "white",
              textDecoration: location.pathname === '/novedades' ? 'underline' : 'none',
              fontSize: '21px'
            }}
          >
            Novedades
          </NavLink>
        </Flex>
      </Box>
    ) : (
      <Box>
        <Flex>
          <NavLink
            exact
            to="/"
            style={{
              color: "white",
              textDecoration: location.pathname === '/' ? 'underline' : 'none',
              marginRight: '35px',
              fontSize: '21px'
            }}
          >
           Inicio
          </NavLink>
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
            to="/novedades"
            style={{
              color: "white",
              textDecoration: location.pathname === '/novedades' ? 'underline' : 'none',
              fontSize: '21px'
            }}
          >
           Novedades
          </NavLink>
          {currentUser && currentUser?.admin ? <LogOut /> : null}
        </Flex>
      </Box>
    )}
  </Flex>
</Box>
{currentUser?.id ? (
        <>
         <Box  ml={"22%"}>
  <UserZone/>
 
</Box>
        </>
      ) : null}


      <Flex pl={"4%"}>
      {currentUser?.id ? (
           <Button>
           <Link to={"/chips"}>Comprar fichas</Link>
         </Button>
        ) : (
          <>
            <Login />    {/* Botón de iniciar sesión */}
            <RegistroForm /> {/* Botón de registrarse */}
          </>
        )}          
        </Flex>
    
    </Box>
  );
}