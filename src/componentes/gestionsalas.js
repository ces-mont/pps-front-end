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

  return (
    <>
      {(usuario.logged && usuario.rol =='ADMI') ? (
        <>
          <h4>Listado de salas -prueb: {prueb}</h4>
          {salas.map((elem) => (
            <ItemListaSala actualizarSalas={setSalas} e={elem} key={elem.idSala} />
          ))}

          {creatingSala ? (
            <FormSala />
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
