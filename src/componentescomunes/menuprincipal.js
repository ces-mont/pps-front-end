import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, CardGroup, Card, Navbar, Nav,Container, Badge, NavDropdown } from 'react-bootstrap';
import { IoLogoTwitter, IoLogoLinkedin, IoLogoYoutube } from "react-icons/io5"

// Ver de incluir un Tabs + Tab
const MenuPrincipal = ({usuario})=> {
    return(
            <Navbar expand="lg" className="justify-content-center" sticky="top" bg="light" style={{padding:'0 0 0 0',width:'100%',justifyContent:'space-between'}}>
                <NavLink to="/" className="nav-link" aria-current="page" aria-selected="true"><Navbar.Brand>Inicio</Navbar.Brand></NavLink>
                <NavLink to="/login" className="nav-link" aria-selected="false"><Navbar.Brand>{usuario.logged? <>Salir</>:<>Ingresar</>}</Navbar.Brand></NavLink>
                <NavLink to="/salas" className="nav-link" aria-selected="false"><Navbar.Brand>Salas</Navbar.Brand></NavLink>
                <NavLink to="/accesorios" className="nav-link" aria-selected="false"><Navbar.Brand>Dispositivos</Navbar.Brand></NavLink>
                <NavLink to="/reservarsala" className="nav-link" aria-selected="false"><Navbar.Brand>Reservar Sala</Navbar.Brand></NavLink>
                <NavLink to="/reservaraccesorios" className="nav-link" aria-selected="false"><Navbar.Brand>Reserva Dispositivo</Navbar.Brand></NavLink>
                <NavLink to="/admin" className="nav-link" aria-selected="false"><Navbar.Brand>Administrar Laboratorio</Navbar.Brand></NavLink>
                <NavLink to="/calendario" className="nav-link" aria-selected="false"><Navbar.Brand>Calendario</Navbar.Brand></NavLink>
            </Navbar>
    )
}
const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(MenuPrincipal);