import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import Plantilla from "../componentescomunes/plantilla";
//import Calendar from "react-calendar";
import Horarios from "../componentescomunes/horarios";
import Turnos from "../componentescomunes/turnos";
import { doSimpleCorsGetRequest, doJwtCorsGetRequest, doJwtPreflightCorsPostRequest } from "../apirequests/requests";
import { connect } from "react-redux";
//import { login, setToken } from '../redux/actions/useractions';
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, CardGroup, Card, Jumbotron } from 'react-bootstrap';
import Mes from "../componentescomunes/mes";

class ReservaSala extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salas: [],
      diaSelec: null, // dia actual en el dibujo del calendario
      mesSelec: null, // mes actual en el dibujo del calendario
      anioSelec: null, // año actual en el dibujo del calendario
      diasnohabiles: [], //aparecerán en rojo en el calendario
      diashabiles: {},
      salaSelec: null,
      inicioPeriodo:'',
      finPeriodo: '',
      diasXmes: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

      diaElegido: "",
      materia: "",
      especialidad: "",
      cantAlumnos: 0,
      horaInicio: "7:00",
      horaFin: "7:00",
      comentario: "",

      showModal:false,
      limpiar:0,

      respuesta: "",
      horarios: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      msj: "",
      reservando: false,
      submitok: false,
    };
    this.setMes = this.setMes.bind(this);
    this.setDia = this.setDia.bind(this);
    //this.setSala = this.setSala.bind(this);
    //this.setDia = this.setDia.bind(this);
    this.consultaReservas = this.consultaReservas.bind(this);
    //this.manejarCambio = this.manejarCambio.bind(this);
    //this.manejaSubmit = this.manejaSubmit.bind(this);
    //this.chequearCampos = this.chequearCampos.bind(this);
    this.reservar = this.reservar.bind(this);
    this.cierraModal = this.cierraModal.bind(this);
  }
  componentDidMount() {
    doJwtCorsGetRequest("/salas/")
      .then((rta) => {
        console.log("Rta-: ", rta);
        rta.forEach((element) => { element.activo = false; });
        return rta;
      })
      .then((rta) => {
        this.setState({ salas: rta });
        console.log("Rta->salas: " + rta);
        console.log("this.props.location: " + this.props.location);
        return "/calendario/periodo";
      })
      .then(doSimpleCorsGetRequest)
      .then((rta) => {
        console.log("ReservaSala->doSimpleCorsGetRequest->calendario/periodo/mes->rta: ", rta);
        let hoy = new Date();
        if (rta.length !== 0) this.setState({ inicioPeriodo: rta[0].inicio, finPeriodo: rta[0].fin });
        this.setState({ diaSelec: null, mesSelec: hoy.getMonth() + 1, anioSelec: hoy.getFullYear() });
        return "/calendario/diasinhabilitados/" + this.state.mesSelec;
      })
      .then(doSimpleCorsGetRequest)
      .then((rta) => {
        console.log("ReservaSala->doSimpleCorsGetRequest->calendario/diasinahabilitados/mes->rta: ", rta);
        let diasnohabiles = rta.map((e) => {
          //console.log('CalendarioAdmin->e.dia: ',e.dia);
          let dia = e.dia.trim().split("-");
          //let dia = new Date(+dateDiv[0],+dateDiv[1]-1,+dateDiv[2]);
          //console.log('CalendarioAdmin->dia: ',dia);
          //console.log('CalendarioAdmin->dia.getDate(): ',dia.getDate());
          //return (dia.getDate());
          return +dia[2];
        });
        if (rta.length !== 0) this.setState({ diasnohabiles });
      })
      .then((rta) => {
        let inicio = this.state.inicioPeriodo.trim().split("-");
        let fin = this.state.finPeriodo.trim().split("-");
        /*let dia = new Date(+dateDiv[0],+dateDiv[1]-1,+dateDiv[2]);   
        let i = new Date(this.state.inicio)
        let j = new Date(this.state.fin) */
        let diashabiles = {};
        diashabiles.inicio = this.state.mesSelec == inicio[1] ? +inicio[2] : 1;
        diashabiles.fin = this.state.mesSelec == fin[1] ? +fin[2] : this.state.diasXmes[this.state.mesSelec - 1];
        /* verdes.inicio = (this.state.mesSelec == (1+i.getMonth()))?i.getDate() : 1;
        verdes.fin = (this.state.mesSelec == (1+j.getMonth()))? j.getDate() : this.state.diasXmes[this.state.mesSelec]; */
        this.setState({ diashabiles });
      })
      .catch((err) => console.log("calendario-err: ", err));
  }
  setMes(mes, anio) {
    console.log("->ReservarSala->setMes>mes: " + mes + " anio: " + anio);
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
          console.log("->calendarioadmin.js->ESTA EN FECHA->diasinhabilitados->rta->", rta);
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
          let diashabiles = {};
          diashabiles.inicio = this.state.mesSelec == inicio[1] ? +inicio[2] : 1;
          diashabiles.fin = this.state.mesSelec == fin[1] ? +fin[2] : this.state.diasXmes[this.state.mesSelec - 1];
          //console.log('->calendarioadmin.js->verdes: ',verdes)
          this.setState({ diashabiles });
        })
        .catch((err) => console.log("calendario-err: ", err));
    } else {
      //console.log('->calendarioadmin.js->NO ESTA EN FECHA')
      this.setState({ diashabiles: {} });
    }
  }
  cierraModal() {
    console.log('cierra modal')
        if (this.state.submitok) {
            let salas = this.state.salas;
            salas.forEach(elem => { elem.activo = false });
        }
        this.setState({ showModal: false, limpiar: ++this.state.limpiar });
  } 
  /*async setSala(e) {
    let salas = this.state.salas;
    console.log("-->setSala->e.name: " + e.target.name);
    salas.forEach((elem) => {
      elem.activo = e.target.name == elem.idSala;
    });
    await this.setState({ salas: salas, salaElegida: e.target.name });
    if (this.state.diaElegido !== "") {
      this.consultaReservas();
    }
  }*/
  /*
  async setDia(e) {
    await this.setState({ diaElegido: e.toJSON() });
    if (this.state.salaElegida !== null) {
      this.consultaReservas();
    }
  }*/
  //setSala(id){}
  setDia(d) {
    console.log("--setDia: " + d);
    this.setState({diaSelec: d})
    if (this.state.salaSelec !== null) { this.consultaReservas(d); }
  }
  consultaReservas(dia) {
    console.log("consultandoReservas->/salas/estado/" + this.state.salaSelec + "/" + this.state.anioSelec + "-" + this.state.mesSelec + "-" + dia);
    doJwtCorsGetRequest("/salas/estado/" + this.state.salaSelec + "/" + this.state.anioSelec + "-" + this.state.mesSelec + "-" + dia, this.props.user.token)
      .then((rta) => {
        console.log("Rta-: " + JSON.stringify(rta));
        let horarios = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // this.state.horarios;
        rta.forEach((elem) => {
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
          for (let index = inicio; index < fin + 1; index++) { horarios[index] = 1; }
        });
        return horarios;
      })
      .then((rta) => {
        this.setState({ horarios: rta });
      })
      .catch();
  }
/*   manejarCambio(e) {
    this.setState({ [e.target.name]: e.target.value });
  } */
  chequearCampos() {
    if (this.state.especialidad === "") {
      this.setState({ msj: "Indique una especialidad" });
      this.setState({ showModal: true });
      return false;
    }
    if (this.state.materia === "") {
      this.setState({ msj: "Indique una materia" });
      this.setState({ showModal: true });
      return false;
    }
    if (this.state.cantAlumnos <= 0) {
      this.setState({ msj: "Indique la cantidad de alumnos" });
      this.setState({ showModal: true });
      return false;
    }
    return true;
  }
  reservar(e) {
    console.log("reservando la sala");
    e.preventDefault();
    if (this.chequearCampos()) {
      let horaInicio = this.state.horaInicio.split(":");
      let horaFin = this.state.horaFin.split(":");
      let inicio = (+horaInicio[0] - 7) * 2;
      let fin = (+horaFin[0] - 7) * 2;
      console.log("state.horaInicio:" + this.state.horaInicio + " inicio: " + inicio + " this.state.horaFin:" + this.state.horaFin + " fin: " + fin);
      console.log("horaInicio[1]:" + horaInicio[1] + " horaFin[1]: " + horaFin[1]);
      console.log("horaInicio[0]:" + horaInicio[0] + " horaFin[0]: " + horaFin[0]);
      if (+horaInicio[0] > +horaFin[0] || (+horaInicio[0] === +horaFin[0] && +horaInicio[1] >= +horaFin[1])) {
        this.setState({ msj: "El horario elegido no es correcto" });
        this.setState({ showModal: true });
      } else {
        if (+horaInicio[1] === 30) {inicio++;}
        if (+horaFin[1] === 0) { fin--;}
        let horarios = this.state.horarios.slice(inicio, fin + 1);
        console.log("horarios[]:", horarios);
        if ( horarios.some((e) => {return e === 1;})) {
          console.log("========>OCUPADO!!!");
          this.setState({ msj: "El horario elegido o parte de él ya está reservado" });
          this.setState({ showModal: true });
        } else {
          console.log("========>NO OCUPADO!!!");
          doJwtPreflightCorsPostRequest( "/salas/reservar", JSON.stringify({ idSala: this.state.salaSelec, especialidad: this.state.especialidad, 
            materia: this.state.materia, comentario: this.state.comentario, dia: (this.state.anioSelec+'-'+this.state.mesSelec+'-'+this.state.diaSelec), 
            horaInicio: this.state.horaInicio, horaFin: this.state.horaFin, cantAlumnos: this.state.cantAlumnos,}), false, this.props.user.token )
            .then((rta) => {
              console.log("Rta-: " + JSON.stringify(rta));
              this.setState({ msj: rta.msj, showModal: true, submitok: true, diaSelec: null, salaSelec: null, reservando: false,diaElegido: "",
              materia: "", especialidad: "", cantAlumnos: 0, horaInicio: "7:00", horaFin: "7:00", comentario: "", });
              return rta;
            })
            .catch();
        }
      }
    }
  }
/*   reservar(e) {
    e.preventDefault();
    console.log("->reservar: ");
  } */
  render() {
    //console.log("this.state.salaSelec: ", this.state.salaSelec);
    console.log("this.state.limpiar: ", this.state.limpiar);
    return (
      <Plantilla>
        <div id="titulo">
          <h3>Reserva de salas</h3>
          <p>DISILab ofrece un amplio horario donde los distintos laboratorios están disponible para su uso</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col list-group">
              <h3>Seleccionar sala</h3>
              {this.state.salas.map((elem) => (
                <a href="#" className="list-group-item list-group-item-action" aria-current="true" key={elem.idSala} onClick={() => this.setState({ salaSelec: elem.idSala })}>
                  <div className="d-flex w-100 justify-content-between">
                    <div className="col-md-1">
                      <img src={elem.urlImagen} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <h6 className="mb-1">{elem.descripcionCorta}</h6>
                    <small>3 days ago</small>
                  </div>
                  <p className="mb-1">{elem.descripcionLarga}</p>
                  <p className="mb-1">{elem.tipo}</p>
                  <small>ubicación: {elem.ubicacion}</small>
                </a>)
              )}
            </div>

            <div className="col">
              <h3>Seleccionar día</h3>
              <Mes setDia={this.setDia} setMes={this.setMes} setAnio={(a) => this.setState({ anioSelec: a })} key={this.state.limpiar} rojos={this.state.diasnohabiles} verdes={this.state.diashabiles}/>
            </div>

            <div className="col"> <Turnos horarios={this.state.horarios} /> </div>
          </div>

          <div>
            <Form onSubmit={this.reservar}>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Especialidad</label>
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" value={this.state.especialidad} onChange={(e) => this.setState({ especialidad: e.target.value })} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Materia</label>
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" value={this.state.materia} onChange={(e) => this.setState({ materia: e.target.value })} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Cantidad de alumnos</label>
                </div>
                <div className="col-auto">
                  <input type="number" className="form-control" value={this.state.cantAlumnos} onChange={() => this.setState({ cantAlumnos: event.target.value })}/>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Comentario</label>
                </div>
                <div className="col-auto">
                  <textarea className="form-control" placeholder="si desea puede hacer un comentario" onChange={() => this.setState({ comentario: event.target.value })} maxLength={80} value={this.state.comentario} type="textarea"/>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Hora Inicio</label>
                </div>
                <div className="col-auto">
                  <select className="form-select" value={this.state.horaInicio} onChange={(e) => this.setState({ horaInicio: e.target.value })}>
                    {Horarios.map((e) => ( <option value={e}>{e}</option>   ))}
                  </select>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-auto">
                  <label className="col-form-label">Hora Finalizacion</label>
                </div>
                <div className="col-auto">
                  <select className="form-select" value={this.state.horaFin} onChange={(e) => this.setState({ horaFin: e.target.value })}>
                    {Horarios.map((e) => ( <option value={e}>{e}</option> ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary active"> Solicitar reserva </button>
            </Form>
          </div>

          <div className="mt-4">
            {this.state.salaElegida !== null && !this.state.reservando && this.state.diaElegido !== "" ? (
              <div>
                <button onClick={() => { this.setState({ reservando: true }); }}> Hacer Reserva </button>
              </div>
            ) : null}
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
          <Modal.Header closeButton> <Modal.Title>Solicitud de reserva</Modal.Title> </Modal.Header>
          <Modal.Body> <p style={{ color: 'rgb(5,6,28' }}>{this.state.msj}</p> </Modal.Body>
          <Modal.Footer> <Button variant="primary" onClick={this.cierraModal}>Ok</Button> </Modal.Footer>
        </Modal>
      </Plantilla>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.userReducer });
/*const mapDispatchToProps = {
    dispatchLogin: (usuario) => login(usuario),
    dispatchSetToken: (token) => setToken(token)
}*/

export default connect(mapStateToProps, null)(ReservaSala);
/* */
