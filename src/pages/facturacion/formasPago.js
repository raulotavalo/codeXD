import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import "../../styles/Container.css"
import local from "../../data/locales.json";
import tipoPago from '../../data/facturacion/tipoPago.js';
import tipoIdentificacion from '../../data/facturacion/TipoIdentificacion.js';

const FormasPago = () => {

    //VARIABLES CHECKBOX
    const [isChecked, setShow] = useState(false);
    //CAMBIA DE ESTADO CHECKBOX

    const handleOnChange = () => {
        setShow(!isChecked);
    };
    
    //VARIABLE PARA MOSTRAR TABLA
    const [isPushSearch, changeToUpdate] = useState(true);
    //CAMBIA ESTADO  DE BOTON
    function ButtonOnChange() {
        changeToUpdate(!isPushSearch);
    };
    //RESETEAR FORMULARIO
    function resetForm() {
        document.getElementById("consultarMaterialesForm").reset();
        document.getElementById("agregarNuevoPrecioForm").reset();
        setShow(false);
    }
    //LISTA DE CHECKBOX TIPO PAGO
    const [switches, setSwitches] = useState(tipoPago);
    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeSwitch(id) {
        setSwitches(switches.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }));
    }
    //LISTA DE CHECKBOX TIPO IDENTIFICACION
    const [switchId, setSwitchId] = useState(tipoIdentificacion);
    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeId(id) {
        setSwitchId(switchId.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }));
    }
    /*
    let tipoPagoElejido = tipoPago.map((metodo) => {
        if (metodo.isChecked == true) {
            return (
            metodo.nombre
            );
        }
    }
    );
    */
    let tipoPagoElejido = 's';

    return (
        <>
            <br />
            <Card>
                <Card.Body>
                    <Form id="consultarMaterialesForm">
                        <Row><h4>{tipoPagoElejido}</h4></Row>
                        <Row>
                            {switches.map((item) => {
                                if (item.isChecked == true) {
                                    tipoPagoElejido = item.nombre.toString();
                                }
                                return (
                                    <Col key={item.id} >
                                        <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={() => onChangeSwitch(item.id)} />
                                    </Col>
                                );
                            })}

                            {switchId.map((item) => {
                                return (
                                    <Col key={item.id} >
                                        <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={() => onChangeId(item.id)} />
                                    </Col>
                                );
                            })}

                            <Col>
                                <Form.Check type="checkbox" label="Cliente Coorporativo" />
                            </Col>

                        </Row>
                        <br />
                        <div>
                            {isChecked ? (
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Opciones de crédito:</Form.Label>
                                            <Form.Select>
                                                {local.map((data) => {
                                                    return (
                                                        <option key={data.id}>{data.nombre}</option>
                                                    );
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            ) : (<div></div>)}
                        </div>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Código:</Form.Label>
                                    <Form.Control type="text" placeholder="Código" id="descMat" name="descMat" />
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
                                ) : (
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
                                            <Form.Control type="text" placeholder="Precio sin IVA" id="descMat" name="descMat" />
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
                ) : (
                    <div></div>
                )}
            </div>
        </>);
}

export default FormasPago;