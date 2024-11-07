import { CLEAN_USER_BY_EMAIL, USER_BY_EMAIL, USER_BY_NICK } from "./action.types";
import axios from 'axios'






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
            console.log("email",email);
            const { data } = await axios.get(`https://royalback-du3v.onrender.com/user/email`, email);
           
console.log("dat",data);
            if(data.banned)
                throw new Error(`El usuario con email ${data.email} se encuentra bloqueado.`)
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

export const getUserByNick = (nick) => {
   
    return async (dispatch) => {
        
        try {
            const { data } = await axios.get(`https://royalback-du3v.onrender.com/user/nick`,nick);
           

            if(data.banned)
                throw new Error(`El usuario con email ${data.email} se encuentra bloqueado.`)
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