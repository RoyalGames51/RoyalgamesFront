import { ADMINISTRAR_USER, CLEAN_USER_BY_EMAIL, PROMO1K, USER_BY_EMAIL, USER_BY_NICK, FETCH_USER_PROFILE,
    UPDATE_USER_PROFILE,
    USER_ACTION_ERROR, REMOVE_FAVORITE_SUCCESS, ADD_FAVORITE_SUCCESS, ADD_FAVORITE_FAILURE, REMOVE_FAVORITE_FAILURE, FETCH_FAVORITES_FAILURE, FETCH_FAVORITES_SUCCESS } from "./action.types";
import axios from 'axios'






const API_BASE_URL = "https://royalback-f340.onrender.com"

export const cleanCurrentUser = () => {

    return {
        type: CLEAN_USER_BY_EMAIL,
        payload: {
            currentUser: null,
        },
    };

}
export const getUserByEmail = (email) => {

    return async (dispatch) => {

        try {
            console.log("email", email);
            const { data } = await axios.get(`${API_BASE_URL}/user-email?email=${email}`);

            console.log("dat", data);
            if (data.banned) {

                return;
            }
            dispatch({

                type: USER_BY_EMAIL,
                payload: data
            })
        } catch (error) {
            /* throw new Error(error.response.data.error); */  //COMENTADO HASTA QUE RECIBA ALGO DEL BACK
            throw new Error(`Error de sesion: ${error.message}`)
        }
    };
};

export const getUserByNick = (nick, password, auth) => {

    return async (dispatch) => {

        try {

            const { data } = await axios.get(`${API_BASE_URL}/user-nick?nick=${nick}`);


            if (data.banned)
                throw new Error(`El usuario con email ${data.email} se encuentra bloqueado.`)
            await auth.login(data.email, password);
            dispatch({

                type: USER_BY_NICK,
                payload: data
            })
        } catch (error) {
            /* throw new Error(error.response.data.error); */  //COMENTADO HASTA QUE RECIBA ALGO DEL BACK
            throw new Error(`Error de sesion: ${error.message}`)
        }
    };
};
export const fetchUserProfile = () => async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getUsers`);
      // Aquí se asume que devuelves un array de usuarios, tomamos el primero como ejemplo.
      const user = response.data[0]; 
      dispatch({
        type: FETCH_USER_PROFILE,
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: USER_ACTION_ERROR,
        payload: error.message,
      });
    }
  };
  
  // Action para actualizar el perfil de usuario
  export const updateUserProfile = (userId, updatedData) => async (dispatch) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/actualizar-usuario/${userId}`,
        updatedData
      );
  
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: response.data, // Asume que el backend devuelve el usuario actualizado
      });
    } catch (error) {
      dispatch({
        type: USER_ACTION_ERROR,
        payload: error.message,
      });
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

export const administrarUser = (nick) => {

    return async (dispatch) => {

        try {

            const { data } = await axios.get(`${API_BASE_URL}/user-nick?nick=${nick}`);

            dispatch({

                type: ADMINISTRAR_USER,
                payload: data
            })
        } catch (error) {
            /* throw new Error(error.response.data.error); */  //COMENTADO HASTA QUE RECIBA ALGO DEL BACK
            throw new Error(`Error de sesion: ${error.message}`)
        }
    };
};

export const promo1millon = () => {

    return async (dispatch) => {

        try {

            const { data } = await axios.get(`${API_BASE_URL}/getUsers`);


            const userCount = Array.isArray(data) ? data.length : data.count; // Verifica si es un arreglo o un objeto con 'count'
            console.log(userCount, "usercount");
            dispatch({
                type: PROMO1K,
                payload: userCount,
            });
        } catch (error) {
            /* throw new Error(error.response.data.error); */  //COMENTADO HASTA QUE RECIBA ALGO DEL BACK

            throw new Error(`Error al añadir las fichas: ${error.message}`)
        }
    };
};
// Acción para obtener los juegos favoritos de un usuario
export const fetchFavoriteGames = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/favorites/${userId}`);
        const favoriteGamesIds = response.data;

        console.log('Juegos favoritos:', favoriteGamesIds);
    
        dispatch({
          type: FETCH_FAVORITES_SUCCESS,
          payload: favoriteGamesIds, // Asegúrate de que esto sea un array de IDs
        });
    } catch (error) {
        console.error("Error fetching favorite games:", error);
        dispatch({ type: FETCH_FAVORITES_FAILURE, payload: error.message });
    }
};

// Acción para agregar un juego a favoritos
export const addFavoriteGame = (userId, gameId) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/favorites`, { userId, gameId });
        console.log('estoy despach fav')
        dispatch({ type: ADD_FAVORITE_SUCCESS, payload: response.data }

        );
        dispatch(fetchFavoriteGames(userId));
    } catch (error) {
        console.error("Error adding favorite game:", error);
        dispatch({ type: ADD_FAVORITE_FAILURE, payload: error.message });
    }
};

// Acción para eliminar un juego de favoritos
export const removeFavoriteGame = (userId, gameId) => async (dispatch) => {
    try {
        const response= await axios.delete(`${API_BASE_URL}/favorites/${userId}/${gameId}`);
        dispatch({ type: REMOVE_FAVORITE_SUCCESS, payload: gameId });
        dispatch(fetchFavoriteGames(userId))
        console.log('remueve', response.data )
    } catch (error) {
        console.error("Error removing favorite game:", error);
        dispatch({ type: REMOVE_FAVORITE_FAILURE, payload: error.message });
    }
};

export const createGame = (gameData) => async (dispatch) => {
    dispatch({ type: CREATE_GAME_REQUEST });
  
    try {
      const response = await axios.post(`${API_BASE_URL}/game/create`, gameData);
      dispatch({ type: CREATE_GAME_SUCCESS, payload: response.data });
      
    } catch (error) {
      dispatch({ type: CREATE_GAME_FAILURE, payload: error.message });
    }
  };
