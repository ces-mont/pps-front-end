import React from 'react';
import { Navbar } from 'react-bootstrap';
import { IoLogoTwitter, IoLogoLinkedin, IoLogoYoutube } from "react-icons/io5"

export default class Pie extends React.Component {
    render() {
        return (
            <Navbar expand="lg" fixed="bottom" style={{paddingBottom:'0'}}>
            <div id="idPie">
                <p>
                    Departamento de Ingeniería en Sistemas de Información<br/>
                    Universidad Tecnológica Nacional - Facultad Regional Buenos Aires<br/>
                    Medrano 951 (C1179AAQ) C.A.B.A. - Oficina 318 - Tel: (54 11) 4867-7552
                </p>
            </div>
            </Navbar>
        )
    }
}