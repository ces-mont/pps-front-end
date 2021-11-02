import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";

// Ver de incluir un Tabs + Tab
const MenuPrincipal = ({usuario})=> {
    return(
            <nav className="nav "  id="nav-tab" role="tablist" >
                <div className="nav-item" ><NavLink to="/" className="nav-link" aria-current="page" aria-selected="true">Inicio</NavLink></div>
                <div className="nav-item" ><NavLink to="/login" className="nav-link" aria-selected="false">{usuario.logged? <>Salir</>:<>Ingresar</>}</NavLink></div>
                <div className="nav-item" ><NavLink to="/salas" className="nav-link" aria-selected="false">Salas</NavLink></div>
                <div className="nav-item" ><NavLink to="/accesorios" className="nav-link" aria-selected="false">Dispositivos</NavLink></div>
                <div className="nav-item" ><NavLink to="/reservarsala" className="nav-link" aria-selected="false">Reservar Sala</NavLink></div>
                <div className="nav-item" ><NavLink to="/reservaraccesorios" className="nav-link" aria-selected="false">Reserva Dispositivo</NavLink></div>
                <div className="nav-item" ><NavLink to="/admin" className="nav-link" aria-selected="false">Administrar Laboratorio</NavLink></div>
                <div className="nav-item" ><NavLink to="/calendario" className="nav-link" aria-selected="false">Calendario</NavLink></div>
            </nav>
    )
}
const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(MenuPrincipal);