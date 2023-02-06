import React, { useState, useLayoutEffect } from "react";
import SideBar from "../../components/SideBar";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import { cashRegister, getCashRegister } from '../../redux/reducer/cashRegisterSlice';
import { Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import FacturaItems from "./facturaItems";
import { useDispatch } from "react-redux";
import FormasPago from "./formasPago";
import ResumenFactura from "./resumenFactura";
import TopBar from "../../components/TopBar";
import soapGetConstants from "../../soap/soapGetConstants";
import soapGetCashRegisters from "../../soap/soapGetCashRegisters";
import { constants } from '../../redux/reducer/constantsSlice'

const Ventas = props => {

    const [firstUpdate, setFirstUpdate] = useState(true);
    const [selectCashRegistersOptions, setSelectCashRegistersOptions] = useState([]);


    const userRedux = useSelector(selectUser);
    const cashRegisterRedux = useSelector(getCashRegister);

    const dispatch = useDispatch();
    const getConstants = async () => {
        var dataJSON = await soapGetConstants();
        if (dataJSON) {
            if (dataJSON == 'undefined') {
                alert('No se recuperaron las constantes');
            }
            else {
                if (dataJSON[0] == "4") {
                    alert("Error: " + JSON.stringify(dataJSON[1]));
                } else {
                    var constantsJS = null;
                    try {
                        constantsJS=JSON.parse(dataJSON);
                    } catch (e) { }
                    if (constantsJS !== null) {
                        dispatch(
                            constants({
                                iva: constantsJS[0].constValor,
                                ice: constantsJS[1].constValor,
                                maxConsumidorFinal: constantsJS[2].constValor,
                            })
                        );
                    }
                }
            }
        }
    }

    const getCashRegisters = async () => {
        var dataJSON = await soapGetCashRegisters(userRedux.idUser);
        if (dataJSON) {
            if (dataJSON == 'undefined') {
                alert('No se recuperaron las empresas');
            }
            else {
                if (dataJSON[0] == "4") {
                    alert("Error: " + JSON.stringify(dataJSON[1]));
                } else {
                    var cashRegistersOptions = [];
                    var cashRegisterJS = null;
                    try {
                        cashRegisterJS=JSON.parse(dataJSON);
                    } catch (e) { }
                    if (cashRegisterJS != null) {

                        if (typeof (cashRegisterJS) === 'object' && cashRegisterJS.length < 2) {
                            const optionJSON = cashRegisterJS;
                            cashRegistersOptions = [...cashRegistersOptions, { optionJSON }];
                        } else {
                            cashRegisterJS.map((optionJSON, index) => {
                                cashRegistersOptions = [...cashRegistersOptions, { optionJSON }];
                            });
                        }
                        setSelectCashRegistersOptions(cashRegistersOptions);
                    }
                }
            }
        }
    }

    const saveCashRegisterRedux = (selectedCashRegister) => {

        dispatch(
            cashRegister({
                selectedCashRegister
            })
        );
    }

    useLayoutEffect(() => {
        if (firstUpdate) {
            setFirstUpdate(false);
            return;
        }
        getConstants();
        getCashRegisters();
    }, [firstUpdate]);

    return (
        userRedux ?
            <Row className="ventasContainer" style={{ height: '100vh' }}>
                <SideBar />
                <Col>
                    <Row>
                        <TopBar cashRegisters={selectCashRegistersOptions} onSelectCashRegister={saveCashRegisterRedux} titleHeader={cashRegisterRedux ? 'CREAR FACTURA - SOCIEDAD: ' + cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS + ' - OFICINA DE VENTA: ' + cashRegisterRedux.selectedCashRegister.idOficinaVenta_VKBUR : 'CREAR FACTURA - SOCIEDAD - OFICINA DE VENTA'} titleHeaderSub={cashRegisterRedux ? cashRegisterRedux.selectedCashRegister.cajNombre : 'Caja'} titleUser={userRedux.name} />
                    </Row>
                    <Row id="ventasPage">
                        <Col>
                            <br />
                            {cashRegisterRedux ?
                                <Card>
                                    <Card.Body>
                                        <div >
                                            <Tabs >
                                                <Tab eventKey="tab1" title="Factura">
                                                    <FacturaItems />
                                                </Tab>
                                                <Tab eventKey="tab2" title="Método de Pago" disabled>
                                                    <FormasPago />
                                                </Tab>
                                                <Tab eventKey="tab3" title="Confirmar Venta" disabled>
                                                    <ResumenFactura />
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </Card.Body>
                                </Card> : <h1>Seleccione una caja de la oficina de venta</h1>
                            }
                            <br />
                        </Col>
                    </Row>
                </Col>
            </Row>
            :
            <Row style={{ height: '100vh' }}>
                <h1>No esta logeado</h1>
            </Row>
    );
};



export default Ventas;