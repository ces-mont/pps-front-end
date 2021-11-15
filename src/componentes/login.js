import React from 'react';
import Plantilla from '../componentescomunes/plantilla';
import FormLogin from '../componentescomunes/formlogin';
import { connect } from "react-redux";
import { logout } from "../redux/actions/useractions";
import { IoLogOutOutline } from "react-icons/io5";
import { Card,Col } from 'react-bootstrap';

const Login = ({ usuario, salir }) => {

    const submitear = (e) => {
        e.preventDefault();
        console.log('usuario ->', usuario);
        salir();
    }

    return (
        <Plantilla>
            {usuario.logged ?
                
                <Card>
                    <Card.Header className="fw-normal text-center">Cerrar la sesión actual</Card.Header>
                    <Col className="d-grip col-3 mx-auto">
                        <button 
                            style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}} 
                            type="button" 
                            className="btn btn-primary my-4" 
                            onClick={submitear}
                        >
                            <IoLogOutOutline style={{padding:'0',marginRight:'0.8em !important',height:'2em',width:'2em'}}/>
                            Salir
                        </button>
                    </Col>
                </Card>
                :
                <FormLogin />
            }
        </Plantilla>
    )
}
const mapFuncToProps = { salir: () => logout() };
const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, mapFuncToProps)(Login);