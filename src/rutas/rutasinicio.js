import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../componentes/home';
import Salas from '../componentes/salas';
import Accesorios from '../componentes/accesorios';
import ReservarSala from '../componentes/reservasala';
import Admin from '../componentes/admin';
import ReservaAccesorios from '../componentes/reservaaccesorios';
import Calendario from '../componentes/calendario';
import Login from '../componentes/login';

export default class RutasInicio extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/" exact ><Home /></Route>
                    <Route path="/salas"  exact><Salas /></Route>
                    <Route path="/accesorios" exact ><Accesorios /></Route>
                    <Route path="/reservarsala" exact component={(props) => <ReservarSala herencia={props} />} />
                    <Route path="/reservaraccesorios" exact ><ReservaAccesorios /></Route>
                    <Route path="/admin" component={Admin} ></Route>
                    <Route path="/calendario" exact ><Calendario /></Route>
                    <Route path="/login" exact><Login /></Route>
                </Switch>
            </Router>
        )
    }
}