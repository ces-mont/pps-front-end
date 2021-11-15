import React from 'react';
import { connect } from "react-redux";
import { doSimpleCorsGetRequest, doJwtCorsGetRequest, doJwtPreflightCorsPostRequest } from "../apirequests/requests";
import Mes from "../componentescomunes/mes";
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, CardGroup, Card, Jumbotron, Nav, Badge } from 'react-bootstrap';
import ItemReservAdminSala from '../componentescomunes/itemReservAdminSala';
import ItemReservAdminAcc from '../componentescomunes/itemReservAdminAcc';
import { IoCaretUpCircle, IoStopOutline, IoCheckboxOutline, IoArrowUpOutline, IoArrowDown, IoArrowUp } from "react-icons/io5";
import Turnos from "../componentescomunes/turnos";

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
      horarios: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      msj: "",
      diashabilitados: {},
      vistaSala: true,
      limpiar: 0,
      idSolicitudSalaSeleccionada: null,
      idSolicitudAccSeleccionado: null,
      hayChoque:0,

      solicitudesSalas: [],
      solicitudesAccs: []
    }
    this.setMes = this.setMes.bind(this);
    this.eliminarAcc = this.eliminarAcc.bind(this);
    this.eliminarSala = this.eliminarSala.bind(this);
    this.order = this.order.bind(this)
    this.consultaReservasAcc = this.consultaReservasAcc.bind(this);
    this.consultaReservasSala = this.consultaReservasSala.bind(this);
    this.seleccionSolicitud = this.seleccionSolicitud.bind(this);
    /*     this.seleccionarAcc = this.seleccionarAcc.bind(this)
        this.seleccionarSala = this.seleccionarSala.bind(this) */
  }
  componentDidMount() {
    doJwtCorsGetRequest('/accesorios/reservaspendientes/', this.props.usuario.token)
      .then(rta => {
        console.log('ReservasAccesoriosPendientes->', rta);
        this.setState({ solicitudesAccs: rta })
      })
      .catch(err => console.log('err1: ', err));

    doJwtCorsGetRequest('/salas/reservaspendientes/', this.props.usuario.token)
      .then(rta => {
        console.log('ReservasSalasPendientes->', rta);
        this.setState({ solicitudesSalas: rta })
        return ('/calendario/periodo');
      })
      .then(doSimpleCorsGetRequest)
      .then(rta => {
        //console.log('ReservasAdmin->doSimpleCorsGetRequest->calendario/periodo/mes->rta: ', rta);
        let hoy = new Date();
        if (rta.length !== 0) this.setState({ inicioPeriodo: rta[0].inicio, finPeriodo: rta[0].fin });
        this.setState({ diaSelec: hoy.getDate(), mesSelec: hoy.getMonth() + 1, anioSelec: hoy.getFullYear() });
        return (1 + hoy.getMonth())
      })
      .then(rta => {
        return ('/calendario/diasinhabilitados/' + (rta));
      })
      .then(doSimpleCorsGetRequest)
      .then(rta => {
        //console.log('AdmReervas->doSimpleCorsGetRequest->calendario/diasinahabilitados/mes->rta: ', rta);
        let diasnohabiles = rta.map((e) => {
          //console.log('CalendarioAdmin->e.dia: ', e.dia);
          let dia = e.dia.trim().split('-');
          //console.log('CalendarioAdmin->dia: ', dia);
          return (+dia[2])
        })
        if (rta.length !== 0) this.setState({ diasnohabiles });
      })
      .then(rta => {
        let inicio = this.state.inicioPeriodo.trim().split('-');
        let fin = this.state.finPeriodo.trim().split('-');
        let diashabilitados = {};
        diashabilitados.inicio = (this.state.mesSelec == inicio[1]) ? +inicio[2] : 1;
        diashabilitados.fin = (this.state.mesSelec == fin[1]) ? +fin[2] : this.state.diasXmes[this.state.mesSelec - 1];
        this.setState({ diashabilitados })
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
          //console.log('->calendarioadmin.js->ESTA EN FECHA->diasinhabilitados->rta->', rta);
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
          //console.log('->calendarioadmin.js->verdes: ', diashabiles)
          this.setState({ diashabiles })
        })
        .catch(err => console.log('calendario-err: ', err));
    } else {
      //console.log('->calendarioadmin.js->NO ESTA EN FECHA')
      this.setState({ diashabiles: [] })
    }
  }
  eliminarSala(indice) {
    //console.log('eliminando el indice: ', indice)
    let solsAux = Array.from(this.state.solicitudesSalas);
    //console.log('salasAux ',salasAux);
    solsAux.splice(indice, 1);
    this.setState({ solicitudesSalas: solsAux });
    //console.log('salasAux ',salasAux);
  }
  eliminarAcc(indice) {
    //console.log('eliminando el indice: ', indice)
    let solsAux = Array.from(this.state.solicitudesAccs);
    //console.log('salasAux ',salasAux);
    solsAux.splice(indice, 1);
    this.setState({ solicitudesAccs: solsAux });
    //console.log('salasAux ',salasAux);
  }
  setDia(d) {
    console.log("--setDia: " + d);
    this.setState({ diaSelec: d })
    if (this.state.vistaSala) {
      if (this.state.idSolicitudSalaSeleccionada !== null) { this.consultaReservasSala(d); }
    } else {
      if (this.state.idSolicitudAccSeleccionado !== null) { this.consultaReservasAcc(d) }
    }
  }
  setMes(mes, anio) {
    //console.log("->ReservarSala->setMes>mes: " + mes + " anio: " + anio);
    this.setState({ mesSelec: mes });
    let anioInicioAux = this.state.inicioPeriodo.trim().split("-")[0];
    let mesInicioAux = this.state.inicioPeriodo.trim().split("-")[1];
    let anioFinAux = this.state.finPeriodo.trim().split("-")[0];
    let mesFinAux = this.state.finPeriodo.trim().split("-")[1];
    let diaFinAux = this.state.finPeriodo.trim().split("-")[2];
    let fechInicio = new Date(anioInicioAux, +mesInicioAux - 1, 1);
    let fechFin = new Date(anioFinAux, +mesFinAux - 1, diaFinAux);
    let paramFecha = new Date(anio, mes - 1, 1);

    if (fechFin.getTime() >= paramFecha.getTime() && fechInicio.getTime() <= paramFecha.getTime()) {
      doSimpleCorsGetRequest("/calendario/diasinhabilitados/" + mes)
        .then((rta) => {
          //console.log("->calendarioadmin.js->ESTA EN FECHA->diasinhabilitados->rta->", rta);
          let diasnohabiles = rta.map((e) => {
            let dia = e.dia.trim().split("-");
            return +dia[2];
          });
          if (rta.length !== 0) {
            this.setState({ diasnohabiles });
          } else {
            this.setState({ diasnohabiles: [] });
          }
        })
        .then((rta) => {
          let inicio = this.state.inicioPeriodo.trim().split("-");
          let fin = this.state.finPeriodo.trim().split("-");
          //console.log('->calendarioadmin.js->verdes->inicio: '+inicio+' fin: '+fin+' mesSelec: '+this.state.mesSelec +' añoSelec: '+this.state.anioSelec);
          let diashabilitados = {};
          diashabilitados.inicio = this.state.mesSelec == inicio[1] ? +inicio[2] : 1;
          diashabilitados.fin = this.state.mesSelec == fin[1] ? +fin[2] : this.state.diasXmes[this.state.mesSelec - 1];
          //console.log('->calendarioadmin.js->verdes: ',verdes)
          this.setState({ diashabilitados });
        })
        .catch((err) => console.log("calendario-err: ", err));
    } else {
      //console.log('->calendarioadmin.js->NO ESTA EN FECHA')
      this.setState({ diashabilitados: {} });
    }
  }
  consultaReservasSala(indice, anio, mes, dia) {
    //console.log("consultandoReservas->/salas/estado/" + this.state.idSalaSeleccionada + "/" + this.state.anioSelec + "-" + this.state.mesSelec + "-" + dia);
    //console.log("->reseraadmin.js->consultaReservaSala->/salas/estado/" + this.state.solicitudesSalas[indice].Sala.idSala + "/" +anio+"-"+mes+"-"+dia, this.props.usuario.token)
    doJwtCorsGetRequest("/salas/estado/" + this.state.solicitudesSalas[indice].Sala.idSala + "/" + anio + "-" + mes + "-" + dia, this.props.usuario.token)
      .then((rta) => {
        console.log("->reservadmin.js->consultaReservasSala->Rta: " + JSON.stringify(rta));        
        let h1 = this.state.solicitudesSalas[indice].horaInicio.split(':');
        let h2 = this.state.solicitudesSalas[indice].horaFin.split(':');
        let inicioSolicitud = (+h1[0] * 100) + (+h1[1]);
        let finSolicitud = (+h2[0] * 100) + (+h2[1]);                
        let horarios = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // this.state.horarios;
                
        rta.forEach((elem) => {          
          let hora0 = elem.horaInicio.split(":");
          let hora1 = elem.horaFin.split(":");
          //chequeo de superposicion de horarios
          let inicioElem = (+hora0[0]*100)+(+hora0[1]);
          let finElem = (+hora1[0]*100)+(+hora1[1]);
          //console.log('->reservasadmin.js->consultaReservaSala->chequeando inicioElm: '+inicioElem+' finElem: '+finElem+' inicioSolicitud: '+inicioSolicitud+' finSolicitud: '+finSolicitud);
          if((finSolicitud>=inicioElem && finSolicitud<=finElem)||(inicioSolicitud>=inicioElem&&inicioSolicitud<finElem)){
            console.log('hay choque');
            this.setState({hayChoque:++this.state.hayChoque})
          }

          //confeccion del array para graficar
          let inicio = (+hora0[0] - 7) * 2;
          let fin = (+hora1[0] - 7) * 2;
          if (+hora0[1] > 29) { inicio++; }
          if (+hora1[1] === 0) {
            fin--;
          } else if (+hora1[1] > 30) {
            fin++;
          }
          for (let index = inicio; index < fin + 1; index++) { horarios[index] = 1; }
        });
        return horarios;
      })
      .then((rta) => {
        console.log("->reservadmin.js->consultaReservasSala->horarios: " + JSON.stringify(rta));
        this.setState({ horarios: rta });
      })
      .catch();
  }
  consultaReservasAcc(indice,anio,mes,dia) {
    console.log("consultandoReservas->/salas/estado/" +  this.state.solicitudesAccs[indice].Accesorio.idAccesorio  + "/" +anio+"-"+mes+ "-" + dia);
    doJwtCorsGetRequest("/accesorios/estado/" + this.state.solicitudesAccs[indice].Accesorio.idAccesorio + "/" +anio+ "-" +mes+ "-" +dia, this.props.usuario.token)
      .then((rta) => {
        console.log("->reservadmin.js->consultaReservasAccs>Rta: " + JSON.stringify(rta));    
        let horarios = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // this.state.horarios;
        rta.forEach((elem) => {
          let cant = -1 * elem.cantidad;
          let hora0 = elem.horaInicio.split(":");
          let hora1 = elem.horaFin.split(":");
          let inicio = (+hora0[0] - 7) * 2;
          let fin = (+hora1[0] - 7) * 2;
          if (+hora0[1] > 29) { inicio++; }
          if (+hora1[1] === 0) {
            fin--;
          } else if (+hora1[1] > 30) {
            fin++;
          }
          for (let index = inicio; index < fin + 1; index++) {
            let aux = horarios[index];
            horarios[index] = aux + cant;
          }
        });
        return horarios;
      })
      .then((rta) => {
        console.log('-->Horarios ocupados: ', rta)
        this.setState({ horarios: rta });     
        let h1 = this.state.solicitudesAccs[indice].horaInicio.split(':');
        let h2 = this.state.solicitudesAccs[indice].horaFin.split(':');
        let inicioH = (+h1[0]-7)*2;
        let finH = (+h2[0]-7)*2;
        console.log('->reservadmin.js->consultaREservasAccs-> inicioH: '+inicioH+' finH: '+finH)

        for (let i = inicioH; i < finH; i++) {
          console.log('->reservadmin.js->consultaREservasAccs-> horarios['+i+']: '+rta[i])          
          let cantResult = (+this.state.solicitudesAccs[indice].Accesorio.cantidad)-(+this.state.solicitudesAccs[indice].cantidad)+rta[i];
          console.log('->reservadmin.js->consultaREservasAccs-> cantResult: '+cantResult)      
          if(cantResult<0){
            console.log('->reservasadmin.js->no alcanza->saldo: ',cantResult);
            this.setState({hayChoque:++this.state.hayChoque})
          }    
        }
      })
      .catch();
  }
  order(e) {
    //console.log('e.target.value: ',e.target)
    let param = e.split('-')
    //console.log('param[0]: ', param[0]);
    let pedidos = this.state.vistaSala ? this.state.solicitudesSalas : this.state.solicitudesAccs;
    //console.log('---laboratorio rojo < laboratorio verde', ('laboratorio verde' < 'laboratorio rojo'));
    //console.log('Orden-antes: ', pedidos)
    switch (param[0]) {
      case 'salas':
        pedidos.sort((a, b) => {
          //console.log('a.Sala.descripcionCorta', a.Sala.descripcionCorta);
          //console.log('b.Sala.descripcionCorta', b.Sala.descripcionCorta);
          if (a.Sala.descripcionCorta > b.Sala.descripcionCorta) { return (param[1] == 'asc') ? 1 : -1; }
          if (a.Sala.descripcionCorta < b.Sala.descripcionCorta) { return (param[1] == 'asc') ? -1 : 1; }
          return 0;
        })
        break;
      case 'accs':
        pedidos.sort((a, b) => {
          /* console.log('a.Accesorio.descripcionCorta', a.Sala.descripcionCorta);
          console.log('b.Accesorio.descripcionCorta', b.Sala.descripcionCorta); */
          if (a.Accesorio.descripcionCorta > b.Accesorio.descripcionCorta) { return (param[1] == 'asc') ? 1 : -1; }
          if (a.Accesorio.descripcionCorta < b.Accesorio.descripcionCorta) { return (param[1] == 'asc') ? -1 : 1; }
          return 0;
        })
        break;
      case 'cantalumnos':
        pedidos.sort((a, b) => {
          if (+(a.cantidadAlumnos) > +(b.cantidadAlumnos)) { return (param[1] == 'asc') ? 1 : -1; }
          if (+(a.cantidadAlumnos) < +(b.cantidadAlumnos)) { return (param[1] == 'asc') ? -1 : 1; }
          return 0;
        })
        break;
      case 'fechaSolicitud': //fechaSolicitud o fechaPedida como terecer parametro (en param[2])
        pedidos.sort((a, b) => {
          let f1 = a[param[0]].split('-')
          let f2 = b[param[0]].split('-')
          let fech1 = new Date(+f1[0], +f1[1] - 1, +f1[2]);
          let fech2 = new Date(+f2[0], +f2[1] - 1, +f2[2]);
          //console.log('fech1: ', fech1)
          if (fech1.getTime() > fech2.getTime()) { return (param[1] == 'asc') ? 1 : -1; }
          if (fech1.getTime() < fech2.getTime()) { return (param[1] == 'asc') ? -1 : 1; }
          return 0;
        })
        break;
      case 'fechaPedida': //fechaSolicitud o fechaPedida como terecer parametro (en param[2])
        pedidos.sort((a, b) => {
          let f1 = a[param[0]].split('-')
          let f2 = b[param[0]].split('-')
          let fech1 = new Date(+f1[0], +f1[1] - 1, +f1[2]);
          let fech2 = new Date(+f2[0], +f2[1] - 1, +f2[2]);
          let h1 = a.horaInicio.split(':');
          let h2 = b.horaInicio.split(':');
          let a1 = (+h1[0] * 100) + (+h1[1]);
          let b1 = (+h2[0] * 100) + (+h2[1]);
          //console.log('fech1: ', fech1)
          if (fech1.getTime() > fech2.getTime()) { return (param[1] == 'asc') ? 1 : -1; }
          if (fech1.getTime() < fech2.getTime()) { return (param[1] == 'asc') ? -1 : 1; }
          if (a1 < b1) { return (param[1] == 'asc') ? 1 : -1; }
          if (a1 > b1) { return (param[1] == 'asc') ? -1 : 1; }
          return 0;
        })
        break;
      case 'nombre':
        pedidos.sort((a, b) => {
          if (a.Usuario.apellido > b.Usuario.apellido) { return (param[1] == 'asc') ? 1 : -1; }
          if (a.Usuario.apellido < b.Usuario.apellido) { return (param[1] == 'asc') ? -1 : 1; }
          if (a.Usuario.nombre > b.Usuario.nombre) { return (param[1] == 'asc') ? 1 : -1; }
          if (a.Usuario.nombre < b.Usuario.nombre) { return (param[1] == 'asc') ? -1 : 1; }
          return 0;
        })
        break;
      default: //para especialidad y, materia en param[0]
        //console.log('Orden-default->param[1]', param[0])
        pedidos.sort((a, b) => {
          if (a[param[0]] > b[param[0]]) { return (param[1] == 'asc') ? 1 : -1; }
          if (a[param[0]] < b[param[0]]) { return (param[1] == 'asc') ? -1 : 1; }
          return 0;
        })
        break;
    }
    if (this.state.vistaSala) {
      this.setState({ solicitudesSalas: pedidos })
    } else {
      this.setState({ solicitudesAccs: pedidos })
    }
    //console.log('Orden-despues: ', pedidos)
  }
  seleccionSolicitud(indice) {
    //sacar fechaPedida, idSala
    //1°.Setear el calendario en año,mes,dia
    this.setState({hayChoque:0})
    if(this.state.vistaSala){
      let f1 = this.state.solicitudesSalas[indice].fechaPedida.split('-');
      this.setMes(+f1[1], +f1[0]);
      this.consultaReservasSala(indice, f1[0], +f1[1], f1[2]);
    }else{
      let f1 = this.state.solicitudesAccs[indice].fechaPedida.split('-');
      this.setMes(+f1[1], +f1[0]);
      this.consultaReservasAcc(indice, f1[0], +f1[1], f1[2]);
    }
    //console.log('->reservasadmin.js->seleccionSolicitud(): ',+f1[1] - 1, +f1[0])
  }
  /*   seleccionarAcc(e) { this.setState({ idAccSeleccionado: e }) }
    seleccionarSala(e) { this.setState({ idSalaSeleccionada: e }) } */
  render() {
    //console.log('idAccSeleccionado: ' + this.state.idAccSeleccionado)
    console.log('hay choque: ',this.state.hayChoque)
    return (
      <div>
        <h3 className="text-center fw-normal mt-3 mb-4">Gestión de solicitudes de turnos</h3>
        <Row>
          <Col xs={1} className=" mx-0 px-0 py-1">
            <Nav defaultActiveKey="#tabSala" style={{ width: '100%' }} variant="pills" className=" mx-0 px-0 py-1">
              <Nav.Link className="me-2 px-1 text-center" onClick={() => this.setState({ vistaSala: true,horarios: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})} href="#tabSala" style={{ width: '100%' }} size="xs" >Salas</Nav.Link>
              <Nav.Link className="me-2 px-1 text-center" onClick={() => this.setState({ vistaSala: false,horarios: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })} href="#tabAccs" style={{ width: '100%' }} >Dispositivos</Nav.Link>
            </Nav>
          </Col>

          <Col xs={9}>
            {this.state.vistaSala ?
              <Table striped bordered hover style={estiloHead} id="tabSala" >
                <thead className="text-center">
                  <tr>
                    <th style={estiloHead2}>Sala
                      <ButtonGroup>
                        <Button onClick={() => this.order('salas-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('salas-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Fecha del pedido
                      <ButtonGroup>
                        <Button onClick={() => this.order('fechaSolicitud-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('fechaSolicitud-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Especialidad
                      <ButtonGroup>
                        <Button onClick={() => this.order('especialidad-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('especialidad-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Materia
                      <ButtonGroup>
                        <Button onClick={() => this.order('materia-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('materia-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Solicitante
                      <ButtonGroup>
                        <Button onClick={() => this.order('nombre-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('nombre-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Fecha Solicitada
                      <ButtonGroup>
                        <Button onClick={() => this.order('fechaPedida-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('fechaPedida-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Horario Solicitado</th>
                    <th style={estiloHead2}>Cantidad alumnos
                      <ButtonGroup>
                        <Button onClick={() => this.order('cantalumnos-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('cantalumnos-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Comentario</th>
                    <th style={estiloHead2}>Acción</th>
                  </tr>
                </thead>
                <tbody className="text-center fw-normal" style={estiloHead2}>
                  {this.state.solicitudesSalas.map((e, i) =>
                    <ItemReservAdminSala
                      e={e}
                      eliminar={this.eliminarSala}
                      indice={i}
                      id={e.idSolicitudSala}
                      key={e.idSolicitudSala}
                      idSolicitudSalaSeleccionada={this.state.idSolicitudSalaSeleccionada}
                      hayChoque={this.state.hayChoque}
                      selecc={() => {
                        this.setState({ idSolicitudSalaSeleccionada: e.idSolicitudSala });
                        this.seleccionSolicitud(i)
                      }}
                    />
                  )}
                </tbody>
              </Table>
              :
              <Table striped bordered hover style={estiloHead} id="tabAccs">
                <thead className="text-center">
                  <tr>
                    <th style={estiloHead2}>Dispositivo
                      <ButtonGroup>
                        <Button onClick={() => this.order('accs-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('accs-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Fecha del pedido
                      <ButtonGroup>
                        <Button onClick={() => this.order('fechaSolicitud-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('fechaSolicitud-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Especialidad
                      <ButtonGroup>
                        <Button onClick={() => this.order('especialidad-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('especialidad-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Materia
                      <ButtonGroup>
                        <Button onClick={() => this.order('materia-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('materia-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Solicitante
                      <ButtonGroup>
                        <Button onClick={() => this.order('nombre-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('nombre-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Fecha Solicitada
                      <ButtonGroup>
                        <Button onClick={() => this.order('fechaPedida-asc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowUp style={{ width: '2ex' }} /></Button>
                        <Button onClick={() => this.order('fechaPedida-desc')} className="px-0 py-0" style={{ width: '2.5ex', height: '2.5ex' }}><IoArrowDown style={{ width: '2ex' }} /></Button>
                      </ButtonGroup></th>
                    <th style={estiloHead2}>Horario Solicitado</th>
                    <th style={estiloHead2}>Cantidad solicitada</th>
                    <th style={estiloHead2}>Comentario</th>
                    <th style={estiloHead2}>Acción</th>
                  </tr>
                </thead>
                <tbody className="text-center fw-normal" style={estiloHead2}>
                  {this.state.solicitudesAccs.map((e, i) =>
                    <ItemReservAdminAcc
                      e={e}
                      eliminar={this.eliminarAcc}
                      indice={i} id={e.idSolicitudAccesorio}
                      key={e.idSolicitudAccesorio}
                      idSolicitudAccSeleccionado={this.state.idSolicitudAccSeleccionado}
                      selecc={() => {
                        this.setState({ idSolicitudAccSeleccionado: e.idSolicitudAccesorio });
                        this.seleccionSolicitud(i)
                      }}
                    />
                  )}
                </tbody>
              </Table>}
          </Col>

          <Col xs={2} className=" mx-0 px-0 ">
            <Card className=" mx-0 px-0 py-0">
              <Card.Header className="fw-normal text-center mb-1">Vista del calendario</Card.Header>
              <Mes setDia={this.setDia} setMes={this.setMes} setAnio={(a) => this.setState({ anioSelec: a })} key={this.state.limpiar} rojos={this.state.diasnohabiles} verdes={this.state.diashabilitados} />
              <table variant="dark" className="table mt-1" style={{ fontFamily: 'Saira Extra Condensed', fontSize: '2ex', width: '10ex', height: '2.2ex !important' }}>
                <tbody>
                  <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ background: 'rgb(118,167,105)'}}></td><td className="mt-0 mb-0 " ><h6 style={{ width: '13ex', height: '1.2ex' }} className="mt-0 mb-0 pt-0 pb-0">dias habilitados</h6></td></tr>
                  <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ background: 'rgb(185,100,85)'}}></td><td className="mt-0 mb-0 "><h6 style={{ width: '13ex', height: '1.2ex' }} className="mt-0 mb-0 pt-0 pb-0">dias no habilitados</h6></td></tr>
                </tbody>
              </table>
              <Turnos horarios={this.state.horarios} />
              <table variant="dark" className="table mt-1" style={{ fontFamily: 'Saira Extra Condensed', fontSize: '2ex', width: '3.5ex' }}>
                <tbody>
                  <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ background: 'rgb(50,170,80)', width: '3ex' }}></td><td><h6 style={{ width: '8ex', height: '1.2ex' }} className="mt-0 mb-0 pt-0 pb-0">Libre</h6></td></tr>
                  <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ background: 'rgb(190,50,30)', width: '3ex' }}></td><td><h6 style={{ width: '8ex', height: '1.2ex' }} className="mt-0 mb-0 pt-0 pb-0">Reservado</h6></td></tr>
                </tbody>
              </table>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ usuario: state.userReducer });
export default connect(mapStateToProps, null)(ReservasAdmin);


const estiloHead = {
  fontFamily: 'Saira Extra Condensed',
  fontSize: '2ex',
  fontWeight: '400'
}
const estiloHead2 = {
  fontFamily: 'Mohave',
  fontSize: '1.6ex',
  fontWeight: '500'
}