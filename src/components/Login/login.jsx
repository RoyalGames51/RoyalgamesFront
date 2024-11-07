import { useState } from "react";
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Button,
    InputRightElement,
    Stack,
    Text,
    Box,
    Center,
    useDisclosure,
    Image,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import googleLogo from "../../assets/IMG_3867.png"; // Asegúrate de que el logo esté en la ruta correcta
import { useAuth } from "../../context/oauthContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getUserByEmail, getUserByNick } from "../../redux/actions";
import axios from "axios";


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
     
      if(input.email.includes("@")){
        console.log("llega aca",input);
        await auth.login(input.email, input.password);
        console.log("llega acaa",input.email);
        const getUser = await dispatch(getUserByEmail(input.email));
        navigate('/');
        Swal.fire({
          position: "center",
          icon: "success",
          title: "¡Inicio de sesión éxitoso!",
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        const {data} = await dispatch(getUserByNick(input.email))
        await auth.login(data.email, input.password);
        navigate('/');
        Swal.fire({
          position: "center",
          icon: "success",
          title: "¡Inicio de sesión éxitoso!",
          showConfirmButton: false,
          timer: 2500,
        });
      }
      //getuserbyNick
      
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

        const response = await fetch('https://royalback-du3v.onrender.com/user/create', {
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
        borderRadius={"20px"}
        color={"black"}
        bgColor={"#94f341"}
        fontSize={"20px"}
        onClick={toggleLoginBox}
      >
        Iniciar Sesión
      </Button>

      {/* Cuadro de inicio de sesión, se muestra solo si isLoginOpen es true */}
      {isLoginOpen && (
        <Center position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex="1000">
          <Box
            w="100%" maxW="400px" // Fija un ancho máximo para el cuadro
            bg="white"
            p={8}
            boxShadow="lg"
            borderRadius="lg"
          >
            <Stack spacing={4}>

              <FormControl>
                <FormLabel fontSize="lg" color="black">Correo Electrónico</FormLabel>
                <Input
                  bg="white"
                  type="text"
                  value={input.email}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu Correo / Email"
                  name="email"
                  fontSize="md"
                  color="black"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="lg" color="black">Contraseña</FormLabel>
                <InputGroup size="md">
                  <Input
                    bg="white"
                    type={show ? "text" : "password"}
                    placeholder="Ingresa una contraseña"
                    name="password"
                    onChange={handleInputChange}
                    fontSize="md"
                    color="black"
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

              <Button
                m={2}
                p={5}
                bg="#E8D980"
                onClick={handleSubmit}
                w="100%" // Ancho completo del botón
              >
                Entrar
              </Button>

              
              <Button
                bg="white"
                fontFamily="'DIN Medium',"
                color="black"
                onClick={handleGoogleLogin}
                leftIcon={<Image src={googleLogo} alt="Google Logo" boxSize="25px" />}
                w="100%"
              >
                Continuar con Google
              </Button>

            </Stack>
          </Box>
        </Center>
      )}
    </Box>
  );
}
