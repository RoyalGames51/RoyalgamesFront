import React, { useState } from "react";
import { Button, Input, Textarea, Box, Stack, Text } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Iconos de corazón
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

const EditProfileForm = ({ closeModal }) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state);
    const [formData, setFormData] = useState({
        name: currentUser?.nick || "",
        description: currentUser?.description || "",
        favoriteGames: currentUser?.favoriteGames || []
    });

    // Maneja los cambios en los campos de entrada
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Maneja el cambio de los juegos favoritos
    const handleGameToggle = (gameId) => {
        const updatedGames = formData.favoriteGames.includes(gameId)
            ? formData.favoriteGames.filter((id) => id !== gameId)
            : [...formData.favoriteGames, gameId];
        setFormData({
            ...formData,
            favoriteGames: updatedGames
        });
    };

    // Envía los datos actualizados al servidor
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Suponiendo que tienes una API para actualizar el perfil
            const response = await axios.put(`/api/users/${currentUser.id}`, formData);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Perfil actualizado!",
                showConfirmButton: false,
                timer: 2500
            });
            closeModal(); // Cierra el formulario de edición
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un error al actualizar el perfil"
            });
        }
    };

    return (
        <Box p={5} bg="white" boxShadow="lg" borderRadius="lg">
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nuevo nombre"
                        fontSize="lg"
                    />
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descripción"
                        fontSize="lg"
                        rows={4}
                    />
                    <Text fontSize="lg" fontWeight="bold">Selecciona tus juegos favoritos:</Text>
                    <Box display="flex" flexWrap="wrap" gap={4}>
                        {currentUser?.games.map((game) => (
                            <Box key={game.id} display="flex" alignItems="center">
                                <Text>{game.name}</Text>
                                <Button
                                    variant="link"
                                    onClick={() => handleGameToggle(game.id)}
                                    leftIcon={
                                        formData.favoriteGames.includes(game.id) ? (
                                            <FaHeart color="red" />
                                        ) : (
                                            <FaRegHeart />
                                        )
                                    }
                                >
                                    {formData.favoriteGames.includes(game.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    <Button colorScheme="blue" type="submit" w="full">Guardar cambios</Button>
                </Stack>
            </form>
        </Box>
    );
};

export default EditProfileForm;
