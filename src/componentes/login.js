import React,{useState} from 'react';
import Plantilla from '../componentescomunes/plantilla';
import FormLogin from '../componentescomunes/formlogin';

const Login = ()=>{
    const[name,setName] = useState('');
    const[pass,setPass] = useState('');
 
    const submitear = (e)=>{
        e.preventDefault();
        console.log('submiteando con-> nombre:'+name+' password:'+pass)
    }

    return(
        <Plantilla>
        <FormLogin />
        </Plantilla>
    )
}

export default Login;