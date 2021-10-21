import React from "react";
import Plantilla from "../componentescomunes/plantilla";
import { NavLink } from 'react-router-dom';
import RutasAdmin from "../rutas/rutasadmin";

class Admin extends React.Component {
    render() {
        return (
            <Plantilla>
              <nav className="nav nav-tabs nav-fill">
                <div className="nav-item" ><NavLink className="nav-link" to="/admin/calendario">Gestionar Calendario</NavLink></div>
                <div className="nav-item" ><NavLink className="nav-link" to="/admin/reservas">Gestionar Reservas</NavLink></div>
                <div className="nav-item" ><NavLink className="nav-link" to="/admin/salas">Gestionar Salas</NavLink></div>
                <div className="nav-item" ><NavLink className="nav-link" to="/admin/accesorios">Gestionar Accesorios</NavLink></div>
              </nav>
              <RutasAdmin />
            </Plantilla>
        );
    }
};

export default Admin;