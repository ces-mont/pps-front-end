import React from 'react';
import { connect } from "react-redux";
import { doSimpleCorsGetRequest, doJwtCorsGetRequest, doJwtPreflightCorsPostRequest } from "../apirequests/requests";
import Mes from "../componentescomunes/mes";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, CardGroup, Card, Jumbotron, Badge } from 'react-bootstrap';
import ItemReservAdmin from '../componentescomunes/itemReservAdmin';

export class ReservasAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      diaSelec: null,
      mesSelec: null,
      anioSelec: null,
      diasnohabiles: [],
      inicioPeriodo: null,
      finPeriodo: null,
      diasXmes: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      diashabilitados: {},

      solicitudes: [],
    }
    this.setMes = this.setMes.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }
  componentDidMount() {
    //doJwtCorsGetRequest('/salas/reservaspendientes/',this.props.usuario.token)
    doSimpleCorsGetRequest('/calendario/periodo')
      .then(rta => {
        console.log('ReservasAdmin->doSimpleCorsGetRequest->calendario/periodo/mes->rta: ', rta);
        let hoy = new Date();
        if (rta.length !== 0) this.setState({ inicioPeriodo: rta[0].inicio, finPeriodo: rta[0].fin });
        this.setState({ diaSelec: hoy.getDate(), mesSelec: hoy.getMonth() + 1, anioSelec: hoy.getFullYear() });
      })
      .then(rta => {
        return ('/calendario/diasinhabilitados/' + (this.state.mesSelec));
      })
      .then(doSimpleCorsGetRequest)
      .then(rta => {
        console.log('CalendarioAdmin->doSimpleCorsGetRequest->calendario/diasinahabilitados/mes->rta: ', rta);
        let diasnohabiles = rta.map((e) => {
          console.log('CalendarioAdmin->e.dia: ', e.dia);
          let dia = e.dia.trim().split('-');
          //let dia = new Date(+dateDiv[0],+dateDiv[1]-1,+dateDiv[2]);     
          console.log('CalendarioAdmin->dia: ', dia);
          //console.log('CalendarioAdmin->dia.getDate(): ',dia.getDate());   
          //return (dia.getDate());
          return (+dia[2])
        })
        if (rta.length !== 0) this.setState({ diasnohabiles });
      })
      .then(rta => {
        let inicio = this.state.inicioPeriodo.trim().split('-');
        let fin = this.state.finPeriodo.trim().split('-');
        /*let dia = new Date(+dateDiv[0],+dateDiv[1]-1,+dateDiv[2]);   
        let i = new Date(this.state.inicio)
        let j = new Date(this.state.fin) */
        let diashabilitados = {};
        diashabilitados.inicio = (this.state.mesSelec == inicio[1]) ? +inicio[2] : 1;
        diashabilitados.fin = (this.state.mesSelec == fin[1]) ? +fin[2] : this.state.diasXmes[this.state.mesSelec - 1];
        /* verdes.inicio = (this.state.mesSelec == (1+i.getMonth()))?i.getDate() : 1;
        verdes.fin = (this.state.mesSelec == (1+j.getMonth()))? j.getDate() : this.state.diasXmes[this.state.mesSelec]; */
        this.setState({ diashabilitados })
        return (('/salas/reservaspendientes/', this.props.usuario.token));
      })
      .catch(err => console.log('calendario-err: ', err));

    doJwtCorsGetRequest('/salas/reservaspendientes/', this.props.usuario.token)
      .then(rta => {
        console.log('ReservasPendientes->', rta);
        this.setState({ solicitudes: rta })
        return ('/salas')
      })
      .then(doJwtCorsGetRequest)
      .then((rta) => {
        console.log("Rta-: ", rta);
        rta.forEach((element) => { element.activo = false; });
        return rta;
      })
      .catch(err => console.log('calendario-err: ', err));
  }
  setMes(mes, anio) {
    //console.log('->calendarioadmin.js->setMes(mes: '+mes+' anio: '+anio+')')
    //console.log('->calendarioadmin.js->this.state.mesSelec: '+this.state.mesSelec +' this.state.añoSelec: '+this.state.anioSelec);
    this.setState({ mesSelec: mes });
    let anioInicioAux = this.state.inicioPeriodo.trim().split('-')[0];
    let mesInicioAux = this.state.inicioPeriodo.trim().split('-')[1];
    let anioFinAux = this.state.finPeriodo.trim().split('-')[0];
    let mesFinAux = this.state.finPeriodo.trim().split('-')[1];
    let diaFinAux = this.state.finPeriodo.trim().split('-')[2];
    let fechInicio = new Date(anioInicioAux, +mesInicioAux - 1, 1);
    let fechFin = new Date(anioFinAux, +mesFinAux - 1, diaFinAux);
    let paramFecha = new Date(anio, mes - 1, 1);
    //console.log('->calendarioadmin.js->anioInicio: '+anioInicioAux +' mesInicio: '+mesInicioAux+' anioFin: '+anioFinAux+' mesFin:'+mesFinAux);
    //console.log('->calendarioadmin.js->fechInicio: ',fechInicio ,' fechFin: ',fechFin, ' paramFecha: ',paramFecha);

    if ((fechFin.getTime() >= paramFecha.getTime()) && (fechInicio.getTime() <= paramFecha.getTime())) {
      //console.log('->calendarioadmin.js->ESTA EN FECHA')
      doSimpleCorsGetRequest('/calendario/diasinhabilitados/' + (mes))
        .then(rta => {
          console.log('->calendarioadmin.js->ESTA EN FECHA->diasinhabilitados->rta->', rta);
          let diasnohabiles = rta.map((e) => {
            let dia = e.dia.trim().split('-');
            return (+dia[2])
          })
          if (rta.length !== 0) { this.setState({ diasnohabiles }) } else { this.setState({ diasnohabiles: [] }) };
        })
        .then(rta => {
          let inicio = this.state.inicio.trim().split('-');
          let fin = this.state.fin.trim().split('-');
          //console.log('->calendarioadmin.js->verdes->inicio: '+inicio+' fin: '+fin+' mesSelec: '+this.state.mesSelec +' añoSelec: '+this.state.anioSelec);
          let diashabiles = {};
          diashabiles.inicio = (this.state.mesSelec == inicio[1]) ? +inicio[2] : 1;
          diashabiles.fin = (this.state.mesSelec == fin[1]) ? +fin[2] : this.state.diasXmes[this.state.mesSelec - 1];
          console.log('->calendarioadmin.js->verdes: ', diashabiles)
          this.setState({ diashabiles })
        })
        .catch(err => console.log('calendario-err: ', err));
    } else {
      //console.log('->calendarioadmin.js->NO ESTA EN FECHA')
      this.setState({ diashabiles: [] })
    }
  }
  eliminar(indice){
    console.log('eliminando el indice: ',indice)
    let solsAux = Array.from(this.state.solicitudes);
    //console.log('salasAux ',salasAux);
    solsAux.splice(indice,1);
    this.setState({solicitudes:solsAux});
    //console.log('salasAux ',salasAux);
  }
  render() {
    return (
      <div>
        <h2>Gestión de solicitudes de turnos</h2>
        <Mes setDia={(d) => this.setState({ diaSelec: d })} setMes={this.setMes} setAnio={(a) => this.setState({ anioSelec: a })} rojos={this.state.diasnohabiles} verdes={this.state.diashabilitados} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>sala</th>
              <th>especialidad</th>
              <th>materia</th>
              <th>solicitante</th>
              <th>fecha</th>
              <th>horario</th>
              <th>cantidad alumnos</th>
              <th>comentario</th>
              <th>acción</th>
            </tr>
          </thead>
          <tbody>
            { this.state.solicitudes.map((e,i) => <ItemReservAdmin e={e} eliminar={this.eliminar} indice={i} key={e.idSolicitudSala}/>) }
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(ReservasAdmin);