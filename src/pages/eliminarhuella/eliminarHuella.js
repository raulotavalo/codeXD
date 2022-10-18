import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table, Tabs, Tab} from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"
const EliminarHuella = props => {

    //VARIABLES DE USUARIO
    const user = useSelector(selectUser);
    //VARIABLE BOTON BUSCAR
    const [isPushSearch, changeToUpdate] = useState(true);
    //CAMBIA ESTADO  DE BOTON BUSCAR
    function ButtonOnChange(){
        changeToUpdate(!isPushSearch);
    };
    //RESETEAR FORMULARIO
    function resetForm(){
        document.getElementById("huellaForm").reset();
    }



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
                            <Form id="huellaForm">
                                <Row><h4>Ingrese los datos del empleado por favor:</h4></Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Cédula del empleado:</Form.Label>
                                            <Form.Control type="text" placeholder="Cédula" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col >
                                    {isPushSearch ? (
                                        <Button onClick={ButtonOnChange} variant="outline-dark" >
                                            Buscar
                                        </Button>   
                                        ) : (
                                        <Button onClick={() => {
                                            const funcion1 = ButtonOnChange();
                                            const funcion2 = resetForm();
                                            //EJECUTA
                                            funcion1();
                                            funcion2();
                                        }} variant="outline-dark" >
                                            Borrar
                                        </Button> 
                                    )} 
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    {!isPushSearch ? (
                    <Card>
                            <Card.Body>
                            <Form id="addCodeForm">
                                <h4>Datos del empleado:</h4>
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
                                <br />
                                <Row>
                                    <Col>
                                        <Button  variant="outline-dark" >
                                            Eliminar registro
                                        </Button> 
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                    ):(
                        <div></div>
                    )}
                    <br />
                    </Col>
                </Row>
            </Col>
            
        </Row> : <h1>No esta logeado</h1>
    );
};



export default EliminarHuella;