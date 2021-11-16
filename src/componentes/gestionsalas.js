import React, { useState, useEffect } from "react";
import { doSimpleCorsGetRequest } from "../apirequests/requests";
import FormSala from "../componentescomunes/formSala";
import ItemListaSala from "../componentescomunes/itemListaSala";
import { connect } from "react-redux";
import FormLogin from "../componentescomunes/formlogin";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, Badge, CardGroup, Card, Jumbotron } from 'react-bootstrap';
import { IoCaretUpCircle, IoStopOutline, IoCheckboxOutline, IoArrowUpOutline, IoArrowDown, IoAddCircle, IoArrowUp } from "react-icons/io5";

const GestionSalas = ({ usuario }) => {
  const [creatingSala, setCreatingSala] = useState(false);
  /*const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [modifing, setModifing] = useState(false);*/
  const [confirmingModify, setConfirmingModify] = useState(false);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    doSimpleCorsGetRequest("/salas")
      .then((rta) => {
        setSalas(rta);
      })
      .catch(err);
  }, []);
  const subirSala = (e)=>{
    const salasAux = salas;
    setCreatingSala(false);
  }

  const eliminarSala = (indice) => {
    let salasAux = Array.from(salas);
    salasAux.splice(indice, 1);
    setSalas(salasAux);
  }

  return (
    <>
      {(usuario.logged && usuario.rol == 'ADMI') ? (
        <>
          <h3 className="my-3 text-center fw-normal">Listado de salas </h3>
          <Row className="mb-2">
            <Col xs="auto">
              <button className="btn btn-primary active" type="button" onClick={() => setCreatingSala(true)}>
                <IoAddCircle style={{ padding: '0', marginRight: '0.8em !important', height: '2em', width: '2em' }} />Agregar sala
              </button>
            </Col>
          </Row>

          {creatingSala ? (
            <FormSala subiendo={setCreatingSala} />
          ) : null}
          {salas.map((elem, indice) => (
            <ItemListaSala actualizarSalas={setSalas} sacarSala={eliminarSala} e={elem} key={elem.idSala} indice={indice} />
          ))}
        </>
      ) : (
        <>
          <h3>Para tareas de administrador debe loguearse primero</h3>
          <FormLogin />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(GestionSalas);
