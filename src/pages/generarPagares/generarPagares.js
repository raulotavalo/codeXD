import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table, Tabs, Tab} from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"
import division from '../../data/divisionEmpresarial.json';
import almacen from '../../data/almacenes2.json';
import { DatePicker } from "@material-ui/pickers";
const GenerarPagares = props => {

    //VARIABLES DE USUARIO
    const user = useSelector(selectUser);
    //VARIABLE DE FECHA
    const [fecha,cambiarFecha]=useState(new Date());
    //VARIABLE BOTON BUSCAR
    const [isPushSearch, changeToUpdate] = useState(true);
    //CAMBIA ESTADO  DE BOTON BUSCAR
    function ButtonOnChange(){
        changeToUpdate(!isPushSearch);
    };
    //RESETEAR FORMULARIO
    function resetForm(){
        document.getElementById("pagareForm").reset();
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
                            <Form id="pagareForm">
                                <Row><h2>Ingrese los datos por favor:</h2></Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Cédula del cliente:</Form.Label>
                                            <Form.Control type="text" placeholder="Cédula" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha:</Form.Label>
                                            <br />
                                            <DatePicker value={fecha} onChange={cambiarFecha}/>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>División empresarial:</Form.Label>
                                            <Form.Select>
                                                {division.map((data) => {
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
                                <br />
                                <Row>
                                    <Col>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Documento</th>
                                                <th>Fecha</th>
                                                <th>Identificación</th>
                                                <th>Cliente</th>
                                                <th>Valor</th>
                                                <th>Forma de pago</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td >1</td>
                                                <td >123478346</td>
                                                <td >05-10-2022</td>
                                                <td >0105441257</td>
                                                <td >Raúl Suquinagua</td>
                                                <td >100.76</td>
                                                <td >Efectivo</td>
                                            </tr>
                                        </tbody>
                                    </Table>
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



export default GenerarPagares;