import { Row, Card, Form, Button, Col } from 'react-bootstrap';
import ButtonIcon from "../../components/ButtonIcon";
import { BsFillCheckCircleFill } from "react-icons/bs";


const CREAPaymentWay = (props) => {
    const styles = { width: '80px', fontSize: '12px' };

    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

    return (
        <Col>
            <Form.Group className="mb-3">
                <Form.Label>Cédula del abonado:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la cédula del abonado" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>PIN</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el PIN del abonado" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Row style={{ justifyContent: 'end' }}>
                <Button variant='secondary' text={'Verificar'} type='submit'>
                    Verficar
                </Button>
            </Row>
            <br />
            <Form.Group className="mb-3">
                <Form.Label>Valor a pagar:</Form.Label>
                <Form.Control type="text" placeholder="Valor a pagar" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Row style={{ justifyContent: 'end' }}>
                <ButtonIcon variant='primary' text={'Agregar'} type='submit'>
                    <BsFillCheckCircleFill />
                </ButtonIcon>
            </Row>
        </Col>
    );
}

export default CREAPaymentWay;