import { useState } from "react";
import { Box, Button, IconButton, Input, InputGroup, InputRightElement, Stack, Text, FormControl, FormLabel, Image, Center, Flex } from "@chakra-ui/react";
import { CloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import googleLogo from "../../assets/IMG_3867.png";
import { useAuth } from "../../context/oauthContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getUserByEmail, getUserByNick } from "../../redux/actions";
import axios from "axios";

const API_URL = "https://royalebacknest.onrender.com";

export default function Login() {
    const [isLoginOpen, setIsLoginOpen] = useState(false); // Estado para cuadro de inicio de sesión
    const auth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state);
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const toggleLoginBox = () => setIsLoginOpen(!isLoginOpen); // Alternar cuadro de inicio de sesión

    const handleInputChange = (e) =>
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let email = input.email;

            if (!input.email.includes("@")) {
                // Si el input no es un email, obtenemos el email asociado al nickname
                await dispatch(getUserByNick(input.email, input.password, auth));
                // Intentamos iniciar sesión con el email
                navigate('/');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "¡Inicio de sesión exitoso!",
                    showConfirmButton: false,
                    timer: 2500,
                });
            } else {
                console.log("Email usado para login:", email);
                await auth.login(email, input.password); // Intentamos iniciar sesión con el email

                // Redirige al inicio y muestra mensaje de éxito
                navigate('/');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "¡Inicio de sesión exitoso!",
                    showConfirmButton: false,
                    timer: 2500,
                });
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Contraseña incorrecta, intenta nuevamente",
            });
        }
    };


    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        const googleLog = await auth.loginWithGoogle();
        try {
            if (googleLog) {
                const usr = {
                    name: googleLog.user.displayName,
                    email: googleLog.user.email,
                    image: googleLog.user.photoURL,
                };
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Inicio de sesión éxitoso",
                    showConfirmButton: false,
                    timer: 2500,
                });

                const response = await fetch(`${API_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usr),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const userActual = await dispatch(getUserByEmail(googleLog.user.email));
                navigate('/');
                return response;
            }
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al iniciar sesión con Google",
            });
        }
    };

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <Box>
          {/* Botón para abrir el cuadro de inicio de sesión */}
          <Button
            onClick={toggleLoginBox}
            bgGradient="linear(to-r, #1a880f, #8eff17)" // Gradiente de color
            color="white"
            size="lg"
            fontSize="lg"
            fontWeight="bold"
            borderRadius="full"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Sombra suave
            _hover={{
              bgGradient: "linear(to-r, #8eff17, #1a880f)", // Cambia el gradiente en hover
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)", // Sombra más fuerte en hover
              transform: "scale(1.05)", // Leve efecto de agrandamiento en hover
            }}
            _active={{
              bgGradient: "linear(to-r, teal.500, blue.600)", // Color al hacer clic
              transform: "scale(0.95)", // Ligeramente más pequeño al hacer clic
            }}
            _focus={{
              outline: "none",
              boxShadow: "0 0 1px 2px teal.500", // Resaltado en el foco
            }}
          >
            Iniciar sesión
          </Button>
    
          {/* Fondo oscuro y cuadro de inicio de sesión */}
          {isLoginOpen && (
            <Box
              position="fixed"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="rgba(0, 0, 0, 0.6)"
              zIndex="1000"
              onClick={toggleLoginBox} // Cierra al hacer clic en el fondo oscuro
            >
              <Flex
                        position="fixed"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        bg="white"
                        
                        boxShadow="2xl"
                        borderRadius="15px"
                        
                        zIndex="10"
                        align="center"
                        direction={"column"}
                    >
                        <Box
                    bg="#1a880f"
                    color="white"
                    textAlign="center"
                    p={3}
                    borderTopRadius="lg"
                    fontWeight="bold"
                    fontSize="xl"
                    w={"100%"}
                  >
                    Iniciar sesión
                  </Box>
                <Box
                  w="100%"
                  maxW="300px"
                  bg="white"
                  pb={8}
                  pl={8}
                  pr={8}
                  boxShadow="lg"
                  borderRadius="lg"
                  onClick={(e) => e.stopPropagation()} // Evita que el clic cierre el cuadro
                >
                  {/* Encabezado con fondo verde y borderRadius */}
                  
    
                  <Stack spacing={4} mt={4}>
                   
    
                    {/* Campo de correo electrónico */}
                    <FormControl>
                     
                      <Input
                        bg="white"
                        type="text"
                        value={input.email}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu Nick o Email"
                        name="email"
                        fontSize="md"
                        color="black"
                        borderColor="gray.300"
                        _focus={{ borderColor: "#1a880f" }} // Color de borde al hacer foco
                      />
                    </FormControl>
    
                    {/* Campo de contraseña */}
                    <FormControl isRequired>
                      
                      <InputGroup size="md">
                        <Input
                          bg="white"
                          type={show ? "text" : "password"}
                          placeholder="Ingresa tu contraseña"
                          name="password"
                          onChange={handleInputChange}
                          fontSize="md"
                          color="black"
                          borderColor="gray.300"
                          _focus={{ borderColor: "#1a880f" }}
                        />
                        <InputRightElement width="4rem">
                          <Button
                            h="1rem"
                            size="lg"
                            onClick={handleClick}
                            bg="transparent"
                            _hover={{ bg: "transparent" }}
                            _active={{ bg: "transparent" }}
                          >
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
    
                    {/* Botón de inicio de sesión */}
                    <Button
                      m={2}
                      p={5}
                      bg="#E8D980"
                      onClick={handleSubmit}
                      w="100%" // Ancho completo del botón
                      _hover={{
                        bg: "#d4c759", // Hover para cambiar el color de fondo
                        transform: "scale(1.05)",
                      }}
                    >
                      Entrar
                    </Button>
    
                    {/* Aquí puedes agregar más botones o enlaces si lo deseas, como el de Google */}
                  </Stack>
                </Box>
                </Flex>
            </Box>
          )}
        </Box>
      );
    };