import React, { useState } from "react";
import { connect } from "react-redux";
import { doJwtPreflightCorsPostRequest } from "../apirequests/requests";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, Badge, CardGroup, Card, Jumbotron } from 'react-bootstrap';

const FormSala = ({ usuario, subiendo }) => {
  const [tipo, setTipo] = useState('');
  const [descripcionCorta, setDescripcionCorta] = useState('');
  const [descripcionLarga, setDescripcionLarga] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [urlImagen, setUrlImagen] = useState('');

  const crearSala = (e) => {
    e.preventDefault();
    console.log('nuevaSala->')
    let sala = { tipo, ubicacion, descripcionLarga, descripcionCorta, urlImagen }
    console.log('sala', sala)
    doJwtPreflightCorsPostRequest('/salas', JSON.stringify({ tipo, ubicacion, descripcionLarga, descripcionCorta, urlImagen, idUsuario: usuario.idUsuario }), false, usuario.token)
      .then(rta => {
        console.log('rta ', rta);
        subiendo(false)
      })
      .catch(err => console.log('err ', err));
  }
  return (
    <Form onSubmit={crearSala} className="mt-1 p-3 border">
      <Row className="mb-1">
        <Col xs={3}>
          <label className="col-form-label">Tipo de sala</label>
        </Col>
        <Col xs={9}>
          <input type="text" id="idTipo" className="form-control" value={tipo} onChange={() => setTipo(event.target.value)} />
          <div className="col-auto"><span id="tipoInline" className="form-text">tipo de sala</span></div>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col xs={3}>
          <label className="col-form-label">Nombre o breve descripción</label>
        </Col>
        <Col xs={9}>
          <input type="text" id="idTipo" className="form-control" value={descripcionCorta} onChange={() => setDescripcionCorta(event.target.value)} />
          <span id="tipoInline" className="form-text">descripción corta de la sala</span>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col xs={3}>
          <label className="col-form-label">Descripción detallada</label>
        </Col>
        <Col xs={9}>
          <input type="text" id="idTipo" className="form-control" value={descripcionLarga} onChange={() => setDescripcionLarga(event.target.value)} />
          <span id="tipoInline" className="form-text">descripción detallada de la sala</span>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col xs={3}>
          <label className="col-form-label">Ubicación</label>
        </Col>
        <Col xs={9}>
          <input type="text" id="idTipo" className="form-control" value={ubicacion} onChange={() => setUbicacion(event.target.value)} />
          <span id="tipoInline" className="form-text">ubicación de la sala</span>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col xs={3}>
          <label className="col-form-label">Url de la imagen</label>
        </Col>
        <Col xs={9}>
          <input type="text" id="idTipo" className="form-control" value={urlImagen} onChange={() => setUrlImagen(event.target.value)} />
          <span id="tipoInline" className="form-text">url de una imagen de la sala</span>
        </Col>
      </Row>
      <button type="submit" className="btn btn-primary me-2 btn-sm">Agregar Sala</button>
      <button onClick={() => subiendo(false)} className="btn btn-sm btn-primary">Cancelar</button>
    </Form>
  );
};

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(FormSala);