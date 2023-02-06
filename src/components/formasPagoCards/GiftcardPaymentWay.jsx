import { Row, Card, Form, Col } from 'react-bootstrap';
import ButtonIcon from "../../components/ButtonIcon";
import { BsFillCheckCircleFill } from "react-icons/bs";

const GiftcardPaymentWay = (props) => {
    const styles = { width: '80px', fontSize: '12px' };
    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

    return (
        <Col>
            <Form.Group className="mb-3">
                <Form.Label>Código de la tarjeta :</Form.Label>
                <Row>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Ingrese el código de la Giftcard" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                    </Col>
                    <Col sm="1">
                        <ButtonIcon variant='secondary' text={'Consultar'} type='submit'>
                            <BsFillCheckCircleFill />
                        </ButtonIcon>
                    </Col>
                </Row>
            </Form.Group>
            <Card>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción: </Form.Label>
                        <Form.Label className="square border-bottom" style={{ marginLeft: '5%', width: '75%' }}>GiftCard Almacenes</Form.Label>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Monto de la tarjeta:</Form.Label>
                                <Form.Label className="square border-bottom" style={{ marginLeft: '5%' }}>10.00</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Saldo disponible:</Form.Label>
                                <Form.Label className="square border-bottom" style={{ marginLeft: '5%' }}>0.00</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>ESTADO:</Form.Label>
                        <Form.Label className="square border-bottom" style={{ marginLeft: '5%', width: '80%' }}>VALIDA</Form.Label>
                    </Form.Group>
                </Card.Body>
            </Card>
            <br/>
            <Form.Group className="mb-3">
                <Form.Label>Valor a pagar:</Form.Label >
                <Form.Control type="text" placeholder="Ingrese el valor a pagar" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Row style={{ justifyContent: 'end' }}>
                <Col xs='auto'>
                    <ButtonIcon variant='primary' text={'Borrar'} type='submit'>
                        <BsFillCheckCircleFill />
                    </ButtonIcon>
                </Col>
                <Col xs='auto'>
                    <ButtonIcon variant='primary' text={'Agregar'} type='submit'>
                        <BsFillCheckCircleFill />
                    </ButtonIcon>
                </Col>
            </Row>
        </Col>
    );
}

export default GiftcardPaymentWay;