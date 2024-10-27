// import { useState } from "react";
// import { Box, Button, Input, Stack, Text, Flex, useDisclosure } from "@chakra-ui/react";
// import { FaGoogle } from "react-icons/fa"; // Icono de Google

// export default function Login() {
//   const [isOpen, setIsOpen] = useState(false); // Estado para controlar el cuadro desplegable
//   const { isOpen: isDropdownOpen, onToggle } = useDisclosure(); // Para manejar el estado del dropdown

//   const toggleLoginBox = () => {
//     setIsOpen(!isOpen); // Cambia el estado al hacer clic
//   };

//   return (
//     <Box textAlign="center">
//       {/* Botón para abrir el cuadro desplegable */}
//       <Button 
//         onClick={toggleLoginBox} 
//         colorScheme="teal"
//       >
//         Iniciar sesión
//       </Button>

//       {/* Cuadro desplegable */}
//       {isOpen && (
//         <Box
//           mt="20px"
//           bg="gray.100"
//           p="20px"
//           borderRadius="10px"
//           boxShadow="md"
//           width="300px"
//           mx="auto"
//         >
//           <Stack spacing={4}>
//             {/* Campo de usuario */}
//             <Input placeholder="Usuario" type="text" />

//             {/* Campo de contraseña */}
//             <Input placeholder="Contraseña" type="password" />

//             {/* Botón de iniciar sesión con Google */}
//             <Button
//               leftIcon={<FaGoogle />} 
//               colorScheme="red" 
//               variant="outline"
//             >
//               Iniciar sesión con Google
//             </Button>

//             {/* Botón de iniciar sesión normal */}
//             <Button 
//               colorScheme="teal" 
//               variant="solid"
//             >
//               Iniciar sesión
//             </Button>
//           </Stack>
//         </Box>
//       )}
//     </Box>
//   );
// }
