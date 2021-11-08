import React, { useState } from "react";
import { connect } from "react-redux";
import { doJwtPreflightCorsPutRequest, doJwtPreflightCorsDeleteRequest } from "../apirequests/requests";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, CardGroup, Card, Jumbotron, Badge } from 'react-bootstrap';

class ItemReservAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            e: this.props.e,
            pass: null,
            motivo: '',
            resolviendo: false,
        }
        this.resolver = this.resolver.bind(this)
    }
    resolver = (e) => {
        console.log('e.target: ', e.target)
        console.log('e.target.value: ', e.target.value)
        console.log('e.target.accion: ', e.target.accion)
        console.log('this.state.e: ', this.state.e)
        this.setState({ resolviendo: false })
    }

    render() {
        return (
            <>
                <tr>
                    <td>{this.state.e.Sala.descripcionCorta}</td>
                    <td>{this.state.e.especialidad}</td>
                    <td>{this.state.e.materia}</td>
                    <td>{this.state.e.Usuario.nombre} {this.state.e.Usuario.apellido}</td>
                    <td>{this.state.e.fechaSolicitud}</td>
                    <td>{this.state.e.horaInicio}-{this.state.e.horaFin}</td>
                    <td>{this.state.e.cantidadAlumnos}</td>
                    <td>{this.state.e.comentario}</td>
                    <td>
                        <ButtonGroup vertical>
                            <Button size="sm" onClick={() => this.setState({ resolviendo: true })} value="c">Confirmar</Button>
                            <Button size="sm" onClick={() => this.setState({ resolviendo: true })} value="r">Rechazar</Button>
                        </ButtonGroup>
                    </td>
                </tr>
                {this.state.resolviendo ?
                    <tr>
                        <th colSpan="9">
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={1}> Motivo:</Form.Label>
                                <Col sm={8}> <Form.Control as="textarea" placeholder="indique el motivo" /></Col>
                                <Form.Label column sm={1} > Contraseña:</Form.Label>
                                <Col sm={2}> <Form.Control type="text" placeholder="ingresar contraseña" /> </Col>
                            </Form.Group>
                            <Button size="sm" type="submit" onClick={this.resolver}>Confirmar</Button>
                            <Button size="sm" onClick={() => this.setState({ resolviendo: false })}>Cancelar</Button>
                        </th>
                    </tr>
                    : null
                }
            </>
        )
    }
};

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(ItemReservAdmin);
