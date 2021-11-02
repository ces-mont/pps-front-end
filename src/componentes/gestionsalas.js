import React, { useState, useEffect } from "react";
import { doSimpleCorsGetRequest } from "../apirequests/requests";
import FormSala from "../componentescomunes/formSala";
import ItemListaSala from "../componentescomunes/itemListaSala";
import { connect } from "react-redux";
import FormLogin from "../componentescomunes/formlogin";

const GestionSalas = ({ usuario }) => {
  const [creatingSala, setCreatingSala] = useState(false);
  /*const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [modifing, setModifing] = useState(false);*/
  const [confirmingModify, setConfirmingModify] = useState(false);
  const [salas, setSalas] = useState([]);
  const [idSala, setIdSala] = useState(null);
  const [prueb, setPrueb] = useState(null);

  useEffect(() => {
    doSimpleCorsGetRequest("/salas")
      .then((rta) => {
        console.log("-->gesion salas->rta: ", rta);
        setSalas(rta);
        console.log("useEffect->salas->", salas);
      })
      .catch((err) => {
        console.log("error->", err);
      });
  }, []);

  const eliminarSala = (indice)=>{
    console.log('eliminando el indice: ',indice)
    let salasAux = Array.from(salas);
    console.log('salasAux ',salasAux);
    salasAux.splice(indice,1);
    setSalas(salasAux);
    console.log('salasAux ',salasAux);
  }

  return (
    <>
      {(usuario.logged && usuario.rol =='ADMI') ? (
        <>
          <h4>Listado de salas -prueb: {prueb}</h4>
          {salas.map((elem, indice) => (
            <ItemListaSala actualizarSalas={setSalas} sacarSala={eliminarSala} e={elem} key={elem.idSala} indice={indice}/>
          ))}

          {creatingSala ? (
            <FormSala subiendo={setCreatingSala}/>
          ) : (
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary active" type="button" onClick={() => setCreatingSala(true)}>
                Cargar sala de laboratorio
              </button>
            </div>
          )}
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
