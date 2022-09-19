import React, {useState} from "react";

import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Alert} from 'react-bootstrap';
import { DatePicker } from "@material-ui/pickers";


const EliminarCliente = props => {
    //VARIABLES FECHA-NACIMIENTO
    const [fechaNacimiento,cambiarFechaNacimiento]=useState(new Date());
    //VARIABLES POP-UP
    const [isChecked, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //VARIABLES DESHABILITAR ITEMS
    const [isPushSearch, changeToUpdate] = useState(false);
    const MenuClose = () => changeToUpdate(false);
    const MenuShow = () => changeToUpdate(true);
    //CAMBIA DE ESTADO CHECKBOX DE CONVENIOS
    const handleOnChange = () => {
        setShow(!isChecked);
    };
    //CAMBIA ESTADO  DE BOTON
    const ButtonOnChange = () => {
    changeToUpdate(!isPushSearch);
    };
    return (
        <div className="main">

                <Row id="iniPage">
         
                    <Modal show={isChecked} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Convenios Especiales</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Card>
                                <Card.Body>
                                    <Form id="addCodeForm">
                                        <Row>
                                            <p>Empresas:</p>
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Check type="checkbox" label="29 de Octubre" />
                                                    <Form.Check type="checkbox" label="Gringo Tree" />
                                                    <Form.Check type="checkbox" label="La Merced" />
                                                    <Form.Check type="checkbox" label="Militares" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <br />
                            <Card>
                                <Card.Body>
                                    <Form id="addCodeForm">
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Ingrese valor:</Form.Label>
                                                    <Form.Control type="text" placeholder="" id="codMat" name="codMat" required />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary">Aceptar</Button>
                            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                            
                        </Modal.Footer>
                    </Modal>
                    <Col>               
                        <br />
                        <Card>
                            <Card.Body>
                            <Form id="addCodeForm">
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Select>
                                                <option>Cédula</option>
                                                <option>RUC</option>
                                                <option>Pasaporte</option>
                                            </Form.Select>
        
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" placeholder="Código" id="codMat" name="codMat" required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Razón social / Apellidos:</Form.Label>
                                            <Form.Control type="text" placeholder="Apellidos" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label >Nombres:</Form.Label>
                                            <Form.Control type="text" placeholder="Nombres" id="codMat" name="codMat" required />
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Form>
                           
                        </Card.Body>
                    </Card>
                    <br />
                    <Card>
                        <Card.Body>
                            <Form id="addCodeForm2">

                                <Row>
                            
                                    
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Actividad económica:</Form.Label>
                                            <Form.Select disabled={!isPushSearch}>
                                                <option>Ama de casa</option>
                                                <option>Empleado público</option>
                                                <option>...</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                        <Form.Label>Sitio web:</Form.Label>
                                            <Form.Control disabled={!isPushSearch} type="text" placeholder="Sitio web" id="codMat" name="codMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha de nacimiento:</Form.Label>
                                            <DatePicker disabled={!isPushSearch} value={fechaNacimiento} onChange={cambiarFechaNacimiento}/>
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Género:</Form.Label>
                                            <Form.Select disabled={!isPushSearch}>
                                                <option>Masculino</option>
                                                <option>Femenino</option>
                                                <option>Sin género</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                               <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tratamiento:</Form.Label>
                                            <Form.Select disabled={!isPushSearch}>
                                                <option>Señor</option>
                                                <option>Señora</option>
                                                <option>Empresa</option>
                                                <option>Señor y Señora</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Estado civil:</Form.Label>
                                            <Form.Select disabled={!isPushSearch}>
                                                <option>Soltero</option>
                                                <option>Casado</option>
                                                <option>Viudo</option>
                                                <option>Divorciado</option>
                                                <option>Separado</option>
                                                <option>Union libre</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Correo:</Form.Label>
                                            <Form.Control disabled={!isPushSearch} type="text" placeholder="Correo" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Teléfono 1:</Form.Label>
                                            <Form.Control disabled={!isPushSearch} type="text" placeholder="Teléfono 1" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    

                               </Row>
                                <Row>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Teléfono 2:</Form.Label>
                                            <Form.Control disabled={!isPushSearch} type="text" placeholder="Teléfono 2" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Dirección 1:</Form.Label>
                                            <Form.Control disabled={!isPushSearch} type="text" placeholder="Direccion 1" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Dirección 2:</Form.Label>
                                            <Form.Control disabled={!isPushSearch} type="text" placeholder="Dirección 2" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Observaciones:</Form.Label>
                                            <Form.Control disabled={!isPushSearch} type="text" placeholder="Observaciones" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card>
                        <Card.Body>
                            <Form id="addCodeForm3">
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Check disabled={!isPushSearch} type="checkbox" label="Convenios especiales" checked={isChecked} onChange={handleOnChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Grupo de cuenta:</Form.Label>
                                            <Form.Select disabled={!isPushSearch}>
                                                <option>Cliente Retail</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Grupo de clientes:</Form.Label>
                                            <Form.Select disabled={!isPushSearch}>
                                                <option>Retail</option>
                                                <option>Mayoreo</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Provincial:</Form.Label>
                                            <Form.Select disabled={!isPushSearch}>
                                                <option>Azuay</option>
                                                <option>Bolivar</option>
                                                <option>...</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Canton:</Form.Label>
                                            <Form.Select disabled={!isPushSearch}>
                                                <option>Cuenca</option>
                                                <option>Girón</option>
                                                <option>...</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Parroquia:</Form.Label>
                                            <Form.Select disabled={!isPushSearch}>
                                                <option>Bellavista</option>
                                                <option>Cañaribamba</option>
                                                <option>...</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>
                                
                            </Form>
                           
                            </Card.Body>
                        </Card>
                        <br />
                        <Row className="d-grid gap-2">
                            {isPushSearch ? (
                            <Button onClick={ButtonOnChange} variant="outline-dark" size="lg">
                                Procesar
                            </Button>   
                            ) : (
                            <Button onClick={ButtonOnChange} variant="outline-dark" size="lg">
                                Buscar
                            </Button> 
                                )}            
                        </Row>
                        
                        <br />
                    </Col>
                </Row>
                
          
        </div>
    );
};



export default EliminarCliente;