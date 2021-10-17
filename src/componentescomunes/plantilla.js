import React from 'react';
import MenuPrincipal from './menuprincipal';
import Cabecera from './cabecera';
import Pie from './pie';
//import {Container } from 'react-bootstrap';

const Plantilla = ({ children }) => 
        <>
            <Cabecera />
                <MenuPrincipal />
                {children}
            <Pie />
        </>

export default Plantilla;