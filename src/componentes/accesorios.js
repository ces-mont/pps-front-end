import React from 'react';
import Plantilla from '../componentescomunes/plantilla';
import { doJwtCorsGetRequest } from '../apirequests/requests';
import { IoIosPerson, IoMdSearch } from 'react-icons/io';
import { Form, Col, Button, Row, CardDeck, CardGroup, Card } from 'react-bootstrap';

export default class Accesorios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dispositivos: []
        }
    }
    componentDidMount() {
        console.log('iniciando');
        doJwtCorsGetRequest('/accesorios/')
            .then(rta => {
                this.setState({ dispositivos: rta })
                console.log('Rta->salas: ' , rta);
            })
            .catch();
    }
    render() {
        return (
            <Plantilla>
                <h2 className="text-center fw-normal mt-4 mb-3">Descripción de las diferentes dispositivos del laboratorio</h2>
                <CardGroup>
                    {this.state.dispositivos.map(elem =>
                        <Col xs={4} key={elem.idAccesorio} >
                            <Card className="me-2 mt-2 ">
                                <Card.Header as="h5" className="text-center">{elem.descripcionCorta}</Card.Header>
                                <Card.Img variant="top" src={elem.urlImagen} className="fluid" />
                                <Card.Body>
                                    <Card.Title>Descripcion</Card.Title>
                                    <Card.Text><small className="text-muted">{elem.descripcionLarga}</small></Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Title as="h6">Tipo de dispositivo: <small className="text-muted fw-normal">{elem.tipo}</small></Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Text className="text-center" ><small className="fw-light text-muted">Cantidad disponible: {elem.cantidad}</small></Card.Text>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )}
                </CardGroup>
            </Plantilla>
        )
    }
}