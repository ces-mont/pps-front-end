import React, { useState } from "react";
import { connect } from "react-redux";
import { doJwtPreflightCorsPutRequest, doJwtPreflightCorsDeleteRequest } from "../apirequests/requests";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, Badge, CardGroup, Card, Jumbotron } from 'react-bootstrap';

const ItemListaSala = ({ e, usuario, sacarSala, indice }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [modifing, setModifing] = useState(false);
  const [estadoSala, setEstadoSala] = useState(e);
  const [showModal, setShowModal] = useState(false);

  const actualizarSala = (ev) => {
    ev.preventDefault();
    doJwtPreflightCorsPutRequest("/salas", JSON.stringify(estadoSala), usuario.token)
      .then((rta) => {
        setModifing(false);
      })
      .catch();
  };
  const eliminarSala = (ev) => {
    doJwtPreflightCorsDeleteRequest('/salas', JSON.stringify({ idSala: estadoSala.idSala }), usuario.token)
      .then(rta => {
        sacarSala(indice)
      })
      .catch();
  }
  const setCampo = (ev) => {
    let sala = {
      tipo: estadoSala.tipo,
      descripcionCorta: estadoSala.descripcionCorta,
      descripcionLarga: estadoSala.descripcionLarga,
      ubicacion: estadoSala.ubicacion,
      idSala: estadoSala.idSala,
      urlImagen: estadoSala.urlImagen,
    };
    sala[ev.target.name] = ev.target.value;
    setEstadoSala(sala);
  };

  return (
    <>
      {usuario.logged ? (
        <Card className="mb-2" bg="light">
          <Card.Header as="h5" className="text-center fw-light">{estadoSala.descripcionCorta}</Card.Header>
          <Row>
            <Col xs={2}>
              <Card.Img variant="top" src={estadoSala.urlImagen} className="fluid" />
            </Col>
            <Col xs={10}>
              <Card.Body className="my-0 py-0">
                <Card.Title className="mt-1 py-0 fw-light">Descripcion</Card.Title>
                <Card.Text className="my-0 py-0"><small className="text-muted my-0 py-0" >{estadoSala.descripcionLarga}</small></Card.Text>
              </Card.Body>
              <Card.Body className="my-0 py-0">
                <Card.Title as="h6" className="mt-2 py-0 fw-light">Tipo de sala: <small className=" fw-normal text-muted my-0 py-0">{estadoSala.tipo}</small></Card.Title>
              </Card.Body>
              <Card.Body>
                {modifing ?
                  <Form onSubmit={actualizarSala} className="mt-1 p-3 border">
                    <Row className="mb-1">
                      <Col xs={3}>
                        <label className="col-form-label">Tipo de sala</label>
                      </Col>
                      <Col xs={9}>
                        <input type="text" className="form-control" value={estadoSala.tipo} name="tipo" onChange={setCampo} />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col xs={3}>
                        <label className="col-form-label">Nombre o breve descripción</label>
                      </Col>
                      <Col xs={9}>
                        <input type="text" className="form-control" value={estadoSala.descripcionCorta} name="descripcionCorta" onChange={setCampo} />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col xs={3}>
                        <label className="col-form-label">Descripción detallada</label>
                      </Col>
                      <Col xs={9}>
                        <input type="text" className="form-control" value={estadoSala.descripcionLarga} name="descripcionLarga" onChange={setCampo} />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col xs={3}>
                        <label className="col-form-label">Ubicación</label>
                      </Col>
                      <Col xs={9}>
                        <input type="text" className="form-control" value={estadoSala.ubicacion} name="ubicacion" onChange={setCampo} />
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col xs={3}>
                        <label className="col-form-label">Url de la imagen</label>
                      </Col>
                      <Col xs={9}>
                        <input type="text" className="form-control" value={estadoSala.urlImagen} name="urlImagen" onChange={setCampo} />
                      </Col>
                    </Row>
                    <button type="submit" className="btn btn-sm btn-primary me-2" >Confirmar</button>
                    <button onClick={() => setModifing(false)} className="btn btn-sm btn-primary">Cancelar</button>
                  </Form>
                  :
                  <>
                    {showModal ?
                      <Form className="mt-1 p-3 border">
                        <h5 className="text-center fw-normal mb-2">Esta a punto de eliminar la sala</h5>
                        <Row className="justify-content-md-center">
                          <Col md="auto">
                            <Form.Label className="fw-normal pt-1" > Contraseña de administrador:</Form.Label>
                          </Col>
                          <Col md="auto">
                            <Form.Control type="text" placeholder="ingresar contraseña" />
                          </Col>
                        </Row>
                        <button type="button" onClick={() => setShowModal(false)} className="btn btn-primary btn-sm active mx-2"> Cancelar </button>
                        <button type="button" onClick={eliminarSala} className="btn btn-primary btn-sm active"> Confirmar </button>
                      </Form> :
                      <>
                        <button type="button" onClick={() => setShowModal(true)} className="btn btn-sm btn-primary active mx-2"> Eliminar </button>
                        <button type="button" onClick={() => setModifing(true)} className="btn btn-sm btn-primary active"> Modificar </button>
                      </>
                    }
                  </>
                }
              </Card.Body>
            </Col>
          </Row>
          <Card.Footer>
            <Card.Text className="text-center" ><small className="fw-normal text-muted">Ubicación: {estadoSala.ubicacion}</small></Card.Text>
          </Card.Footer>
        </Card>
      ) : null
      }
    </>
  );
};

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(ItemListaSala);
