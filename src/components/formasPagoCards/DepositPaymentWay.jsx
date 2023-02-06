import { Row, Card, Form, Col } from 'react-bootstrap';
import ButtonIcon from "../../components/ButtonIcon";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useState } from 'react';

const DepositPaymentWay = (props) => {
    const styles = { width: '80px', fontSize: '12px' };

    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

    const [selectBankOptions, setSelectBankOptions] = useState([]);
    const [selectedBank, setSelectedBank] = useState();

    const onChangeSelectedBank = (event) => {
        //condition checking to change state from true to false and vice versa
        setSelectedBank(event.target.value);
    };



    return (
        <Col>
            <Form.Group className="mb-3">
                <Form.Label>Cuatro últimos digitos de la cuenta:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese los cuatro últimos digitos de la cuenta" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Número del deposito:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el número del deposito" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Fecha:</Form.Label>
                <Row >
                    <Col>
                        <Form.Control type="text" placeholder="día" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="mes" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="year" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Seleccione un banco:</Form.Label>
                <Form.Select id='selectedBank' onChange={onChangeSelectedBank} required>
                    {selectBankOptions.map((bank, index) => (
                        <option value={bank.codigo} key={bank.codigo} >{bank.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Row style={{ justifyContent: 'end' }}>
                <ButtonIcon variant='primary' text={'Agregar'} type='submit'>
                    <BsFillCheckCircleFill />
                </ButtonIcon>
            </Row>
        </Col>
    );
}

export default DepositPaymentWay;