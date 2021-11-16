import React, { useState, useEffect } from "react";
import { doSimpleCorsGetRequest } from "../apirequests/requests";
import FormAcc from "../componentescomunes/formAcc";
import ItemListaAcc from "../componentescomunes/itemListaAccs";
import { connect } from "react-redux";
import FormLogin from "../componentescomunes/formlogin";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, Badge, CardGroup, Card, Jumbotron } from 'react-bootstrap';
import { IoCaretUpCircle, IoStopOutline, IoCheckboxOutline, IoArrowUpOutline, IoArrowDown, IoAddCircle, IoArrowUp } from "react-icons/io5";

const GestionAccesorios = ({ usuario }) => {
  const [creatingAcc, setCreatingAcc] = useState(false);
  const [accs, setAccs] = useState([]);

  useEffect(() => {
    doSimpleCorsGetRequest("/accesorios")
      .then((rta) => {
        setAccs(rta);
      })
      .catch((err) => {
      });
  }, []);

  const eliminarAcc = (indice)=>{
    let accsAux = Array.from(accs);
    accsAux.splice(indice,1);
    setSalas(accsAux);
  }

  return (
    <>
      {(usuario.logged && usuario.rol =='ADMI') ? (
        <>
        <h3 className="my-3 text-center fw-normal">Listado de dispositivos </h3>
          <Row className="mb-2">
            <Col xs="auto">
              <button className="btn btn-primary active" type="button" onClick={() => setCreatingAcc(true)}>
                <IoAddCircle style={{ padding: '0', marginRight: '0.8em !important', height: '2em', width: '2em' }} />Agregar dispositivo
              </button>
            </Col>
          </Row>

          {creatingAcc ? (
            <FormAcc subiendo={setCreatingAcc}/>
          ) : null}

          {accs.map((elem, indice) => (
            <ItemListaAcc actualizarAcc={setAccs} sacarAcc={eliminarAcc} e={elem} key={elem.idAccesorio} indice={indice}/>
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
export default connect(mapStateToProps, null)(GestionAccesorios);