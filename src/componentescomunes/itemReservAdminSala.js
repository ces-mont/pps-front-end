import React, { useState } from "react";
import { connect } from "react-redux";
import { doJwtPreflightCorsPostRequest } from "../apirequests/requests";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, CardGroup, Card, Jumbotron, Badge } from 'react-bootstrap';

class ItemReservAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            e: this.props.e,
            pass: '',
            motivo: '',
            accion: '',
            resolviendo: false,
            msj: '',
            showModal: false
        }
        this.resolver = this.resolver.bind(this);
        this.cierraModal = this.cierraModal.bind(this)
    }
    resolver = (e) => {
        doJwtPreflightCorsPostRequest('/salas/resolverreserva',
            JSON.stringify({
                idSolicitudSala: this.state.e.idSolicitudSala,
                accion: this.state.accion,
                contrasenia: this.state.pass,
                idusuario: this.props.usuario.idUsuario
            }),
            false, this.props.usuario.token)
            .then(rta => {
                this.setState({ resolviendo: false })
                this.props.eliminar(this.props.indice)
            })
            .catch(err => {
                this.setState({ msj:err.message, showModal:true })
            });
    }
    cierraModal(){
        this.setState({pass:'',showModal:false})
    }

    render() {
        return (
            <>
                <tr className={(this.props.id == this.props.idSolicitudSalaSeleccionada) ? 'table-dark' : null} onClick={this.props.selecc}>
                    <td>{this.state.e.Sala.descripcionCorta}</td>
                    <td>{this.state.e.fechaSolicitud}</td>
                    <td>{this.state.e.especialidad}</td>
                    <td>{this.state.e.materia}</td>
                    <td>{this.state.e.Usuario.nombre} {this.state.e.Usuario.apellido}</td>
                    <td>{this.state.e.fechaPedida}</td>
                    <td>{this.state.e.horaInicio}-{this.state.e.horaFin}</td>
                    <td>{this.state.e.cantidadAlumnos}</td>
                    <td>{this.state.e.comentario}</td>
                    <td>
                        {(this.props.hayChoque > 0) && (this.props.id == this.props.idSolicitudSalaSeleccionada) ? <Badge bg="danger" className="py-1 my-1">Horarios ya reservados</Badge> : null}
                        <ButtonGroup vertical>
                            <Button size="sm" disabled={(this.props.id !== this.props.idSolicitudSalaSeleccionada) || ((this.props.hayChoque > 0) && (this.props.id == this.props.idSolicitudSalaSeleccionada))} 
                                onClick={() => this.setState({ resolviendo: true, accion: event.target.value })} value="c">Confirmar</Button>
                            <Button size="sm" disabled={(this.props.id !== this.props.idSolicitudSalaSeleccionada)} 
                                onClick={() => this.setState({ resolviendo: true, accion: event.target.value })} value="r">Rechazar</Button>
                        </ButtonGroup>
                    </td>
                </tr>
                {this.state.resolviendo ?
                    <tr>
                        <th colSpan="10">
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="fw-normal" column sm={1}> Motivo:</Form.Label>
                                <Col sm={8}> <Form.Control name="motivo" as="textarea" placeholder="indique el motivo" value={this.state.motivo} onChange={e => this.setState({ motivo: e.target.value })} /></Col>
                                <Form.Label className="fw-normal" column sm={1} > Contraseña de administrador:</Form.Label>
                                <Col sm={2}> <Form.Control name="contrasenia" type="password" placeholder="ingresar contraseña" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} /> </Col>
                            </Form.Group>
                            <Button className="me-1" size="sm" type="submit" onClick={this.resolver}>Confirmar</Button>
                            <Button size="sm" onClick={() => this.setState({ resolviendo: false })}>Cancelar</Button>
                        </th>
                    </tr>
                    : null
                }

                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header closeButton> <Modal.Title>Gestión de reservas</Modal.Title> </Modal.Header>
                    <Modal.Body> <p style={{ color: 'rgb(5,6,28' }}>{this.state.msj}</p> </Modal.Body>
                    <Modal.Footer> <Button variant="primary" onClick={this.cierraModal}>Ok</Button> </Modal.Footer>
                </Modal>
            </>
        )
    }
};

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(ItemReservAdmin);
