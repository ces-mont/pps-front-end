import React, { useState } from "react";
import { connect } from "react-redux";
import { login, setUser } from "../redux/actions/useractions";
import { doPreflightCorsPostRequest } from "../apirequests/requests";

const FormSala = (props) => {
  return (
    <form>
        <p>{JSON.stringify(props)}</p>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Tipo</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" /></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">tipo de sala</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Breve descripción</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" /></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">descripción corta de la sala</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Descripción detallada</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" /></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">descripción detallada de la sala</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Ubicación</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" /></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">ubicación de la sala</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Imagen</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" /></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">url de una imagen de la sala</span></div>
      </div>
      <button type="submit" className="btn btn-primary">Agregar Sala</button>
      <button onClick={() => setCreatingSala(false)} className="btn btn-primary">Cancelar</button>
    </form>
  );
};

export default FormSala;