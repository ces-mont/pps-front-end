import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CalendarioAdmin from '../componentes/calendarioadmin';
import ReservasAdmin from '../componentes/reservasadmin';
import GestionSalas from '../componentes/gestionsalas';
import GestionAccesorios from '../componentes/gestionaccesorios';

export default class RutasAdmin extends React.Component{
    render(){
        return(
                <Switch>
                    <Route path="/admin/calendario" exact > <CalendarioAdmin/></Route>
                    <Route path="/admin/reservas" exact><ReservasAdmin /></Route>
                    <Route path="/admin/accesorios" exact><GestionAccesorios /></Route>
                    <Route path="/admin/salas" exact><GestionSalas /></Route>
                </Switch>
        )
    }
}