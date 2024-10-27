import { Box, Button, Image, Link, Text, Input, Stack, Checkbox, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react"; // Importamos useState para controlar el estado del dropdown
import logo from '../../assets/IMG_3867.png';
import { FaGoogle } from "react-icons/fa"; // Icono de Google
import axios from "axios";
import Swal from "sweetalert2";


export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Estado para cuadro de inicio de sesión
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Estado para cuadro de registro

  const toggleLoginBox = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsRegisterOpen(false); // Cerrar el cuadro de registro si está abierto
  };

  const toggleRegisterBox = () => {
    setIsRegisterOpen(!isRegisterOpen);
    setIsLoginOpen(false); // Cerrar el cuadro de login si está abierto
  };

  const [input, setInput] = useState({
    nick: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const property = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [property]: value,
    });

    // setError(ValidateNewUser(input));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dataUser = {};

    // Promise.all([
    console.log(input),
      // auth.register(input.email, input.password),  //registrarse con email y con password por firebase
      axios.post(`https://royalback-du3v.onrender.com/user/create`, input) // post con los inputs para crear el usuario
        // ])
        .then((response) => {
          const { id } = response.data;
          console.log(id);
          // dispatch(getUserByEmail(data.email))  // get con el input para setear el current user 
          if(id){
            Swal.fire({
              title: "¡Bien hecho!",
              text: "¡Datos registrados correctamente!",
              icon: "success",
            });
            navigate("/")
          }else {
            Swal.fire({
                   icon: "error",
                   title: "Oops...",
                  text: "Hubo un error en el registro",
                 });
          }
         
          

        })
        
  }
  return (
    <Box
      width="100%"
      height="100px"
      bgAttachment={"fixed"}
      display="flex"
      bg="linear-gradient(180deg, #000000 80%, #666666 100%)" /* Gradiente gris */
      padding="15px"
      alignItems="center"
      position="relative" // Importante para posicionar el cuadro de login y registro
    >
      <Image src={logo} color={"white"} pr={"120px"} w={"25%"} pt={"10px"} />
      <Box mr={"15px"}>
        <Link to="/">
          <Text borderRadius={"20px"} color={"white"} fontSize={"20px"}>
            Bingo
          </Text>
        </Link>
      </Box>
      <Box mr={"15px"}>
        <Link to="/">
          <Text borderRadius={"20px"} color={"white"} fontSize={"20px"}>
            Ruleta
          </Text>
        </Link>
      </Box>
      <Box mr={"15px"}>
        <Link to="/">
          <Text borderRadius={"20px"} color={"white"} fontSize={"20px"}>
            Parchis
          </Text>
        </Link>
      </Box>
      <Box mr={"15px"}>
        <Link to="/">
          <Text borderRadius={"20px"} color={"white"} fontSize={"20px"}>
            y 10 juegos más
          </Text>
        </Link>
      </Box>

      {/* Botón de Iniciar Sesión */}
      <Box mr={"15px"} ml={"auto"}>
        <Button
          borderRadius={"20px"}
          color={"black"}
          bgColor={"#94f341"}
          fontSize={"20px"}
          onClick={toggleLoginBox} // Abrimos el cuadro de login al hacer clic
        >
          Iniciar Sesión
        </Button>
      </Box>

      {/* Botón de Registrarse */}
      <Box mr={"15px"}>
        <Button
          borderRadius={"20px"}
          color={"black"}
          fontSize={"20px"}
          bgColor={"#94f341"}
          onClick={toggleRegisterBox} // Abrimos el cuadro de registro al hacer clic
        >
          Registrarse
        </Button>
      </Box>

      {/* Cuadro desplegable de inicio de sesión */}
      {isLoginOpen && (
        <Box
          position="absolute"
          top="100px" // Colocamos el cuadro debajo de la navbar
          right="10%"
          bg="white"
          p="20px"
          boxShadow="lg"
          borderRadius="10px"
          width="300px"
        >
          <Stack spacing={4}>
            <Input placeholder="Usuario" type="text" />
            <Input placeholder="Contraseña" type="password" />
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              variant="outline"
              width="100%"
            >
              Iniciar sesión con Google
            </Button>
            <Button colorScheme="teal" variant="solid" width="100%">
              Iniciar sesión
            </Button>
          </Stack>
        </Box>
      )}

      {/* Cuadro desplegable de registro */}
      {isRegisterOpen && (
        <form onSubmit={handleSubmit}>
          <Box
            position="fixed" // Para centrar el cuadro en la pantalla
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)" // Centrar absolutamente en el eje X y Y
            bg="white"
            p="30px"
            boxShadow="2xl"
            borderRadius="15px"
            width="400px"
            zIndex="10"
          >
            <Stack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">Registro</Text>
              <FormControl>
                <FormLabel
                  fontSize="1xl"
                  fontFamily="'DIN Medium',"
                >Nick</FormLabel>
                <Input placeholder="Nombre de usuario" type="text"
                  name="nick"
                  value={input.nick}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>

                <FormLabel
                  fontSize="1xl"
                  fontFamily="'DIN Medium',"
                >Correo electrónico</FormLabel>
                <Input placeholder="Correo electrónico" type="email"

                  name="email"
                  value={input.email}
                  onChange={handleInputChange} />
              </FormControl>

              <FormControl >
                <FormLabel
                  fontSize="1xl"
                  fontFamily="'DIN Medium',"
                >Password</FormLabel>

                <Input placeholder="Contraseña" type="password"
                  name="password"
                  value={input.password}
                  onChange={handleInputChange} />
              </FormControl>
              <Checkbox>He leído y acepto los términos y condiciones</Checkbox>
              <Button colorScheme="teal" variant="solid" width="100%" type="submit">
                Registrarse
              </Button>
            </Stack>
          </Box>
        </form>
      )
      }
    </Box >
  );
}
