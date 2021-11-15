import React, { useState } from "react";
import { connect } from "react-redux";
import { doJwtPreflightCorsPostRequest } from "../apirequests/requests";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, CardGroup, Card, Jumbotron, Badge } from 'react-bootstrap';

class ItemReservAdminAcc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            e: this.props.e,
            pass: null,
            motivo: '',
            accion:null,
            resolviendo: false,
        }
        this.resolver = this.resolver.bind(this);
    }
    resolver = (e) => {
        console.log('e.target: ', e.target)
        console.log('e.target.value: ', e.target.value)
        console.log('e.target.accion: ', e.target.accion)
        console.log('this.state.e: ', this.state.e)
        doJwtPreflightCorsPostRequest('/salas/resolverreserva', 
            JSON.stringify({
                idSolicitudSala:this.state.e.idSolicitudSala, 
                accion:this.state.accion}),
            false,this.props.usuario.token)
        .then(rta=>{
          console.log('rta: ',rta);
          this.setState({ resolviendo: false })
          this.props.eliminar(this.props.indice)
        })
        .catch(err=>console.log('calendario-err: ',err));
    }

    render() {
        return (
            <>
                <tr className={(this.props.id==this.props.idSolicitudAccSeleccionado)?'table-dark':null} onClick={this.props.selecc}>
                    <td>{this.state.e.Accesorio.descripcionCorta}</td>
                    <td>{this.state.e.fechaSolicitud}</td>
                    <td>{this.state.e.especialidad}</td>
                    <td>{this.state.e.materia}</td>
                    <td>{this.state.e.Usuario.nombre} {this.state.e.Usuario.apellido}</td>
                    <td>{this.state.e.fechaPedida}</td>
                    <td>{this.state.e.horaInicio}-{this.state.e.horaFin}</td>
                    <td>{this.state.e.cantidad}</td>
                    <td>{this.state.e.comentario}</td>
                    <td>
                        <ButtonGroup vertical>
                            <Button size="sm" disabled={(this.props.id!==this.props.idSolicitudAccSeleccionado)} onClick={() => this.setState({ resolviendo: true ,accion:event.target.value})} value="c">Confirmar</Button>
                            <Button size="sm" disabled={(this.props.id!==this.props.idSolicitudAccSeleccionado)} onClick={() => this.setState({ resolviendo: true ,accion:event.target.value })} value="r">Rechazar</Button>
                        </ButtonGroup>
                    </td>
                </tr>
                {this.state.resolviendo ?
                    <tr>
                        <th colSpan="10">
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label className="fw-normal" column sm={1}> Motivo:</Form.Label>
                                <Col sm={8}> <Form.Control as="textarea" placeholder="indique el motivo" /></Col>
                                <Form.Label className="fw-normal"column sm={1} > Contraseña de administrador:</Form.Label>
                                <Col sm={2}> <Form.Control type="text" placeholder="ingresar contraseña" /> </Col>
                            </Form.Group>
                            <Button className="me-1" size="sm" type="submit" onClick={this.resolver}>Confirmar</Button>
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
export default connect(mapStateToProps, null)(ItemReservAdminAcc);
