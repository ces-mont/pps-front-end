import React from 'react';
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, CardGroup, Card, Navbar, Container, Badge, NavDropdown } from 'react-bootstrap';
import { IoLogoTwitter, IoLogoLinkedin, IoLogoYoutube } from "react-icons/io5"
import {BsYoutube} from 'react-icons/bs';

export default class Cabecera extends React.Component {
    render() {
        return (
            <>
                <Container >
                    <Navbar expand="lg" style={{ backgroundColor: "rgb(255,255,255)" }}>
                        <Row style={{ width: "100%", margin: "0.45em 0em 0em 0.8em", padding: "0" }}>
                            <Col xs={6}>
                                <a href="/" id="rt-logo"><img src="images/logo_disi.png" /></a>
                            </Col>
                            <Col xs={6}>
                                <Row >
                                    <div id="idIconosSociales1">
                                        <a href="https://twitter.com/frbautn" target="_blank"> <IoLogoTwitter className="iconoSocial1" /> </a>
                                        <a className="social-button rt-social-button-2" href="http://www.linkedin.com/pub/prensa-utn-buenos-aires/2b/1a3/967" target="_blank"><IoLogoLinkedin className="iconoSocial1" /> </a>
                                        <a className="social-button rt-social-button-3" href="https://www.youtube.com/user/utnbuenosaires1" target="_blank"><BsYoutube className="iconoSocial1" /></a>
                                    </div>
                                </Row>
                                <Row>
                                    <div id="idMenuNav1">
                                        <a href="http://www.campusvirtual.frba.utn.edu.ar/especialidad/course/category.php?id=42" title="Campus Virtual" target="_blank" className="linkCabecera">WEBCAMPUS</a>
                                        <a href="http://www.frba.utn.edu.ar/" title="UTN FRBA" target="_blank" className="linkCabecera">UTN FRBA</a>
                                        <a href="https://webmail.frba.utn.edu.ar/" title="WebMail" target="_blank" className="linkCabecera">WEBMAIL</a>
                                        <a href="/index.php/mapa-del-sitio" className="linkCabecera">MAPA DEL SITIO</a>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Navbar>
                </Container>
                <div id="idFranjaMenuNav"></div>
            </>
        )
    }
}