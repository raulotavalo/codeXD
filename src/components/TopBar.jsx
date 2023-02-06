
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Form, Col, Row } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { cashRegister, getCashRegister } from '../redux/reducer/cashRegisterSlice';
import { useEffect } from 'react';
import { useState } from 'react';

const TopBar = (props) => {
    
   
    const passSelectedCashRegister = (cashRegister) => {
        props.onSelectCashRegister(JSON.parse(cashRegister.target.value).optionJSON);
    }


    const cashRegisterRedux = useSelector(getCashRegister);

    useEffect(() => {
        if (cashRegisterRedux) {

        } else {
            if (props.cashRegisters.length === 1) {
                props.onSelectCashRegister(props.cashRegisters[0].optionJSON);
                return;
            } else {
                return;
            }
        }
    }, [props.cashRegisters]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container >
                <Col>
                    <Row>
                        <Navbar.Brand >{props.titleHeader}</Navbar.Brand>
                    </Row>
                    <Row>
                        <Navbar.Brand >{props.titleHeaderSub}</Navbar.Brand>
                    </Row>

                </Col>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end" >
                    <Row style={{ justifyContent: 'end', alignItems: 'center' }}>
                        <Col xs='5'>
                            <Form.Group>
                                <Form.Label style={{ color: '#ffffff', textAlign: 'right' }}>Seleccionar caja:</Form.Label>
                                <Form.Select style={{ color: '#212529', backgroundColor: '#e1e5e9', borderColor: '#212529' }} id='estabSelect' value={cashRegisterRedux ? JSON.stringify({optionJSON: cashRegisterRedux.selectedCashRegister}) : JSON.stringify(props.cashRegisters[0])} onChange={passSelectedCashRegister}>
                                    {props.cashRegisters.map((cashRegister, index) => (
                                        <option key={cashRegister.optionJSON.cajNombre + '' + cashRegister.optionJSON.idOficinaVenta_VKBUR} value={JSON.stringify(cashRegister)} >{cashRegister.optionJSON.idSociedad_BUKRS + '-' + '' + ': ' + cashRegister.optionJSON.idOficinaVenta_VKBUR + '-' + cashRegister.optionJSON.cajNombre}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs='3'>
                            <Form.Label style={{ color: '#ffffff', textAlign: 'right' }}>{props.titleUser}</Form.Label>
                        </Col>
                    </Row>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};


export default TopBar;