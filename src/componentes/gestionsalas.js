import React, { useState, useEffect } from "react";
import Plantilla from "../componentescomunes/plantilla";

/*const formLogin = ({ usuario, loguear, setearUsuario }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const submitear = (e) => {
    e.preventDefault();
    console.log("submiteando con-> nombre:" + name + " password:" + pass);
    doPreflightCorsPostRequest( "/usuarios/login", JSON.stringify({ nombre: name, contrasenia: pass }), false)
      .then((rta) => {
        console.log("post->usuario/login->rta: ", rta);
        if (rta.logged) {
          setearUsuario({ token: rta.token, nombre: rta.nombre,
            apellido: rta.apellido,
            rol: rta.rol,
            idUsuario: rta.idUsuario,
          });
        }else{
            //cartel de error en loggeo
        }
      })
      .catch((err) => {
        console.log("post->usuario/login->err: ", err);
      });
    console.log("this.props->" + JSON.stringify(usuario));
  };

  return (
    <>
      {usuario.logged ? (
        <>
          <h4>Usted ya esta loggeado</h4>
        </>
      ) : (
        <form onSubmit={submitear}>
          <label className="form-label">
            Usuario
            <input type="text" value={name} onChange={() => setName(event.target.value)} name="usuario" id="idUsuario" className="form-control" />
          </label>
          <br />
          <label className="form-label">
            Contraseña
            <input type="password" value={pass} onChange={() => setPass(event.target.value)} name="password" id="idPassword" className="form-control"/>
          </label>
          <br />
          <button type="submit" className="btn btn-secondary">
            Ingresar
          </button>
        </form>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({ usuario: state.userReducer });
const mapFuncToProps = {
  loguear: () => login(),
  setearUsuario: (userData) => setUser(userData),
};
export default connect(mapStateToProps, mapFuncToProps)(formLogin);
*/

const GestionSalas = () => {
  const [creatingSala, setCreatingSala] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  useEffect(()=>{})

  return (
    <>
    <h4>Listado de salas</h4>  
      {creatingSala ? (
        <form>
          <div className="row align-items-center">
            <div className="col-auto">
              <label className="col-form-label">Tipo</label>
            </div>
            <div className="col-auto">
              <input type="text" id="idTipo" className="form-control" />
            </div>
            <div className="col-auto">
              <span id="tipoInline" className="form-text">
                tipo de sala
              </span>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-auto">
              <label className="col-form-label">Breve descripción</label>
            </div>
            <div className="col-auto">
              <input type="text" id="idTipo" className="form-control" />
            </div>
            <div className="col-auto">
              <span id="tipoInline" className="form-text">
                descripción corta de la sala
              </span>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-auto">
              <label className="col-form-label">Descripción detallada</label>
            </div>
            <div className="col-auto">
              <input type="text" id="idTipo" className="form-control" />
            </div>
            <div className="col-auto">
              <span id="tipoInline" className="form-text">
                descripción detallada de la sala
              </span>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-auto">
              <label className="col-form-label">Ubicación</label>
            </div>
            <div className="col-auto">
              <input type="text" id="idTipo" className="form-control" />
            </div>
            <div className="col-auto">
              <span id="tipoInline" className="form-text">
                ubicación de la sala
              </span>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-auto">
              <label className="col-form-label">Imagen</label>
            </div>
            <div className="col-auto">
              <input type="text" id="idTipo" className="form-control" />
            </div>
            <div className="col-auto">
              <span id="tipoInline" className="form-text">
                url de una imagen de la sala
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar Sala
          </button>
          <button onClick={() => setCreatingSala(false)} className="btn btn-primary">
            Cancelar
          </button>
        </form>
      ) : (
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary active" type="button" onClick={() => setCreatingSala(true)}>
            Cargar sala de laboratorio
          </button>
        </div>        
      )}
    </>
  );
};

export default GestionSalas;
