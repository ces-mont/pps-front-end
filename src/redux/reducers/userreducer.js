import {SET_USER, LOGIN_SUCCESS, LOGOUT} from '../actions/useractions';

const initialState = {logged:false, token:'', nombre:'',apellido:'',rol:'',idUsuario:''}

const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_USER:
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
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default userReducer;