import React,{useState} from 'react';
import {connect} from 'react-redux';
import { login, setUser } from '../redux/actions/useractions';

const formLogin = ({usuario,loguear,setearUsuario})=>{
    const[name,setName] = useState('');
    const[pass,setPass] = useState('');
 
    const submitear = (e)=>{
        e.preventDefault();
        console.log('submiteando con-> nombre:'+name+' password:'+pass)
        //{logged:false, token:'', nombre:'',apellido:'',rol:'',idUsuario:''}
        //loguear({})
        setearUsuario({token:'apppparapa',nombre:name,apellido:'haceFalta?',rol:'invite',idUsuario:'3444'})
        console.log('this.props->'+JSON.stringify(usuario))
    }

    return(
        <form onSubmit={submitear}>
            <label className="form-label">Usuario
                <input type="text" value={name} onChange={()=>setName(event.target.value)} name="usuario" id="idUsuario" className="form-control"/>
            </label>
            <br/>
            <label className="form-label">Contraseña
                <input type="password" value={pass} onChange={()=>setPass(event.target.value)} name="password" id="idPassword" className="form-control"/>
            </label>
            <br/>
            <button type="submit" className="btn btn-secondary">Ingresar</button>
        </form>
    )
}

const mapStateToProps = (state)=>({usuario: state.userReducer});
const mapFuncToProps = {loguear:()=>login(),setearUsuario:(userData)=>setUser(userData)}
export default connect(mapStateToProps,mapFuncToProps)(formLogin);