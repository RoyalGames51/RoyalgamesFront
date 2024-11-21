import { useDispatch } from "react-redux";
import axios from "axios"

export const validateNick = async (nick) => {
    // Validaciones básicas
    if (!nick) {
        return "El nombre de usuario es obligatorio.";
    }
    if (nick.length < 3) {
        return "El nombre de usuario debe tener al menos 3 caracteres.";
    }
    if (nick.length > 20) {
        return "El nombre de usuario no puede tener más de 20 caracteres.";
    }

    // Verificar existencia en la base de datos
    try {
        const response = await axios.get(`https://royalback-f340.onrender.com/user-nick?nick=${nick}`);
        if (response.data.exists) {
            return "Este nombre de usuario ya está en uso.";
        }
    } catch (error) {
        console.error("Error al verificar el nick:", error);
        return "Error al validar el nombre de usuario. Intenta nuevamente.";
    }

    return null; // Indica que no hay error
};
export const validateEmail = (email) => {
    // Expresión regular para validar un correo electrónico básico
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
        return "El correo electrónico es obligatorio.";
    }
    if (!regex.test(email)) {
        return "El correo electrónico no es válido.";
    }
    return null;
};

export const validatePassword = (password) => {
    if (!password) {
        return "La contraseña es obligatoria.";
    }
    if (password.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres.";
    }
    if (password.length > 15) {
        return "La contraseña debe tener menos de 15 caracteres.";
    }
    return null;
};
