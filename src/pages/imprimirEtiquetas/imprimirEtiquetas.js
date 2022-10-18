import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table, Tabs, Tab} from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"
import tipoImpresion from '../../data/checkboxEtiquetas.js'
import opcionesEtiquetas from '../../data/opcionesEtiquetas.json'

const ImprimirEtiquetas = props => {

    //VARIABLES DE USUARIO
    const user = useSelector(selectUser);
    //LISTA DE CHECKBOX
    const [switches, setSwitches] = useState(tipoImpresion);
    //LISTA DE OPCIONES PRECIO
    const [opciones, setOpciones] = useState(opcionesEtiquetas);
    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeSwitch(id){
        setSwitches(switches.map(x => {
            if(x.id === id) return {...x, isChecked: true};
            else return {...x, isChecked: false};
        }));
    }
    //VERIFICA QUE SOLO UN CHECKBOX DE LAS OPCIONES PRECIO ESTE ACTIVO
    function onChangeOpcion(id){
        setOpciones(opciones.map(x => {
            if(x.id === id) return {...x, isChecked: true};
            else return {...x, isChecked: false};
        }));
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
                            <Form id="addCodeForm">
                                <Row><h2>Ingrese los datos por favor:</h2></Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ingrese el número de entrega:</Form.Label>
                                            <Form.Control type="text" placeholder="Número de entrega" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            {opciones.map((item) => {
                                            return (
                                                <div key={item.id} >
                                                <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={()=>onChangeOpcion(item.id)} />
                                                </div>
                                            );
                                            })}
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Button variant="outline-dark" >Buscar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card>
                            <Card.Body>
                            <Form id="addCodeForm">
                                <Row><h2>Formato de impresión</h2></Row>
                                <br />
                                <Row>
                                    <Col>
                                        {switches.slice(0, 2).map((item) => {
                                        return (
                                            <div key={item.id} >
                                            <Form.Check type="checkbox" label={item.name.toString()} checked={item.isChecked} onChange={()=>onChangeSwitch(item.id)} />
                                            </div>
                                        );
                                        })}
                                    </Col>
                                    <Col>
                                        {switches.slice(2, 4).map((item) => {
                                        return (
                                            <div key={item.id} >
                                            <Form.Check type="checkbox" label={item.name.toString()} checked={item.isChecked} onChange={()=>onChangeSwitch(item.id)} />
                                            </div>
                                        );
                                        })}
                                    </Col>
                                    <Col>
                                        {switches.slice(4, 6).map((item) => {
                                        return (
                                            <div key={item.id} >
                                            <Form.Check type="checkbox" label={item.name.toString()} checked={item.isChecked} onChange={()=>onChangeSwitch(item.id)} />
                                            </div>
                                        );
                                        })}
                                    </Col>
                                    <Col>
                                        {switches.slice(6,8).map((item) => {
                                        return (
                                            <div key={item.id} >
                                            <Form.Check type="checkbox" label={item.name.toString()} checked={item.isChecked} onChange={()=>onChangeSwitch(item.id)} />
                                            </div>
                                        );
                                        })}
                                    </Col>
                                    <Col>
                                        {switches.slice(8, 10).map((item) => {
                                        return (
                                            <div key={item.id} >
                                            <Form.Check type="checkbox" label={item.name.toString()} checked={item.isChecked} onChange={()=>onChangeSwitch(item.id)} />
                                            </div>
                                        );
                                        })}
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



export default ImprimirEtiquetas;