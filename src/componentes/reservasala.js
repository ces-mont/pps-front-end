import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import Plantilla from "../componentescomunes/plantilla";
//import Calendar from "react-calendar";
//import Horarios from "../componentescomunes/horarios";
//import Turnos from "../componentescomunes/turnos";
import { doJwtCorsGetRequest, doJwtPreflightCorsPostRequest } from "../apirequests/requests";
import { connect } from "react-redux";
//import { login, setToken } from '../redux/actions/useractions';

class ReservaSala extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salas: [],
      diaElegido: "",
      materia: "",
      especialidad: "",
      cantAlumnos: 0,
      horaInicio: "7:00",
      horaFin: "7:00",
      comentario: "",
      salaElegida: null,
      respuesta: "",
      horarios: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      msj: "",
      reservando: false,
      submitok: false,
      valor: new Date(),
    };
    this.setSala = this.setSala.bind(this);
    this.setDia = this.setDia.bind(this);
    this.consultaReservas = this.consultaReservas.bind(this);
    this.manejarCambio = this.manejarCambio.bind(this);
    this.manejaSubmit = this.manejaSubmit.bind(this);
    this.chequearCampos = this.chequearCampos.bind(this);
    this.cierraModal = this.cierraModal.bind(this);
  }
  componentDidMount() {
    doJwtCorsGetRequest("/salas/")
      .then((rta) => {
        console.log("Rta-: ", rta);
        rta.forEach((element) => {
          element.activo = false;
        });
        return rta;
      })
      .then((rta) => {
        this.setState({ salas: rta });
        console.log("Rta->salas: " + rta);
        console.log("this.props.location: " + this.props.location);
      })
      .catch();
  }
  /* cierraModal() {
        if (this.state.submitok) {
            let salas = this.state.salas;
            salas.forEach(elem => { elem.activo = false });
        }
        this.setState({ showModal: false });
    } 
  async setSala(e) {
    let salas = this.state.salas;
    console.log("-->setSala->e.name: " + e.target.name);
    salas.forEach((elem) => {
      elem.activo = e.target.name == elem.idSala;
    });
    await this.setState({ salas: salas, salaElegida: e.target.name });
    if (this.state.diaElegido !== "") {
      this.consultaReservas();
    }
  }
  async setDia(e) {
    await this.setState({ diaElegido: e.toJSON() });
    if (this.state.salaElegida !== null) {
      this.consultaReservas();
    }
  }*/
  consultaReservas() {
    doJwtCorsGetRequest("/salas/estado/" + this.state.salaElegida + "/" + this.state.diaElegido, this.props.user.token)
      .then((rta) => {
        console.log("Rta-: " + JSON.stringify(rta));
        let horarios = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // this.state.horarios;
        rta.forEach((elem) => {
          let hora0 = elem.horaInicio.split(":");
          let hora1 = elem.horaFin.split(":");
          let inicio = (+hora0[0] - 7) * 2;
          let fin = (+hora1[0] - 7) * 2;
          if (+hora0[1] > 29) {
            inicio++;
          }
          if (+hora1[1] === 0) {
            fin--;
          } else if (+hora1[1] > 30) {
            fin++;
          }
          for (let index = inicio; index < fin + 1; index++) {
            horarios[index] = 1;
          }
        });
        return horarios;
      })
      .then((rta) => {
        this.setState({ horarios: rta });
      })
      .catch();
  }
  manejarCambio(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
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
  manejaSubmit(e) {
    console.log("submitenado");
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
        if (+horaInicio[1] === 30) {
          inicio++;
        }
        if (+horaFin[1] === 0) {
          fin--;
        }
        let horarios = this.state.horarios.slice(inicio, fin + 1);
        console.log("horarios[]:", horarios);
        if (
          horarios.some((e) => {
            return e === 1;
          })
        ) {
          console.log("========>OCUPADO!!!");
          this.setState({ msj: "El horario elegido o parte de él ya está reservado" });
          this.setState({ showModal: true });
        } else {
          console.log("========>NO OCUPADO!!!");
          doJwtPreflightCorsPostRequest(
            "/salas/reservar",
            JSON.stringify({
              idSala: this.state.salaElegida,
              especialidad: this.state.especialidad,
              materia: this.state.materia,
              comentario: this.state.comentario,
              dia: this.state.diaElegido.slice(0, 19).replace("T", " "),
              horaInicio: this.state.horaInicio,
              horaFin: this.state.horaFin,
              cantAlumnos: this.state.cantAlumnos,
            }),
            false,
            this.props.user.token
          )
            .then((rta) => {
              console.log("Rta-: " + JSON.stringify(rta));
              this.setState({ msj: rta.msj, showModal: true, submitok: true, diaElegido: "", salaElegida: null, reservando: false });
              return rta;
            })
            .catch();
        }
      }
    }
  }
  render() {
    console.log("this.state.valor: ", this.state.valor);
    return (
      <Plantilla>
        <div id="titulo">
          <h3>Reserva de salas</h3>
          <p>DISILab ofrece un amplio horario donde los distintos laboratorios están disponible para su uso</p>
        </div>
        <h3>Seleccionar sala</h3>
        <div className="list-group vertical">
          {this.state.salas.map((elem) => (
            <div className="list-group-iem" onClick={this.setSala} name={elem.idSala} key={elem.idSala} active={elem.activo}>
              {elem.descripcionCorta}
            </div>
          ))}
        </div>

        <div>
          <h3>Seleccionar día</h3>
        </div>
        {this.state.accesorioElegido !== null && this.state.diaElegido !== "" ? (
          <>
            <button variant="secondary" size="sm" style={{ backgroundColor: "rgb(124, 29, 29)", fontWeight: "bold" }} className="mt-4 mb-1 mr-1"> Reservado </button>
            <button variant="secondary" size="sm" style={{ backgroundColor: "rgb(50, 169, 74)", fontWeight: "bold" }} className="mt-4 mb-1 "> Disponible </button>
          </>
        ) : null}

        <div className="mt-4">
          {this.state.salaElegida !== null && !this.state.reservando && this.state.diaElegido !== "" ? (
            <div>
              <button onClick={() => { this.setState({ reservando: true });}} > Hacer Reserva </button>
            </div>
          ) : null}
        </div>
      </Plantilla>
      //)
    );
  }
}

const mapStateToProps = (state) => ({ user: state.userReducer });
/*const mapDispatchToProps = {
    dispatchLogin: (usuario) => login(usuario),
    dispatchSetToken: (token) => setToken(token)
}*/

export default connect(mapStateToProps, null)(ReservaSala);
