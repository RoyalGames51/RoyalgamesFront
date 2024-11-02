//DEPENDENCIES
import axios from "axios";

//Styles
import Swal from "sweetalert2";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
 Stack,
    Text,
    Box,
    Checkbox,
} from "@chakra-ui/react";


//HOOKS
import { useState } from "react";
import { useAuth } from "../../context/oauthContext";
import { useNavigate } from "react-router";

const RegistroForm = ({ onSwitchForm }) => {
    const navigate = useNavigate();
    //Autenticacion
    const auth = useAuth();

    const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Estado para cuadro de registro

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
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("llegue");
    
        
            const [firebaseResponse, backendResponse] = await Promise.all([
                auth.register(input.email, input.password), 
                axios.post(`https://royalback-du3v.onrender.com/user/create`, input)
            ]);
    
            console.log("Respuestas recibidas:", firebaseResponse, backendResponse);
            
            const id = backendResponse?.data?.id;
    
            if (id) {
                Swal.fire({
                    title: "¡Bien hecho!",
                    text: "¡Datos registrados correctamente!",
                    icon: "success",
                });
                window.location.reload();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error en el registro",
                });
            }
        
    };
    const toggleLoginBox = () => {
        // setIsLoginOpen(!isLoginOpen);
         setIsRegisterOpen(false); // Cerrar el cuadro de registro si está abierto
      };
      const toggleRegisterBox = () => {
     setIsRegisterOpen(!isRegisterOpen);
    //setIsLoginOpen(false); // Cerrar el cuadro de login si está abierto
  };
    return (
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
        </Box>
    )
}
export default RegistroForm;