import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import "../../styles/Container.css";
import "../../styles/facturacion/TableScroll.css";
import local from "../../data/locales.json";
import tipoPago from '../../data/facturacion/tipoPago.js';
import infoCredMilla from '../../data/facturacion/infoCredMilla.js';
import tipoIdentificacion from '../../data/facturacion/TipoIdentificacion.js';
import tipoIdentRegisterClient from '../../data/facturacion/TipoIdentRegClient.js';
import { BsFillCartPlusFill, BsFillPersonLinesFill, BsFillPrinterFill, BsGiftFill, BsFillCheckCircleFill } from "react-icons/bs";
import { RiPlaneFill, RiTruckFill } from "react-icons/ri";
import { TbArrowsRightLeft } from "react-icons/tb";
import { MdAttachMoney, MdCancel } from "react-icons/md";
import ButtonIcon from "../../components/ButtonIcon";

const FacturaItems = () => {

    const onSubmitFormItemsFact = async (event) => {
        event.preventDefault();
        //await insertCode();
    };

    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            setShowModalClientReg(true);
            event.preventDefault();
        }
    }
    const handleKeyDownMaterial = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    const handleEditMaterial = (event) => {
        setShowModalEditCant(true);
    }

    //VARIABLE BANDERA PARA MOSTRAR EL MODAL
    const [showModalClientReg, setShowModalClientReg] = useState(false);
    const [showModalEditCant, setShowModalEditCant] = useState(false);
    //VARIABLES CHECKBOX
    const [isChecked, setShow] = useState(false);
    const [isCheckedCredito, setIsCheckedCredito] = useState(true);
    const [isCheckedInfoCredito, setIsCheckedInfoCredito] = useState(true);
    const [isCheckedTypeId, setIsCheckedTypeId] = useState(false);

    //LISTA DE CHECKBOX TIPO PAGO
    const [switchesPago, setSwitchesPago] = useState(tipoPago);
    const [switchesInfo, setSwitchesInfo] = useState(infoCredMilla);
    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeSwitchPago(id) {
        setSwitchesPago(switchesPago.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }))
        if (id == '2') {
            setIsCheckedCredito(false);
        } else {
            setIsCheckedCredito(true);
        }
    }
    function onChangeSwitchInfo(id) {
        setSwitchesInfo(switchesInfo.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }))
        if (id == '2') {
            setIsCheckedInfoCredito(false);
        } else {
            setIsCheckedInfoCredito(true);
        }

    }

    //LISTA DE CHECKBOX TIPO IDENTIFICACION
    const [switchId, setSwitchId] = useState(tipoIdentificacion);
    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeSwitchId(id) {
        setSwitchId(switchId.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }));
    }
    // CIERRA EL MODAL
    const handleCloseModalClientReg = () => setShowModalClientReg(false);
    const handleCloseModalEditCant = () => setShowModalEditCant(false);
    return (
        <>
            <br />
            <Card>
                <Card.Body>
                    <Form id="facturaItemsForm" onSubmit={onSubmitFormItemsFact}>
                        <Row className="square rounded border">
                            <Col xs={3} className="square border-end">
                                <Row>
                                    {switchesPago.map((item) => {
                                        return (
                                            <Col key={item.id} >
                                                <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={() => onChangeSwitchPago(item.id)} />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Col>
                            <Col className="square border-end">
                                <Row>
                                    {switchId.map((item) => {
                                        return (
                                            <Col key={item.id} >
                                                <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={() => onChangeSwitchId(item.id)} />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Col>
                            <Col xs={3}>
                                <Form.Check type="checkbox" label="Cliente Coorporativo" />
                            </Col>
                        </Row>
                        <br />
                        <Row className="square border-bottom">
                            {isCheckedCredito ? (
                                <Col xs={2}>
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
                            ) : (<div></div>)}
                            <Col xs={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>identificación del cliente:</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese identificación" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre del cliente" id="nameClient" name="nameClient" disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seleccionar vendedor:</Form.Label>
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
                        <br />
                        <Row className="square border-bottom">
                            <Col xs={2}>
                                <Form.Group className="mb-3" id='formGroupNumbers'>
                                    <Form.Label>Código material:</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese código" id="codeMat" name="codeMat" onKeyDown={handleKeyDownMaterial} disabled />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción del material:</Form.Label>
                                    <Form.Control type="text" placeholder="Descripción" id="descriptionMat" name="descriptionMat" disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio:</Form.Label>
                                    <Form.Control type="text" placeholder="0.00" id="priceMat" name="priceMat" disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dcto ini:</Form.Label>
                                    <Form.Control type="text" placeholder="0.00" id="discountMatIni" name="discountMatIni" disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descuento:</Form.Label>
                                    <Form.Control type="text" placeholder="0.00" id="discountMat" name="discountMat" />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cantidad:</Form.Label>
                                    <Form.Control type="text" placeholder="0" id="amountMat" name="amountMat" />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <ButtonIcon text={'Agregar'} type='button' variant='dark' style={{ marginTop: '20%' }}>
                                    <BsFillCartPlusFill />
                                </ButtonIcon>
                            </Col>
                        </Row>
                        <br />
                        <Row className="square border-bottom">
                            <div className="tableContainer">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Cant.</th>
                                            <th>Material</th>
                                            <th>Descripción</th>
                                            <th>Precio Unit.</th>
                                            <th>Dcto. Ini.</th>
                                            <th>Subtotal</th>
                                            <th>Dcto.</th>
                                            <th>Total</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button onClick={handleEditMaterial}>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="square border-end">
                                        <Row>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Millas'}>
                                                    <RiPlaneFill />
                                                </ButtonIcon>
                                            </Col>
                                            <Col>
                                                <ButtonIcon variant='secondary' text='Precios'>
                                                    <MdAttachMoney />
                                                </ButtonIcon>
                                            </Col>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Clientes'}>
                                                    <BsFillPersonLinesFill />
                                                </ButtonIcon>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Traslado'}>
                                                    <TbArrowsRightLeft />
                                                </ButtonIcon>
                                            </Col>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Imprimir'}>
                                                    <BsFillPrinterFill />
                                                </ButtonIcon>
                                            </Col>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Guía'}>
                                                    <RiTruckFill />
                                                </ButtonIcon>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="square border-end">
                                        <Row>
                                            <Col>
                                                <Form.Check type="checkbox" id="cbEntradaDiferida" label="Entrada diferida" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Entrada:</Form.Label>
                                                <Form.Control type="text" placeholder="0.00" id="deferredEntry" name="deferredEntry" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Financiamiento:</Form.Label>
                                                <Form.Control type="text" placeholder="0.00" id="financy" name="financy" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            {switchesInfo.map((item) => {
                                                return (
                                                    <Col key={item.id} >
                                                        <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={() => onChangeSwitchInfo(item.id)} />
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Observaciones:</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese observaciones" id="observation" name="observation" />
                                    </Form.Group>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                <Row>
                                    <h6>Cantidad de Items:</h6>
                                    <h6>Suma:</h6>
                                    <h6>Descuento:</h6>
                                    <h6>Millas:</h6>
                                    <h6>SubTotal:</h6>
                                    <h6>ICE:</h6>
                                    <h6>IVA:</h6>
                                    <h6>TOTAL:</h6>
                                </Row>
                                <Row style={{ justifyContent: 'end' }}>
                                    <Col xs='auto'>
                                        <ButtonIcon variant='danger' text={'Cancelar'} type='button'>
                                            <MdCancel />
                                        </ButtonIcon>
                                    </Col>
                                    <Col xs='auto'>
                                        <ButtonIcon variant='dark' text={'Regalo'} type='button'>
                                            <BsGiftFill />
                                        </ButtonIcon>
                                    </Col>
                                    <Col xs='auto'>
                                        <ButtonIcon variant='primary' text={'Continuar'} type='submit'>
                                            <BsFillCheckCircleFill />
                                        </ButtonIcon>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card >
            <Modal show={showModalClientReg} onHide={handleCloseModalClientReg}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Identificación:</Form.Label>
                        <Form.Select>
                            {tipoIdentRegisterClient.map((data) => {
                                return (
                                    <option key={data.id}>{data.nombre}</option>
                                );
                            })}
                        </Form.Select>
                        <br/>
                        <Form.Control type="text" placeholder="Ingrese la identificación" id="observation" name="observation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre completo" id="observation" name="observation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese la dirección" id="observation" name="observation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el teléfono" id="observation" name="observation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el email" id="observation" name="observation" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalClientReg}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleCloseModalClientReg}>
                        Registrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalEditCant} onHide={handleCloseModalEditCant}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cantidad del Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nueva Cantidad:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese nueva cantidad" id="newAmount" name="newAmount" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalEditCant}>
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={handleCloseModalEditCant}>
                        Eliminar
                    </Button>
                    <Button variant="primary" onClick={handleCloseModalEditCant}>
                        Modificar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>);
}

export default FacturaItems;