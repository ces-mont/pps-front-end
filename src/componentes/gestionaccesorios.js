import React, { useState, useEffect } from "react";
import { doSimpleCorsGetRequest } from "../apirequests/requests";
import FormAcc from "../componentescomunes/formSala";
import ItemListaAcc from "../componentescomunes/itemListaSala";
import { connect } from "react-redux";
import FormLogin from "../componentescomunes/formlogin";

const GestionAccesorios = ({ usuario }) => {
  const [creatingAcc, setCreatingAcc] = useState(false);
  const [accs, setAccs] = useState([]);

  useEffect(() => {
    doSimpleCorsGetRequest("/accesorios")
      .then((rta) => {
        console.log("-->gesion acces->rta: ", rta);
        setAccs(rta);
        console.log("useEffect->accs->", accs);
      })
      .catch((err) => {
        console.log("error->", err);
      });
  }, []);

  const eliminarAcc = (indice)=>{
    console.log('eliminando el indice: ',indice)
    let accsAux = Array.from(accs);
    console.log('accsAux ',accsAux);
    accsAux.splice(indice,1);
    setSalas(accsAux);
    console.log('accsAux ',accsAux);
  }

  return (
    <>
      {(usuario.logged && usuario.rol =='ADMI') ? (
        <>
          <h4>Listado de accesorios </h4>
          {accs.map((elem, indice) => (
            <ItemListaAcc actualizarAcc={setAccs} sacarAcc={eliminarAcc} e={elem} key={elem.idAccesorio} indice={indice}/>
          ))}

          {creatingAcc ? (
            <FormAcc subiendo={setCreatingAcc}/>
          ) : (
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary active" type="button" onClick={() => setCreatingAcc(true)}>
                Cargar accesorio
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
export default connect(mapStateToProps, null)(GestionAccesorios);