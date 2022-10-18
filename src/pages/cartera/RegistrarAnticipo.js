import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table} from 'react-bootstrap';
import { DatePicker } from "@material-ui/pickers";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"


const RegistrarAnticipo = props => {
    //VARIABLES CHECKBOX ANTICIPO
    const [isCheckedA, setShowA] = useState(false);
    //CAMBIA DE ESTADO CHECKBOX DE ANTICIPO
    const handleOnChangeA = () => {
        if (isCheckedA == false){
            setShowM(false);
        }
        setShowA(!isCheckedA);
    };
    //VARIABLES CHECKBOX ANTICIPO MATRICULA
    const [isCheckedM, setShowM] = useState(false);
    //CAMBIA DE ESTADO CHECKBOX DE ANTICIPO DE MATRICULA
    const handleOnChangeM = () => {
        if (isCheckedM == false){
            setShowA(false);
        }
        setShowM(!isCheckedM);
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
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Check type="checkbox" label="Anticipo" checked={isCheckedA} onChange={handleOnChangeA} />
                                            <Form.Check type="checkbox" label="Anticipo Matricula"  checked={isCheckedM} onChange={handleOnChangeM}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Button variant="outline-dark">Buscar</Button>
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
                                        <Form.Label>Código del cliente:</Form.Label>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Form.Label>Raul Suquinagua</Form.Label>
                                            <Form.Label>0900309074</Form.Label>
                                        </Row>
                                    </Col>
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
                                <Row><h2>Ingrese los datos del anticipo por favor:</h2></Row>
                                <br />
                                <Row>
                                    <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Forma de pago:</Form.Label>
                                        <Form.Select>
                                            <option>Efectivo </option>
                                            <option>Cheque </option>
                                            <option>Deposito </option>
                                            <option>Transferencia </option>
                                            <option>Tarjeta de credito </option>
                                            <option>Tarjeta de debito </option>
                                        </Form.Select>
                                        <Form.Label>Valor anticipo:</Form.Label>
                                        <Form.Control type="text"  placeholder="" id="codMat" name="codMat" required />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Concepto de:</Form.Label>
                                            <Form.Control type="text" as="textarea" rows={4} placeholder="" id="codMat" name="codMat" required />
                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Button variant="outline-dark">Procesar pago</Button>
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



export default RegistrarAnticipo;