import {ADD_TOKEN, LOGIN_SUCCESS} from '../actions/useractions';

const initialState = {logged:false, token:'', nombre:'',apellido:'',rol:''}

const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload.token,
                nombre: action.payload.nombre,
                apellido: action.payload.apellido,
                rol: action.payload.rol,
                idUsuario: action.payload.idUsuario
            }
        case LOGIN_SUCCESS:
            return{...state,logged:true}
        default:
            return state;
    }
}

export default userReducer;