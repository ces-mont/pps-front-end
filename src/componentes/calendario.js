import React from 'react';
import Plantilla from '../componentescomunes/plantilla';
import Mes from '../componentescomunes/mes';

class Calendario extends React.Component{
    constructor(props){
        super(props);
        this.state={
            diaSelec:'',
            mesSelec:'',
            anioSelec:''
        }
    }
    render(){
    console.log('CALENDARIO->RENDER->props->dia: '+this.state.diaSelec+' / '+this.state.mesSelec+' / '+this.state.anioSelec);
    return(        
        <Plantilla>
            <h2>CALENDARIO</h2>
            <Mes setDia={(d)=>this.setState({diaSelec:d})} setMes={(m)=>this.setState({mesSelec:m})} setAnio={(a)=>this.setState({anioSelec:a})}/>
        </Plantilla>
    )
    }
}

export default Calendario