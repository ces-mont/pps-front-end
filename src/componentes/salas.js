import React from 'react';
import Plantilla from '../componentescomunes/plantilla';
import { doSimpleCorsGetRequest } from '../apirequests/requests';
import { IoIosPerson, IoMdSearch } from 'react-icons/io';
import { Form, Col, Button, Row, CardGroup, Card } from 'react-bootstrap';

class Salas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salas: []
        }
    }
    componentDidMount() {
        console.log('iniciando');
        doSimpleCorsGetRequest('/salas/')
            .then(rta => {
                this.setState({ salas: rta })
                console.log('Rta->salas: ' + rta);
            })
            .catch();
    }
    render() {
        // Chequear como opcion a CardDeck ---> ListGroup + Tab (al final de la página de ListGroup)
        return (
            <Plantilla>
                <h2 className="text-center fw-normal mt-4 mb-3">Descripción de las diferentes salas de laboratorio</h2>
                <CardGroup>
                    {this.state.salas.map(elem =>
                        <Col xs={4} key={elem.idSala} >
                            <Card key={elem.idSala} className="me-2 mt-2 ">
                                <Card.Header as="h5" className="text-center">{elem.descripcionCorta}</Card.Header>
                                <Card.Img variant="top" src={elem.urlImagen} className="fluid" />
                                <Card.Body className="my-0 py-0">
                                    <Card.Title className="mt-1 py-0">Descripcion</Card.Title>
                                    <Card.Text className="my-0 py-0"><small className="text-muted my-0 py-0" style={estilo1}>{elem.descripcionLarga}</small></Card.Text>
                                </Card.Body>
                                <Card.Body style={estilo1} className="my-0 py-0">
                                    <Card.Title as="h6" className="mt-2 py-0">Tipo de sala: <small className=" fw-normal text-muted my-0 py-0">{elem.tipo}</small></Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Text className="text-center" ><small className="fw-light text-muted">Ubicación: {elem.ubicacion}</small></Card.Text>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )}
                </CardGroup>
            </Plantilla>
        )
    }
}

const estilo1={
    lineHeight:'1.2em'
}

export default Salas