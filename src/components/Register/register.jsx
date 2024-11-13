import axios from 'axios';
import { validateNick, validateEmail, validatePassword } from './validate'

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
import regalo from '../../assets/regalobienvenida.png'

//HOOKS
import { useEffect, useState } from "react";
import { useAuth } from "../../context/oauthContext";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { promo1millon } from '../../redux/actions';

const RegistroForm = ({ onSwitchForm }) => {
    const navigate = useNavigate();
    //Autenticacion
    const auth = useAuth();

    const [errors, setErrors] = useState({
        nick: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(promo1millon());
    }, [dispatch]);
    const countUsers = useSelector((state) => state.counterUser);

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar los campos
        const nickError = validateNick(input.nick);
        const emailError = validateEmail(input.email);
        const passwordError = validatePassword(input.password);

        // Si hay errores, actualiza el estado de errores
        if (nickError || emailError || passwordError) {
            setErrors({
                nick: nickError || "",
                email: emailError || "",
                password: passwordError || "",
            });
            return; // Detener el envío del formulario
        }

        // Si no hay errores, proceder con el registro
        try {
            const [registerResponse, userResponse] = await Promise.all([
                auth.register(input.email, input.password),
                axios.post(`https://royalback-f340.onrender.com/user-create`, input),
            ]);
    
            const id = userResponse?.data?.id;
            if (countUsers < 1000 && id) {
                await axios.put('https://royalback-f340.onrender.com/add/chips', {
                    id: id,
                    newChips: 1000000,
                });
            }
    
            Swal.fire({
                title: "¡Bien hecho!",
                text: "¡Datos registrados correctamente!",
                icon: "success",
            });
            window.location.reload(); // Recargar la página después del registro
        } catch (error) {
            console.error("Error en el registro:", error);
            Swal.fire("Oops...", "Hubo un error en el registro", "error");
        }
    };

    const toggleRegisterBox = () => {
        setIsRegisterOpen(!isRegisterOpen);
    };

    return (
        <Box mr={"15px"}>
            <Button
            ml={"4%"}
      onClick={toggleRegisterBox}
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
        bgGradient: "linear(to-r, teal.500, green.600)", // Color al hacer clic
        transform: "scale(0.95)", // Ligeramente más pequeño al hacer clic
      }}
      _focus={{
        outline: "none",
        boxShadow: "0 0 1px 2px teal.500", // Resaltado en el foco
      }}
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
                            
                            {/* Nick */}
                            <FormControl isInvalid={errors.nick}>
                                <FormLabel fontSize="1xl" fontFamily="'DIN Medium',">Nick</FormLabel>
                                <Input 
                                    placeholder="Nombre de usuario" 
                                    type="text"
                                    name="nick"
                                    value={input.nick}
                                    onChange={handleInputChange}
                                />
                                {errors.nick && <Text color="red.500">{errors.nick}</Text>}
                            </FormControl>
                            
                            {/* Email */}
                            <FormControl isInvalid={errors.email}>
                                <FormLabel fontSize="1xl" fontFamily="'DIN Medium',">Correo electrónico</FormLabel>
                                <Input 
                                    placeholder="Correo electrónico" 
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={handleInputChange} 
                                />
                                {errors.email && <Text color="red.500">{errors.email}</Text>}
                            </FormControl>

                            {/* Password */}
                            <FormControl isInvalid={errors.password}>
                                <FormLabel fontSize="1xl" fontFamily="'DIN Medium',">Password</FormLabel>
                                <Input 
                                    placeholder="Contraseña" 
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={handleInputChange}
                                />
                                {errors.password && <Text color="red.500">{errors.password}</Text>}
                            </FormControl>

                            <Checkbox>He leído y acepto los términos y condiciones</Checkbox>
                            
                            <Button colorScheme="teal" variant="solid" width="100%" type="submit">
                                Registrarse
                            </Button>
                        </Stack>
                    </Box>
                </form>
            )}
        </Box>
    );
};

export default RegistroForm;
