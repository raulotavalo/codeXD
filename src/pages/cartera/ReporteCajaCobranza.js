import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table} from 'react-bootstrap';
import { DatePicker } from "@material-ui/pickers";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"


const ReporteCajaCobranza = props => {
    //VARIABLES FECHA
    const [fechaInicial,cambiarFechaInicial]=useState(new Date());
    const [fechaFinal,cambiarFechaFinal]=useState(new Date());
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
                                <Row><h2>Ingrese los datos del reporte de caja de cobranza por favor:</h2></Row>
                                <br />
                                <Row>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha inicial:</Form.Label>
                                            <br />
                                            <DatePicker value={fechaInicial} onChange={cambiarFechaInicial}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha final:</Form.Label>
                                            <br />
                                            <DatePicker value={fechaFinal} onChange={cambiarFechaFinal}/>
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                        <Form.Label>Oficina de venta:</Form.Label>
                                            <Form.Select>
                                                <option>AJE-ELECTRO - AJE SHOWROOM </option>
                                            </Form.Select>
        
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



export default ReporteCajaCobranza;