import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table} from 'react-bootstrap';
import { DatePicker } from "@material-ui/pickers";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"


const ReimprimirRecibo = props => {
    //VARIABLES FECHA-RECIBO
    const [fechaRecibo,cambiarFechaRecibo]=useState(new Date());
    //VARIABLES DE USUARIO
    const user = useSelector(selectUser);

    return (
        user ?
        <Row className="editCode">
                <SideBar/>
                <Col>
                <Row id="iniPage">
                <Col>               
                        <br />
                        <Card>
                            <Card.Body>
                            <Form id="addCodeForm">
                                <Row><h2>Ingrese los datos del recibo por favor:</h2></Row>
                                <br />
                                <Row>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Número del recibo:</Form.Label>
                                            <Form.Control type="text" placeholder="Número del recibo" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha del recibo:</Form.Label>
                                            <br />
                                            <DatePicker value={fechaRecibo} onChange={cambiarFechaRecibo}/>
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Identificación del cliente:</Form.Label>
                                            <Form.Control type="text" placeholder="Identificación" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Button variant="outline-dark">Consultar recibo</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    
                    </Col>
                </Row>
            </Col>
            
        </Row> : <h1>No esta logeado</h1>
    );
};



export default ReimprimirRecibo;