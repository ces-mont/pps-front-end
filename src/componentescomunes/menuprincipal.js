import React from 'react';
import { NavLink } from 'react-router-dom';
//import { IoIosPerson, IoMdSearch } from 'react-icons/io';
//import { Navbar, Nav, Button,Row} from 'react-bootstrap';

// Ver de incluir un Tabs + Tab
const MenuPrincipal = ()=> 
            <ul>
                <li><NavLink to="/"  className="ml-1">Inicio</NavLink></li>
                <li><NavLink to="/salas"  className="ml-1">Salas</NavLink></li>
                <li><NavLink to="/accesorios"  className="ml-1">Dispositivos</NavLink></li>
                <li><NavLink to="/reservarsala"  className="ml-1">Reservar Sala</NavLink></li>
                <li><NavLink to="/reservaraccesorios"  className="ml-1">Reserva Dispositivo</NavLink></li>
                <li><NavLink to="/admin"  className="ml-1">Administrar Laboratorio</NavLink></li>
                <li><NavLink to="/calendario"  className="ml-1">Calendario</NavLink></li>
            </ul>
export default MenuPrincipal