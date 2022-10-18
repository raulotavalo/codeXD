import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table} from 'react-bootstrap';
import { DatePicker } from "@material-ui/pickers";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"


const RegistrarPago = props => {
    //VARIABLES CHECKBOX CLIENTE NATURAL
    const [isCheckedC, setShowC] = useState(false);
    //CAMBIA DE ESTADO CHECKBOX CLIENTE NATURAL
    const handleOnChangeC = () => {
        if (isCheckedC == false){
            setShowE(false);
        }
        setShowC(!isCheckedC);
    };
    //VARIABLES CHECKBOX EMPRESA
    const [isCheckedE, setShowE] = useState(false);
    //CAMBIA DE ESTADO CHECKBOX EMPRESA
    const handleOnChangeE = () => {
        if (isCheckedE == false){
            setShowC(false);
        }
        setShowE(!isCheckedE);
    };
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
                                <Row><h2>Ingrese los datos del cliente por favor:</h2></Row>
                                <br />
                                <Row>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Identificación del cliente:</Form.Label>
                                            <Form.Control type="text" placeholder="Identificación" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                        <Form.Label>Oficina de venta:</Form.Label>
                                            <Form.Select>
                                                <option>AJE-ELECTRO - AJE SHOWROOM </option>
                                            </Form.Select>
        
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Button variant="outline-dark">Aceptar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card>
                            <Card.Body>
                            <Form id="addCodeForm">
                                <Row><h2>La información del cliente es:</h2></Row>
                                <br />
                                <Row>
                                    <Col>
                                    <Row>
                                    <Form.Label>Nombre del cliente:</Form.Label>
                                    <Form.Label>Número de facturas que adeuda:</Form.Label>
                                    <Form.Label>Número de facturas que cancela:</Form.Label>
                                    <Form.Label>Deuda total del cliente:</Form.Label>
                                    </Row>
                                    </Col>
                                    <Col>
                                    <Row>
                                        <Form.Label>Raul Suquinagua</Form.Label>
                                        <Form.Label>10</Form.Label>
                                        <Form.Label>2</Form.Label>
                                        <Form.Label>100</Form.Label>
                                    </Row>
                                    </Col>
                                    <Col>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>

                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card>
                        <Card.Body>
                            <Form id="addCodeForm">

                                <Row>
                                    <Col>
                                    <Row>
                                        <Form.Label>Digite el valor a cobrar:</Form.Label>
                                    </Row>
                                    </Col>
                                    <Col>
                                    <Row>
                                        <Form.Control type="text" placeholder="" id="descMat" name="descMat" required />
                                    </Row>
                                    </Col>
                                    <Col></Col>
                                    <Col><Form.Check type="checkbox" label="Cliente natural / Empleado AJE" checked={isCheckedC} onChange={handleOnChangeC} /></Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                    <Row>
                                        <Form.Label>Busqueda de factura:</Form.Label>
                                    </Row>
                                    </Col>
                                    <Col>
                                    <Row>
                                        <Form.Control type="text" placeholder="" id="descMat" name="descMat" required />
                                    </Row>
                                    </Col>
                                    <Col></Col>
                                    <Col><Form.Check type="checkbox" label="Empresa del grupo / Empleado del grupo" checked={isCheckedE} onChange={handleOnChangeE} /></Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col><Button variant="outline-dark">Procesar</Button></Col>
                                    <Col><Button variant="outline-dark">Detalle las formas de pago aqui</Button></Col>
                                    <Col></Col>
                                    <Col></Col>

                                </Row>

                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card>
                        <Card.Body>
                            <Form id="addCodeForm">
                            <Row><h2>Detalle de las facturas del cliente:</h2></Row>
                            <br />
                            <Row>
                                <Col>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Doc Contable</th>
                                            <th>División</th>
                                            <th>Factura</th>
                                            <th>Num dividendo</th>
                                            <th>Valor de Factura</th>
                                            <th>Valor Pendiente</th>
                                            <th>Fecha Vencimiento</th>
                                            <th>Total Abonado</th>
                                            <th>Fecha Abono</th>
                                            <th>Valor a Cancelar</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td >0902080863</td>
                                            <td >AJE SHOWROOOM GIL RAMIREZ DAVA</td>
                                            <td >001008000087496</td>
                                            <td >001</td>
                                            <td >24.96</td>
                                            <td >24.96</td>
                                            <td >2022-10-14</td>
                                            <td >0.00</td>
                                            <td >0000-00-00</td>
                                            <td >0.00</td>
                                            <td >Realizar Abono</td>
                                        </tr>
                                        <tr>
                                            <td >0902080863</td>
                                            <td >AJE SHOWROOOM GIL RAMIREZ DAVA</td>
                                            <td >001008000087496</td>
                                            <td >001</td>
                                            <td >24.96</td>
                                            <td >24.96</td>
                                            <td >2022-10-14</td>
                                            <td >0.00</td>
                                            <td >0000-00-00</td>
                                            <td >0.00</td>
                                            <td >Realizar Abono</td>
                                        </tr>
                                        <tr>
                                            <td >0902080863</td>
                                            <td >AJE SHOWROOOM GIL RAMIREZ DAVA</td>
                                            <td >001008000087496</td>
                                            <td >001</td>
                                            <td >24.96</td>
                                            <td >24.96</td>
                                            <td >2022-10-14</td>
                                            <td >0.00</td>
                                            <td >0000-00-00</td>
                                            <td >0.00</td>
                                            <td >Realizar Abono</td>
                                        </tr>

                                    </tbody>
                                </Table>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col><Form.Label>Total a cancelar:</Form.Label></Col>
                                <Col><Form.Control type="text" placeholder="" id="descMat" name="descMat" required /></Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                            <br />
                            <Row>
                                <Col><Button variant="outline-dark">Procesar</Button></Col>
                            </Row>
                            </Form>
                        </Card.Body>
                    </Card>

                    </Col>
                </Row>
            </Col>
            
        </Row> : <h1>No esta logeado</h1>
    );
};



export default RegistrarPago;