import React from 'react';
import Plantilla from '../componentescomunes/plantilla';
import FormLogin from '../componentescomunes/formlogin';
import { connect } from "react-redux";
import { logout } from "../redux/actions/useractions";

const Login = ({usuario,salir})=>{
 
    const submitear = (e)=>{
        e.preventDefault();
        console.log('usuario ->', usuario);
        salir();
    }

    return(
        <Plantilla>
            {usuario.logged?
                <button className="btn btn-primary active" onClick={submitear}>Cerrar sesión</button>
                :
                <FormLogin />
            }
        </Plantilla>
    )
}
const mapFuncToProps = { salir: () => logout() };
const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, mapFuncToProps)(Login);