import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import Plantilla from "../componentescomunes/plantilla";
//import Calendar from "react-calendar";
import Horarios from "../componentescomunes/horarios";
import Turnos from "../componentescomunes/turnos";
import { doSimpleCorsGetRequest, doJwtCorsGetRequest, doJwtPreflightCorsPostRequest } from "../apirequests/requests";
import { connect } from "react-redux";
//import { login, setToken } from '../redux/actions/useractions';
import { Table, Form, Col, Button, Modal, ButtonGroup, ListGroup, Row, CardDeck, Badge, CardGroup, Card, Jumbotron } from 'react-bootstrap';
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
      inicioPeriodo: '',
      finPeriodo: '',
      diasXmes: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

      diaElegido: "",
      materia: "",
      especialidad: "",
      cantAlumnos: 0,
      horaInicio: "7:00",
      horaFin: "7:00",
      comentario: "",

      showModal: false,
      limpiar: 0,

      respuesta: "",
      horarios: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      msj: "",
      submitok: false,
    };
    this.setMes = this.setMes.bind(this);
    this.setDia = this.setDia.bind(this);
    this.consultaReservas = this.consultaReservas.bind(this);
    this.reservar = this.reservar.bind(this);
    this.cierraModal = this.cierraModal.bind(this);
  }
  componentDidMount() {
    doJwtCorsGetRequest("/salas/")
      .then((rta) => {
        this.setState({ salas: rta });
        return "/calendario/periodo";
      })
      .then(doSimpleCorsGetRequest)
      .then((rta) => {
        let hoy = new Date();
        if (rta.length !== 0) this.setState({ inicioPeriodo: rta[0].inicio, finPeriodo: rta[0].fin });
        this.setState({ diaSelec: null, mesSelec: hoy.getMonth() + 1, anioSelec: hoy.getFullYear() });
        return "/calendario/diasinhabilitados/" + this.state.mesSelec;
      })
      .then(doSimpleCorsGetRequest)
      .then((rta) => {
        let diasnohabiles = rta.map((e) => {
          let dia = e.dia.trim().split("-");
          return +dia[2];
        });
        if (rta.length !== 0) this.setState({ diasnohabiles });
      })
      .then((rta) => {
        let inicio = this.state.inicioPeriodo.trim().split("-");
        let fin = this.state.finPeriodo.trim().split("-");
        let diashabiles = {};
        diashabiles.inicio = this.state.mesSelec == inicio[1] ? +inicio[2] : 1;
        diashabiles.fin = this.state.mesSelec == fin[1] ? +fin[2] : this.state.diasXmes[this.state.mesSelec - 1];
        this.setState({ diashabiles });
      })
      .catch();
  }
  setMes(mes, anio) {
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
          let diashabiles = {};
          diashabiles.inicio = this.state.mesSelec == inicio[1] ? +inicio[2] : 1;
          diashabiles.fin = this.state.mesSelec == fin[1] ? +fin[2] : this.state.diasXmes[this.state.mesSelec - 1];
          this.setState({ diashabiles });
        })
        .catch();
      }else{
      this.setState({ diashabiles: {} });
    }
  }
  cierraModal() {
    this.setState({ showModal: false, limpiar: ++this.state.limpiar });
  }
 
  /*
  async setDia(e) {
    await this.setState({ diaElegido: e.toJSON() });
    if (this.state.salaElegida !== null) {
      this.consultaReservas();
    }
  }*/
  //setSala(id){}
  setDia(d) {
    this.setState({ diaSelec: d })
    if (this.state.salaSelec !== null) { this.consultaReservas(d); }
  }
  consultaReservas(dia) {
    doJwtCorsGetRequest("/salas/estado/" + this.state.salaSelec + "/" + this.state.anioSelec + "-" + this.state.mesSelec + "-" + dia, this.props.user.token)
      .then((rta) => {
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
    e.preventDefault();
    if (this.chequearCampos()) {
      let horaInicio = this.state.horaInicio.split(":");
      let horaFin = this.state.horaFin.split(":");
      let inicio = (+horaInicio[0] - 7) * 2;
      let fin = (+horaFin[0] - 7) * 2;
      if (+horaInicio[0] > +horaFin[0] || (+horaInicio[0] === +horaFin[0] && +horaInicio[1] >= +horaFin[1])) {
        this.setState({ msj: "El horario elegido no es correcto" });
        this.setState({ showModal: true });
      } else {
        if (+horaInicio[1] === 30) { inicio++; }
        if (+horaFin[1] === 0) { fin--; }
        let horarios = this.state.horarios.slice(inicio, fin + 1);
        if (horarios.some((e) => { return e === 1; })) {
          this.setState({ msj: "El horario elegido o parte de él ya está reservado" });
          this.setState({ showModal: true });
        } else {
          doJwtPreflightCorsPostRequest("/salas/reservar", JSON.stringify({
            idSala: this.state.salaSelec, especialidad: this.state.especialidad,
            materia: this.state.materia, comentario: this.state.comentario, dia: (this.state.anioSelec + '-' + this.state.mesSelec + '-' + this.state.diaSelec),
            horaInicio: this.state.horaInicio, horaFin: this.state.horaFin, cantAlumnos: this.state.cantAlumnos,
          }), false, this.props.user.token)
            .then((rta) => {
              this.setState({
                msj: rta.msj, showModal: true, submitok: true, diaSelec: null, salaSelec: null, reservando: false, diaElegido: "",
                materia: "", especialidad: "", cantAlumnos: 0, horaInicio: "7:00", horaFin: "7:00", comentario: "",
              });
              return rta;
            })
            .catch();
        }
      }
    }
  }
  /*   reservar(e) {
      e.preventDefault();
    } */


  render() {
    return (
      <Plantilla>
        <div id="titulo" className="text-center fw-light mb-5 mt-4">
        </div>
        <div className="container">
          <Row>
            <Col xs={7}>
              <h4 className="fw-normal">1. Seleccione una sala</h4>
              <div className="list-group">
                {this.state.salas.map((elem) => (
                  <a href="#" className="list-group-item list-group-item-action p-0 " aria-current="true" key={elem.idSala} onClick={(e) => { this.setState({ salaSelec: elem.idSala }); }}>
                    <Row>
                      <Col xs={2}>
                        <img src={elem.urlImagen} style={{ maxWidth: '6em' }} className="img-fluid rounded-start" alt="..." />
                      </Col>
                      <Col>
                        <h6 className="mb-1">{elem.descripcionCorta} ({elem.tipo}) {(this.state.salaSelec == elem.idSala) ? <Badge pill bg="secondary">seleccionada</Badge> : null}</h6>
                        <p className="mb-1 fw-light lh-1">{elem.descripcionLarga}</p>
                        <small className="mb-1 fw-light lh-1">ubicación: {elem.ubicacion} </small>
                      </Col>
                    </Row>
                  </a>)
                )}
              </div>
            </Col>

            <Col>
              <h4 className="fw-normal">2. Seleccione un día</h4>
              <Mes setDia={this.setDia} setMes={this.setMes} setAnio={(a) => this.setState({ anioSelec: a })} key={this.state.limpiar} rojos={this.state.diasnohabiles} verdes={this.state.diashabiles} />
              <table variant="dark" className="table mt-1" style={{ fontFamily: 'Saira Extra Condensed', fontSize: '2ex', }}>
                <tbody>
                <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ background: 'rgb(118,167,105)', width: '3ex' }}></td><td><h6 className="mt-0 mb-0 pt-0 pb-0">dias habilitados</h6></td></tr>
                <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ background: 'rgb(185,100,85)', width: '3ex' }}></td><td><h6 className="mt-0 mb-0 pt-0 pb-0">dias no habilitados</h6></td></tr>
              </tbody>
              </table>
            </Col>

            <Col className="pt-4">
              <Turnos horarios={this.state.horarios} />
              <table variant="dark" className="table mt-1" style={{ fontFamily: 'Saira Extra Condensed', fontSize: '2ex', }}>
                <tbody>
                <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ background: 'rgb(50,170,80)', width: '3ex' }}></td><td><h6 className="mt-0 mb-0 pt-0 pb-0">Libre</h6></td></tr>
                <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ background: 'rgb(190,50,30)', width: '3ex' }}></td><td><h6 className="mt-0 mb-0 pt-0 pb-0">Reservado</h6></td></tr>
              </tbody>
              </table>
            </Col>
          </Row>
          {(this.state.diaSelec != null && this.state.salaSelec != null) ?
            <Row>
              <h4 className="fw-normal mt-5">3. Complete los siguientes datos</h4>
              <Form onSubmit={this.reservar} className="mt-1 p-3 border">
                <Row className="mb-1">
                  <Col xs={3}>
                    <label className="col-form-label">Especialidad</label>
                  </Col>
                  <Col xs={6}>
                    <input type="text" className="form-control" value={this.state.especialidad} onChange={(e) => this.setState({ especialidad: e.target.value })} />
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col xs={3}>
                    <label className="col-form-label">Materia</label>
                  </Col>
                  <Col xs={6}>
                    <input type="text" className="form-control" value={this.state.materia} onChange={(e) => this.setState({ materia: e.target.value })} />
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col xs={3}>
                    <label className="col-form-label">Cantidad de alumnos</label>
                  </Col>
                  <Col xs={2}>
                    <input type="number" className="form-control" value={this.state.cantAlumnos} onChange={() => this.setState({ cantAlumnos: event.target.value })} />
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col xs={3}>
                    <label className="col-form-label">Comentario</label>
                  </Col>
                  <Col xs={9}>
                    <textarea className="form-control" placeholder="si desea puede adjuntar un comentario" onChange={() => this.setState({ comentario: event.target.value })} maxLength={80} value={this.state.comentario} type="textarea" />
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col xs={3}>
                    <label className="col-form-label">Hora Inicio</label>
                  </Col>
                  <Col xs={2}>
                    <select className="form-select" value={this.state.horaInicio} onChange={(e) => this.setState({ horaInicio: e.target.value })}>
                      {Horarios.map((e) => (<option value={e}>{e}</option>))}
                    </select>
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col xs={3}>
                    <label className="col-form-label">Hora Finalizacion</label>
                  </Col>
                  <Col xs={2}>
                    <select className="form-select" value={this.state.horaFin} onChange={(e) => this.setState({ horaFin: e.target.value })}>
                      {Horarios.map((e) => (<option value={e}>{e}</option>))}
                    </select>
                  </Col>
                </Row>
                <button type="submit" className="btn btn-secondary btn-sm active mt-2 ml-4"> Solicitar reserva </button>
              </Form>
            </Row> : null}
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
