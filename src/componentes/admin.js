import React from "react";
import Plantilla from "../componentescomunes/plantilla";
import { NavLink } from "react-router-dom";
import RutasAdmin from "../rutas/rutasadmin";
import { connect } from "react-redux";
import FormLogin from "../componentescomunes/formlogin";
import { IoIosPerson, IoMdSearch } from 'react-icons/io';
import { Nav,Form, Col, Button, Row, CardGroup, Card } from 'react-bootstrap';

class Admin extends React.Component {
  render() {
    return (
      <Plantilla>
        {this.props.usuario.logged && this.props.usuario.rol == "ADMI" ? (
          <>
            <Nav fill variant="tabs" defaultActiveKey="/admin/calendario">
              <Nav.Item style={estiloMenuAdmin}>
                <NavLink className="nav-link" to="/admin/calendario"> Gestionar Calendario </NavLink>
              </Nav.Item>
              <Nav.Item style={estiloMenuAdmin}>
                <NavLink className="nav-link" to="/admin/reservas"> Gestionar Reservas </NavLink>
              </Nav.Item>
              <Nav.Item style={estiloMenuAdmin}>
                <NavLink className="nav-link" to="/admin/salas"> Gestionar Salas </NavLink>
              </Nav.Item>
              <Nav.Item style={estiloMenuAdmin}>
                <NavLink className="nav-link" to="/admin/accesorios"> Gestionar Accesorios </NavLink>
              </Nav.Item>
            </Nav>
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
const estiloMenuAdmin ={
  color:'rgb(0,0,0) !important',
  fontSize:'1em'
}
const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(Admin);
