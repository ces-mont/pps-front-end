import React from "react";
import Plantilla from "../componentescomunes/plantilla";
import { NavLink } from "react-router-dom";
import RutasAdmin from "../rutas/rutasadmin";
import { connect } from "react-redux";
import FormLogin from "../componentescomunes/formlogin";

class Admin extends React.Component {
  render() {
    return (
      <Plantilla>
        {this.props.usuario.logged && this.props.usuario.rol == "ADMI" ? (
          <>
            <nav className="nav nav-tabs nav-fill">
              <div className="nav-item">
                <NavLink className="nav-link" to="/admin/calendario"> Gestionar Calendario </NavLink>
              </div>
              <div className="nav-item">
                <NavLink className="nav-link" to="/admin/reservas"> Gestionar Reservas </NavLink>
              </div>
              <div className="nav-item">
                <NavLink className="nav-link" to="/admin/salas"> Gestionar Salas </NavLink>
              </div>
              <div className="nav-item">
                <NavLink className="nav-link" to="/admin/accesorios"> Gestionar Accesorios </NavLink>
              </div>
            </nav>
            <RutasAdmin />
          </>
        ) : (
          <>
            <h3>Para realizar estas tareas primero debe loguearse como administrador</h3>
            <FormLogin />
          </>
        )}
      </Plantilla>
    );
  }
}

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(Admin);
