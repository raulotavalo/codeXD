import { Row, Card, Form, Col } from 'react-bootstrap';
import ButtonIcon from "../../components/ButtonIcon";
import { BsFillCheckCircleFill } from "react-icons/bs";


const CashPaymentWay = (props) => {
    const styles = { width: '80px', fontSize: '12px' };

    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

    return (
        <Col>
            <Form.Group className="mb-3">
                <Form.Label>Valor a pagar:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el valor a pagar" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Efectivo recibido:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el valor en efectivo recibido" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Valor a devolver:</Form.Label>
                <Form.Control type="text" placeholder="Valor a devolver (Vuelto)" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Row style={{ justifyContent: 'end' }}>
                <ButtonIcon variant='primary' text={'Agregar'} type='submit'>
                    <BsFillCheckCircleFill />
                </ButtonIcon>
            </Row>
        </Col>
    );
}

export default CashPaymentWay;