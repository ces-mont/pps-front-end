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
                <CardGroup>
                    {this.state.dispositivos.map(elem =>
                        <Col xs={3}>
                            <Card key={elem.idSala} className="mr-1">
                                <Card.Img variant="top" src={elem.urlImagen} />
                                <Card.Header>{elem.descripcionCorta}</Card.Header>
                                <Card.Footer>
                                    <Card.Title>Descripcion</Card.Title>
                                    <Card.Text><small className="text-muted">{elem.descripcionLarga}</small></Card.Text>
                                </Card.Footer>
                                <Card.Footer>
                                    <Card.Title>Tipo</Card.Title>
                                    <Card.Text><small className="text-muted">{elem.tipo}</small></Card.Text>
                                </Card.Footer>
                                <Card.Footer>
                                    <Card.Title>Cantidad: {elem.cantidad}</Card.Title>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )}
                </CardGroup>
            </Plantilla>
        )
    }
}