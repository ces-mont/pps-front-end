import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, CardGroup, Card, Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { IoLogoTwitter, IoLogoLinkedin, IoLogoYoutube } from "react-icons/io5"
import { style } from 'dom-helpers';

// Ver de incluir un Tabs + Tab
const setin = (e) => {
    e.target.style['background-color'] = 'red'
    let att = e.target.getAttribute('style')
    console.log('att ', att)
    console.log('event.target: ', e.target)
}/* 
const MenuPrincipal = ({usuario})=> {
    return(
            <Navbar expand="lg" className="justify-content-center mb-2" sticky="top" bg="light" style={estiloMenuPrincipal}>
                <NavLink to="/" className="nav-link" aria-current="page" aria-selected="true"><Navbar.Brand onClick={setin}>Inicio</Navbar.Brand></NavLink>
                <NavLink to="/login" className="nav-link" aria-selected="false"><Navbar.Brand onClick={setin}>{usuario.logged? <>Salir</>:<>Ingresar</>}</Navbar.Brand></NavLink>
                <NavLink to="/salas" className="nav-link" aria-selected="false"><Navbar.Brand onClick={setin}>Salas</Navbar.Brand></NavLink>
                <NavLink to="/accesorios" className="nav-link" aria-selected="false"><Navbar.Brand>Dispositivos</Navbar.Brand></NavLink>
                <NavLink to="/reservarsala" className="nav-link" aria-selected="false"><Navbar.Brand>Reservar Sala</Navbar.Brand></NavLink>
                <NavLink to="/reservaraccesorios" className="nav-link" aria-selected="false"><Navbar.Brand>Reserva Dispositivo</Navbar.Brand></NavLink>
                <NavLink to="/admin" className="nav-link" aria-selected="false"><Navbar.Brand>Administrar Laboratorio</Navbar.Brand></NavLink>
                <NavLink to="/calendario" className="nav-link" aria-selected="false"><Navbar.Brand>Calendario</Navbar.Brand></NavLink>
            </Navbar>
    )
} */
const MenuPrincipal = ({ usuario }) => {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/inicio" expand="lg" className="justify-content-center mb-2 mt-1" sticky="top" bg="light" style={estiloMenuPrincipal}>
            <NavLink to="/inicio" className="nav-link" aria-current="page" aria-selected="true"><Navbar.Brand >Inicio</Navbar.Brand></NavLink>
            <NavLink to="/login" className="nav-link" aria-selected="false"><Navbar.Brand >{usuario.logged ? <>Salir</> : <>Ingresar</>}</Navbar.Brand></NavLink>
            <NavLink to="/salas" className="nav-link" aria-selected="false"><Navbar.Brand >Salas</Navbar.Brand></NavLink>
            <NavLink to="/accesorios" className="nav-link" aria-selected="false"><Navbar.Brand>Dispositivos</Navbar.Brand></NavLink>
            <NavLink to="/reservarsala" className="nav-link" aria-selected="false"><Navbar.Brand>Reservar Sala</Navbar.Brand></NavLink>
            <NavLink to="/reservaraccesorios" className="nav-link" aria-selected="false"><Navbar.Brand>Reserva Dispositivo</Navbar.Brand></NavLink>
            <NavLink to="/admin" className="nav-link" aria-selected="false"><Navbar.Brand>Administrar Laboratorio</Navbar.Brand></NavLink>
        </Nav>
    )
}
const estiloMenuPrincipal = {
    textColor: 'red !important',
    padding: '0 0 0 0',
    width: '100%',
    justifyContent: 'space-between',
}
const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(MenuPrincipal);