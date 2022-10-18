import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table, Tabs, Tab} from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"
import tipoPrecio from "../../data/checkboxPreciador.js";
import centro from "../../data/centros.json";
import almacen from "../../data/almacenes.json";
import marca from "../../data/marcas.json"

const Preciador = props => {
    //VARIABLES CHECKBOX
    const [isChecked, setShow] = useState(false);
    //CAMBIA DE ESTADO CHECKBOX
    const handleOnChange = () => {
        setShow(!isChecked);
    };
    //VARIABLES DE USUARIO
    const user = useSelector(selectUser);
    //LISTA DE CHECKBOX
    const [switches, setSwitches] = useState(tipoPrecio);
    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeSwitch(id){
        setSwitches(switches.map(x => {
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
                                <Row><h2>Ingrese los datos del preciador por favor:</h2></Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Centro:</Form.Label>
                                            <Form.Select>
                                                {centro.map((data) => {
                                                return (
                                                    <option key={data.id}>{data.nombre}</option>
                                                );
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Almacen:</Form.Label>
                                            <Form.Select>
                                                {almacen.map((data) => {
                                                return (
                                                    <option key={data.id}>{data.nombre}</option>
                                                );
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <br />
                                            <Form.Check type="checkbox" label="Generar etiquetas para todo el almacen" checked={isChecked} onChange={handleOnChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {isChecked ? (
                                
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Marca:</Form.Label>
                                            <Form.Select>
                                                {marca.map((data) => {
                                                return (
                                                    <option key={data.id}>{data.nombre}</option>
                                                );
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <br />
                                            <Form.Check type="checkbox" label="Filtrar centro" />
                                            <Form.Check type="checkbox" label="Precio unitario" />
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                    </Row>
                                    ) : (
                                        <Row></Row>
                                    )}
                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    <div>
                    {!isChecked ? (
                    
                    <Card>
                            <Card.Body>
                            <Form id="addCodeForm">
                                <Row><h2>Ingrese los datos de los materiales por favor:</h2></Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ingrese el código del material:</Form.Label>
                                            <Form.Control type="text" placeholder="Código" id="descMat" name="descMat" required disabled={isChecked}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ingrese la cantidad:</Form.Label>
                                            <Form.Control type="text" placeholder="Cantidad" id="descMat" name="descMat" required disabled={isChecked}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Button variant="outline-dark" disabled={isChecked}>Agregar material</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>

                    </Card>
                    ):(
                    <div></div>
                    )}
                    </div>
                    <br />
                    <Card>
                            <Card.Body>
                            <Form id="addCodeForm">
                                <Row><h2>Formato preciador</h2></Row>
                                <br />
                                <Row>
                                    <Col>
                                        {switches.slice(0, 6).map((item) => {
                                        return (
                                            <div key={item.id} >
                                            <Form.Check type="checkbox" label={item.name.toString()} checked={item.isChecked} onChange={()=>onChangeSwitch(item.id)} />
                                            </div>
                                        );
                                        })}
                                    </Col>
                                    <Col>
                                        {switches.slice(6, 12).map((item) => {
                                        return (
                                            <div key={item.id} >
                                            <Form.Check type="checkbox" label={item.name.toString()} checked={item.isChecked} onChange={()=>onChangeSwitch(item.id)} />
                                            </div>
                                        );
                                        })}
                                    </Col>
                                    <Col>
                                        {switches.slice(12, 18).map((item) => {
                                        return (
                                            <div key={item.id} >
                                            <Form.Check type="checkbox" label={item.name.toString()} checked={item.isChecked} onChange={()=>onChangeSwitch(item.id)} />
                                            </div>
                                        );
                                        })}
                                    </Col>
                                    <Col>
                                        {switches.slice(18,24).map((item) => {
                                        return (
                                            <div key={item.id} >
                                            <Form.Check type="checkbox" label={item.name.toString()} checked={item.isChecked} onChange={()=>onChangeSwitch(item.id)} />
                                            </div>
                                        );
                                        })}
                                    </Col>
                                    <Col>
                                        {switches.slice(24, 30).map((item) => {
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



export default Preciador;