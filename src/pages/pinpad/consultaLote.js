import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table, Tabs, Tab} from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css";
import datosLotes from '../../data/datosLotes.json';
import DetalleLote from '../../components/lotes/detalleLote.js';
const ConsultaLote = props => {

    //VARIABLES DE USUARIO
    const user = useSelector(selectUser);
    //VARIABLE BOTON BUSCAR
    const [idLote, changeIdLote] = useState("1234");
    function printId(lote){
        console.log(lote);
        changeIdLote(lote);

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
                        <Form id="lotesForm">
                            <Row><h4>Consulta de lotes</h4></Row>
                            <br />
                            <Row>
                            <Col>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Lote</th>
                                            <th>Valor total</th>
                                            <th>Fecha lote</th>
                                            <th>IpPinPad</th>
                                            <th>TidPinPad</th>
                                            <th>Oficina</th>
                                            <th>IpCaja</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {datosLotes.map((item) => {
                                            return (
                                                <tr key={item.id} >
                                                <td><Button onClick={() => {printId(item.lote);}} variant="outline-dark" >Ir a detalle</Button> </td>
                                                <td>{item.lote.toString()}</td>
                                                <td>{item.valor.toString()}</td>
                                                <td>{item.fecha.toString()}</td>
                                                <td>{item.ipPinPad.toString()}</td>
                                                <td>{item.tidPinPad.toString()}</td>
                                                <td>{item.oficina.toString()}</td>
                                                <td>{item.ipCaja.toString()}</td>
                                                <td>{item.estado.toString()}</td>
                                                </tr>
                                            );
                                            })}
                                    </tbody>
                                </Table>
                                </Col>
                            </Row>
                            
                        </Form>
                        </Card.Body>
                    </Card> 
                    <br />
                    <Card>
                        <Card.Body>
                        <Form id="lotesForm">
                            <Row><h4>{idLote}</h4></Row>
                            <br />
                            <Row>
                                <Col>
                                <Table striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th>IpPinPad</th>
                                            <th>TidPinPad</th>
                                            <th>IpCaja</th>
                                            <th>Lote</th>
                                            <th>NumFactSAP</th>
                                            <th>NumFactSRI</th>
                                            <th>BaseIVA</th>
                                            <th>BaseCero</th>
                                            <th>ValorIVA</th>
                                            <th>TotalVenta</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datosLotes.map((datos, index) => {
                                        if (datos.childrens) {
                                                return (
                                                <DetalleLote
                                                    route={datos}
                                                    id={idLote}
                                                />
                                                );
                                            }
                                        })}
                                    </tbody>
                                </Table>
                                </Col>
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



export default ConsultaLote;