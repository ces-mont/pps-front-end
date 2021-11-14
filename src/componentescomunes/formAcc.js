import React, { useState } from "react";
import { connect } from "react-redux";
import { doJwtPreflightCorsPostRequest } from "../apirequests/requests";

const FormAcc = ({usuario,subiendo}) => {
  const [tipo, setTipo] = useState('');
  const [descripcionCorta, setDescripcionCorta] = useState('');
  const [descripcionLarga, setDescripcionLarga] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [urlImagen, setUrlImagen] = useState('');

  const crearAcc = (e)=>{
    console.log('nuevoAccesorio->e.target: ',e.target)
    e.preventDefault();
    console.log('nuevoAccesorio->')
    let acc = {tipo,cantidad,descripcionLarga,descripcionCorta,urlImagen}
    console.log('acc ',acc)
    doJwtPreflightCorsPostRequest('/accesorios',JSON.stringify({tipo,cantidad,descripcionLarga,descripcionCorta,urlImagen,idUsuario:usuario.idUsuario}), false, usuario.token)
      .then(rta=>console.log('rta ',rta))
      .catch(err=>console.log('err ',err));
  }
  return (
    <form onSubmit={crearAcc}>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Tipo</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={tipo} onChange={()=>setTipo(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">tipo de accesorio</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Breve descripción</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={descripcionCorta} onChange={()=>setDescripcionCorta(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">descripción corta del accesorio</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Descripción detallada</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={descripcionLarga} onChange={()=>setDescripcionLarga(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">descripción detallada del accesorio</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Cantidad</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={cantidad} onChange={()=>setCantidad(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">cantidad de accesorios</span></div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto"><label className="col-form-label">Imagen</label></div>
        <div className="col-auto"><input type="text" id="idTipo" className="form-control" value={urlImagen} onChange={()=>setUrlImagen(event.target.value)}/></div>
        <div className="col-auto"><span id="tipoInline" className="form-text">url de una imagen del accesorio</span></div>
      </div>
      <button type="submit" className="btn btn-primary">Agregar Accesorio</button>
      <button onClick={() => subiendo(false)} className="btn btn-primary">Cancelar</button>
    </form>
  );
};

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(FormAcc);