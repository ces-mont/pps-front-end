import React, { useState } from "react";
import { connect } from "react-redux";
import { doJwtPreflightCorsPutRequest, doJwtPreflightCorsDeleteRequest } from "../apirequests/requests";

const ItemListaAcc = ({ e, usuario, sacarAcc, indice }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [modifing, setModifing] = useState(false);
  const [estadoAcc, setEstadoAcc] = useState(e);
  const [showModal, setShowModal] = useState(false);

  const actualizarAcc = (ev) => {
    ev.preventDefault();
    doJwtPreflightCorsPutRequest("/accesorios", JSON.stringify(estadoAcc), usuario.token)
      .then((rta) => {
        //si se subio ok => actualizar el estado con "actualizar()"
        //console.log(rta);
        setModifing(false);
      })
      .catch((err) => console.log("err->", err));
  };
  const eliminarAcc = (ev)=>{
    console.log('ELIMINAR-ACCESoRIO->ID: ',estadoAcc)
    doJwtPreflightCorsDeleteRequest('/accesorios', JSON.stringify({idAcc:estadoAcc.idAcc}), usuario.token)
      .then(rta=>{
        console.log('rta-> ',rta);
        sacarAcc(indice)
      })
      .catch(err=>console.log('err->',err));
  }
  const setCampo = (ev) => {
    console.log("campo-> ", ev.target.name, " valor->", ev.target.value);
    let acc = {
      tipo: estadoAcc.tipo,
      descripcionCorta: estadoAcc.descripcionCorta,
      descripcionLarga: estadoAcc.descripcionLarga,
      cantidad: estadoAcc.cantidad,
      idSala: estadoAcc.idSala,
      urlImagen: estadoAcc.urlImagen,
    };
    acc[ev.target.name] = ev.target.value;
    setEstadoAcc(acc);
  };

  return (
    <>
      {usuario.logged ? (
        <div className="card border-secondary mb-3">
          {modifing ? (
            <form onSubmit={actualizarAcc}>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Tipo</label>
                </div>
                <div className="col-auto">
                  <input type="text" id="idTipo" className="form-control" value={estadoAcc.tipo} name="tipo" onChange={setCampo} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Breve descripción</label>
                </div>
                <div className="col-auto">
                  <input type="text" id="idTipo" className="form-control" value={estadoAcc.descripcionCorta} name="descripcionCorta" onChange={setCampo} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Descripción detallada</label>
                </div>
                <div className="col-auto">
                  <input type="text" id="idTipo" className="form-control" value={estadoAcc.descripcionLarga} name="descripcionLarga" onChange={setCampo} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Cantidad</label>
                </div>
                <div className="col-auto">
                  <input type="number" id="idTipo" className="form-control" value={estadoAcc.cantidad} name="cantidad" onChange={setCampo} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Imagen</label>
                </div>
                <div className="col-auto">
                  <input type="text" id="idTipo" className="form-control" value={estadoAcc.urlImagen} name="urlImagen" onChange={setCampo} />
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
                <img src={estadoAcc.urlImagen} className="img-fluid rounded-start" alt="imagen de accesorio" />
              </div>
              <div className="col-md-8">
                <div className="card-header">{estadoAcc.descripcionCorta}</div>
                <div className="card-body">
                  <p className="card-text">{estadoAcc.descripcionLarga}</p>
                  <p className="card-text">idAccesorio {estadoAcc.idAccesorio}</p>
                  <p className="card-text">Cantidad {estadoAcc.cantidad}</p>
                </div>
                {showModal?
                  <div className="card text-white bg-danger">
                  <h5 className="card-header">Eliminar Accesorio</h5>
                  <div className="card-body">
                    <p className="card-text">Esta a punto de eliminar el Accesorio. Ingrese su contraseña de administrador para confirmar la operación.</p>
                  </div>
                    <button type="button" onClick={()=> setShowModal(false)} className="btn btn-primary btn-sm active"> Cancelar </button>
                    <button type="button" onClick={eliminarAcc} className="btn btn-primary btn-sm active"> Confirmar </button>
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
export default connect(mapStateToProps, null)(ItemListaAcc);
