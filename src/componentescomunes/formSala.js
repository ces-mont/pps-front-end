import React, { useState } from "react";
import { connect } from "react-redux";
import { doJwtPreflightCorsPostRequest } from "../apirequests/requests";

const FormSala = ({usuario,subiendo}) => {
  const [tipo, setTipo] = useState('');
  const [descripcionCorta, setDescripcionCorta] = useState('');
  const [descripcionLarga, setDescripcionLarga] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [urlImagen, setUrlImagen] = useState('');

  const crearSala = (e)=>{
    e.preventDefault();
    console.log('nuevaSala->')
    let sala = {tipo,ubicacion,descripcionLarga,descripcionCorta,urlImagen}
    console.log('sala',sala)
    doJwtPreflightCorsPostRequest('/salas',JSON.stringify({tipo,ubicacion,descripcionLarga,descripcionCorta,urlImagen,idUsuario:usuario.idUsuario}), false, usuario.token)
      .then(rta=>console.log('rta ',rta))
      .catch(err=>console.log('err ',err));
  }
  return (
    <form onSubmit={crearSala}>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Tipo</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={tipo} onChange={()=>setTipo(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">tipo de sala</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Breve descripción</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={descripcionCorta} onChange={()=>setDescripcionCorta(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">descripción corta de la sala</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Descripción detallada</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={descripcionLarga} onChange={()=>setDescripcionLarga(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">descripción detallada de la sala</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Ubicación</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={ubicacion} onChange={()=>setUbicacion(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">ubicación de la sala</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Imagen</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={urlImagen} onChange={()=>setUrlImagen(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">url de una imagen de la sala</span></div>
      </div>
      <button type="submit" className="btn btn-primary">Agregar Sala</button>
      <button onClick={() => subiendo(false)} className="btn btn-primary">Cancelar</button>
    </form>
  );
};

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(FormSala);