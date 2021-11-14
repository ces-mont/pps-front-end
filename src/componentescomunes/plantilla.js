import React from 'react';
import MenuPrincipal from './menuprincipal';
import Cabecera from './cabecera';
import Pie from './pie';
import Container from 'react-bootstrap/Container';


const Plantilla = ({ children }) => 
        <>
            <Cabecera />
            <div style={{paddingBottom:'7.5em'}}>
                <Container>
                <MenuPrincipal />
                {children}
                </Container>
            </div>
            <Pie />
        </>

export default Plantilla;