import { Row, Card, Form, Col } from 'react-bootstrap';
import ButtonIcon from "../../components/ButtonIcon";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useState } from 'react';

const DebitCardPaymentWay = (props) => {
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
                <Form.Label>Número de lote:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el número de lote" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nombre del propietario de la tarjeta:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el nombre del propietario" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Código BIN:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el valor a pagar" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
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

export default DebitCardPaymentWay;