import React from 'react';
import MenuPrincipal from './menuprincipal';
import Cabecera from './cabecera';
import Pie from './pie';

const Plantilla = ({ children }) => 
        <>
            <Cabecera />
            <div className="container">
                <MenuPrincipal />
                {children}
            </div>
            <Pie />
        </>

export default Plantilla;