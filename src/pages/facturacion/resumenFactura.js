import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import "../../styles/Container.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ButtonIcon from "../../components/ButtonIcon";

const ResumenFactura = () => {

    const onSubmitFormResumeBill = async (event) => {
        event.preventDefault();
        //await insertCode();
    };




    return (
        <>
            <br />
            <Card>
                <Card.Header>
                    Resumen de Factura
                </Card.Header>
                <Card.Body>
                    <Form id="facturaResumeForm" onSubmit={onSubmitFormResumeBill}>
                        <Row  style={{justifyContent: 'center'}}>
                            <Col className='square border' xs='4'>
                                <h6 style={{ textAlign: 'center' }}>Se realizara una factura a:</h6>
                                <h6 style={{ textAlign: 'center' }}>CONTADO</h6>
                                <h6 style={{ textAlign: 'center' }}>PPOS</h6>
                                <h6>Cliente:</h6>
                                <h6>Cédula:</h6>
                                <h6>Total de Materiales:</h6>
                                <br/>
                                <h6>Monto total:</h6>
                            </Col>
                        </Row>
                        <br/>
                        <Row style={{justifyContent: 'center'}}>
                            <ButtonIcon style={{width: '200px', fontSize: '12px'}} variant='primary' text={'Facturar'} type='submit'>
                                <BsFillCheckCircleFill />
                            </ButtonIcon>
                        </Row>
                    </Form>
                </Card.Body>
            </Card >
        </>);
}

/*     <Button variant='primary' text={'Facturar'} type='submit'>
                                <Row style={{ fontSize: '20px' }} ><BsFillCheckCircleFill /></Row>
                                Facturar
                            </Button>
*/
export default ResumenFactura;