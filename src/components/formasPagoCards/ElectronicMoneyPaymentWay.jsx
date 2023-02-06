import { Row, Card, Form, Col } from 'react-bootstrap';
import ButtonIcon from "../../components/ButtonIcon";
import { BsFillCheckCircleFill } from "react-icons/bs";


const ElectronicMoneyPaymentWay = (props) => {
    const styles = { width: '80px', fontSize: '12px' };

    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

    return (
        <Col>
            <Form.Group className="mb-3">
                <Form.Label>Número de transacción del Banco Central:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el número de transacción del Banco Central" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Valor a pagar:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el valor a pagar" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Row style={{ justifyContent: 'end' }}>
                <ButtonIcon variant='primary' text={'Agregar'} type='submit'>
                    <BsFillCheckCircleFill />
                </ButtonIcon>
            </Row>
        </Col>
    );
}

export default ElectronicMoneyPaymentWay;