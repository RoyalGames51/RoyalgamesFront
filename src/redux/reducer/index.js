import { USER_BY_EMAIL, CLEAN_USER_BY_EMAIL, USER_BY_NICK, ADMINISTRAR_USER, PROMO1K } from "../actions/action.types";


const initialState = {
    currentUser: {},
    administradorUser: {},
    counterUser:{}
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
        case ADMINISTRAR_USER:
            return {
                ...state,
                administradorUser: action.payload
            }
        case PROMO1K:
            return{
                ...state,
                counterUser:action.payload
            }
        default:
            return { ...state };
    }
}


export default reducer