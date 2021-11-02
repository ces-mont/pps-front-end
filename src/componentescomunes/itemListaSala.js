import React, { useState } from "react";
import { connect } from "react-redux";
import { doJwtPreflightCorsPutRequest, doJwtPreflightCorsDeleteRequest } from "../apirequests/requests";

const ItemListaSala = ({ e, usuario, sacarSala, indice }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [modifing, setModifing] = useState(false);
  const [estadoSala, setEstadoSala] = useState(e);
  const [showModal, setShowModal] = useState(false);

  const actualizarSala = (ev) => {
    ev.preventDefault();
    doJwtPreflightCorsPutRequest("/salas", JSON.stringify(estadoSala), usuario.token)
      .then((rta) => {
        //si se subio ok => actualizar el estado con "actualizar()"
        //console.log(rta);
        setModifing(false);
      })
      .catch((err) => console.log("err->", err));
  };
  const eliminarSala = (ev)=>{
    console.log('ELIMINAR-SALA->IDSALA: ',estadoSala)
    doJwtPreflightCorsDeleteRequest('/salas', JSON.stringify({idSala:estadoSala.idSala}), usuario.token)
      .then(rta=>{
        console.log('rta-> ',rta);
        sacarSala(indice)
      })
      .catch(err=>console.log('err->',err));
  }
  const setCampo = (ev) => {
    console.log("campo-> ", ev.target.name, " valor->", ev.target.value);
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
        <div className="card border-secondary mb-3">
          {modifing ? (
            <form onSubmit={actualizarSala}>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Tipo</label>
                </div>
                <div className="col-auto">
                  <input type="text" id="idTipo" className="form-control" value={estadoSala.tipo} name="tipo" onChange={setCampo} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Breve descripción</label>
                </div>
                <div className="col-auto">
                  <input type="text" id="idTipo" className="form-control" value={estadoSala.descripcionCorta} name="descripcionCorta" onChange={setCampo} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Descripción detallada</label>
                </div>
                <div className="col-auto">
                  <input type="text" id="idTipo" className="form-control" value={estadoSala.descripcionLarga} name="descripcionLarga" onChange={setCampo} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Ubicación</label>
                </div>
                <div className="col-auto">
                  <input type="text" id="idTipo" className="form-control" value={estadoSala.ubicacion} name="ubicacion" onChange={setCampo} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Imagen</label>
                </div>
                <div className="col-auto">
                  <input type="text" id="idTipo" className="form-control" value={estadoSala.urlImagen} name="urlImagen" onChange={setCampo} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" >
                Confirmar
              </button>
              <button onClick={() => setModifing(false)} className="btn btn-primary">
                Cancelar
              </button>
            </form>
          ) : (
            <div className="row g-0">
              <div className="col-md-4">
                {" "}
                <img src={estadoSala.urlImagen} className="img-fluid rounded-start" alt="imagen de sala" />{" "}
              </div>
              <div className="col-md-8">
                <div className="card-header">{estadoSala.descripcionCorta}</div>
                <div className="card-body">
                  <p className="card-text">{estadoSala.descripcionLarga}</p>
                  <p className="card-text">idSala {estadoSala.idSala}</p>
                  <p className="card-text">
                    <small className="text-muted">{estadoSala.ubicacion}</small>
                  </p>
                </div>
                {showModal?
                  <div className="card text-white bg-danger">
                  <h5 className="card-header">Eliminar Sala</h5>
                  <div className="card-body">
                    <p className="card-text">Esta a punto de eliminar la Sala. Ingrese su contraseña de administrador para confirmar la operación.</p>
                  </div>
                    <button type="button" onClick={()=> setShowModal(false)} className="btn btn-primary btn-sm active"> Cancelar </button>
                    <button type="button" onClick={eliminarSala} className="btn btn-primary btn-sm active"> Confirmar </button>
                </div>:
                  <>
                    <button type="button" onClick={()=> setShowModal(true)} className="btn btn-primary active"> Eliminar </button>
                    <button type="button" onClick={()=> setModifing(true)} className="btn btn-primary active"> Modificar </button>
                  </>
                }
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(ItemListaSala);
