import { Row, Card, Form, Col } from 'react-bootstrap';
import ButtonIcon from "../../components/ButtonIcon";
import { BsFillCheckCircleFill } from "react-icons/bs";

const AdvancePaymentWay = (props) => {
    const styles = { width: '80px', fontSize: '12px' };
    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

    return (
        <Col>
            <Row>
                Seleccionar Anticipo
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Valor a pagar:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el valor a pagar" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Row style={{ justifyContent: 'end' }}>
                <ButtonIcon variant='primary' text={'Continuar'} type='submit'>
                    <BsFillCheckCircleFill />
                </ButtonIcon>
            </Row>
        </Col>
    );
}

export default AdvancePaymentWay;