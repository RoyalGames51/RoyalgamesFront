import { USER_BY_EMAIL } from "../actions/action.types";


const initialState = {
    currentUser: {}
}
const reducer = (state = initialState, action) => {
   //DESDE ACA MANEJA LA CANT DE OBJETO POR PAGINA

    switch (action.type) {

        case USER_BY_EMAIL:
            return {
                ...state,
                currentUser: action.payload
            }
            default:
                    return { ...state };
    }}


    export default reducer