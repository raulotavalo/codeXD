import { Row, Card, Form, Col } from 'react-bootstrap';
import ButtonIcon from "../../components/ButtonIcon";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useState } from 'react';


const HoldbackIncomeTaxPaymentWay = (props) => {
    const styles = { width: '80px', fontSize: '12px' };

    
    const [selectCreditTypeOptions, setSelectCreditTypeOptions] = useState([]);
    const [selectedCreditType, setSelectedCreditType] = useState();

    const [selectTermOptions, setSelectTermOptions] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState();

    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

    const onChangeSelectedCreditType = (event) => {
        //condition checking to change state from true to false and vice versa
        setSelectedCreditType(event.target.value);
    };

    const onChangeSelectedTerm = (event) => {
        //condition checking to change state from true to false and vice versa
        setSelectedTerm(event.target.value);
    };

    return (
        <Col>
            <Form.Group className="mb-3">
                <Form.Label>Valor a pagar:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el valor a pagar" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Seleccione tipo de crédito:</Form.Label>
                <Form.Select id='selectedCreditType' onChange={onChangeSelectedCreditType} required>
                    {selectCreditTypeOptions.map((type, index) => (
                        <option value={type.codigo} key={type.type} >{type.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Seleccione plazo:</Form.Label>
                <Form.Select id='selectedTerm' onChange={onChangeSelectedTerm} required>
                    {selectTermOptions.map((term, index) => (
                        <option value={term.codigo} key={index+term.term} >{term.name}</option>
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

export default HoldbackIncomeTaxPaymentWay;