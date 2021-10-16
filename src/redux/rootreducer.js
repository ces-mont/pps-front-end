import { combineReducers } from 'redux';
import userReducer from './reducers/userreducer';
//import searchReducer from './reducers/searchreducer'

//const rootReducer = combineReducers({ userReducer,searchReducer })
const rootReducer = combineReducers({ userReducer })

export default rootReducer;