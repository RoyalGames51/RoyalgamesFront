import {
    USER_BY_EMAIL, CLEAN_USER_BY_EMAIL, USER_BY_NICK, ADMINISTRAR_USER, PROMO1K, REMOVE_FAVORITE_SUCCESS, ADD_FAVORITE_SUCCESS, FETCH_FAVORITES_FAILURE, FETCH_FAVORITES_SUCCESS, FETCH_USER_PROFILE,
    UPDATE_USER_PROFILE,
    USER_ACTION_ERROR,
    CREATE_GAME_REQUEST,
    CREATE_GAME_SUCCESS,
    CREATE_GAME_FAILURE,
} from "../actions/action.types";


const initialState = {
    favoriteGames: [],
    games: [],
    loading: false,
    error: null,
    currentUser: {},
    administradorUser: {},
    counterUser: {}
}
const reducer = (state = initialState, action) => {
    //DESDE ACA MANEJA LA CANT DE OBJETO POR PAGINA

    switch (action.type) {

        case CLEAN_USER_BY_EMAIL:
            return {
                ...state,
                currentUser: action.payload
            }


        case USER_BY_EMAIL:
            return {
                ...state,
                currentUser: action.payload
            }
        case USER_BY_NICK:
            return {
                ...state,
                currentUser: action.payload
            }
        case FETCH_USER_PROFILE:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
            };

        case UPDATE_USER_PROFILE:
            return {
                ...state,
                currentUser: action.payload, // Actualiza los datos del usuario
                error: null,
            };

        case USER_ACTION_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        case CREATE_GAME_REQUEST:
            return { ...state, loading: true };

        case CREATE_GAME_SUCCESS:
            return { ...state, loading: false, games: [...state.games, action.payload] };

        case CREATE_GAME_FAILURE:
            return { ...state, loading: false, error: action.payload };
            
        case ADMINISTRAR_USER:
            return {
                ...state,
                administradorUser: action.payload
            }
        case PROMO1K:
            return {
                ...state,
                counterUser: action.payload
            }

        case FETCH_FAVORITES_SUCCESS:
            return { ...state, favoriteGames: action.payload, loading: false };
        case FETCH_FAVORITES_FAILURE:
            return { ...state, error: action.payload, loading: false };
        case ADD_FAVORITE_SUCCESS:
            return { ...state, favoriteGames: [...state.favoriteGames, action.payload] };
        case REMOVE_FAVORITE_SUCCESS:
            return {
                ...state,
                favoriteGames: state.favoriteGames.filter(
                    (game) => game.id !== action.payload
                ),
            };

        default:
            return { ...state };
    }
}


export default reducer