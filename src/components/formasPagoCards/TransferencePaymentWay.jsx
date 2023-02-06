import { Row, Card, Form } from 'react-bootstrap';
import ButtonIcon from "../ButtonIcon";
import { BsFillCheckCircleFill } from "react-icons/bs";

const TransferencePaymentWay = (props) => {
    const styles = { width: '80px', fontSize: '12px' };
    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };
    
    return (
        <Card>
            <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Cédula :</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el número de cuenta" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Número del cheque:</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el número del cheque" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Valor a pagar:</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el valor a pagar" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control type="text" placeholder="día" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                    <Form.Control type="text" placeholder="mes" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                    <Form.Control type="text" placeholder="year" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Seleccione un banco:</Form.Label>
                    <Form.Control type="text" placeholder="día" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                    <Form.Control type="text" placeholder="mes" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                    <Form.Control type="text" placeholder="year" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                </Form.Group>
                <Row>
                    <ButtonIcon variant='primary' text={'Continuar'} type='submit'>
                        <BsFillCheckCircleFill />
                    </ButtonIcon>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default TransferencePaymentWay;