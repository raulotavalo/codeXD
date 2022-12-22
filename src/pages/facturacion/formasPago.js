import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Table, Modal, ListGroup } from 'react-bootstrap';
import "../../styles/Container.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import ButtonIcon from "../../components/ButtonIcon";
import CashPaymentWay from "../../components/formasPagoCards/CashPaymentWay";
import AdvancePaymentWay from "../../components/formasPagoCards/AdvancePaymentWay";
import CheckPaymentWay from "../../components/formasPagoCards/CheckPaymentWay";
import CREAPaymentWay from "../../components/formasPagoCards/CREAPaymentWay";
import CreditCardPaymentWay from "../../components/formasPagoCards/CreditCardPaymentWay";
import DebitCardPaymentWay from "../../components/formasPagoCards/DebitCardPaymentWay";
import DepositPaymentWay from "../../components/formasPagoCards/DepositPaymentWay";
import ElectronicMoneyPaymentWay from "../../components/formasPagoCards/ElectronicMoneyPaymentWay";
import GiftcardPaymentWay from "../../components/formasPagoCards/GiftcardPaymentWay";
import HoldbackAddedValueTaxPaymentWay from "../../components/formasPagoCards/HoldbackAddedValueTaxPaymentWay";
import HoldbackIncomeTaxPaymentWay from "../../components/formasPagoCards/HoldbackIncomeTaxPaymentWay";
import PINPADPaymentWay from "../../components/formasPagoCards/PINPADPaymentWay";
import TransferencePaymentWay from "../../components/formasPagoCards/TransferencePaymentWay";
import "../../styles/facturacion/Ventas.css"



const FormasPago = () => {
    const onSubmitFormPaymentWay = async (event) => {
        event.preventDefault();
        //await insertCode();
    };

    const paymentWays = [
        {
            name: 'Efectivo',
            card: <CashPaymentWay />,
        },
        {
            name: 'Tarjeta de crédito',
            card: <CreditCardPaymentWay />,
        },
        {
            name: 'Tarjeta de débito',
            card: <DebitCardPaymentWay />,
        },
        {
            name: 'Anticipo',
            card: <AdvancePaymentWay />,
        },
        {
            name: 'Cheque',
            card: <CheckPaymentWay />,
        },
        {
            name: 'Coop. CREA',
            card: <CREAPaymentWay />,
        },
        {
            name: 'Depósito',
            card: <DepositPaymentWay />,
        },
        {
            name: 'Giftcard',
            card: <GiftcardPaymentWay />,
        },
        {
            name: 'Transferencia',
            card: <TransferencePaymentWay />,
        },
        {
            name: 'Dinero Electrónico',
            card: <ElectronicMoneyPaymentWay />,
        },
        {
            name: 'PIN PAD',
            card: <PINPADPaymentWay />,
        },
        {
            name: 'Retención IVA',
            card: <HoldbackAddedValueTaxPaymentWay />,
        },
        {
            name: 'Ret. Imp. Renta',
            card: <HoldbackIncomeTaxPaymentWay />,
        },
    ];

    const [paymentSelected, setPaymentSelected] = useState(paymentWays[0]);

    const paymentWayClicked = (selectedPayment) => {
        setPaymentSelected(selectedPayment);
    };

    return (
        <>
            <br />
            <Card>
                <Card.Header>
                    Ingresar de materiales
                </Card.Header>
                <Card.Body>
                    <Form id="facturaPaymentwaysForm" onSubmit={onSubmitFormPaymentWay}>
                        <Row >
                            <Col xs={2}>
                                <ListGroup>
                                    {paymentWays.map((paymentWay, index) => {
                                        return <ListGroup.Item key={index + paymentWay.name} action onClick={() => paymentWayClicked(paymentWay)}>{paymentWay.name}</ListGroup.Item>
                                    })}
                                </ListGroup>
                            </Col>
                            <Col xs={7}>
                                <Card>
                                    <Card.Header>
                                        {"Forma de pago seleccionada: " + paymentSelected.name}
                                    </Card.Header>
                                    <Card.Body>
                                        {paymentSelected.card}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={3} >
                                <ListGroup >
                                    <ListGroup.Item>Forma de pago 1   valor: 0.00</ListGroup.Item>
                                    <ListGroup.Item>Forma de pago 2   valor: 0.00</ListGroup.Item>
                                    <ListGroup.Item>Forma de pago 3   valor: 0.00</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <br />
                        <Row className='square border' style={{ justifyContent: 'end' }}>
                            <Col >
                                <h6>Total a pagar:</h6>
                                <h6>Total pagado:</h6>
                                <h6>Faltante:</h6>
                            </Col>
                            <Col xs='1' className="position-relative" >
                                <ButtonIcon className="position-absolute bottom-0 start-0" variant='danger' text={'Cancelar'} type='button'>
                                    <MdCancel />
                                </ButtonIcon>
                            </Col>
                            <Col xs='1' className="position-relative" >
                                <ButtonIcon className="position-absolute bottom-0 start-0" variant='primary' text={'Continuar'} type='submit'>
                                    <BsFillCheckCircleFill />
                                </ButtonIcon>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card >
        </>);
}

export default FormasPago;