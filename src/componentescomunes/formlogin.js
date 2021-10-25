import React, { useState } from "react";
import { connect } from "react-redux";
import { login, setUser } from "../redux/actions/useractions";
import { doPreflightCorsPostRequest } from "../apirequests/requests";

const formLogin = ({ usuario, loguear, setearUsuario }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const submitear = (e) => {
    e.preventDefault();
    console.log("submiteando con-> nombre:" + name + " password:" + pass);
    doPreflightCorsPostRequest( "/usuarios/login", JSON.stringify({ nombre: name, contrasenia: pass }), false)
      .then((rta) => {
        console.log("post->usuario/login->rta: ", rta);
        setearUsuario({ 
            token: rta.token, nombre: rta.nombre,
            apellido: rta.apellido,
            rol: rta.rol,
            idUsuario: rta.idUsuario,
        });
        loguear();
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
