import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table, Tabs, Tab} from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"
import local from "../../data/locales.json";

const Precios = props => {
    //VARIABLES CHECKBOX
    const [isChecked, setShow] = useState(false);
    //CAMBIA DE ESTADO CHECKBOX
    const handleOnChange = () => {
        setShow(!isChecked);
    };
    //VARIABLES DE USUARIO
    const user = useSelector(selectUser);
    //VARIABLE PARA MOSTRAR TABLA
    const [isPushSearch, changeToUpdate] = useState(true);
    //CAMBIA ESTADO  DE BOTON
    function ButtonOnChange(){
        changeToUpdate(!isPushSearch);
    };
    //RESETEAR FORMULARIO
    function resetForm(){
        document.getElementById("consultarMaterialesForm").reset();
        document.getElementById("agregarNuevoPrecioForm").reset();
        setShow(false);
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
                        <div >
                        <Tabs >
                            <Tab eventKey="tab1" title="Cambio precio">
                            <br />
                            <Card>
                            <Card.Body>
                            <Form id="consultarMaterialesForm">
                                <Row><h4>Consulta de materiales</h4></Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Escoger local:</Form.Label>
                                            <Form.Select>
                                                {local.map((data) => {
                                                return (
                                                    <option key={data.id}>{data.nombre}</option>
                                                );
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Código:</Form.Label>
                                            <Form.Control type="text" placeholder="Código" id="descMat" name="descMat"/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <br />
                                        <Form.Check type="checkbox" label="Agregar nuevo precio" disabled={isPushSearch} checked={isChecked} onChange={handleOnChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                    {isPushSearch ? (
                                        <Button onClick={ButtonOnChange} variant="outline-dark" >
                                            Consultar precio
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
                                <br />
                                <Row>
                                    <Col>
                                    {!isPushSearch ? (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Material</th>
                                                <th>Descripción</th>
                                                <th>Precio sin IVA</th>
                                                <th>Precio con IVA</th>
                                                <th>Local</th>
                                                <th>Usuario mod</th>
                                                <th>Fecha mod</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td >10103963</td>
                                                <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                                <td >1399.00</td>
                                                <td >1566.88</td>
                                                <td >Precio SAP</td>
                                                <td >-</td>
                                                <td >-</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    ):(
                                        <div></div>
                                    )}
                                    </Col>
                                </Row>
                            </Form>
                            </Card.Body>
                            </Card>
                            <br />
                            <div>
                            {isChecked ? (
                    
                            <Card>
                            <Card.Body>
                            <Form id="agregarNuevoPrecioForm">
                                <Row><h4>Agregar nuevo precio</h4></Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nuevo precio sin IVA:</Form.Label>
                                            <Form.Control type="text" placeholder="Precio sin IVA" id="descMat" name="descMat"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Button variant="outline-dark" >Agregar precio</Button>
                                    </Col>
                                </Row>
                            </Form>
                            </Card.Body>
                            </Card>
                            ):(
                                <div></div>
                            )}
                            </div>
                            </Tab>
                            <Tab eventKey="tab2" title="Cambio precio masivo">
                            Hii, I am 2nd tab content
                            </Tab>
                            <Tab eventKey="tab3" title="Borrar precios">
                            Hii, I am 3rd tab content
                            </Tab>
                            <Tab eventKey="tab4" title="Consulta listas de precios">
                            Hii, I am 3rd tab content
                            </Tab>
                        </Tabs>
                        </div>
                            
                        </Card.Body>
                    </Card>
                    <br />
                    
                    </Col>
                </Row>
            </Col>
            
        </Row> : <h1>No esta logeado</h1>
    );
};



export default Precios;