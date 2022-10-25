import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import { Row, Col, Card, Form, Button, Modal, Table, Tabs, Tab } from 'react-bootstrap';
import FacturaItems from "./facturaItems";
import FormasPago from "./formasPago";
import ResumenFactura from "./resumenFactura";
import TopBar from "../../components/TopBar";

const Ventas = props => {
    //VARIABLES DE USUARIO
    const user = useSelector(selectUser);
    return (
        user ?
            <Row className="editCode">
                <SideBar />
                <Col>
                    <Row>
                        <TopBar titleHeader='CREAR FACTURA-Sociedad-Oficina de venta' titleUser='Sebastián Enderica'/>
                    </Row>
                    <Row id="ventasPage">
                        <Col>
                            <br />
                            <Card>
                                <Card.Body>
                                    <div >
                                        <Tabs >
                                            <Tab eventKey="tab1" title="Factura">
                                                <FacturaItems />
                                            </Tab>
                                            <Tab eventKey="tab2" title="Método de Pago">
                                                <FormasPago />
                                            </Tab>
                                            <Tab eventKey="tab3" title="Confirmar Venta">
                                                <ResumenFactura />
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



export default Ventas;