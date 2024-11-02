import { Box, Button, Image, Link, Text, Input, Stack, Checkbox, FormControl, FormLabel, useDisclosure, Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Flex } from "@chakra-ui/react";
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


export default function Navbar() {
  const { currentUser } = useSelector((state) => state);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const handleSwitchForm = () => setIsLoginFormVisible(!isLoginFormVisible);
  
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
      
      {/* Links de juegos */}
      {["Bingo", "Ruleta", "Parchis", "y 10 juegos más"].map((juego) => (
        <Box mr={"15px"} key={juego}>
          <Link to="/">
            <Text color={"white"} fontSize={"20px"}>{juego}</Text>
          </Link>
        </Box>
      ))}
      
      {currentUser?.id ? (
          <LogOut /> // Muestra solo el botón de logout si la sesión está iniciada
        ) : (
          <>
            <Login />    {/* Botón de iniciar sesión */}
            <RegistroForm /> {/* Botón de registrarse */}
          </>
        )}
        
    
    </Box>
  );
}