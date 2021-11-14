import React from 'react';
import Plantilla from '../componentescomunes/plantilla';
import FormLogin from '../componentescomunes/formlogin';
import { connect } from "react-redux";
import { logout } from "../redux/actions/useractions";
import { IoLogOutOutline } from "react-icons/io5";

const Login = ({ usuario, salir }) => {

    const submitear = (e) => {
        e.preventDefault();
        console.log('usuario ->', usuario);
        salir();
    }

    return (
        <Plantilla>
            {usuario.logged ?
                <>
                    <h5 className="mt-3 fw-normal">Cerrar la sesión actual</h5>
                    <div className="d-grip col-3 mx-auto">
                        <button style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',borderColor:'rgb(255,214,100)'}} type="button" className="btn btn-secondary" onClick={submitear}>
                            <IoLogOutOutline style={{padding:'0',marginRight:'0.8em !important',color:'rgb(255,214,100)',height:'2.5em',width:'2.5em'}}/>
                            Salir
                        </button>
                    </div>
                </>
                :
                <FormLogin />
            }
        </Plantilla>
    )
}
const mapFuncToProps = { salir: () => logout() };
const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, mapFuncToProps)(Login);