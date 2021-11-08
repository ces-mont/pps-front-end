import React from "react";

export default class Mes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            diasXmes: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            diaSem: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            diasDelMes:[], //vector con los dias del mes actual ej: [0,1,2,3,....,30,0,0,0,0] con "0" para indicar "no-dia". Esta pensado para tomar de a 7 elementos (por eso importan los ceros->corresonden a que ese día de la semana no esta numerado)
            elemSem: [],
            semanas:[],
            cantSemanas:0,
            mesActual:1+(new Date()).getMonth(),
            anioActual:(new Date()).getFullYear(),
            diaActual:null,//(new Date()).getDate(),
            //desSeleccionarDia:this.props.limpiar,
        }
        this.ant = this.ant.bind(this);
        this.sig = this.sig.bind(this);
        this.setDia = this.setDia.bind(this);
        this.setDiasDelMes = this.setDiasDelMes.bind(this)
    }
    componentDidMount() {
        this.setDiasDelMes(new Date());
    }
    /* static getDerivedStateFromProps(propsActual, stateActual){
        if(propsActual.limpiar !== stateActual.desSeleccionarDia){
            return({diaActual: null})
        }
        return null
    } */
    setDiasDelMes(fecha){
        console.log('->mes.js->setDiasDelMes->fecha: ',fecha);
        console.log('->mes.js->setDiasDelMes->props.verdes: ',this.props.verdes);

        //console.log('->mes.js->setDiasDelMes->typeof fecha: '+typeof fecha)
        let primeroAux = new Date(fecha.getFullYear(), fecha.getMonth(), 1)
        /* console.log('->mes.js->setDiasDelMes->primeroAux: ',primeroAux);
        console.log('->mes.js->setDiasDelMes->primeroAux.getDay(): ',primeroAux.getDay());
        console.log('->mes.js->setDiasDelMes->fecha.getMonth(): ',fecha.getMonth());
        console.log('->mes.js->setDiasDelMes->fecha.getFullYear(): ',fecha.getFullYear()); */
        let row =[]
        let primero = (new Date(fecha.getFullYear(), fecha.getMonth(), 1)).getDay();
        let sems = Math.trunc(((this.state.diasXmes[fecha.getMonth()] + primero) / 7));
        //console.log('->mes.js->setDiasDelMes->dia1 cae en->primero: '+primero)
        if(((this.state.diasXmes[fecha.getMonth()] + primero) % 7)!==0) sems++;  
        for (let i = 0; i < sems; i++) {
            for (let j = 0; j < 7; j++) {
                let a = i*7+j;
                if(primero<=a && (a-primero)< (this.state.diasXmes[fecha.getMonth()] )){
                    row.push(a-primero+1);
                }else{
                    row.push(0);
                }
            }    
        }
        this.setState({diasDelMes: row, cantSemanas:sems});
    }
    sig() {        
        let dia;
        console.log('mes.js->sig()->this.state.mesActual: ',this.state.mesActual)
        if(this.state.mesActual===12){
            dia=new Date(this.state.anioActual+1,0,1)
            this.setState({anioActual: this.state.anioActual+1,mesActual:1});
            this.props.setMes(1,1+this.state.anioActual);
            this.props.setAnio(1+this.state.anioActual)
        }else {
            dia=new Date(this.state.anioActual, this.state.mesActual, 1)
            this.setState({mesActual:this.state.mesActual+1});
            this.props.setMes(1+this.state.mesActual,this.state.anioActual);
        }
        this.setDiasDelMes(dia);
    }
    ant(){
        let dia;
        console.log('mes.js->ant()->this.state.mesActual: ',this.state.mesActual)
        if(this.state.mesActual===1){
            dia = new Date(this.state.anioActual-1, 11, 1);
            this.setState({anioActual: this.state.anioActual-1,mesActual: 12,elemSem:[]});
            this.props.setMes(12,+this.state.anioActual-1);
            this.props.setAnio(+this.state.anioActual-1)
        }else {
            dia = new Date(this.state.anioActual, this.state.mesActual-2, 1)
            this.setState({mesActual:this.state.mesActual-1,elemSem:[]});
            this.props.setMes(+this.state.mesActual-1,this.state.anioActual);
        }
        this.setDiasDelMes(dia)
    }
    setDia(e){
        console.log('->setDia()->e.target: ',e.target.textContent)
        //console.log('->setDia()->e: ',e)
        this.setState({diaActual:parseInt(e.target.textContent)})
        this.props.setDia(e.target.textContent);        
        //this.props.diaClick(new Date(this.state.anioActual,this.state.mesActual,parseInt(e.target.textContent)))
    }
    render() {
        //console.log('MES.JS->RENDER->diaActual: '+this.state.diaActual+' ->mesActual: '+this.state.mesActual+'->anioActula: '+this.state.anioActual)
        //console.log('MES.JS->RENDER->state: ',this.state)
        return (
            <div>
                <table id="calendario" style={estiloTabla}>
                    <thead style={cabecera}>
                        <tr style={estiloRow}>
                            <th onClick={this.ant} id="ant" style={estiloAnt}> &lang; </th>
                            <th colSpan={5} style={estiloMes}>{(+this.state.mesActual-1)!==null?this.state.meses[(+this.state.mesActual-1)]:''}</th>
                            <th onClick={this.sig} id="sig" style={estiloSig}> &rang; </th>
                        </tr>
                        <tr>
                            {this.state.diaSem.map((e,i)=>
                                <td key={i}>{e}</td>)}
                        </tr>
                    </thead>
                    <tbody><Fa cantSemanas={this.state.cantSemanas} diasDelMes={this.state.diasDelMes} diaActual={this.state.diaActual} setDia={this.setDia} rojos={this.props.rojos} verdes={this.props.verdes}/></tbody>
                    <tfoot style={estiloFoot}>
                        <tr>
                            <td colSpan={7}>{this.state.anioActual}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}
function Fe (props){
    let sem=[];
    let estilo = estiloCol
    //console.log('->mes.js->Fe->props.diasDelMes[props.index]: ',props.diasDelMes[props.index])
    for (let i=0; i<7;i++){
        //console.log('--->mes.js->Fe->dia: '+props.diasDelMes[props.index+i])
        if ((props.verdes.inicio<= props.diasDelMes[props.index+i])&&(props.diasDelMes[props.index+i]<= props.verdes.fin)){
            //console.log('--->mes.js->Fe->es verde->el dia: '+props.diasDelMes[props.index+i])
            //console.log('------->Verde')
            estilo = estiloVerde;
            if(props.rojos.includes( props.diasDelMes[props.index+i])) estilo = estiloRojo;
        }else{
            estilo = estiloCol
        }
        //console.log('--->mes.js->Fe->dia: '+props.diasDelMes[props.index+i]+ 'con estilo->',estilo)
        sem.push((props.diasDelMes[props.index+i]===0)?
            <td style={estiloCol} key={props.index+i}></td>
            :
            <td style={(props.diaActual==props.diasDelMes[props.index+i])?estiloSelecc:estilo} key={props.index+i} onClick={props.setDia}>{props.diasDelMes[props.index+i]} </td>
        )
    }
    return <tr style={estiloRow} key={props.index}>{sem}</tr>
}
function Fa(props){
    let sems=[];
    for (let i = 0; i<props.cantSemanas; i++) {
        sems.push(
            <Fe index={i*7} diasDelMes={props.diasDelMes} setDia={props.setDia} key={i} verdes={props.verdes} rojos={props.rojos} diaActual={props.diaActual} />
        )    
    }
    return sems;
}

const estiloTabla = {
    display: 'table',
    borderStyle:'solid',
    borderWidth:'2px'
}
const estiloRow ={
    borderStyle:'solid'   ,
    borderWidth:'2px' 
}
const estiloCol ={
    borderColor:'rgb(100,120,111)',
    borderStyle:'solid',
    borderWidth:'0.05em',
    width: '3em',
    textAlign:'center',
    margin:'0em 0em 0em 0em'
}
const estiloVerde={
    background:'rgb(80,150,91)',
    borderStyle:'solid',
    borderWidth:'0.05em',
    width: '3em',
    textAlign:'center',
    margin:'0em 0em 0em 0em'}

const estiloSelecc={
    background:'rgb(205, 138, 45)',
    borderStyle:'solid',
    borderWidth:'0.2em',
    borderColor:'#db7500',
    width: '3em',
    textAlign:'center',
    margin:'0em 0em 0em 0em'}

const estiloRojo={
    background:'rgb(180,100,91)',
    borderStyle:'solid',
    borderWidth:'0.05em',
    width: '3em',
    textAlign:'center',
    margin:'0em 0em 0em 0em'
}
const cabecera ={
    textAlign:'center',
    cursor:'default',
    background:'rgb(177, 194, 206)'
}
const estiloSig={
    //float:'right'
    margin:'0 0 0 0'
}
const estiloAnt={
    //float:'left'
    margin:'0 0 0 0'
}
const estiloMes={
    colspan:'5'
}
const estiloFoot={
    textAlign:'center'
}