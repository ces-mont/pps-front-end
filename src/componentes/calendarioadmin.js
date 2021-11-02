import React from "react";
import { connect } from "react-redux";
import { doSimpleCorsGetRequest, doJwtPreflightCorsPostRequest} from "../apirequests/requests";
import Mes from "../componentescomunes/mes";

class CalendarioAdmin extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          diasXmes: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          inicio:'',
          fin:'',
          chgInicio:true,
          chgFin:true,
          diaSelec:null, // dia actual en el dibujo del calendario
          mesSelec:null, // mes actual en el dibujo del calendario
          anioSelec:null, // año actual en el dibujo del calendario
          diasnohabiles:[],
          verdes:{}, // dias en verde DEL MES ACTUAL en el dibujo del calendario
          mesHabilit:'',
          mesDeshabilit:'',
          diaHabilit:'',
          diaDeshabilit:''
      }
      this.cambiarInicioPeriodo = this.cambiarInicioPeriodo.bind(this);
      this.cambiarFinPeriodo = this.cambiarFinPeriodo.bind(this);
      this.habilitarDia = this.habilitarDia.bind(this);
      this.inhabilitarDia = this.inhabilitarDia.bind(this);
      this.setMes = this.setMes.bind(this);
  }
  componentDidMount(){
    doSimpleCorsGetRequest('/calendario/periodo')
        .then(rta=>{ 
          console.log('CalendarioAdmin->doSimpleCorsGetRequest->calendario/periodo/mes->rta: ',rta);
          let hoy = new Date();
            if (rta.length !== 0) this.setState({inicio:rta[0].inicio,fin:rta[0].fin});
            this.setState({diaSelec:hoy.getDate(),mesSelec:hoy.getMonth()+1,anioSelec:hoy.getFullYear()});
        })
        .then(rta=>{
          return ('/calendario/diasinhabilitados/'+(this.state.mesSelec));
        })
        .then(doSimpleCorsGetRequest)
        .then(rta=>{
          console.log('CalendarioAdmin->doSimpleCorsGetRequest->calendario/diasinahabilitados/mes->rta: ',rta);
          let diasnohabiles = rta.map((e) => {
            console.log('CalendarioAdmin->e.dia: ',e.dia);   
            let dia= e.dia.trim().split('-');
            //let dia = new Date(+dateDiv[0],+dateDiv[1]-1,+dateDiv[2]);     
            console.log('CalendarioAdmin->dia: ',dia);   
            //console.log('CalendarioAdmin->dia.getDate(): ',dia.getDate());   
            //return (dia.getDate());
            return(+dia[2])
          })
          if(rta.length !== 0) this.setState({diasnohabiles});
        })
        .then(rta=>{
          let inicio= this.state.inicio.trim().split('-');
          let fin = this.state.fin.trim().split('-');
          /*let dia = new Date(+dateDiv[0],+dateDiv[1]-1,+dateDiv[2]);   
          let i = new Date(this.state.inicio)
          let j = new Date(this.state.fin) */
          let verdes ={};
          verdes.inicio = (this.state.mesSelec == inicio[1])? +inicio[2] : 1;
          verdes.fin = (this.state.mesSelec == fin[1])? +fin[2] : this.state.diasXmes[this.state.mesSelec-1];
          /* verdes.inicio = (this.state.mesSelec == (1+i.getMonth()))?i.getDate() : 1;
          verdes.fin = (this.state.mesSelec == (1+j.getMonth()))? j.getDate() : this.state.diasXmes[this.state.mesSelec]; */
          this.setState({verdes})
        })
        .catch(err=>console.log('calendario-err: ',err));
  }
  cambiarInicioPeriodo(e){
      console.log('cambiandoInicio');
      this.setState({chgInicio:true});
      doJwtPreflightCorsPostRequest('/calendario/periodo', JSON.stringify({inicio:this.state.inicio, fin:this.state.fin}),false,this.props.usuario.token)
      .then(rta=>{
        console.log('rta: ',rta)
        let inicio= this.state.inicio.trim().split('-');
        let fin = this.state.fin.trim().split('-');
        //let verdes={inicio:this.state.inicio.split('-')[2],fin:this.state.fin.split('-')[2]}
        let verdes ={};
        verdes.inicio = (this.state.mesSelec == inicio[1])? +inicio[2] : 1;
        verdes.fin = (this.state.mesSelec == fin[1])? +fin[2] : this.state.diasXmes[this.state.mesSelec-1];
        this.setState({verdes})
      })
      .catch(err=>console.log('calendario-err: ',err));
  }
  cambiarFinPeriodo(e){
      console.log('cambiandoInicio');
      this.setState({chgFin:true});
      doJwtPreflightCorsPostRequest('/calendario/periodo', JSON.stringify({inicio:this.state.inicio, fin:this.state.fin}),false,this.props.usuario.token)
      .then(rta=>{
        console.log('rta: ',rta)
        //let verdes={inicio:this.state.inicio.split('-')[2],fin:this.state.fin.split('-')[2]}
        //this.setState({verdes})
        let inicio= this.state.inicio.trim().split('-');
        let fin = this.state.fin.trim().split('-');
        //let verdes={inicio:this.state.inicio.split('-')[2],fin:this.state.fin.split('-')[2]}
        let verdes ={};
        verdes.inicio = (this.state.mesSelec == inicio[1])? +inicio[2] : 1;
        verdes.fin = (this.state.mesSelec == fin[1])? +fin[2] : this.state.diasXmes[this.state.mesSelec-1];
        this.setState({verdes})
      })
      .catch(err=>console.log('calendario-err: ',err));
  }
  habilitarDia(){
    console.log('habilitando dia')
    console.log('habilitando dia',this.state.diaHabilit)
    doJwtPreflightCorsPostRequest('/calendario/estado', JSON.stringify({dia:this.state.diaHabilit, mes:1+this.state.meses.indexOf(this.state.mesHabilit), anio:(new Date()).getFullYear(), accion:'h'}),false,this.props.usuario.token)
    .then(rta=>{
      console.log('rta: ',rta);
      let diasnohabiles = this.state.diasnohabiles;
      let i = this.state.diaHabilit.trim().split(',');
      console.log('HabilitarDia()->dias: ',i);

      for (const it of i) {
        let indice = diasnohabiles.indexOf(+it)
        if (indice>=0){
          diasnohabiles.splice(indice,1);
          console.log('HabilitarDia()->diasnohabiles',diasnohabiles)
        }      
      }
      this.setState({diasnohabiles});
    })
    .catch(err=>console.log('calendario-err: ',err));
  }
  inhabilitarDia(){
    console.log('inhabilitando dia')
    doJwtPreflightCorsPostRequest('/calendario/estado', JSON.stringify({dia:this.state.diaDeshabilit, mes:1+this.state.meses.indexOf(this.state.mesDeshabilit), anio:(new Date()).getFullYear(), accion:'i'}),false,this.props.usuario.token)
    .then(rta=>{
      console.log('rta: ',rta);
      let diasnohabiles = this.state.diasnohabiles;
      let i = this.state.diaDeshabilit.trim().split(',')
      //let w = v.trim()
      //let i = w.split(',');
      //console.log('inhabilitarDia()->diasv: ',v);
      //console.log('inhabilitarDia()->diasw: ',w);
      console.log('inhabilitarDia()->diasi: ',i);
      for (const it of i) {
        diasnohabiles.push(+it);
      }
      //let rojos = this.state.rojos;
      //rojos.push(+this.state.diaDeshabilit);
      //diasnohabiles.push(+this.state.diaDeshabilit);
      this.setState({diasnohabiles});
    })
    .catch(err=>console.log('calendario-err: ',err));
  }
  setMes(mes,anio){
    //console.log('->calendarioadmin.js->setMes(mes: '+mes+' anio: '+anio+')')
    //console.log('->calendarioadmin.js->this.state.mesSelec: '+this.state.mesSelec +' this.state.añoSelec: '+this.state.anioSelec);
    this.setState({mesSelec:mes});
    let anioInicioAux = this.state.inicio.trim().split('-')[0];
    let mesInicioAux = this.state.inicio.trim().split('-')[1];
    let anioFinAux = this.state.fin.trim().split('-')[0];
    let mesFinAux = this.state.fin.trim().split('-')[1];
    let diaFinAux = this.state.fin.trim().split('-')[2];
    let fechInicio= new Date(anioInicioAux,+mesInicioAux-1,1);
    let fechFin = new Date(anioFinAux,+mesFinAux-1,diaFinAux);
    let paramFecha = new Date (anio, mes-1, 1);
    //console.log('->calendarioadmin.js->anioInicio: '+anioInicioAux +' mesInicio: '+mesInicioAux+' anioFin: '+anioFinAux+' mesFin:'+mesFinAux);
    //console.log('->calendarioadmin.js->fechInicio: ',fechInicio ,' fechFin: ',fechFin, ' paramFecha: ',paramFecha);

    if((fechFin.getTime()>=paramFecha.getTime())&&(fechInicio.getTime()<=paramFecha.getTime())){
      //console.log('->calendarioadmin.js->ESTA EN FECHA')
      doSimpleCorsGetRequest('/calendario/diasinhabilitados/'+(mes))
      .then(rta=>{
        console.log('->calendarioadmin.js->ESTA EN FECHA->diasinhabilitados->rta->',rta);
        let diasnohabiles = rta.map((e) => {
          let dia= e.dia.trim().split('-');
          return(+dia[2])
        })
        if(rta.length !== 0) {this.setState({diasnohabiles})}else{this.setState({diasnohabiles:[]})};
      })
      .then(rta=>{
        let inicio= this.state.inicio.trim().split('-');
        let fin = this.state.fin.trim().split('-');
        //console.log('->calendarioadmin.js->verdes->inicio: '+inicio+' fin: '+fin+' mesSelec: '+this.state.mesSelec +' añoSelec: '+this.state.anioSelec);
        let verdes ={};
        verdes.inicio = (this.state.mesSelec == inicio[1])? +inicio[2] : 1;
        verdes.fin = (this.state.mesSelec == fin[1])? +fin[2] : this.state.diasXmes[this.state.mesSelec-1];
        console.log('->calendarioadmin.js->verdes: ',verdes)
        this.setState({verdes})
      })
      .catch(err=>console.log('calendario-err: ',err));
    }else{
      //console.log('->calendarioadmin.js->NO ESTA EN FECHA')
      this.setState({verdes:[]})
    }
  }

  render() {
    console.log('CALENDARIOADMIN->STATE: '+JSON.stringify(this.state))
    return (
      <>
        <h2>ADMINISTRAR CALENDARIO</h2>

        <div className="row align-items-center">
          <div className="col-auto">
            <label className="col-form-label">Inicio de período</label>
          </div>
          <div className="col-auto">
            <input type="date" className="form-control" value={this.state.inicio} onChange={(e) => this.setState({inicio:event.target.value})} disabled={this.state.chgInicio} name="inicio" />
          </div>
          {(this.state.chgInicio)?
            <div className="col-auto">
              <button type="button" onClick={()=> this.setState({chgInicio:false})} className="btn btn-primary btn-sm active"> Modificar </button>
            </div>
            :
            <>
                <div className="col-auto">
                    <button type="button" onClick={this.cambiarInicioPeriodo} className="btn btn-primary btn-sm active"> Confirmar </button>
                </div>
                <div className="col-auto">
                    <button type="button" onClick={()=> this.setState({chgInicio:true})} className="btn btn-primary btn-sm active"> Cancelar </button>
                </div>
            </>
          }          
        </div>

        <div className="row align-items-center">
          <div className="col-auto">
            <label className="col-form-label">Fin de período</label>
          </div>
          <div className="col-auto">
            <input type="date" className="form-control" value={this.state.fin} onChange={(e) => this.setState({fin:event.target.value})} disabled={this.state.chgFin} name="fin"/>
          </div>
          {(this.state.chgFin)?
            <div className="col-auto">
              <button type="button" onClick={()=> this.setState({chgFin:false})} className="btn btn-primary btn-sm active"> Modificar </button>
            </div>
            :
            <>
                <div className="col-auto">
                    <button type="button" onClick={this.cambiarFinPeriodo} className="btn btn-primary btn-sm active"> Confirmar </button>
                </div>
                <div className="col-auto">
                    <button type="button" onClick={()=> this.setState({chgFin:true})} className="btn btn-primary btn-sm active"> Cancelar </button>
                </div>
            </>
          }   
        </div>

        <div >
          <Mes setDia={(d)=>this.setState({diaSelec:d})} setMes={this.setMes} setAnio={(a)=>this.setState({anioSelec:a})} rojos={this.state.diasnohabiles} verdes={this.state.verdes}/>
        </div>

  <div className="card">
  <fieldset className="input-group-sm row">    
    <legend>Habilitar día/s</legend>
    <div className="col-md-1">
      <label htmlFor="idMes">Mes</label>
    </div>
    <div className="col-md-2">
      <select className="form-select" id="idMes" value={this.state.mesHabilit} onChange={e=>this.setState({mesHabilit:e.target.value})}> 
      <option disabled={true}></option>
      {this.state.meses.map(e => <option>{e}</option> )} 
      </select>
    </div>
    <div className="col-md-1 offset-md-2">
      <label htmlFor="idDia">Día/s</label>
    </div>
    <div className="col-md-4">
      <input type="text" id="idDia" className="form-control" value={this.state.diaHabilit} onChange={e=>this.setState({diaHabilit:e.target.value})}/>
      <small className="text-muted">puede ingresar varios días separados por una coma</small>
    </div>
    <div className="col-md-2" >
      <button type="button" onClick={this.habilitarDia} className="btn btn-primary btn-sm active"> Habilitar </button>
    </div>
  </fieldset>
  </div>

  <div className="card">
  <fieldset className="input-group-sm row">    
    <legend>Inhabilitar día/s</legend>
    <div className="col-md-1">
      <label htmlFor="idMes">Mes</label>
    </div>
    <div className="col-md-2">
      <select className="form-select" id="idMes" value={this.state.mesDeshabilit} onChange={e=>this.setState({mesDeshabilit:e.target.value})}> 
      <option disabled={true}></option>
      {this.state.meses.map(e => <option>{e}</option> )} 
      </select>
    </div>
    <div className="col-md-1 offset-md-2">
      <label htmlFor="idDia">Día/s</label>
    </div>
    <div className="col-md-4">
      <input type="text" id="idDia" className="form-control" value={this.state.diaDeshabilit} onChange={e=>this.setState({diaDeshabilit:e.target.value})}/>
      <small className="text-muted">puede ingresar varios días separados por una coma</small>
    </div>
    <div className="col-md-2" >
      <button type="button" onClick={this.inhabilitarDia} className="btn btn-primary btn-sm active"> Inhabilitar </button>
    </div>
  </fieldset>
  </div>

  </>
    );
  }
}

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(CalendarioAdmin);