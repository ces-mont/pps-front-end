import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App.js';
import rootReducer from './redux/rootreducer';
//import CSS from "../static_files/index.css";

// Respaldar Redux en el LocalStorage
function saveOnLocalStorage(estado){
    try {
        const estadoAux = JSON.stringify(estado);
        localStorage.setItem('estado',estadoAux);
    } catch (error) {}
};
function loadOfLocalStorage(){
    try {
        const estadoAux = localStorage.getItem('estado');
        if(estadoAux === null){
            return undefined
        }
        return JSON.parse(estadoAux);
    } catch (error) { return undefined; }
}

const store = createStore(rootReducer, loadOfLocalStorage(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(()=>saveOnLocalStorage(store.getState()));

class Index extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));